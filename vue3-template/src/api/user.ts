/*
 * @Description: 用户相关接口
 * @Author:
 */
import { UserInfoModel, Users } from '@/model/userModel'
import request, { RequestParams, ResponseObject } from '@/utils/request'
import { LoginModel } from '@/model/loginModel'

export const login = async (data: RequestParams<{ username: string; password: string }>) => {
  return request.post<ResponseObject<LoginModel>>('users/login', data)
}

export const logout = async (data?: RequestParams<{}>) => {
  return request.post<ResponseObject<LoginModel>>('users/logout', data)
}

export const getUserInfo = async (params: RequestParams<{ token: string }>) => {
  return request.get<ResponseObject<UserInfoModel>>('users/info', { params })
}

export const getUsers = async (data: RequestParams<{}>) => {
  return request.get<ResponseObject<Users>>('users/getUsers', { data })
}
