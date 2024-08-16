import { AcmeSupplierStrategy } from '../acme.strategy';
import { HotelDto } from '../../../dto/hotel.dto';

describe('AcmeSupplierStrategy', () => {
  let strategy: AcmeSupplierStrategy;

  beforeEach(() => {
    strategy = new AcmeSupplierStrategy();
  });

  describe('getUrl', () => {
    it('should return the correct URL', () => {
      const expectedUrl =
        'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme';
      const url = strategy.getUrl();
      expect(url).toEqual(expectedUrl);
    });
  });

  describe('mapToDto', () => {
    it('should map the data to HotelDto array', () => {
      const data = [
        {
          Id: 'iJhz',
          DestinationId: 5432,
          Name: 'Beach Villas Singapore',
          Latitude: 1.264751,
          Longitude: 103.824006,
          Address: ' 8 Sentosa Gateway, Beach Villas ',
          City: 'Singapore',
          Country: 'SG',
          PostalCode: '098269',
          Description:
            '  This 5 star hotel is located on the coastline of Singapore.',
          Facilities: [
            'Pool',
            'BusinessCenter',
            'WiFi ',
            'DryCleaning',
            ' Breakfast',
          ],
        },
      ];

      const expectedDto: HotelDto[] = [
        {
          id: 'iJhz',
          destinationId: 5432,
          name: 'Beach Villas Singapore',
          description:
            '  This 5 star hotel is located on the coastline of Singapore.',
          location: {
            lat: 1.264751,
            lng: 103.824006,
            address: ' 8 Sentosa Gateway, Beach Villas ',
            city: 'Singapore',
            country: 'Singapore',
          },
          amenities: {
            general: [
              'Pool',
              'BusinessCenter',
              'WiFi ',
              'DryCleaning',
              ' Breakfast',
            ],
            room: [],
          },
          images: {
            rooms: [],
            site: [],
            amenities: [],
          },
          bookingConditions: [],
        },
      ];

      const dto = strategy.mapToDto(data);
      expect(dto).toEqual(expectedDto);
    });
  });
});
