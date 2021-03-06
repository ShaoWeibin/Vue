/*
 * @Description: app actions
 * @Author:
 */
import { ActionTree, ActionContext } from 'vuex'

// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store'
import { SettingsState } from './state'
import { SettingsMutationTypes, Mutations } from './mutations'

export enum SettingsActionTypes {
  ACTION_CHANGE_SETTING = 'ACTION_CHANGE_SETTING',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<SettingsState, RootState>, 'commit'>

export interface Actions {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string; value: any },
  ): void
}

export const actions: ActionTree<SettingsState, RootState> & Actions = {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string; value: any },
  ) {
    commit(SettingsMutationTypes.CHANGE_SETTING, payload)
  },
}
