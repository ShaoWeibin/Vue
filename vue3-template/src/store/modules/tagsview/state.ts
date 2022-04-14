/*
 * @Description: tags-view state
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-06 14:43:49
 */
import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagsViewState {
  visitedViews: TagView[] // 用户访问过的页面
  cachedViews: (string | undefined)[] // 缓存的页面
}

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: [],
}
