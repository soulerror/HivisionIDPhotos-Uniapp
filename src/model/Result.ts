import Method from "@/enums/Method";
//返回格式
export interface Result<T> {
  code?: number | null;
  data: T;
  message?: string | null;
  msg?: string | null;
}

//请求参数
export interface RequestOptions {
  method?: Method;
  data?: string | AnyObject | any;
  loading?: boolean;
  gateway?: string;
  headers?: AnyObject;
  remoteUrl?: string;
}
