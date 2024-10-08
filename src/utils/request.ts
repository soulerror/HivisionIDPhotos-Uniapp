import { baseUrl } from "@/config";
import Method from "@/enums/Method";
import { Result, RequestOptions } from "@/model/Result";

// 默认请求头
const header = { "Content-Type": "application/json; charset=UTF-8" };

// 默认超时时间
const timeout = 10000;

const request = <T>(
  url: string,
  options: RequestOptions = { method: Method.GET }
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const { method, data, gateway, loading, headers, remoteUrl } = options;
    const tokenStr = "test";
    const token =
      tokenStr && tokenStr.length > 0 ? { Authorization: tokenStr } : {};
    const targetHeader = headers ? headers : header;
    //远端地址 如果没有特殊指明  就用baseUrl
    const targetUrl = remoteUrl ? remoteUrl : baseUrl;
    //加载动画
    loading && uni.showLoading();
    uni.request({
      url: gateway ? targetUrl + gateway + url : targetUrl + url,
      method,
      data,
      timeout,
      header: { ...targetHeader, ...token },
      success: ({ data }) => {
        //类型转换
        const { code, data: resData, message } = data as Result<T>;
        if (code == 401) {
          uni.showToast({
            title: "登录信息已过期,请关闭APP后重新打开",
            icon: "none",
            mask: true,
          });
          // removeToken()
          reject(resData);
        }

        if (!code || code !== 200) {
          uni.showToast({
            title: message || "服务器开小差了，请稍后再试~",
            icon: "none",
            mask: true,
          });
          reject(resData);
        }
        resolve(resData);
      },
      fail: ({ errMsg }) => {
        uni.showModal({
          title: "提示",
          content: `服务器开小差了，请稍后再试~`,
          showCancel: false,
        });
        console.error(errMsg);
      },
      complete: () => {
        //关闭加载动画
        loading && uni.hideLoading();
      },
    });
  });
};

/**
 *
 * @param url 路径
 * @param options
 * @returns
 */
export const uploadFile = <T>(
  url: string,
  name: string,
  path: string,
  options: RequestOptions = { method: Method.GET }
): Promise<T> => {
  const { data: formData, gateway } = options;
  //JSON化
  let jsonData: any;
  // #ifdef MP-WEIXIN
  jsonData = JSON.stringify(formData);
  // #endif
  // #ifdef H5
  jsonData = formData;
  // #endif
  return new Promise<any>((resolve, reject) => {
    uni.uploadFile({
      url: gateway ? baseUrl + gateway + url : baseUrl + url,
      filePath: path,
      name: name,
      formData: formData,
      success: ({ data }) => {
        resolve(JSON.parse(data));
      },
      fail(err) {
        uni.showModal({
          title: "提示",
          content: `服务器开小差了，请稍后再试~`,
          showCancel: false,
        });
        console.error(err);
      },
    });
  });
};

export default request;
