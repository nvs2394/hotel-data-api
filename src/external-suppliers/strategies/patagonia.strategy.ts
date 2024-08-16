import { plainToInstance } from 'class-transformer';
import { SupplierStrategy } from './external-supplier.strategies';
import { HotelDto, HotelImagesDto, HotelLocation } from '../../dto/hotel.dto';
import * as _ from 'lodash';

export class PatagoniaSupplierStrategy implements SupplierStrategy {
  getUrl(): string {
    return 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia';
  }
  mapToDto(data: object[]): HotelDto[] {
    return data.map((obj) =>
      plainToInstance(
        HotelDto,
        {
          id: _.get(obj, 'id'),
          destinationId: _.get(obj, 'destination'),
          name: _.get(obj, 'name'),
          description: _.get(obj, 'info'),
          location: this.mapLocation(obj),
          amenities: this.mapAmenities(_.get(obj, 'amenities')),
          images: this.mapImages(obj),
          bookingConditions: [],
        } as HotelDto,
        { excludeExtraneousValues: true },
      ),
    );
  }

  private mapImages = (obj: object): HotelImagesDto => {
    return {
      rooms: _.get(obj, 'images.rooms', []).map(
        (image: { url: string; description: string }) => ({
          link: image.url,
          description: image.description,
        }),
      ),
      site: [],
      amenities: _.get(obj, 'images.amenities', [])?.map(
        (image: { url: string; description: string }) => ({
          link: image.url,
          description: image.description,
        }),
      ),
    };
  };

  private mapLocation = (obj: object): HotelLocation => ({
    lat: _.get(obj, 'lat', 0),
    lng: _.get(obj, 'lng', 0),
    address: _.get(obj, 'address', ''),
    city: '',
    country: '',
  });

  private mapAmenities = (obj: object) => ({
    general: _.get(obj, 'amenities', []),
    room: [],
  });
}
