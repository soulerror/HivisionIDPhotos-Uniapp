<template>
  <div :class="'cm-line ' + (horizontal ? 'horizontal' : 'vertical')" @click="_click">
    <div>{{ content }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from "vue-property-decorator";
@Component
export default class LengthLine extends Vue {
  name: string = "length-line"
  @Prop(String)
  private content!: string

  @Prop({ type: Boolean, default: true })
  private horizontal?: boolean


  @Emit('click')
  _click() {
  }

}
</script>
<style lang="scss" scoped>
.cm-line {

  gap: 20rpx;
}

.horizontal {
  width: 100%;
  display: flex;
  align-items: center;

  div {
    height: 1px;
    background-color: black;
    width: 50%;
  }
}

.vertical {
  height: 100%;
  width: 1px;

  div {
    width: 1px;
    background-color: black;
    height: 50%;
  }
}
</style>