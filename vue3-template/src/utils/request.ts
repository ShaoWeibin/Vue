import axios, { ResponseType } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user'

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Request Params
 */
export type RequestParams<T> = {
  [key: string]: any
} & T

export interface ResponseObject<T> {
  code: number
  msg: string
  data: T
}

export { ResponseType }

// export enum Method {}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  withCredentials: true, // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useStore().state.user.token
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (token && config && config.headers) {
      config.headers['X-Access-Token'] = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 0: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== 0) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // Remove token and redirect to login page
          useStore().dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default service
