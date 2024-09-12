<template>
  <div class="cm-dot">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from "vue-property-decorator";

@Component
export default class ColorDot extends Vue {
  name: string = "color-dot"
  @Prop(String) color: string = '#fff';

  @Emit('click')
  _click() {

  }

}
</script>
<style lang="scss" scoped>
.cm-dot {
  border-radius: 10rpx;
  background-color: #fff;
  width: 100%;
  box-shadow: none;
}
</style>