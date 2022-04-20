/*
 * @Description: app actions
 * @Author:
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/store'
import { state, UserState } from './state'
import { UserMutationTypes, Mutations } from './mutations'
import api from '@/api'
import { removeToken, setToken } from '@/utils/cookies'
import { PermissionActionType } from '../permission'
import router, { resetRouter } from '@/router'
import { RouteRecordRaw, useRouter } from 'vue-router'

export enum UserActionTypes {
  ACTION_LOGIN = 'ACTION_LOGIN',
  ACTION_RESET_TOKEN = 'ACTION_RESET_TOKEN',
  ACTION_GET_USER_INFO = 'ACTION_GET_USER_INFO',
  ACTION_CHANGE_ROLES = 'ACTION_CHANGE_ROLES',
  ACTION_LOGIN_OUT = 'ACTION_LOGIN_OUT',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { username: string; password: string },
  ): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { username: string; password: string },
  ) {
    let { username, password } = userInfo
    username = username.trim()
    await api.UserService.login({ username, password })
      .then(async (res: any) => {
        if (res?.code === 0 && res.data.accessToken) {
          setToken(res.data.accessToken)
          commit(UserMutationTypes.SET_TOKEN, res.data.accessToken)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    await api.UserService.getUserInfo({ token: state.token }).then((res: any) => {
      if (res?.code === 0) {
        commit(UserMutationTypes.SET_ROLES, res.data.roles)
        commit(UserMutationTypes.SET_NAME, res.data.name)
        commit(UserMutationTypes.SET_AVATAR, res.data.avatar)
        commit(UserMutationTypes.SET_INTRODUCTION, res.data.introduction)
        commit(UserMutationTypes.SET_EMAIL, res.data.email)
        return res
      } else {
        throw Error('Verification failed, please Login again.')
      }
    })
  },

  async [UserActionTypes.ACTION_CHANGE_ROLES]({ commit }: AugmentedActionContext, role: string) {
    const token = role + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
    store.dispatch(PermissionActionType.ACTION_SET_ROUTES, state.roles)
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  async [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    await api.UserService.logout()
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
    resetRouter()
  },
}
