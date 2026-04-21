import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ListEquipmentDto } from './dto/list-equipment.dto';
import { EquipmentService } from './equipment.service';

@ApiTags('Equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly service: EquipmentService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Public equipment categories list' })
  listCategories() {
    return this.service.listCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Public equipment catalogue query' })
  listEquipment(@Query() query: ListEquipmentDto) {
    return this.service.listEquipment(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Equipment details with pricing rules and add-ons' })
  getById(@Param('id') id: string) {
    return this.service.getEquipmentById(id);
  }

  @Get(':id/admin-view')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Admin/staff protected endpoint example' })
  getAdminView(@Param('id') id: string) {
    return this.service.getEquipmentById(id);
  }
}
