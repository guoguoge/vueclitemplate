import axios from 'axios'

import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  //请求拦截器
  config => {
    // do something before request is sent

    if (store.getters.token) {
      //在此处可以添加同意的请求头
      // config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  //请求拦截器

  /**
   * 如果你想获得http信息，如报头或状态
   * 请返回响应=>响应
   */

  /**
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {

    const res = response.data || response.status

    //有的接口请求成功了 但是返回的data为空 则返回status

    // if the custom code is not 20000, it is judged as an error.
    if (!res) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service