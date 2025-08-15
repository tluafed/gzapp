<template>
  <view class="video-monitors">
    <view v-for="monitor in videoMonitors" :key="monitor.id" class="video-monitor-item">
      <text class="monitor-title">{{ monitor.name }}</text>
      <view class="video-container">
        <view class="video-placeholder">
          <view class="play-button" @click="playVideo(monitor)">
            <text class="play-icon">▶</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'VideoMonitor',
  props: {
    videoMonitors: {
      type: Array,
      default: () => [
        { id: 1, name: '监控A' },
        { id: 2, name: '监控B' },
        { id: 3, name: '监控C' }
      ]
    }
  },
  methods: {
    playVideo(monitor) {
      // 播放视频的逻辑
      uni.showToast({
        title: `正在播放: ${monitor.name}`,
        icon: 'none'
      })
      this.$emit('play-video', monitor)
    }
  }
}
</script>

<style scoped>
/* 视频监控样式 */
.video-monitors {
  padding: 20rpx;
}

.video-monitor-item {
  margin-bottom: 40rpx;
}

.monitor-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.video-container {
  width: 100%;
  height: 420rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 120rpx;
  height: 120rpx;
  background-color: rgba(255, 255, 255, 0.15);
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;
}

.play-button:active {
  transform: scale(0.95);
  background-color: rgba(255, 255, 255, 0.25);
}

.play-icon {
  color: #fff;
  font-size: 52rpx;
  margin-left: 8rpx;
}
</style>
