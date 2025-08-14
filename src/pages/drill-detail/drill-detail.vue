<template>
  <view class="drill-detail-page">
    <!-- 顶部导航栏 -->
    <view class="app-header">
      <view class="icon icon-left" @click="goBack">
        <text class="back-arrow"><</text>
      </view>
      <text class="header-title">GK01 钻孔详情</text>
      <view class="icon icon-right"></view>
    </view>
    
    <!-- 通用二级弹窗 -->
    <sub-popup :show="showSubPopup" :title="subPopupTitle" @close="closeSubPopup">
      <view class="sub-popup-content">
        <!-- 子业务内容将在这里动态显示 -->
        <text>{{ currentBusinessType }} 的详细内容将在这里显示</text>
      </view>
    </sub-popup>

    <scroll-view class="main-content" scroll-y="true">
      <!-- 钻孔概况 -->
      <view class="feature-card">
        <text class="card-title">钻孔概况</text>
        <view class="feature-grid three-columns">
          <view class="grid-item" @click="handleItemClick('video')">
            <view class="custom-icon blue">
              <text class="icon-text">📹</text>
            </view>
            <text class="grid-item-label">视频监控</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overview')">
            <view class="custom-icon blue">
              <text class="icon-text">📊</text>
            </view>
            <text class="grid-item-label">钻孔概况</text>
          </view>
          <view class="grid-item" @click="handleItemClick('chart')">
            <view class="custom-icon blue">
              <text class="icon-text">🖼️</text>
            </view>
            <text class="grid-item-label">柱状图</text>
          </view>
        </view>
      </view>

      <!-- 报审流程 -->
      <view class="feature-card">
        <text class="card-title">报审流程</text>
        <view class="feature-grid three-columns">
          <view class="grid-item" @click="handleItemClick('start-check')">
            <view class="status-icon status-completed">A7</view>
            <text class="grid-item-label">开工检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('single-check')">
            <view class="status-icon status-inprogress">A8</view>
            <text class="grid-item-label">单孔报验</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-check')">
            <view class="status-icon status-not-started">A9</view>
            <text class="grid-item-label">封孔验收</text>
          </view>
        </view>
      </view>

      <!-- 安全施工 -->
      <view class="feature-card">
        <text class="card-title">安全施工</text>
        <view class="feature-grid">
          <view class="grid-item" @click="handleItemClick('disclosure')">
            <view class="status-icon status-completed">交</view>
            <text class="grid-item-label">钻孔交底</text>
          </view>
          <view class="grid-item" @click="handleItemClick('positioning')">
            <view class="status-icon status-completed">开</view>
            <text class="grid-item-label">开孔定位</text>
          </view>
          <view class="grid-item" @click="handleItemClick('pipeline')">
            <view class="status-icon status-completed">管</view>
            <text class="grid-item-label">管线探测</text>
          </view>
          <view class="grid-item" @click="handleItemClick('excavation')">
            <view class="status-icon status-completed">挖</view>
            <text class="grid-item-label">开挖0-3米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('protection')">
            <view class="status-icon status-completed">围</view>
            <text class="grid-item-label">围蔽防护</text>
          </view>
          <view class="grid-item" @click="handleItemClick('strike')">
            <view class="status-icon status-completed">击</view>
            <text class="grid-item-label">击进3-6米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('drilling')">
            <view class="status-icon status-inprogress">钻</view>
            <text class="grid-item-label">机钻施工</text>
          </view>
          <view class="grid-item" @click="handleItemClick('safety-check')">
            <view class="status-icon status-not-started">安</view>
            <text class="grid-item-label">安全检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-record')">
            <view class="status-icon status-not-started">封</view>
            <text class="grid-item-label">封孔记录</text>
          </view>
          <view class="grid-item" @click="handleItemClick('quality-check')">
            <view class="status-icon status-not-started">验</view>
            <text class="grid-item-label">质量验收</text>
          </view>
        </view>
      </view>

      <!-- 编录数据 -->
      <view class="feature-card">
        <text class="card-title">编录数据</text>
        <view class="feature-grid">
          <view class="grid-item" @click="handleItemClick('stratum')">
            <view class="custom-icon blue">
              <text class="icon-text">🏔️</text>
            </view>
            <text class="grid-item-label">地层</text>
          </view>
          <view class="grid-item" @click="handleItemClick('standard-penetration')">
            <view class="custom-icon blue">
              <text class="icon-text">⚒️</text>
            </view>
            <text class="grid-item-label">标贯</text>
          </view>
          <view class="grid-item" @click="handleItemClick('dynamic-probe')">
            <view class="custom-icon blue">
              <text class="icon-text">🔧</text>
            </view>
            <text class="grid-item-label">动探</text>
          </view>
          <view class="grid-item" @click="handleItemClick('in-situ-test')">
            <view class="custom-icon blue">
              <text class="icon-text">🔬</text>
            </view>
            <text class="grid-item-label">原位测试</text>
          </view>
          <view class="grid-item" @click="handleItemClick('sampling')">
            <view class="custom-icon blue">
              <text class="icon-text">🪨</text>
            </view>
            <text class="grid-item-label">取样</text>
          </view>
          <view class="grid-item" @click="handleItemClick('water-level')">
            <view class="custom-icon blue">
              <text class="icon-text">💧</text>
            </view>
            <text class="grid-item-label">水位</text>
          </view>
        </view>
      </view>

      <!-- 钻孔影像 -->
      <view class="feature-card">
        <text class="card-title">钻孔影像</text>
        <view class="feature-grid">
          <view class="grid-item" @click="handleItemClick('single-box')">
            <view class="custom-icon blue">
              <text class="icon-text">📦</text>
            </view>
            <text class="grid-item-label">单箱</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overall')">
            <view class="custom-icon blue">
              <text class="icon-text">📸</text>
            </view>
            <text class="grid-item-label">整体</text>
          </view>
          <view class="grid-item" @click="handleItemClick('ground')">
            <view class="custom-icon blue">
              <text class="icon-text">🏗️</text>
            </view>
            <text class="grid-item-label">地面</text>
          </view>
        </view>
      </view>

      <!-- 班报表 -->
      <view class="feature-card">
        <text class="card-title">班报表</text>
        <view class="feature-grid">
          <view class="grid-item" @click="handleItemClick('shift-report')">
            <view class="custom-icon blue">
              <text class="icon-text">📋</text>
            </view>
            <text class="grid-item-label">班报表</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import SubPopup from '@/components/sub-popup/sub-popup.vue';

