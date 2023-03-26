/*
 * @Author: Topskys
 * @Date: 2023-03-18 22:35:28
 * @LastEditTime: 2023-03-19 14:32:48
 */
import http from '../utils/http';

interface feedbackParams {
    page: number,
    pageSize: number,
    keyword: string
}

interface PromiseRes {
    code: number,
    data: {}[],
    msg: string,
    total: number,
}

// export const getFeedbackList = (data: feedbackParams): PromiseRes => http.get('/users', { params: data })
export function getFeedbackList(data: feedbackParams) {
    return http.get('/users', { params: data })
}