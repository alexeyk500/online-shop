import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserType } from '../types/types';

type ParamsType = {
  [key: string]: string | undefined;
};

export const makeQueries = (params: ParamsType) => {
  let queries = '';
  const entries = Object.entries(params);
  if (!entries) {
    return queries;
  }
  for (const [query, value] of entries) {
    if (value) {
      queries += `&${query}=${value}`;
    }
  }
  queries = '?' + queries.slice(1);
  return queries;
};

interface ITokenJwtPayload extends Partial<JwtPayload> {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): UserType | undefined => {
  const { email, role, exp } = jwtDecode<ITokenJwtPayload>(token);
  if (Date.now() < exp * 1000) {
    return { email, role };
  }
  return undefined;
};
