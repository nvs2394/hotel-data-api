import { HotelDto, HotelImageItemDto } from '../dto/hotel.dto';

export const mergeExistingHotel = (
  hotelMap: Map<string, HotelDto>,
  newHotel: HotelDto,
): void => {
  const existingHotel = hotelMap.get(newHotel.id);

  if (!existingHotel) return;

  mergeHotelLocation(existingHotel, newHotel);
  mergeAmenities(existingHotel, newHotel);
  mergeImages(existingHotel, newHotel);
  mergeBookingConditions(existingHotel, newHotel);
  mergeMixedFields(existingHotel, newHotel);
};

export const mergeHotelLocation = (
  existingHotel: HotelDto,
  newHotel: HotelDto,
): void => {
  const { location: existingLocation } = existingHotel;
  const { location: newLocation } = newHotel;

  existingHotel.location = {
    lat: newLocation.lat ?? existingLocation.lat,
    lng: newLocation.lng ?? existingLocation.lng,
    address: newLocation.address ?? existingLocation.address,
    city: newLocation.city !== '' ? newLocation.city : existingLocation.city,
    country:
      newLocation.country !== ''
        ? newLocation.country
        : existingLocation.country,
  };
};

export const mergeAmenities = (
  existingHotel: HotelDto,
  newHotel: HotelDto,
): void => {
  existingHotel.amenities.general = Array.from(
    new Set([
      ...existingHotel.amenities.general,
      ...newHotel.amenities.general,
    ]),
  );

  existingHotel.amenities.room = Array.from(
    new Set([...existingHotel.amenities.room, ...newHotel.amenities.room]),
  );
};

export const mergeImages = (
  existingHotel: HotelDto,
  newHotel: HotelDto,
): void => {
  existingHotel.images.rooms = mergeImageArrays(
    existingHotel.images.rooms,
    newHotel.images.rooms,
  );
  existingHotel.images.site = mergeImageArrays(
    existingHotel.images.site,
    newHotel.images.site,
  );
  existingHotel.images.amenities = mergeImageArrays(
    existingHotel.images.amenities,
    newHotel.images.amenities,
  );
};

export const mergeImageArrays = (
  existingImages: HotelImageItemDto[],
  newImages: HotelImageItemDto[],
): HotelImageItemDto[] => {
  const imageMap = new Map<string, HotelImageItemDto>();

  existingImages?.forEach((image) => imageMap.set(image.link, image));
  newImages?.forEach((image) => {
    if (!imageMap.has(image.link)) {
      imageMap.set(image.link, image);
    }
  });

  return Array.from(imageMap.values());
};

export const mergeBookingConditions = (
  existingHotel: HotelDto,
  newHotel: HotelDto,
): void => {
  existingHotel.bookingConditions = Array.from(
    new Set([
      ...existingHotel.bookingConditions,
      ...newHotel.bookingConditions,
    ]),
  );
};

const getLongestString = (newString: string, existingString: string) => {
  return newString?.length > existingString?.length
    ? newString
    : existingString;
};

export const mergeMixedFields = (
  existingHotel: HotelDto,
  newHotel: HotelDto,
): void => {
  existingHotel.name = getLongestString(newHotel.name, existingHotel.name);
  existingHotel.description = getLongestString(
    newHotel.description,
    existingHotel.description,
  );
};

export const mergeSupplierData = (data: HotelDto[]): HotelDto[] => {
  const hotelMap = new Map<string, HotelDto>();

  data.forEach((hotel) => {
    if (!hotelMap.has(hotel.id)) {
      hotelMap.set(hotel.id, hotel);
    } else {
      mergeExistingHotel(hotelMap, hotel);
    }
  });

  return Array.from(hotelMap.values());
};
