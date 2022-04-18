<!--
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-01-23 11:02:49
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-23 11:02:50
-->
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <UserCard :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card> xxxx </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { reactive, defineComponent, toRefs, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'
interface Profile {
  name: string
  email: string
  avatar: string
  roles: string
}
export default defineComponent({
  components: {
    UserCard,
  },
  setup() {
    const defaultProfile: Profile = {
      name: 'Yours Extra.',
      email: 'Loading...',
      avatar: 'Loading...',
      roles: 'Loading...',
    }
    const store = useStore()
    const dataMap = reactive({
      user: defaultProfile,
      activeTab: 'activity',

      name: () => {
        return store.state.user.name
      },

      email() {
        return store.state.user.email
      },
      avatar() {
        return store.state.user.avatar
      },
      roles() {
        return store.state.user.roles
      },
      getUser: () => {
        dataMap.user = {
          name: dataMap.name(),
          email: dataMap.email(),
          avatar: dataMap.avatar(),
          roles: dataMap.roles().join(' | '),
        }
      },
    })

    onMounted(() => {
      dataMap.getUser()
    })

    return { ...toRefs(dataMap) }
  },
})
</script>
