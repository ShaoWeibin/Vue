/*
 * @Description: app Mutations
 * @Author:
 */
import { MutationTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { setSidebarStatus, setLanguage, setSize } from '@/utils/cookies'

export enum AppMutationTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  TOGGLE_DEVICE = 'TOGGLE_DEVICE',
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_SIZE = 'SET_SIZE',
}

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.CLOSE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
  [AppMutationTypes.SET_LANGUAGE](state: S, language: string): void
  [AppMutationTypes.SET_SIZE](state: S, size: string): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },

  [AppMutationTypes.CLOSE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },

  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  },

  [AppMutationTypes.SET_LANGUAGE](state: AppState, language: string) {
    state.language = language
    setLanguage(state.language)
  },

  [AppMutationTypes.SET_SIZE](state: AppState, size: string) {
    state.size = size
    setSize(state.size)
  },
}
