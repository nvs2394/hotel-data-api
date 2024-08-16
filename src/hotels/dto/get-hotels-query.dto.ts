import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';

export class GetHotelsQueryDto {
  @IsOptional()
  @Matches(/^\d{4}$/, { message: 'Destination ID must be a 4-digit number.' })
  @Type(() => Number)
  destinationId?: number;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray({ message: 'hotelIds must be an array' })
  @ArrayNotEmpty({ message: 'hotelIds must not be an empty array' })
  @IsString({ each: true, message: 'Each hotel ID must be a string' })
  @MaxLength(4, {
    each: true,
    message: 'Each hotel ID must not exceed 4 characters.',
  })
  hotelIds?: string[];
}
