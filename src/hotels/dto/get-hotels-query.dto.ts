import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class GetHotelsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Destination ID must be a number.' })
  @Min(1000, { message: 'Destination ID must be a 4-digit number.' })
  @Max(9999, { message: 'Destination ID must be a 4-digit number.' })
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
