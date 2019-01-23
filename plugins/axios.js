// import axios from 'axios'
import ResponseErrMsg from './ResponseErrMsg'
import Vue from 'vue'

// axios.defaults.baseURL = process.env.baseUrl

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers['lan'] = 'zh-CN'
    console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

// //取消请求
// let pending = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// let cancelToken = axios.CancelToken

// // 取消上一次请求
// let removePending = (config) => {
//   for (let i in pending) {
//     if (pending[i].url === config.url && pending[i].method === config.method) {
//       pending[i].cancel()
//       pending.splice(i, 1)
//       break
//     }
//   }
// }

// // 请求'request'拦截器..
// axios.interceptors.request.use((config) => {
//   removePending(config) //在一个ajax发送前执行一下取消操作

//   if(config.cancelToken!==null) {
//     config.cancelToken = new cancelToken((c) => {
//       pending.push({url: config.url, method: config.method, cancel: c})
//     })
//   }

//   const VuexJson = JSON.parse(window.localStorage.getItem('buybit'))
//   const locale = VuexJson ? VuexJson.locale : 'zh-CN'
//   const token = VuexJson ? VuexJson.token : ''
//   if (locale) {
//     config.headers['lan'] = locale
//   }
//   if (token) {
//     config.headers['token'] = token
//   }
//   return config
// }, (error) => {
//   if (!(error instanceof axios.Cancel)) {
//     return Promise.reject(error)
//   } else {
//     return Promise.reject('cancel request')
//   }
// })

// // 响应'response'拦截器..
// axios.interceptors.response.use((res) => {
//   removePending(res.config)
//   // 正常访问和响应
//   if (res.status === 200) {
//     if (res.data === -1) {
//       const VuexJson = JSON.parse(window.localStorage.getItem('buybit'))
//       const isMaintain = VuexJson.isMaintain
//       if(!isMaintain){
//         var app=new Vue({})
//         app.$bus.emit('Error');
//       }
//       return res
//     }
//     if (res.data.code === 200 ||
//       res.data.code === 3004 ||
//       res.data.code === 3008 ||
//       res.data.code === 3022) {
//       // 这是所有都正常的访问
//     } else {
//       // 错误代码提示信息
//       ResponseErrMsg.ErrCodeMsg(res.data.code)
//     }
//     return res
//   } else {
//     ResponseErrMsg.ErrCodeMsg(500)
//   }
// }, (error) => {
//   if (!(error instanceof axios.Cancel)) {
//     return Promise.reject(error)
//   } else {
//     return Promise.reject('cancel response')
//   }
// })

// export {axios}
