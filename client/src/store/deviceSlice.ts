import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { BrandType, DeviceType, TypeType } from '../types/types';
import {
  GetDeviceBrands,
  GetDeviceByIDServerType,
  GetDevicesServerType,
  GetDeviceTypes,
  ParamsForGetDevicesServerType,
} from '../api/serverTypes';
import { serverApi } from '../api/serverApi';
import { AxiosError } from 'axios';
import { showError } from './errorHelper';

export interface DevicesState {
  types: TypeType[];
  selectedType: TypeType | undefined;
  brands: BrandType[];
  selectedBrand: BrandType | undefined;
  devices: DeviceType[];
  selectedDevice: DeviceType | undefined;
  isLoading: boolean;
}

const initialState: DevicesState = {
  types: [],
  brands: [],
  devices: [],
  selectedType: undefined,
  selectedBrand: undefined,
  selectedDevice: undefined,
  isLoading: false,
};

export const getDevicesTapesThunk = createAsyncThunk<GetDeviceTypes, undefined, { rejectValue: string }>(
  'deviceSlice/getDevicesTapesThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getDeviceTypes();
    } catch (e) {
      return rejectWithValue('Get Device Tapes Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const addNewDeviceTapeThunk = createAsyncThunk<GetDeviceTypes, string, { rejectValue: string }>(
  'deviceSlice/addNewDeviceTapesThunk',
  async (name, { rejectWithValue }) => {
    try {
      await serverApi.addNewDeviceType(name);
      return await serverApi.getDeviceTypes();
    } catch (e) {
      return rejectWithValue('Add Device Tapes Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const deleteDeviceTapeThunk = createAsyncThunk<GetDeviceTypes, string, { rejectValue: string }>(
  'deviceSlice/deleteDeviceTapesThunk',
  async (id, { rejectWithValue }) => {
    try {
      await serverApi.deleteDeviceType(id);
      return await serverApi.getDeviceTypes();
    } catch (e) {
      return rejectWithValue('Delete Device Tapes Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const getDevicesBrandsThunk = createAsyncThunk<GetDeviceBrands, undefined, { rejectValue: string }>(
  'deviceSlice/getDevicesBrandsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getDeviceBrands();
    } catch (e) {
      console.log('error =', e);
      return rejectWithValue('Get Device Brands Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const addNewDeviceBrandThunk = createAsyncThunk<GetDeviceBrands, string, { rejectValue: string }>(
  'deviceSlice/addNewDeviceBrandsThunk',
  async (name, { rejectWithValue }) => {
    try {
      await serverApi.addNewDeviceBrand(name);
      return await serverApi.getDeviceBrands();
    } catch (e) {
      return rejectWithValue('Add Device Brands Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const deleteDeviceBrandThunk = createAsyncThunk<GetDeviceBrands, string, { rejectValue: string }>(
  'deviceSlice/deleteDeviceBrandsThunk',
  async (id, { rejectWithValue }) => {
    try {
      await serverApi.deleteDeviceBrand(id);
      return await serverApi.getDeviceBrands();
    } catch (e) {
      return rejectWithValue('Delete Device Brands Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const getDevicesThunk = createAsyncThunk<
  GetDevicesServerType,
  ParamsForGetDevicesServerType,
  { rejectValue: string }
>('deviceSlice/getDevicesThunk', async (params, { rejectWithValue }) => {
  try {
    return await serverApi.getDevices(params);
  } catch (e) {
    return rejectWithValue('Get Devices Error\n' + JSON.stringify((e as AxiosError).response?.data));
  }
});

export const getDeviceByIdThunk = createAsyncThunk<GetDeviceByIDServerType, string, { rejectValue: string }>(
  'deviceSlice/getDeviceByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      return await serverApi.getDeviceById(id);
    } catch (e) {
      return rejectWithValue('Get Device by Id Error\n' + JSON.stringify((e as AxiosError).response?.data));
    }
  }
);

export const deleteDeviceByIdThunk = createAsyncThunk<
  GetDevicesServerType,
  { id: string; params: ParamsForGetDevicesServerType },
  { rejectValue: string }
>('deviceSlice/deleteDeviceByIdThunk', async ({ id, params }, { rejectWithValue }) => {
  console.log(id, params);
  try {
    await serverApi.deleteDevice(id);
    return await serverApi.getDevices(params);
  } catch (e) {
    return rejectWithValue('Delete Device Error\n' + JSON.stringify((e as AxiosError).response?.data));
  }
});

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
    resetSelectedDevice: (state) => {
      state.selectedDevice = undefined;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDeviceByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDevice = { ...action.payload, img: process.env.REACT_APP_BASE_URL + '/' + action.payload.img };
      })
      .addMatcher(isAnyOf(getDevicesThunk.fulfilled, deleteDeviceByIdThunk.fulfilled), (state, action) => {
        state.isLoading = false;
        state.devices = action.payload.rows.map((item) => {
          return { ...item, img: process.env.REACT_APP_BASE_URL + '/' + item.img };
        });
      })
      .addMatcher(
        isAnyOf(getDevicesTapesThunk.fulfilled, addNewDeviceTapeThunk.fulfilled, deleteDeviceTapeThunk.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.types = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(getDevicesBrandsThunk.fulfilled, addNewDeviceBrandThunk.fulfilled, deleteDeviceBrandThunk.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.brands = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getDevicesTapesThunk.pending,
          addNewDeviceTapeThunk.pending,
          deleteDeviceTapeThunk.pending,
          getDevicesBrandsThunk.pending,
          addNewDeviceBrandThunk.pending,
          deleteDeviceBrandThunk.pending,
          getDevicesThunk.pending,
          getDeviceByIdThunk.pending,
          deleteDeviceByIdThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getDevicesTapesThunk.rejected,
          addNewDeviceTapeThunk.rejected,
          deleteDeviceTapeThunk.rejected,
          getDevicesBrandsThunk.rejected,
          addNewDeviceBrandThunk.rejected,
          deleteDeviceBrandThunk.rejected,
          getDevicesThunk.rejected,
          getDeviceByIdThunk.rejected,
          deleteDeviceByIdThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          showError(action.payload);
        }
      );
  },
});

export const { setSelectedType, setSelectedBrand, resetSelectedDevice } = devicesSlice.actions;

export const selectorTypes = (state: RootState) => state.devices.types;
export const selectorSelectedType = (state: RootState) => state.devices.selectedType;
export const selectorBrands = (state: RootState) => state.devices.brands;
export const selectorSelectedBrand = (state: RootState) => state.devices.selectedBrand;
export const selectorDevices = (state: RootState) => state.devices.devices;
export const selectorSelectedDevice = (state: RootState) => state.devices.selectedDevice;

export default devicesSlice.reducer;
