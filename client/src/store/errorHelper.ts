import { AnyAction } from '@reduxjs/toolkit';

export const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const showError = (errorMessage: string) => {
  alert(errorMessage);
};