export default {
  name: 'DrillDetail',
  components: {
    SubPopup
  },
  data() {
    return {
      // 页面数据
      showSubPopup: false,
      subPopupTitle: '',
      currentBusinessType: ''
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    goHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    },
    handleItemClick(type) {
      console.log('点击了:', type)
      
      // 设置弹窗标题和当前业务类型
      this.setPopupInfo(type);
      
      // 显示弹窗
      this.showSubPopup = true;
    },
    
    // 设置弹窗信息
    setPopupInfo(type) {
      this.currentBusinessType = type;
      
      // 根据不同类型设置不同的标题
      switch(type) {
        case 'video':
          this.subPopupTitle = '视频监控';
          break;
        case 'overview':
          this.subPopupTitle = '钻孔概况';
          break;
        case 'chart':
          this.subPopupTitle = '柱状图';
          break;
        case 'start-check':
          this.subPopupTitle = '开工检查';
          break;
        case 'single-check':
          this.subPopupTitle = '单孔报验';
          break;
        case 'seal-check':
          this.subPopupTitle = '封孔验收';
          break;
        case 'disclosure':
          this.subPopupTitle = '钻孔交底';
          break;
        case 'positioning':
          this.subPopupTitle = '开孔定位';
          break;
        case 'pipeline':
          this.subPopupTitle = '管线探测';
          break;
        case 'excavation':
          this.subPopupTitle = '开挖0-3米';
          break;
        case 'protection':
          this.subPopupTitle = '围蔽防护';
          break;
        case 'strike':
          this.subPopupTitle = '击进3-6米';
          break;
        case 'drilling':
          this.subPopupTitle = '机钻施工';
          break;
        case 'safety-check':
          this.subPopupTitle = '安全检查';
          break;
        case 'seal-record':
          this.subPopupTitle = '封孔记录';
          break;
        case 'quality-check':
          this.subPopupTitle = '质量验收';
          break;
        case 'stratum':
          this.subPopupTitle = '地层';
          break;
        case 'standard-penetration':
          this.subPopupTitle = '标贯';
          break;
        case 'dynamic-probe':
          this.subPopupTitle = '动探';
          break;
        case 'in-situ-test':
          this.subPopupTitle = '原位测试';
          break;
        case 'sampling':
          this.subPopupTitle = '取样';
          break;
        case 'water-level':
          this.subPopupTitle = '水位';
          break;
        case 'single-box':
          this.subPopupTitle = '单箱';
          break;
        case 'overall':
          this.subPopupTitle = '整体';
          break;
        case 'ground':
          this.subPopupTitle = '地面';
          break;
        case 'shift-report':
          this.subPopupTitle = '班报表';
          break;
        default:
          this.subPopupTitle = '详情';
      }
    },
    
    // 关闭弹窗
    closeSubPopup() {
      this.showSubPopup = false;
    }
  }
}
</script>

<style scoped>
.drill-detail-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.app-header {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid #e4e7ed;
  flex-shrink: 0;
}

.app-header .header-title {
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
  flex-grow: 1;
  color: #303133;
}

.app-header .icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-header .icon-left {
  margin-right: auto;
}

.app-header .icon-right {
  margin-left: auto;
  visibility: hidden;
}

.back-arrow {
  font-size: 36rpx;
  color: #303133;
  font-weight: bold;
}

/* 主内容区域 */
.main-content {
  flex-grow: 1;
  padding: 32rpx;
}

/* 卡片式模块 */
.feature-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  margin: 0 0 60rpx 8rpx;
  color: #303133;
}

/* 网格布局 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
  row-gap: 40rpx;
}

.feature-grid.three-columns {
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-item .grid-item-label {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #606266;
  white-space: nowrap;
}

/* 图标样式 */
.icon-container {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container.blue {
  background-color: rgba(43, 125, 224, 0.1);
  border-radius: 16rpx;
}

/* 自定义图标样式 */
.custom-icon {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
}

.custom-icon.blue {
  background-color: rgba(43, 125, 224, 0.1);
}

.custom-icon .icon-text {
  font-size: 48rpx;
  color: #2b7de0;
  font-weight: bold;
}

/* 状态图标 */
.status-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 20rpx;
  font-size: 32rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
  border: 2rpx solid transparent;
}

.status-icon.status-completed {
  background-color: #67c23a;
  color: #ffffff;
}

.status-icon.status-inprogress {
  background-color: #e6a23c;
  color: #6d4d0c;
}

.status-icon.status-not-started {
  background-color: #ffffff;
  color: #a8abb2;
  border-color: #dcdfe6;
}
</style>

<style scoped>
/* 二级弹窗内容样式 */
.sub-popup-content {
  padding: 20rpx;
  height: 100%;
}
</style>
