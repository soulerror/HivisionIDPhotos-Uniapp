interface PhotoSize {
  name: string;
  pxHeight: number;
  pxWidth: number;
  dpi: number;
  mmHeight: number;
  mmWidth: number;
  hot?: boolean
}


export const photoSizes: Array<PhotoSize> = [
  {
    name: "国家公务员考试",
    pxHeight: 579,
    pxWidth: 413,
    dpi: 300,
    mmHeight: 49,
    mmWidth: 35
  },
  {
    name: "驾驶证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 22,
    mmHeight: 32,
  },
  {
    name: "小一寸",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "小二寸",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "简历照",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "硕士研究生考试报名",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "英语四六级",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "学生证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "社保证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  },
  {
    name: "在职研究生考试",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53
  }
]