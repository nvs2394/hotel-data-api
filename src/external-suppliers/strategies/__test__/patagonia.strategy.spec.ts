import { HotelDto } from '../../../dto/hotel.dto';
import { PatagoniaSupplierStrategy } from '../patagonia.strategy';

describe('PatagoniaSupplierStrategy', () => {
  let strategy: PatagoniaSupplierStrategy;

  beforeEach(() => {
    strategy = new PatagoniaSupplierStrategy();
  });

  describe('getUrl', () => {
    it('should return the correct URL', () => {
      const expectedUrl =
        'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia';
      const url = strategy.getUrl();
      expect(url).toBe(expectedUrl);
    });
  });

  describe('mapToDto', () => {
    it('should map the response data to HotelDto', () => {
      const responseData = {
        id: 'iJhz',
        destination: 5432,
        name: 'Beach Villas Singapore',
        lat: 1.264751,
        lng: 103.824006,
        address: '8 Sentosa Gateway, Beach Villas, 098269',
        info: 'Located at the western tip of Resorts World Sentosa...',
        amenities: [
          'Aircon',
          'Tv',
          'Coffee machine',
          'Kettle',
          'Hair dryer',
          'Iron',
          'Tub',
        ],
        images: {
          rooms: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
              description: 'Double room',
            },
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg',
              description: 'Bathroom',
            },
          ],
          amenities: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg',
              description: 'RWS',
            },
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg',
              description: 'Sentosa Gateway',
            },
          ],
        },
      };

      const expectedDto: HotelDto = {
        id: 'iJhz',
        name: 'Beach Villas Singapore',
        location: {
          lat: 1.264751,
          lng: 103.824006,
          address: '8 Sentosa Gateway, Beach Villas, 098269',
          city: '',
          country: '',
        },
        amenities: {
          general: [
            'Aircon',
            'Tv',
            'Coffee machine',
            'Kettle',
            'Hair dryer',
            'Iron',
            'Tub',
          ],
          room: [],
        },
        images: {
          rooms: [
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
              description: 'Double room',
            },
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg',
              description: 'Bathroom',
            },
          ],
          site: [],
          amenities: [
            {
              description: 'RWS',
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg',
            },
            {
              description: 'Sentosa Gateway',
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg',
            },
          ],
        },
        destinationId: 5432,
        description: 'Located at the western tip of Resorts World Sentosa...',
        bookingConditions: [],
      };

      const dto = strategy.mapToDto([responseData]);
      expect(dto).toEqual([expectedDto]);
    });
  });
});
