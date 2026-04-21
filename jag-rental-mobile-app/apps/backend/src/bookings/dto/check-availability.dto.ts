import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { FulfilmentType } from '@prisma/client';

export class CheckAvailabilityDto {
  @ApiProperty()
  @IsString()
  equipmentId!: string;

  @ApiProperty({ example: '2026-05-20T08:00:00.000Z' })
  @IsDateString()
  startAt!: string;

  @ApiProperty({ example: '2026-05-22T08:00:00.000Z' })
  @IsDateString()
  endAt!: string;

  @ApiProperty({ enum: FulfilmentType, required: false })
  @IsOptional()
  @IsEnum(FulfilmentType)
  fulfilmentType?: FulfilmentType;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  qty: number = 1;
}
