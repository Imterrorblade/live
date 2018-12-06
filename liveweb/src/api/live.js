import request from '@/utils/request.js'

export default {
  ping () {
    return request({
      method: 'get',
      url: '/ping'
    })
  }
}
