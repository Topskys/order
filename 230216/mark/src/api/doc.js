import http from '@/utils/http'


export function uploadFile(data) {
    return http({
        url: '/docs',
        method: 'POST',
        data
    })
}