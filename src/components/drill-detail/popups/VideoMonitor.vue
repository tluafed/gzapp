<template>
  <view class="video-monitors">
    <view v-for="monitor in videoMonitors" :key="monitor.id" class="video-monitor-item">
      <view class="monitor-title">{{ monitor.name }}</view>
      <view class="monitor-video">
        <!-- 视频播放组件 -->
        <image class="video-placeholder" :src="monitor.thumbnail" mode="aspectFill" />
        <view class="play-button" @click="playVideo(monitor)">
          <text class="play-icon">▶</text>
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
        { id: 1, name: '钻机视角', thumbnail: '/static/images/video-thumb-1.jpg' },
        { id: 2, name: '全景视角', thumbnail: '/static/images/video-thumb-2.jpg' },
        { id: 3, name: '钻头视角', thumbnail: '/static/images/video-thumb-3.jpg' }
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
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}

.video-monitor-item {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.monitor-title {
  font-size: 28rpx;
  font-weight: 500;
  padding: 16rpx 20rpx;
  background-color: #eef2f8;
  color: #333;
}

.monitor-video {
  position: relative;
  width: 100%;
  height: 360rpx;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background-color: #000;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon {
  color: #fff;
  font-size: 40rpx;
}
</style>