<template>
  <div class="home">
    <el-row :gutter="24">
      <el-space direction="vertical" :size="24">
        <el-col :span="24">
          <img alt="Vue logo" src="@/assets/logo.png" />
        </el-col>
        <el-col :span="24"><div>Welcome to Your Vue.js + TypeScript App</div></el-col>
        <el-col :span="24">
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
        </el-col>
        <el-col :span="24">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker v-model="value1" type="date" placeholder="请选择" />
        </el-col>
      </el-space>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElButton, ElSpace } from 'element-plus'

export default defineComponent({
  name: 'Dashboard', // name 要跟 router 定义中 name 保持一值，否则页面无法缓存
  components: {
    ElRow,
    ElCol,
    ElButton,
    ElSpace,
  },
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
