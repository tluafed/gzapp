<template>
  <view class="single-box-container">
    <view class="content-card">
      <view class="section-title">单箱影像</view>
      
      <view class="image-preview">
        <image src="/static/images/placeholder.png" mode="aspectFit" class="preview-image"></image>
      </view>
      
      <view class="info-section">
        <view class="info-item">
          <text class="label">箱号：</text>
          <text class="value">B01</text>
        </view>
        <view class="info-item">
          <text class="label">深度：</text>
          <text class="value">3.5-4.5m</text>
        </view>
        <view class="info-item">
          <text class="label">岩性：</text>
          <text class="value">砂质粘土</text>
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
  name: 'SingleBox',
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
.single-box-container {
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

.info-section {
  margin-bottom: 30rpx;
}

.info-item {
  display: flex;
  margin-bottom: 20rpx;
}

.label {
  width: 120rpx;
  color: #666;
  font-size: 28rpx;
}

.value {
  flex: 1;
  color: #333;
  font-size: 28rpx;
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