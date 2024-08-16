import { plainToInstance } from 'class-transformer';
import { SupplierStrategy } from './external-supplier.strategies';
import { HotelDto, HotelLocation } from '../../dto/hotel.dto';
import * as _ from 'lodash';
import { getCountryName } from '../../utils/locale.utils';

export class AcmeSupplierStrategy implements SupplierStrategy {
  getUrl(): string {
    return 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme';
  }
  mapToDto(data: object[]): HotelDto[] {
    return data.map((obj) =>
      plainToInstance(
        HotelDto,
        {
          id: _.get(obj, 'Id'),
          destinationId: _.get(obj, 'DestinationId'),
          name: _.get(obj, 'Name'),
          description: _.get(obj, 'Description'),
          location: this.mapLocation(obj),
          amenities: this.mapAmenities(obj),
          images: {
            rooms: [],
            site: [],
            amenities: [],
          },
          bookingConditions: [],
        } as HotelDto,
        { excludeExtraneousValues: true },
      ),
    );
  }

  private mapLocation = (obj: object): HotelLocation => ({
    lat: _.get(obj, 'Latitude', 0) || 0,
    lng: _.get(obj, 'Longitude', 0) || 0,
    address: _.get(obj, 'Address', ''),
    city: _.get(obj, 'City', ''),
    country: getCountryName(_.get(obj, 'Country', '')),
  });

  private mapAmenities = (obj: object) => ({
    general: _.get(obj, 'Facilities', []),
    room: [],
  });
}
