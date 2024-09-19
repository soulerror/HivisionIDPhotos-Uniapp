export const copyProperties = (source: any, target: any) => {
  const keys = Object.keys(source);
  for (let index in keys) {
    let key: keyof typeof source = keys[index];
    //如果有才设置
    if (target.hasOwnProperty(key)) target[key] = source[key];
  }
};
