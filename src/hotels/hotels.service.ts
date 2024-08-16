import { Injectable } from '@nestjs/common';
import { GetHotelsResponseDto } from './dto/get-hotels-response.dto';
import { mergeSupplierData } from './hotels.utils';
import { ExternalSupplierService } from '../external-suppliers/external-supplier.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class HotelService {
  constructor(private readonly externalSupplier: ExternalSupplierService) {}

  async getHotels(
    destinationId: number,
    hotelIds: string[],
  ): Promise<GetHotelsResponseDto[]> {
    const supplierData = await this.externalSupplier.fetchSupplierData();
    let mergedData = mergeSupplierData(supplierData);

    if (hotelIds?.length > 0) {
      mergedData = mergedData.filter((hotel) => hotelIds.includes(hotel.id));
    } else if (destinationId) {
      mergedData = mergedData.filter(
        (hotel) => hotel.destinationId === destinationId,
      );
    }
    return plainToInstance(GetHotelsResponseDto, mergedData);
  }
}
