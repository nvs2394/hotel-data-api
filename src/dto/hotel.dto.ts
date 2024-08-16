import { Expose } from 'class-transformer';

export class HotelLocation {
  @Expose()
  lat: number = 0;
  @Expose()
  lng: number = 0;
  @Expose()
  address: string = '';
  @Expose()
  city: string = '';
  @Expose()
  country: string = '';
}

export class HotelImageItemDto {
  @Expose()
  link: string = '';
  @Expose()
  description: string = '';
}

export class HotelImagesDto {
  @Expose()
  rooms: HotelImageItemDto[] = [];
  @Expose()
  site: HotelImageItemDto[] = [];
  @Expose()
  amenities: HotelImageItemDto[] = [];
}

export class HotelAmenitiesDto {
  @Expose()
  general: string[] = [];
  @Expose()
  room: string[] = [];
}

export class HotelDto {
  @Expose()
  id: string;
  @Expose()
  destinationId: number;
  @Expose()
  name: string;
  @Expose()
  location: HotelLocation = new HotelLocation();
  @Expose()
  description: string;
  @Expose()
  amenities: HotelAmenitiesDto = new HotelAmenitiesDto();
  @Expose()
  images: HotelImagesDto = new HotelImagesDto();
  @Expose()
  bookingConditions: string[] = [];
}
