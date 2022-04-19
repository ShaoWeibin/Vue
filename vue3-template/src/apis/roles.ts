/*
 * @Description: 权限先关接口
 * @Author: ZY
 * @Date: 2021-01-12 16:37:09
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-13 16:50:20
 */

import { RolesModels } from '@/model/getRolesModel'
import { Routes } from '@/model/routesModel'
import request, { RequestParams, ResponseObject } from '@/utils/request'

export const getRoutes = async () => {
  return request.get<ResponseObject<Routes>>('roles/getRoutes')
}

export const getRoles = async () => {
  return request.get<ResponseObject<RolesModels>>('roles/getRoles')
}

export const delRole = async (id: number) => {
  return request.delete<ResponseObject<String>>('roles/deleteRole', { data: { id } })
}

export const updateRole = async (id: number, data: any) => {
  return request.post<ResponseObject<any>>(`roles/updateRole/${id}`, data)
}

export const createRole = async (role: RequestParams<{}>) => {
  return request.put<ResponseObject<any>>('roles/createRole', role)
}
