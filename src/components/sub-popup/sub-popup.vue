<template>
  <view class="sub-popup" v-if="show">
    <!-- 蒙版 -->
    <view class="mask" @click="closePopup"></view>
    <!-- 弹窗内容 -->
    <view class="popup-content" :style="{ transform: show ? 'translateY(0)' : 'translateY(100%)' }">
      <!-- 标题栏 -->
      <view class="popup-header">
        <view class="header-left">
          <text class="popup-title">{{ title }}</text>
        </view>
        <view class="header-right">
          <view class="close-btn" @click="closePopup">
            <text class="close-icon">×</text>
          </view>
        </view>
      </view>
      <!-- 内容区域 -->
      <view class="popup-body">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SubPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '详情'
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.sub-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 110rpx);
  background-color: #fff;
  border-radius: 30rpx 30rpx 0 0;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1001;
}

.popup-header {
  min-height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #eee;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.close-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  font-size: 40rpx;
  color: #999;
}

.popup-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}
</style>
