import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { BrandType, DeviceType, TypeType } from '../types/types';

export interface DevicesState {
  types: TypeType[];
  selectedType: TypeType | undefined;
  brands: BrandType[];
  selectedBrand: BrandType | undefined;
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
    { id: '4', name: 'Lenovo' },
  ],
  devices: [
    {
      id: '1',
      name: 'IPhone7-Plus',
      price: '55000',
      img: 'https://media.istockphoto.com/photos/iphone-7-picture-id1266445027?k=20&m=1266445027&s=612x612&w=0&h=fmO4VI3w_FXH3epKjgWjpep_Or_kCCTxMg_fAoz1GBQ=',
      rating: '5',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '2',
      name: 'IPhone12',
      price: '120000',
      img: 'https://media.istockphoto.com/photos/iphone-12-pro-max-graphite-picture-id1308589817?k=20&m=1308589817&s=612x612&w=0&h=EKrChl-1-cc0Ygdts-i2T14-lXMqIgsdtEOBmcMZHAM=',
      rating: '4',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '3',
      name: 'IPhone5',
      price: '25000',
      img: 'https://media.istockphoto.com/photos/brand-new-iphone-12-pro-max-with-iphone-6s-plus-and-iphone-5-stacked-picture-id1286249958?k=20&m=1286249958&s=612x612&w=0&h=tiWApQPrU_2Yrrt_bpSxIPF5CfiPoj2jzTacqVHKZgs=',
      rating: '3',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '4',
      name: 'Samsung Holodilnik',
      price: '125000',
      img: 'https://media.istockphoto.com/photos/fridge-freezer-side-by-side-stainless-steel-refrigerator-with-ice-and-picture-id940975782?k=20&m=940975782&s=612x612&w=0&h=Q5c6kAKt2u5rgq1q9KYwqcGCnli15Jak2K7EH08QIjw=',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '5',
      name: 'Samsung ESHO Holodilnik',
      price: '525080',
      img: 'https://media.istockphoto.com/vectors/fridge-realistic-open-and-closed-home-refrigerator-empty-freezer-for-vector-id1205260654?k=20&m=1205260654&s=612x612&w=0&h=pVDZLcyiuHYpqYdT7hoc-fXftMk4wDTggo8tW727UqE=',
      rating: '0',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '6',
      name: 'Samsung ESHO Holodilnik 8',
      price: '525080',
      img: 'https://media.istockphoto.com/photos/household-refrigerator-on-a-white-background-picture-id959967124?k=20&m=959967124&s=612x612&w=0&h=OxPSxP_llquVqchbcWXIuz-c1YO-1ZenOoY7aePPhLc=',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '7',
      name: 'TV Rubin',
      price: '90999',
      img: 'https://media.istockphoto.com/photos/vintage-television-picture-id96203609?k=20&m=96203609&s=612x612&w=0&h=A-j1Sb_CyWjb2BRb2ZnzmNjvuOwiYcUtlF_QXbC_mh4=',
      rating: '5',
      typeId: '3',
      brandId: '3',
    },
    {
      id: '8',
      name: 'Samsung TV',
      price: '33555',
      img: 'https://media.istockphoto.com/photos/flat-screen-lcd-or-oled-plasma-realistic-illustration-black-blank-hd-picture-id1208777082?k=20&m=1208777082&s=612x612&w=0&h=AiBoX216VYFuIWfmBR01Xv99nJhhx0mduFEIjaEEyDM=',
      rating: '5',
      typeId: '3',
      brandId: '2',
    },
    {
      id: '11',
      name: 'IPhone7-Plus',
      price: '55000',
      img: 'https://media.istockphoto.com/photos/iphone-7-picture-id1266445027?k=20&m=1266445027&s=612x612&w=0&h=fmO4VI3w_FXH3epKjgWjpep_Or_kCCTxMg_fAoz1GBQ=',
      rating: '5',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '12',
      name: 'IPhone12',
      price: '120000',
      img: 'https://media.istockphoto.com/photos/iphone-12-pro-max-graphite-picture-id1308589817?k=20&m=1308589817&s=612x612&w=0&h=EKrChl-1-cc0Ygdts-i2T14-lXMqIgsdtEOBmcMZHAM=',
      rating: '4',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '13',
      name: 'IPhone5',
      price: '25000',
      img: 'https://media.istockphoto.com/photos/brand-new-iphone-12-pro-max-with-iphone-6s-plus-and-iphone-5-stacked-picture-id1286249958?k=20&m=1286249958&s=612x612&w=0&h=tiWApQPrU_2Yrrt_bpSxIPF5CfiPoj2jzTacqVHKZgs=',
      rating: '3',
      typeId: '1',
      brandId: '1',
    },
    {
      id: '14',
      name: 'Samsung Holodilnik',
      price: '125000',
      img: 'https://media.istockphoto.com/photos/fridge-freezer-side-by-side-stainless-steel-refrigerator-with-ice-and-picture-id940975782?k=20&m=940975782&s=612x612&w=0&h=Q5c6kAKt2u5rgq1q9KYwqcGCnli15Jak2K7EH08QIjw=',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '15',
      name: 'Samsung ESHO Holodilnik',
      price: '525080',
      img: 'https://media.istockphoto.com/vectors/fridge-realistic-open-and-closed-home-refrigerator-empty-freezer-for-vector-id1205260654?k=20&m=1205260654&s=612x612&w=0&h=pVDZLcyiuHYpqYdT7hoc-fXftMk4wDTggo8tW727UqE=',
      rating: '0',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '16',
      name: 'Samsung ESHO Holodilnik 8',
      price: '525080',
      img: 'https://media.istockphoto.com/photos/household-refrigerator-on-a-white-background-picture-id959967124?k=20&m=959967124&s=612x612&w=0&h=OxPSxP_llquVqchbcWXIuz-c1YO-1ZenOoY7aePPhLc=',
      rating: '3',
      typeId: '2',
      brandId: '2',
    },
    {
      id: '17',
      name: 'TV Rubin',
      price: '90999',
      img: 'https://media.istockphoto.com/photos/vintage-television-picture-id96203609?k=20&m=96203609&s=612x612&w=0&h=A-j1Sb_CyWjb2BRb2ZnzmNjvuOwiYcUtlF_QXbC_mh4=',
      rating: '5',
      typeId: '3',
      brandId: '3',
    },
    {
      id: '18',
      name: 'Samsung TV',
      price: '33555',
      img: 'https://media.istockphoto.com/photos/flat-screen-lcd-or-oled-plasma-realistic-illustration-black-blank-hd-picture-id1208777082?k=20&m=1208777082&s=612x612&w=0&h=AiBoX216VYFuIWfmBR01Xv99nJhhx0mduFEIjaEEyDM=',
      rating: '5',
      typeId: '3',
      brandId: '2',
    },
  ],
  selectedType: undefined,
  selectedBrand: undefined,
};

export const devicesSlice = createSlice({
  name: 'devicesSlice',
  initialState,
  reducers: {
    setSelectedType: (state, action: PayloadAction<TypeType>) => {
      if (state.selectedType && state.selectedType.id === action.payload.id) {
        state.selectedType = undefined;
      } else {
        state.selectedType = action.payload;
      }
    },
    setSelectedBrand: (state, action: PayloadAction<BrandType>) => {
      if (state.selectedBrand && state.selectedBrand.id === action.payload.id) {
        state.selectedBrand = undefined;
      } else {
        state.selectedBrand = action.payload;
      }
    },
  },
});

export const { setSelectedType, setSelectedBrand } = devicesSlice.actions;

export const selectorTypes = (state: RootState) => state.devices.types;
export const selectorSelectedType = (state: RootState) => state.devices.selectedType;
export const selectorBrands = (state: RootState) => state.devices.brands;
export const selectorSelectedBrand = (state: RootState) => state.devices.selectedBrand;
export const selectorDevices = (state: RootState) => state.devices.devices;

export default devicesSlice.reducer;
