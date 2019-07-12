import HttpRequest from '@/util/axios'
import config from '@/config'

const baseUrl = config.baseUrl.dev

const axios = new HttpRequest(baseUrl)
export default axios
