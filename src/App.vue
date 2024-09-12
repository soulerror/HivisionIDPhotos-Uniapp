<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')

    },
    onShow() {
        console.log('App Show')
        // #ifndef APP-NVUE
        uni.requireNativePlugin = () => { };
        // #endif

    },
    onHide() {
        console.log('App Hide')
    }
});
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
