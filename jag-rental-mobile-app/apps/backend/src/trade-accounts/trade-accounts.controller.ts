import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApplyTradeAccountDto } from './dto/apply-trade-account.dto';
import { TradeAccountsService } from './trade-accounts.service';

@ApiTags('Trade Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trade-accounts')
export class TradeAccountsController {
  constructor(private readonly service: TradeAccountsService) {}

  @Post('apply')
  @ApiOperation({ summary: 'Submit or update trade account application' })
  apply(
    @CurrentUser() user: { id: string },
    @Body() dto: ApplyTradeAccountDto,
  ) {
    return this.service.apply(user.id, dto);
  }

  @Get('review-queue')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Admin/staff queue for approvals' })
  reviewQueue() {
    return this.service.listForReview();
  }
}
