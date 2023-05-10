export function formDataToObject(data) {
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  return obj;
}
