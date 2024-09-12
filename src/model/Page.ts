/**
 * 分页对象
 */
export default interface Page<T> {
  totalPage?: number;
  total?: number;
  data: Array<T>;
  current?: number;
  size?: number;
}
