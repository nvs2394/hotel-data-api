import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { GetHotelsResponseDto } from './dto/get-hotels-response.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetHotelsQueryDto } from './dto/get-hotels-query.dto';

@Controller('v1/hotels')
export class HotelController {
  constructor(private readonly hotelsService: HotelService) {}

  @Get()
  @ApiOperation({ summary: 'Get hotels based on destination or hotel IDs' })
  @ApiQuery({
    name: 'destinationId',
    required: false,
    description: 'Destination ID to filter hotels',
  })
  @ApiQuery({
    name: 'hotelIds',
    required: false,
    type: [String],
    description:
      'List of hotel IDs to filter hotels. Example: hotelIds=abcs&hotelIds=alkm',
  })
  @ApiBadRequestResponse({
    description: 'Validation error: Invalid input data',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of hotels based on the given filters',
    type: GetHotelsResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No hotels found with the given filters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected server error occurred',
  })
  async getHotels(
    @Query(new ValidationPipe({ transform: true })) query: GetHotelsQueryDto,
  ): Promise<GetHotelsResponseDto[]> {
    return this.hotelsService.getHotels(query.destinationId, query.hotelIds);
  }
}
