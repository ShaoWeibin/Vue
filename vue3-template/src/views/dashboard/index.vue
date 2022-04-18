<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div>Welcome to Your Vue.js + TypeScript App</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard', // name 要跟 router 定义中 name 保持一值，否则页面无法缓存
})
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
