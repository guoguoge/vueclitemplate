import axios from '@/util/request'

export const Resource = () => { //网站首页源数据
  return axios.request({
    url: 'test',
    method: 'post'
  })
}
