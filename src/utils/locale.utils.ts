import { getCountryNameByAlpha2 } from 'country-locale-map';

export const getCountryName = (country: string = ''): string => {
  return country?.length == 2 ? getCountryNameByAlpha2(country) : country;
};
