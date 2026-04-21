import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('availability')
  @ApiOperation({ summary: 'Check live availability to prevent double-booking' })
  checkAvailability(@Body() dto: CheckAvailabilityDto) {
    return this.bookingsService.checkAvailability(
      dto.equipmentId,
      new Date(dto.startAt),
      new Date(dto.endAt),
      dto.qty,
    );
  }

  @Post('hold')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Place hold during checkout' })
  hold(@Body() dto: CheckAvailabilityDto) {
    return this.bookingsService.createHold(
      dto.equipmentId,
      new Date(dto.startAt),
      new Date(dto.endAt),
      dto.qty,
    );
  }
}
