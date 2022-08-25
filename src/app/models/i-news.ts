import { IArtical } from './i-artical';

export interface INews {
  status: string;
  totalResults: number;
  articles: IArtical[];
}
