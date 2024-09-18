interface EnvironmentConfig {
  host: string;
}

const baseApi: { [key: string]: EnvironmentConfig } = {
  // 开发版
  development: {
    host: "http://10.0.12.108:8080",
    // host: "http://localhost:8080",
    // host: "https://photo.icuzz.com"
  },
  // 体验版
  trial: {
    host: "https://photo.icuzz.com",
  },
  // 正式版
  release: {
    host: "https://photo.icuzz.com",
  },
  // uniapp 正式环境
  production: {
    host: "https://photo.icuzz.com",
  },
};
// 环境
export const env = process.env.NODE_ENV;
// host
export const baseUrl = baseApi[env].host;