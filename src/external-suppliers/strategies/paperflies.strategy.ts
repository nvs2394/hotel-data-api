import { plainToInstance } from 'class-transformer';
import { SupplierStrategy } from './external-supplier.strategies';
import {
  HotelDto,
  HotelImageItemDto,
  HotelImagesDto,
  HotelLocation,
} from '../../dto/hotel.dto';
import { getCountryName } from '../../utils/locale.utils';
import * as _ from 'lodash';

export class PaperfliesSupplierStrategy implements SupplierStrategy {
  getUrl(): string {
    return 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies';
  }

  mapToDto(data: object[]): HotelDto[] {
    return data.map((obj) =>
      plainToInstance(
        HotelDto,
        {
          id: _.get(obj, 'hotel_id'),
          destinationId: _.get(obj, 'destination_id'),
          name: _.get(obj, 'hotel_name'),
          description: _.get(obj, 'details'),
          location: this.mapLocation(obj),
          amenities: _.get(obj, 'amenities', {
            general: [],
            room: [],
          }),
          images: this.mapImages(obj),
          bookingConditions: _.get(obj, 'booking_conditions', []),
        },
        { excludeExtraneousValues: true },
      ),
    );
  }

  private mapLocation(obj: object): HotelLocation {
    return {
      address: _.get(obj, 'location.address', ''),
      country: getCountryName(_.get(obj, 'location.country', '')),
      lat: 0,
      lng: 0,
      city: '',
    };
  }

  private mapImages(obj: object): HotelImagesDto {
    return {
      rooms: _.get(obj, 'images.rooms', []).map((item) => this.mapImage(item)),
      site: _.get(obj, 'images.site', []).map((item) => this.mapImage(item)),
      amenities: [],
    };
  }

  private mapImage = (image: object): HotelImageItemDto => ({
    link: _.get(image, 'link'),
    description: _.get(image, 'caption'),
  });
}
