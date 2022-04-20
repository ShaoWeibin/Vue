/*
 * @Description: 自定义配置
 * @Author:
 */

import { NetworkConfig } from './default/net.config'
import { Theme } from './default/theme.config'
import { Settings } from './default/setting.config'

type CustomConfig = NetworkConfig & Theme & Settings

const customConfig: CustomConfig = {} as CustomConfig

export default customConfig
