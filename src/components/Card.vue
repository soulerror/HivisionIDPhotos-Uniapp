<template>
  <div class="cm-card" @click="_click">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from "vue-property-decorator";
@Component
export default class Card extends Vue {

  @Emit('click')
  _click() {
  }

}
</script>
<style lang="scss" scoped>
.cm-card {
  border-radius: 20rpx;
  background-color: #fff;
  width: 100%;
  box-shadow: none;
  box-sizing: border-box;
}
</style>