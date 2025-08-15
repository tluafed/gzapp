<template>
  <scroll-view class="drill-overview" scroll-y="true">
    <!-- 基础信息 -->
    <view class="overview-section">
      <view class="section-header">
        <text class="section-title">基础信息</text>
      </view>
      <view class="info-grid">
        <view class="info-item" v-for="(item, index) in basicInfo" :key="index">
          <text class="info-label">{{ item.label }}</text>
          <text class="info-value">{{ item.value }}</text>
        </view>
      </view>
    </view>
    
    <!-- 坐标与高程 -->
    <view class="overview-section">
      <view class="section-header">
        <text class="section-title">坐标与高程</text>
      </view>
      <view class="info-grid">
        <view class="info-item" v-for="(item, index) in coordinateInfo" :key="index">
          <text class="info-label">{{ item.label }}</text>
          <text class="info-value">{{ item.value }}</text>
        </view>
      </view>
    </view>

    <!-- 项目归属 -->
    <view class="overview-section">
      <view class="section-header">
        <text class="section-title">项目归属</text>
      </view>
      <view class="info-grid">
        <view class="info-item" v-for="(item, index) in projectInfo" :key="index">
          <text class="info-label">{{ item.label }}</text>
          <text class="info-value">{{ item.value }}</text>
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
        { label: '钻孔编号', value: 'MRNZ23-BF-001' },
        { label: '钻孔类型', value: '控制孔、取样孔' },
        { label: '项目负责人', value: '袁柱' },
        { label: '技术员', value: '陈欣雄' },
        { label: '终孔日期', value: '2025-02-15' }
      ]
    },
    coordinateInfo: {
      type: Array,
      default: () => [
        { label: '设计坐标X', value: '228136.008' },
        { label: '设计坐标Y', value: '33932.776' },
        { label: '设计经度', value: '113.224' },
        { label: '设计纬度', value: '23.119' },
        { label: '复测坐标X', value: '228122.137' },
        { label: '复测坐标Y', value: '33930.266' },
        { label: '设计孔深(m)', value: '45' },
        { label: '实际孔深(m)', value: '44.8' },
        { label: '孔口高程(m)', value: '4.3' }
      ]
    },
    projectInfo: {
      type: Array,
      default: () => [
        { label: '所属项目', value: '粤港澳大湾区城际线路广州东至花都天贵工程' },
        { label: '', value: '广州东站一京溪站区间详勘' },
        { label: '工点名称', value: '粤港澳大湾区城际线路广州东至花都天贵工程' }
      ]
    }
  }
}
</script>

<style scoped>
.drill-overview {
  height: 100%;
  padding: 0;
  background-color: #fff;
}

.overview-section {
  margin-bottom: 30rpx;
  background-color: #fff;
}

.overview-section:last-child {
  margin-bottom: 0;
}

.section-header {
  padding: 30rpx 30rpx 20rpx 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.info-grid {
  padding: 20rpx 30rpx 30rpx 30rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
  min-height: 60rpx;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  flex-shrink: 0;
  width: 200rpx;
  line-height: 1.4;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  text-align: right;
  flex: 1;
  line-height: 1.4;
  word-wrap: break-word;
  word-break: break-all;
  margin-left: 20rpx;
}
</style>
