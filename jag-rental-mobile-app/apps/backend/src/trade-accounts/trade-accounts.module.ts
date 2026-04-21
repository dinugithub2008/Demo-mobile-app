import { Module } from '@nestjs/common';
import { TradeAccountsService } from './trade-accounts.service';
import { TradeAccountsController } from './trade-accounts.controller';

@Module({
  controllers: [TradeAccountsController],
  providers: [TradeAccountsService],
})
export class TradeAccountsModule {}
