<template>
  <view class="ground-container">
    <view class="content-card">
      <view class="section-title">地面影像</view>
      
      <view class="image-preview">
        <image src="/static/images/placeholder.png" mode="aspectFit" class="preview-image"></image>
      </view>
      
      <view class="location-info">
        <view class="info-item">
          <text class="label">拍摄位置：</text>
          <text class="value">钻孔北侧</text>
        </view>
        <view class="info-item">
          <text class="label">拍摄时间：</text>
          <text class="value">2023-06-15 09:30</text>
        </view>
        <view class="info-item">
          <text class="label">地理坐标：</text>
          <text class="value">N 30°12'45.6", E 120°08'32.4"</text>
        </view>
      </view>
      
      <view class="environment-notes">
        <view class="notes-title">环境备注</view>
        <view class="notes-content">
          <text>场地平整，周边无明显障碍物。地面状况良好，适合钻探作业。</text>
        </view>
      </view>
      
      <view class="action-bar">
        <button class="action-button primary">上传照片</button>
        <button class="action-button">查看历史</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Ground',
  data() {
    return {
      // 组件数据
    }
  },
  methods: {
    // 组件方法
  }
}
</script>

<style>
.ground-container {
  padding: 20rpx;
}

.content-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 30rpx;
  border-left: 8rpx solid #1890ff;
  padding-left: 20rpx;
}

.image-preview {
  width: 100%;
  height: 400rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.location-info {
  margin-bottom: 30rpx;
}

.info-item {
  display: flex;
  margin-bottom: 20rpx;
}

.label {
  width: 160rpx;
  color: #666;
  font-size: 28rpx;
}

.value {
  flex: 1;
  color: #333;
  font-size: 28rpx;
}

.environment-notes {
  background-color: #f9f9f9;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.notes-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.notes-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.action-bar {
  display: flex;
  justify-content: space-between;
}

.action-button {
  width: 48%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  background-color: #f5f5f5;
  color: #666;
}

.action-button.primary {
  background-color: #1890ff;
  color: #fff;
}
</style>