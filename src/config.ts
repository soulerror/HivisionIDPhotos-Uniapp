interface EnvironmentConfig {
  host: string;
}

const baseApi: { [key: string]: EnvironmentConfig } = {
  // 开发版
  development: {
    // host: "http://localhost:8080",
  },
  // 体验版
  trial: {
     host: "https://yourdomian.com",
  },
  // 正式版
  release: {
     host: "https://yourdomian.com",
  },
  // uniapp 正式环境
  production: {
    host: "https://yourdomian.com",
  },
};
// 环境
export const env = process.env.NODE_ENV;
// host
export const baseUrl = baseApi[env].host;
