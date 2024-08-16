import {
  mergeHotelLocation,
  mergeAmenities,
  mergeImages,
  mergeBookingConditions,
  mergeMixedFields,
  mergeSupplierData,
} from '../hotels.utils';
import { HotelDto } from '../../dto/hotel.dto';

describe('Hotel Merge Utils', () => {
  let existingHotel: HotelDto;
  let newHotel: HotelDto;

  beforeEach(() => {
    existingHotel = {
      id: '1',
      destinationId: 101,
      name: 'Hotel One',
      description: 'Nice place to stay',
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: 'Old Address',
        city: 'Old City',
        country: 'Old Country',
      },
      amenities: {
        general: ['Wi-Fi', 'Parking'],
        room: ['Air Conditioning', 'TV'],
      },
      images: {
        rooms: [{ link: 'room1.jpg', description: 'Room 1' }],
        site: [{ link: 'site1.jpg', description: 'Site 1' }],
        amenities: [{ link: 'amenity1.jpg', description: 'Amenity 1' }],
      },
      bookingConditions: ['No pets allowed'],
    };

    newHotel = {
      id: '1',
      destinationId: 101,
      name: 'Hotel One Updated',
      description: 'Even nicer place to stay',
      location: {
        lat: 40.713,
        lng: -74.0059,
        address: 'New Address',
        city: 'New City',
        country: 'New Country',
      },
      amenities: {
        general: ['Wi-Fi', 'Swimming Pool'],
        room: ['Air Conditioning', 'Mini Bar'],
      },
      images: {
        rooms: [{ link: 'room2.jpg', description: 'Room 2' }],
        site: [{ link: 'site2.jpg', description: 'Site 2' }],
        amenities: [{ link: 'amenity2.jpg', description: 'Amenity 2' }],
      },
      bookingConditions: ['Late checkout available'],
    };
  });

  it('should merge hotel location correctly', () => {
    mergeHotelLocation(existingHotel, newHotel);
    expect(existingHotel.location).toEqual({
      lat: 40.713,
      lng: -74.0059,
      address: 'New Address',
      city: 'New City',
      country: 'New Country',
    });
  });

  it('should merge hotel amenities correctly', () => {
    mergeAmenities(existingHotel, newHotel);
    expect(existingHotel.amenities.general).toEqual([
      'Wi-Fi',
      'Parking',
      'Swimming Pool',
    ]);
    expect(existingHotel.amenities.room).toEqual([
      'Air Conditioning',
      'TV',
      'Mini Bar',
    ]);
  });

  it('should merge hotel images correctly', () => {
    mergeImages(existingHotel, newHotel);
    expect(existingHotel.images.rooms).toEqual([
      { link: 'room1.jpg', description: 'Room 1' },
      { link: 'room2.jpg', description: 'Room 2' },
    ]);
    expect(existingHotel.images.site).toEqual([
      { link: 'site1.jpg', description: 'Site 1' },
      { link: 'site2.jpg', description: 'Site 2' },
    ]);
    expect(existingHotel.images.amenities).toEqual([
      { link: 'amenity1.jpg', description: 'Amenity 1' },
      { link: 'amenity2.jpg', description: 'Amenity 2' },
    ]);
  });

  it('should merge hotel booking conditions correctly', () => {
    mergeBookingConditions(existingHotel, newHotel);
    expect(existingHotel.bookingConditions).toEqual([
      'No pets allowed',
      'Late checkout available',
    ]);
  });

  it('should merge mixed fields correctly', () => {
    mergeMixedFields(existingHotel, newHotel);
    expect(existingHotel.name).toBe('Hotel One Updated');
    expect(existingHotel.description).toBe('Even nicer place to stay');
  });

  it('should merge supplier data correctly', () => {
    const hotels = [existingHotel, newHotel];
    const mergedHotels = mergeSupplierData(hotels);

    expect(mergedHotels.length).toBe(1);
    expect(mergedHotels[0].name).toBe('Hotel One Updated');
    expect(mergedHotels[0].description).toBe('Even nicer place to stay');
    expect(mergedHotels[0].location.address).toBe('New Address');
  });
});
