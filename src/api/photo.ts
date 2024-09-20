import request, { uploadFile } from "@/utils/request";
import Method from "@/enums/Method";

/**
 * 生成证件照
 * @param data 表单数据
 * @returns 结果
 */
export const GeneratePhoto = (data: any, name: string, path: string): Promise<any> => {
  return uploadFile('/idphoto', name, path, { data, method: Method.POST })
}


/**
 * 证件照规格Api
 * @returns 
 */
export const GetPhotoSize = (): Promise<any> => {
  return request("/item/list", {
    data: { key: "nMBnm_L2MxdXN-UIApF11tNExznpE82b" },
    method: Method.POST, remoteUrl: "https://api.zheyings.cn",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  },
  )
}
/**
 * 添加背景色
 * @returns 
 */
export const AddBackgroudColor = (data: any, name: string, path: string): Promise<any> => {
  return uploadFile('/add_background', name, path, { data, method: Method.POST })
}


/**
 * 生成六寸排版照
 * @returns 
 */
export const GenerateLayoutPhoto = (data: any, name: string, path: string): Promise<any> => {
  return uploadFile('/generate_layout_photos', name, path, { data, method: Method.POST })
}
