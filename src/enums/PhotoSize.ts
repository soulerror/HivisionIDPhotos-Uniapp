export interface PhotoSize {
  id: number;
  name: string;
  pxHeight: number;
  pxWidth: number;
  dpi: number;
  mmHeight: number;
  mmWidth: number;
  hot?: boolean;
}

export const photoSizes: Array<PhotoSize> = [
  {
    id: 1,
    name: "国家公务员考试",
    pxHeight: 579,
    pxWidth: 413,
    dpi: 300,
    mmHeight: 49,
    mmWidth: 35,
  },
  {
    id: 2,
    name: "驾驶证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 22,
    mmHeight: 32,
  },
  {
    id: 3,
    name: "小一寸",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 4,
    name: "小二寸",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 5,
    name: "简历照",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 6,
    name: "硕士研究生考试报名",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 7,
    name: "英语四六级",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 8,
    name: "学生证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 9,
    name: "社保证",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
  {
    id: 10,
    name: "在职研究生考试",
    pxWidth: 260,
    pxHeight: 378,
    dpi: 300,
    mmWidth: 35,
    mmHeight: 53,
  },
];
