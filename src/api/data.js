import service from '@/util/axios'

export function getServiceOrder() {
  //获取服务订单列表
  return service({
    url: 'resource',
    method: 'post'
  })
}