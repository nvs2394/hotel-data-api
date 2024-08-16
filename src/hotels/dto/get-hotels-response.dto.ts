import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  IsLatitude,
  IsLongitude,
  Length,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

class HotelLocation {
  @Expose()
  @ApiProperty({ example: 1.264751 })
  @Type(() => Number)
  @IsLatitude()
  lat: number = 0;

  @Expose()
  @ApiProperty({ example: 103.824006 })
  @Type(() => Number)
  @IsLongitude()
  lng: number = 0;

  @Expose()
  @ApiProperty({ example: '8 Sentosa Gateway, Beach Villas, 098269' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string = '';

  @Expose()
  @ApiProperty({ example: 'Singapore' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string = '';

  @Expose()
  @ApiProperty({ example: 'Singapore' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  country: string = '';
}

class HotelImageItemDto {
  @Expose()
  @ApiProperty({ example: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg' })
  @IsString()
  @IsNotEmpty()
  link: string = '';

  @Expose()
  @ApiProperty({ example: 'Double room' })
  @IsString()
  description: string = '';
}

class HotelImagesDto {
  @Expose()
  @ApiProperty({ type: [HotelImageItemDto], example: [] })
  @Type(() => HotelImageItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  rooms: HotelImageItemDto[] = [];

  @Expose()
  @ApiProperty({ type: [HotelImageItemDto], example: [] })
  @Type(() => HotelImageItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  site: HotelImageItemDto[] = [];

  @Expose()
  @ApiProperty({ type: [HotelImageItemDto], example: [] })
  @Type(() => HotelImageItemDto)
  @ValidateNested({ each: true })
  @IsArray()
  amenities: HotelImageItemDto[] = [];
}

class HotelAmenitiesDto {
  @Expose()
  @ApiProperty({ type: [String], example: ['outdoor pool', 'indoor pool'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  general: string[] = [];

  @Expose()
  @ApiProperty({ type: [String], example: ['aircon', 'tv'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  room: string[] = [];
}

export class GetHotelsResponseDto {
  @Expose()
  @ApiProperty({ example: 'iJhz' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @ApiProperty({ example: 5432 })
  @IsInt()
  @Expose()
  destinationId: number;

  @Expose()
  @ApiProperty({ example: 'Beach Villas Singapore' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty({ type: HotelLocation })
  @Expose()
  @Type(() => HotelLocation)
  @ValidateNested()
  location: HotelLocation = new HotelLocation();

  @Expose()
  @ApiProperty({
    example:
      'Surrounded by tropical gardens, these upscale villas in elegant Colonial-style buildings...',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @ApiProperty({ type: HotelAmenitiesDto })
  @Expose()
  @Type(() => HotelAmenitiesDto)
  @ValidateNested()
  amenities: HotelAmenitiesDto = new HotelAmenitiesDto();

  @Expose()
  @ApiProperty({ type: HotelImagesDto })
  @Expose()
  @Type(() => HotelImagesDto)
  @ValidateNested()
  images: HotelImagesDto = new HotelImagesDto();

  @Expose()
  @ApiProperty({
    type: [String],
    example: ['All children are welcome...', 'Pets are not allowed.'],
  })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  @Expose()
  bookingConditions: string[] = [];
}
