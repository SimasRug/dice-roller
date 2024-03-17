import { DieSides } from './types';

export interface Die {
  id: number;
  sides: DieSides;
  value: number;
}
