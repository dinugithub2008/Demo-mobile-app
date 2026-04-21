import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListEquipmentDto } from './dto/list-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async listCategories() {
    return this.prisma.equipmentCategory.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true, description: true },
    });
  }

  async listEquipment(query: ListEquipmentDto) {
    const where: Prisma.EquipmentWhereInput = {
      isActive: query.activeOnly,
      ...(query.categorySlug ? { category: { slug: query.categorySlug } } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { sku: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.equipment.findMany({
        where,
        include: {
          category: true,
          images: { take: 1, where: { isPrimary: true } },
          pricingRules: { where: { tradeTier: 'STANDARD' }, take: 1 },
        },
        orderBy: { name: 'asc' },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      this.prisma.equipment.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
        total,
      },
    };
  }

  async getEquipmentById(id: string) {
    return this.prisma.equipment.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        addOns: true,
        pricingRules: true,
      },
    });
  }
}
