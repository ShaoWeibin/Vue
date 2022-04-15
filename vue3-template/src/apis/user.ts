/*
 * @Description: 用户相关接口
 * @Author: ZY
 * @Date: 2020-12-28 14:40:50
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-20 10:17:09
 */
import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users } from '@/model/userModel'
import https from '@/utils/https'
import { LoginModel } from '@/model/loginModel'
import { RequestParams, ContentType, Method } from 'axios-mapper'

export const loginRequest = (userInfo: RequestParams) => {
  return https(false).request<RootObject<LoginModel>>(
    'users/login',
    Method.POST,
    userInfo,
    ContentType.json,
  )
}

export const userInfoRequest = () => {
  return Promise.resolve({
    code: 0,
    data: {
      id: 0,
      username: 'admin',
      password: 'any',
      name: 'Super Admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      introduction: 'I am a super administrator',
      email: 'admin@test.com',
      phone: '1234567890',
      roles: ['admin'],
    },
  })
  return https().request<RootObject<UserInfoModel>>('users/info', Method.POST, {}, ContentType.json)
}

export const getUsers = (user: any) => {
  return https().request<RootObject<Users>>('users/getUsers', Method.GET, user, ContentType.form)
}
