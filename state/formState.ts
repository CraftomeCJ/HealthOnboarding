import { atom } from 'recoil';
import { FormData } from '../types/type';

export const formState = atom<FormData>({
  key: 'formState',
  default: {},
});