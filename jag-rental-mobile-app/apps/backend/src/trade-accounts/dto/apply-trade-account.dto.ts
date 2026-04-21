import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ApplyTradeAccountDto {
  @ApiProperty({ example: 'Summit Civil Pty Ltd' })
  @IsString()
  companyName!: string;

  @ApiProperty({ example: '12345678901', description: 'Australian Business Number without spaces' })
  @IsString()
  @Length(11, 11)
  abn!: string;
}
