import mockServer from "./mock";
// get请求的封装
export function GET(url, params) {
  params = params || {};
  return new Promise((resolve, reject) => {
    mockServer({
      url,
      method: "get",
      params,
    })
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      )

      .catch((err) => reject(err));
  });
}
// post请求的封装
export function POST(url, data) {
  return new Promise((resolve, reject) => {
    mockServer({
      url,
      method: "post",
      data,
    })
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      )

      .catch((err) => reject(err));
  });
}
