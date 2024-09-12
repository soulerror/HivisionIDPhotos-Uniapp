import { uploadFile } from "@/utils/request";
import Method from "@/enums/Method";

/**
 * 生成证件照
 * @param data 表单数据
 * @returns 结果
 */
export const GeneratePhoto = (data: any): Promise<any> => {
  return uploadFile('/idphoto', { data, method: Method.POST })
}