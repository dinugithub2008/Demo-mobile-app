import { Injectable } from '@nestjs/common';
import { TradeAccountStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyTradeAccountDto } from './dto/apply-trade-account.dto';

@Injectable()
export class TradeAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  apply(userId: string, dto: ApplyTradeAccountDto) {
    return this.prisma.tradeAccount.upsert({
      where: { userId },
      update: {
        companyName: dto.companyName,
        abn: dto.abn,
        status: TradeAccountStatus.UNDER_REVIEW,
      },
      create: {
        userId,
        companyName: dto.companyName,
        abn: dto.abn,
        status: TradeAccountStatus.APPLIED,
      },
    });
  }

  listForReview() {
    return this.prisma.tradeAccount.findMany({
      where: { status: { in: [TradeAccountStatus.APPLIED, TradeAccountStatus.UNDER_REVIEW] } },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
