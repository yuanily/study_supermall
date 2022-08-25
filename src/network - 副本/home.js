import axios from "axios";

export function getHomeMultidata() {
    return axios.get('/api/case')
  }

export function getHomeGoods(type,page,pageNum) {
  return axios.post('/homegoods',{type,page,pageNum})
}


// 封装axios的post请求
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export default {
  mockdata(url, params) {
    return fetch(url, params);
  }
}