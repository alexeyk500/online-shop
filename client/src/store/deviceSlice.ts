import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { BrandType, DeviceType, TypeType } from '../types/types';

export interface DevicesState {
  types: TypeType[];
  brands: BrandType[];
  devices: DeviceType[];
}

const initialState: DevicesState = {
  types: [
    { id: '1', name: 'Телефоны' },
    { id: '2', name: 'Холодильники' },
    { id: '3', name: 'Телевизоры' },
  ],
  brands: [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Samsung' },
    { id: '3', name: 'Рубин' },
  ],
  devices: [
    {
      id: '1',
      name: 'IPhone7-Plus',
      price: '55000',
      img: 'https://www.google.com/search?q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8+iphone+7+plus&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi_uvONpv33AhWVvIsKHedACgQQ_AUoAXoECAEQAw&biw=2048&bih=1041&dpr=2#imgrc=wkty_uXE9AugeM',
      rating: '5',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '2',
      name: 'IPhone12',
      price: '120000',
      img: 'https://www.google.com/search?q=Iphone+12&hl=ru&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiKsonppv33AhXWgSoKHZ_PA1wQ_AUoAnoECAEQBA&biw=2048&bih=1041&dpr=2#imgrc=BZvA4EbmS9_JQM',
      rating: '4',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '3',
      name: 'IPhone5',
      price: '25000',
      img: 'https://www.google.com/search?q=Iphone+5&tbm=isch&ved=2ahUKEwivmPXppv33AhVqxosKHdgtAEAQ2-cCegQIABAA&oq=Iphone+5&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgAELEDEEM6BAgAEEM6CAgAELEDEIMBUI4JWNwRYKYWaABwAHgAgAEriAGjAZIBATSYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=34SPYu-sJuqMrwTY24CABA&bih=1041&biw=2048&hl=ru#imgrc=y1sglYolRE0kpM',
      rating: '3',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '4',
      name: 'Samsung Holodilnik',
      price: '125000',
      img: 'https://www.google.com/search?q=Samsung+refrigerator&tbm=isch&ved=2ahUKEwiE9quDp_33AhVTtSoKHRfHAFAQ2-cCegQIABAA&oq=Samsung+refrigerator&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeOgcIABCxAxBDOggIABCABBCxAzoECAAQQzoGCAAQHhAFOgYIABAeEAhQ2BBYqHVg9XloBXAAeACAATqIAaIJkgECMjaYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=FIWPYoScOtPqqgGXjoOABQ&bih=1041&biw=2048&hl=ru#imgrc=3IZiluZVyQ2QSM',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '5',
      name: 'Samsung ESHO Holodilnik',
      price: '525080',
      img: 'https://www.google.com/search?q=Samsung+refrigerator&tbm=isch&ved=2ahUKEwiE9quDp_33AhVTtSoKHRfHAFAQ2-cCegQIABAA&oq=Samsung+refrigerator&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeOgcIABCxAxBDOggIABCABBCxAzoECAAQQzoGCAAQHhAFOgYIABAeEAhQ2BBYqHVg9XloBXAAeACAATqIAaIJkgECMjaYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=FIWPYoScOtPqqgGXjoOABQ&bih=1041&biw=2048&hl=ru#imgrc=QKxWApmWKjKkCM',
      rating: '0',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '6',
      name: 'Samsung ESHO Holodilnik 8',
      price: '525080',
      img: 'https://www.google.com/search?q=Samsung+refrigerator&tbm=isch&ved=2ahUKEwiE9quDp_33AhVTtSoKHRfHAFAQ2-cCegQIABAA&oq=Samsung+refrigerator&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeMgQIABAeOgcIABCxAxBDOggIABCABBCxAzoECAAQQzoGCAAQHhAFOgYIABAeEAhQ2BBYqHVg9XloBXAAeACAATqIAaIJkgECMjaYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=FIWPYoScOtPqqgGXjoOABQ&bih=1041&biw=2048&hl=ru#imgrc=r49I-q8oJxxuQM',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '7',
      name: 'TV Rubin',
      price: '90999',
      img: 'https://www.google.com/search?q=Samsung+%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80+%D1%80%D1%83%D0%B1%D0%B8%D0%BD&tbm=isch&ved=2ahUKEwjAneOYqP33AhUyposKHeLrBjoQ2-cCegQIABAA&oq=Samsung+%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80+%D1%80%D1%83%D0%B1%D0%B8%D0%BD&gs_lcp=CgNpbWcQAzoFCAAQgAQ6BAgAEBhQ4yBYzEJg70JoAHAAeACAATGIAesEkgECMTWYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=ToaPYsC-FLLMrgTi15vQAw&bih=1041&biw=2048&hl=ru#imgrc=Mw-5MNRH25OE6M',
      rating: '5',
      typeId: '3',
      brandId: '3',
    },
    {
      id: '8',
      name: 'Samsung TV',
      price: '33555',
      img: 'https://www.google.com/search?q=Samsung+%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80+&tbm=isch&ved=2ahUKEwitkcqeqP33AhUNjosKHcGVC04Q2-cCegQIABAA&oq=Samsung+%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80+&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgARQuRJYuRJggBdoAHAAeACAASqIAUmSAQEymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=WoaPYq38Ho2crgTBq67wBA&bih=1041&biw=2048&hl=ru#imgrc=xxZ_XWU78HssCM',
      rating: '5',
      typeId: '3',
      brandId: '2',
    },
  ],
};

export const devicesSlice = createSlice({
  name: 'devicesSlice',
  initialState,
  reducers: {},
});

export const selectorTypes = (state: RootState) => state.devices.types;
export const selectorBrands = (state: RootState) => state.devices.brands;
export const selectorDevices = (state: RootState) => state.devices.devices;

export default devicesSlice.reducer;
