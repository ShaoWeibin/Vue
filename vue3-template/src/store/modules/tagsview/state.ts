/*
 * @Description: tags-view state
 * @Author:
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
