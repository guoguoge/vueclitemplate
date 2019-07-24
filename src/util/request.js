//请求接口配置文件
import HttpRequest from './axios'
import config from '@/config'

let check = window.location.hostname.includes('www') // 判断域名

let baseUrl = ''

switch (config.environment) {
  case 'development':
    baseUrl = config.baseUrl.dev;
    break
  case 'alpha':
    baseUrl = config.baseUrl.alpha;
    break
  case 'production':
    baseUrl = config.baseUrl.pro;
    break
}

const axios = new HttpRequest(baseUrl)
export default axios
