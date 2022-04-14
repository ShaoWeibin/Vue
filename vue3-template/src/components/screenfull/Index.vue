<!--
 * @Description: 全屏按钮
 * @Author: ZY
 * @Date: 2020-12-23 18:11:46
 * @LastEditors: SCY
 * @LastEditTime: 2021-04-02 14:31:08
-->

<template>
  <div id="screenfull">
    <div v-if="isFullscreen" @click="click" style="display: flex; align-items: center">
      <el-icon :size="24"><full-screen /></el-icon>
    </div>
    <div @click="click" v-else style="display: flex; align-items: center">
      <el-icon :size="24"><full-screen /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue';
import { FullScreen } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const sf = screenfull;
export default defineComponent({
  components: { FullScreen },
  setup() {
    const state = reactive({
      isFullscreen: false,
      click: () => {
        if (!sf.isEnabled) {
          ElMessage({
            message: 'you browser can not work',
            type: 'warning',
          });
          return false;
        }
        sf.toggle();
      },
    });
    const change = () => {
      if (sf.isEnabled) {
        state.isFullscreen = sf.isFullscreen;
      }
    };
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on('change', change);
      }
    });

    onBeforeUnmount(() => {
      if (sf.isEnabled) {
        sf.off('change', change);
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
