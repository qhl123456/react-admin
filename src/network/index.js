// 封装axios  get，post，delete，put 请求
import services from "./services";
// post请求的封装
export function POST(url, data) {
  return new Promise((resolve, reject) => {
    services({
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

// get请求的封装
export function GET(url, params) {
  params = params || {};
  return new Promise((resolve, reject) => {
    services({
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

// 路径参数get的封装
export function BindGET(url, params, id) {
  params = params || {};
  return new Promise((resolve, reject) => {
    services({
      url: url + "/" + id,
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
// delete请求的封装
export function DELETE(url, id) {
  return new Promise((resolve, reject) => {
    services({
      url: url + "/" + id,
      method: "delete",
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

// put请求的封装
export function PUT(url, id, data) {
  console.log(url, id, data);
  return new Promise((resolve, reject) => {
    services({
      url: url + "/" + id,
      method: "put",
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

//路径参数PUT1
export function BindPut(url1, url2, id, data) {
  return new Promise((resolve, reject) => {
    services({
      url: url1 + "/" + id + "/" + url2 + "/" + data,
      method: "put",
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
// 路径参数 PUT2
export function RolePut(url1, url2, id, data) {
  return new Promise((resolve, reject) => {
    services({
      url: url1 + "/" + id + "/" + url2,
      method: "put",
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

// 路径参数delete
export function BindDelete(url1, url2, id1, id2) {
  return new Promise((resolve, reject) => {
    services({
      url: url1 + "/" + id1 + "/" + url2 + "/" + id2,
      method: "delete",
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
