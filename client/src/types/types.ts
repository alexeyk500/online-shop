export type TypeType = {
  id: string;
  name: string;
};

export type BrandType = {
  id: string;
  name: string;
};

export type DeviceType = {
  id: string;
  name: string | undefined;
  price: string;
  img: string | undefined;
  rating: string;
  typeId: string | undefined;
  brandId: string | undefined;
};
