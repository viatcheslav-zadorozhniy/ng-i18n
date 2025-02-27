import { BaseEntity } from '../base-entity';

export type User = BaseEntity & {
  age: number;
  email: string;
};
