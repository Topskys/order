import http from '../utils/http'

interface AdminLoginData{
    email: string,
    password: string
}
interface AdminLoginRes{
    code:number,
    data:object,
    msg:string
} 

export function login(data:AdminLoginData):Promise<AdminLoginRes> {
    return http({
        url: "/admins/login",
        method: "post",
        data,
    })
}


export const verify = () => http({ url: "/admins/verify" })


export const logout = () => http({ url: "/admins/logout" })


export function getUsers(params: object) {
    return http({
        url: "/users",
        params
    })
}



export const del = (id: any) => http({ url: `/users/${id}` })



export function edit(data: any) {
    return http({
        url: `/users/${data._id}`,
        method: 'post',
        data,
    })
}