export interface BasicRes<T> {
  code: number;
  msg: string;
  content: T;
}