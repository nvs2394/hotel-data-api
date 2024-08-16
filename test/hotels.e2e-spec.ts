import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  mockAcmeApiResponse,
  mockPaperfliesApiResponse,
  mockPatagoniaApiResponse,
} from './mock-data/external-supplier.mock';

describe('HotelController (e2e)', () => {
  let app: INestApplication;
  const mock = new MockAdapter(axios);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/hotels (GET)', () => {
    mock
      .onGet('https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme')
      .reply(200, mockAcmeApiResponse);
    mock
      .onGet('https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia')
      .reply(200, mockPatagoniaApiResponse);
    mock
      .onGet('https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies')
      .reply(200, mockPaperfliesApiResponse);

    const expectedResponse = [
      {
        location: {
          lat: 35.6926,
          lng: 139.690965,
          address: '160-0023, SHINJUKU-KU, 6-6-2 NISHI-SHINJUKU, JAPAN',
          city: 'Tokyo',
          country: 'Japan',
        },
        amenities: {
          general: [
            'Pool',
            'WiFi ',
            'BusinessCenter',
            'DryCleaning',
            ' Breakfast',
            'Bar',
            'BathTub',
          ],
          room: [],
        },
        images: {
          rooms: [
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i10_m.jpg',
              description: 'Suite',
            },
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i11_m.jpg',
              description: 'Suite - Living room',
            },
          ],
          site: [],
          amenities: [
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i57_m.jpg',
              description: 'Bar',
            },
          ],
        },
        bookingConditions: [],
        id: 'f8c9',
        destinationId: 1122,
        name: 'Hilton Shinjuku Tokyo',
        description:
          "Hilton Tokyo is located in Shinjuku, the heart of Tokyo's business, shopping and entertainment district, and is an ideal place to experience modern Japan. A complimentary shuttle operates between the hotel and Shinjuku station and the Tokyo Metro subway is connected to the hotel. Relax in one of the modern Japanese-style rooms and admire stunning city views. The hotel offers WiFi and internet access throughout all rooms and public space.",
      },
      {
        location: {
          lat: 0,
          lng: 0,
          address: '8 Sentosa Gateway, Beach Villas, 098269',
          country: 'Singapore',
        },
        amenities: {
          general: [
            'outdoor pool',
            'indoor pool',
            'business center',
            'childcare',
          ],
          room: ['tv', 'coffee machine', 'kettle', 'hair dryer', 'iron'],
        },
        images: {
          rooms: [
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
              description: 'Double room',
            },
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg',
              description: 'Double room',
            },
          ],
          site: [
            {
              link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg',
              description: 'Front',
            },
          ],
          amenities: [],
        },
        bookingConditions: [
          "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
          'Pets are not allowed.',
          'WiFi is available in all areas and is free of charge.',
          'Free private parking is possible on site (reservation is not needed).',
          "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
        ],
        id: 5432,
        destinationId: 5432,
        name: 'Beach Villas Singapore',
        description:
          "Surrounded by tropical gardens, these upscale villas in elegant Colonial-style buildings are part of the Resorts World Sentosa complex and a 2-minute walk from the Waterfront train station. Featuring sundecks and pool, garden or sea views, the plush 1- to 3-bedroom villas offer free Wi-Fi and flat-screens, as well as free-standing baths, minibars, and tea and coffeemaking facilities. Upgraded villas add private pools, fridges and microwaves; some have wine cellars. A 4-bedroom unit offers a kitchen and a living room. There's 24-hour room and butler service. Amenities include posh restaurant, plus an outdoor pool, a hot tub, and free parking.",
      },
    ];
    return request(app.getHttpServer())
      .get('/v1/hotels')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
