import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  validateWindow(startAt: Date, endAt: Date) {
    if (endAt <= startAt) {
      throw new BadRequestException('End time must be after start time');
    }
  }

  async checkAvailability(
    equipmentId: string,
    startAt: Date,
    endAt: Date,
    qty: number,
  ) {
    this.validateWindow(startAt, endAt);

    const equipment = await this.prisma.equipment.findUnique({ where: { id: equipmentId } });
    if (!equipment) throw new BadRequestException('Equipment not found');

    const conflicting = await this.prisma.bookingItem.count({
      where: {
        equipmentId,
        booking: {
          status: {
            in: [
              BookingStatus.HOLD,
              BookingStatus.PENDING_APPROVAL,
              BookingStatus.CONFIRMED,
              BookingStatus.ACTIVE,
            ],
          },
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
      },
    });

    const availableUnits = Math.max(equipment.stockQty - conflicting, 0);

    return {
      equipmentId,
      startAt,
      endAt,
      requestedQty: qty,
      availableUnits,
      available: availableUnits >= qty,
    };
  }

  async createHold(equipmentId: string, startAt: Date, endAt: Date, qty: number) {
    const availability = await this.checkAvailability(equipmentId, startAt, endAt, qty);

    if (!availability.available) {
      throw new BadRequestException('Requested quantity is unavailable in the selected hire window');
    }

    return {
      equipmentId,
      startAt,
      endAt,
      qty,
      status: BookingStatus.HOLD,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      message: 'Hold created (checkout persistence hook pending).',
    };
  }
}
