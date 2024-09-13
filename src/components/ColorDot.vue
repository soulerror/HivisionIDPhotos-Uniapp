<template>
  <div class="cm-dot" @click="_click"
    :style="{ 'backgroundColor': color, 'border': borderColor ? '1px solid' + borderColor : 'none' }">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from "vue-property-decorator";

@Component
export default class ColorDot extends Vue {
  name: string = "color-dot"
  @Prop(String)
  private color?: string;
  @Prop(String)
  private gradientColor?: string;
  @Prop(String)
  private borderColor?: string

  @Emit('click')
  _click() {

  }

}
</script>
<style lang="scss" scoped>
.cm-dot {
  height: 100%;
  border-radius: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.cm-dot:hover {
  transform: scale(1.1);
}
</style>