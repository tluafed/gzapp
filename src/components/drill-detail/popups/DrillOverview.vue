<template>
  <scroll-view class="drill-overview" scroll-y="true">
    <view class="overview-section">
      <view class="section-header">
        <text class="section-title">基本信息</text>
      </view>
      <view class="info-grid">
        <view class="info-item" v-for="(item, index) in basicInfo" :key="index">
          <text class="info-label">{{ item.label }}</text>
          <text class="info-value">{{ item.value }}</text>
        </view>
      </view>
    </view>
    
    <view class="overview-section">
      <view class="section-header">
        <text class="section-title">进度信息</text>
      </view>
      <view class="progress-info">
        <view class="progress-item" v-for="(item, index) in progressInfo" :key="index">
          <view class="progress-header">
            <text class="progress-name">{{ item.name }}</text>
            <text class="progress-status" :class="item.status">{{ item.statusText }}</text>
          </view>
          <view class="progress-bar-container">
            <view class="progress-bar" :style="{ width: item.progress + '%' }"></view>
          </view>
          <text class="progress-text">{{ item.progress }}%</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'DrillOverview',
  props: {
    basicInfo: {
      type: Array,
      default: () => [
        { label: '钻孔编号', value: 'GK01' },
        { label: '坐标X', value: '123456.78' },
        { label: '坐标Y', value: '987654.32' },
        { label: '设计深度', value: '30.5米' },
        { label: '实际深度', value: '30.5米' },
        { label: '开工日期', value: '2023-06-15' },
        { label: '完工日期', value: '2023-08-05' },
        { label: '施工单位', value: '某某地质勘察公司' }
      ]
    },
    progressInfo: {
      type: Array,
      default: () => [
        { 
          name: '开工检查', 
          progress: 100, 
          status: 'completed', 
          statusText: '已完成' 
        },
        { 
          name: '钻孔施工', 
          progress: 100, 
          status: 'completed', 
          statusText: '已完成' 
        },
        { 
          name: '取样测试', 
          progress: 100, 
          status: 'completed', 
          statusText: '已完成' 
        },
        { 
          name: '单孔报验', 
          progress: 100, 
          status: 'completed', 
          statusText: '已完成' 
        },
        { 
          name: '封孔验收', 
          progress: 100, 
          status: 'completed', 
          statusText: '已完成' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.drill-overview {
  height: 100%;
  padding: 20rpx;
}

.overview-section {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.section-header {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.section-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

.info-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx;
}

.info-item {
  width: 50%;
  padding: 15rpx;
  box-sizing: border-box;
}

.info-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 8rpx;
  display: block;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.progress-info {
  padding: 20rpx;
}

.progress-item {
  margin-bottom: 25rpx;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.progress-name {
  font-size: 26rpx;
  color: #333;
}

.progress-status {
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.progress-status.completed {
  background-color: #e6f7e6;
  color: #52c41a;
}

.progress-status.in-progress {
  background-color: #e6f7ff;
  color: #1890ff;
}

.progress-status.pending {
  background-color: #fff7e6;
  color: #fa8c16;
}

.progress-bar-container {
  height: 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
  margin-bottom: 8rpx;
}

.progress-bar {
  height: 100%;
  background-color: #1890ff;
  border-radius: 8rpx;
}

.progress-text {
  font-size: 24rpx;
  color: #999;
  text-align: right;
}
</style>