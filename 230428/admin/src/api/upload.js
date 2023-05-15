import request from '@/utils/request'

export function uploadFile(data) {
    return request({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data
    })
}