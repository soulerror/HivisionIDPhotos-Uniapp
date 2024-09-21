/**
 * 照片配置
 */
export interface PhotoConfig {}

/**
 * 图片地址
 */
export interface PhotoPath {
  //base64 透明图
  base64: string;
  //base64 高清透明图
  base64HD: string;
  //base64 透明图地址
  base64Path: string;
  //base64 高清透明图地址
  base64HDPath: string;
}
