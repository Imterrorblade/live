import request from '@/utils/request.js'

export default {
  ping () {
    return request({
      method: 'get',
      url: '/ping'
    })
  },
  register (data) {
    return request({
      method: 'post',
      url: '/users/register',
      data
    })
  }
}
