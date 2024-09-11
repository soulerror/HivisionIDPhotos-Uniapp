<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    }
});
</script>

<style>
@import "uview-ui/index.scss";

/* 让每个页面默认高度都是100% */
page {
    height: 100%;
}
</style>
