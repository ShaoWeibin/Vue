/*
 * @Description: 角色模型
 * @Author:
 */

export interface Meta {
  hidden: boolean
}

export interface Children {
  path: string
  component: string
}

export interface Route {
  path: string
  component: string
  meta: Meta
  children: Children[]
}

export interface Item {
  key: string
  name: string
  description: string
  routes: Route[]
}

export interface RolesModels {
  total: number
  items: Item[]
}
