<template>
  <view class="overall-container">
    <view class="content-card">
      <view class="section-title">整体影像</view>
      
      <view class="image-gallery">
        <scroll-view scroll-x="true" class="gallery-scroll">
          <view class="gallery-item">
            <image src="/static/images/placeholder.png" mode="aspectFill" class="gallery-image"></image>
            <text class="image-depth">0-1.5m</text>
          </view>
          <view class="gallery-item">
            <image src="/static/images/placeholder.png" mode="aspectFill" class="gallery-image"></image>
            <text class="image-depth">1.5-3.0m</text>
          </view>
          <view class="gallery-item">
            <image src="/static/images/placeholder.png" mode="aspectFill" class="gallery-image"></image>
            <text class="image-depth">3.0-4.5m</text>
          </view>
          <view class="gallery-item">
            <image src="/static/images/placeholder.png" mode="aspectFill" class="gallery-image"></image>
            <text class="image-depth">4.5-6.0m</text>
          </view>
        </scroll-view>
      </view>
      
      <view class="drill-info">
        <view class="info-row">
          <view class="info-item">
            <text class="label">钻孔编号：</text>
            <text class="value">GK01</text>
          </view>
          <view class="info-item">
            <text class="label">总深度：</text>
            <text class="value">15.6m</text>
          </view>
        </view>
        <view class="info-row">
          <view class="info-item">
            <text class="label">开始日期：</text>
            <text class="value">2023-06-15</text>
          </view>
          <view class="info-item">
            <text class="label">完成日期：</text>
            <text class="value">2023-06-18</text>
          </view>
        </view>
      </view>
      
      <view class="action-bar">
        <button class="action-button primary">上传照片</button>
        <button class="action-button">导出报告</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Overall',
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
.overall-container {
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

.image-gallery {
  margin-bottom: 30rpx;
}

.gallery-scroll {
  white-space: nowrap;
  height: 300rpx;
}

.gallery-item {
  display: inline-block;
  width: 280rpx;
  height: 280rpx;
  margin-right: 20rpx;
  position: relative;
  border-radius: 8rpx;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
}

.image-depth {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 24rpx;
  padding: 8rpx 0;
  text-align: center;
}

.drill-info {
  background-color: #f9f9f9;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.info-row {
  display: flex;
  margin-bottom: 20rpx;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-item {
  flex: 1;
  display: flex;
}

.label {
  color: #666;
  font-size: 28rpx;
  width: 160rpx;
}

.value {
  color: #333;
  font-size: 28rpx;
  flex: 1;
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