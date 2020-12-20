/*
* ajax请求函数模块
* */

import axios from 'axios'

export default function (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let axiosPromise
    type = type.toLowerCase()
    if(type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] +'&'
      })
      if(dataStr !== ''){
          dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
      }
      axiosPromise = axios.get(url)
    } else {
      axiosPromise = axios.post(url, data);
    }
    axiosPromise.then(response => {
      resolve(response.data)
    }).catch(error =>{
      reject(error)
    })
  })
}
