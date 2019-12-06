import request from '@/util/axios'

export function getServiceOrder(params) {
  //获取服务订单列表
  return request({
    url: '/serviceOrder/',
    method: 'GET',
    params: {
      ...params
    }
  })
}