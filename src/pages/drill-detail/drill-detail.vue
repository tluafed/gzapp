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
        <!-- 根据业务类型显示不同内容 -->
        <template v-if="currentBusinessType === 'video'">
          <view class="video-monitors">
            <view v-for="monitor in videoMonitors" :key="monitor.id" class="video-monitor-item">
              <view class="monitor-title">{{ monitor.name }}</view>
              <view class="video-container">
                <!-- 实际项目中应使用适合的视频播放组件 -->
                <view class="video-placeholder">
                  <!-- 这里可以使用实际的视频组件，如 video 标签或第三方组件 -->
                  <text class="video-placeholder-text">视频流将在这里显示</text>
                </view>
              </view>
            </view>
          </view>
        </template>
        <template v-else-if="currentBusinessType === 'chart'">
          <view class="column-chart-container">
            <view class="chart-wrapper"
                  :style="{
                    transform: `scale(${columnChartData.scale}) translate(${columnChartData.translateX}px, ${columnChartData.translateY}px)`,
                    transition: columnChartData.isDragging ? 'none' : 'transform 0.3s'
                  }"
                  @touchstart="handleTouchStart"
                  @touchmove="handleTouchMove"
                  @touchend="handleTouchEnd">
              <image class="chart-image" :src="columnChartData.imageUrl" mode="widthFix"></image>
            </view>
            
            <view class="zoom-controls">
              <view class="zoom-btn" @click="zoomIn">
                <text class="zoom-icon">+</text>
              </view>
              <view class="zoom-btn" @click="zoomOut">
                <text class="zoom-icon">-</text>
              </view>
              <view class="zoom-btn" @click="resetZoom">
                <text class="zoom-icon">↺</text>
              </view>
            </view>
          </view>
        </template>
        <template v-else-if="currentBusinessType === 'overview'">
          <scroll-view class="drill-overview" scroll-y="true">
            <!-- 基础信息 -->
            <view class="info-section">
              <view class="section-header">
                <text class="section-title">基础信息</text>
              </view>
              <view class="info-table">
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">钻孔编号</text>
                    <text class="info-value">{{ drillInfo.basicInfo.drillNo }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">钻孔类型</text>
                    <text class="info-value">{{ drillInfo.basicInfo.drillType }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">项目负责人</text>
                    <text class="info-value">{{ drillInfo.basicInfo.projectManager }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">技术员</text>
                    <text class="info-value">{{ drillInfo.basicInfo.technician }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">终孔日期</text>
                    <text class="info-value">{{ drillInfo.basicInfo.endDate }}</text>
                  </view>
                  <view class="info-cell"></view>
                </view>
              </view>
            </view>
            
            <!-- 坐标与高程 -->
            <view class="info-section">
              <view class="section-header">
                <text class="section-title">坐标与高程</text>
              </view>
              <view class="info-table">
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">设计坐标X</text>
                    <text class="info-value">{{ drillInfo.coordinates.designX }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">设计坐标Y</text>
                    <text class="info-value">{{ drillInfo.coordinates.designY }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">设计经度</text>
                    <text class="info-value">{{ drillInfo.coordinates.designLongitude }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">设计纬度</text>
                    <text class="info-value">{{ drillInfo.coordinates.designLatitude }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">复测坐标X</text>
                    <text class="info-value">{{ drillInfo.coordinates.actualX }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">复测坐标Y</text>
                    <text class="info-value">{{ drillInfo.coordinates.actualY }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">设计孔深(m)</text>
                    <text class="info-value">{{ drillInfo.coordinates.designDepth }}</text>
                  </view>
                  <view class="info-cell">
                    <text class="info-label">实际孔深(m)</text>
                    <text class="info-value">{{ drillInfo.coordinates.actualDepth }}</text>
                  </view>
                </view>
                <view class="info-row">
                  <view class="info-cell">
                    <text class="info-label">孔口高程(m)</text>
                    <text class="info-value">{{ drillInfo.coordinates.elevation }}</text>
                  </view>
                  <view class="info-cell"></view>
                </view>
              </view>
            </view>
            
            <!-- 项目归属 -->
            <view class="info-section">
              <view class="section-header">
                <text class="section-title">项目归属</text>
              </view>
              <view class="project-info">
                <view class="project-item">
                  <text class="project-label">所属项目</text>
                  <text class="project-value">{{ drillInfo.project.projectName }}</text>
                </view>
                <view class="project-item">
                  <text class="project-label">工点名称</text>
                  <text class="project-value">{{ drillInfo.project.workName }}</text>
                </view>
                <view class="project-item">
                  <text class="project-label">工程名称</text>
                  <text class="project-value">{{ drillInfo.project.engineeringName }}</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </template>
        <template v-else>
          <text>{{ currentBusinessType }} 的详细内容将在这里显示</text>
        </template>
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
      currentBusinessType: '',
      // 视频监控数据
      videoMonitors: [
        { id: 1, name: '监控编号A', url: 'https://example.com/stream1' },
        { id: 2, name: '监控编号B', url: 'https://example.com/stream2' }
      ],
      // 柱状图数据
      columnChartData: {
        imageUrl: '/static/logo.png', // 使用已有的图片作为示例
        scale: 1,
        minScale: 0.5,
        maxScale: 3,
        translateX: 0,
        translateY: 0,
        startX: 0,
        startY: 0,
        isDragging: false
      },
      // 钻孔概况数据
      drillInfo: {
        // 基础信息
        basicInfo: {
          drillNo: 'MRNZ23-BF-001',
          drillType: '控制孔、取样孔',
          projectManager: '袁柱',
          technician: '陈欣进',
          endDate: '2025-02-15'
        },
        // 坐标与高程
        coordinates: {
          designX: '228136.008',
          designY: '33932.776',
          designLongitude: '113.224',
          designLatitude: '23.119',
          actualX: '228122.137',
          actualY: '33930.266',
          designDepth: '45',
          actualDepth: '44.8',
          elevation: '4.3'
        },
        // 项目归属
        project: {
          projectName: '粤港澳大湾区城际铁路广州东至花都天贵工程',
          workName: '广州东站-京溪站区间详勘',
          engineeringName: '粤港澳大湾区城际铁路广州东至花都天贵工程'
        }
      }
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
    
    // 柱状图触摸开始
    handleTouchStart(e) {
      if (e.touches.length === 1) {
        // 单指拖动
        this.columnChartData.isDragging = true;
        this.columnChartData.startX = e.touches[0].clientX - this.columnChartData.translateX;
        this.columnChartData.startY = e.touches[0].clientY - this.columnChartData.translateY;
      } else if (e.touches.length === 2) {
        // 双指缩放 - 记录初始距离
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.initialDistance = Math.sqrt(dx * dx + dy * dy);
        this.initialScale = this.columnChartData.scale;
      }
    },
    
    // 柱状图触摸移动
    handleTouchMove(e) {
      if (this.columnChartData.isDragging && e.touches.length === 1) {
        // 单指拖动
        this.columnChartData.translateX = e.touches[0].clientX - this.columnChartData.startX;
        this.columnChartData.translateY = e.touches[0].clientY - this.columnChartData.startY;
      } else if (e.touches.length === 2) {
        // 双指缩放
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 计算新的缩放比例
        let newScale = this.initialScale * (distance / this.initialDistance);
        
        // 限制缩放范围
        newScale = Math.max(this.columnChartData.minScale, Math.min(newScale, this.columnChartData.maxScale));
        
        this.columnChartData.scale = newScale;
      }
    },
    
    // 柱状图触摸结束
    handleTouchEnd() {
      this.columnChartData.isDragging = false;
    },
    
    // 放大
    zoomIn() {
      if (this.columnChartData.scale < this.columnChartData.maxScale) {
        this.columnChartData.scale += 0.2;
      }
    },
    
    // 缩小
    zoomOut() {
      if (this.columnChartData.scale > this.columnChartData.minScale) {
        this.columnChartData.scale -= 0.2;
      }
    },
    
    // 重置缩放
    resetZoom() {
      this.columnChartData.scale = 1;
      this.columnChartData.translateX = 0;
      this.columnChartData.translateY = 0;
    },
    
    // 设置弹窗信息
    setPopupInfo(type) {
      this.currentBusinessType = type;
      
      // 根据不同类型设置不同的标题
      switch(type) {
        case 'video':
          this.subPopupTitle = '视频监控';
          // 这里可以添加获取视频监控数据的逻辑
          // this.getVideoMonitors();
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

/* 视频监控样式 */
.video-monitors {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 10rpx;
}

.video-monitor-item {
  width: 100%;
}

.monitor-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 16rpx;
  padding-left: 10rpx;
}

.video-container {
  width: 100%;
  height: 400rpx;
  border-radius: 16rpx;
  overflow: hidden;
  border: 2rpx solid #e74c3c;
  box-sizing: border-box;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-placeholder-text {
  color: #909399;
  font-size: 28rpx;
}

/* 钻孔概况样式 */
.drill-overview {
  height: 100%;
  padding: 20rpx;
}

.info-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.section-header {
  background-color: #f6f8fa;
  padding: 20rpx 24rpx;
  border-bottom: 1rpx solid #e8eaed;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 28rpx;
  background-color: #2b7de0;
  border-radius: 3rpx;
}

/* 表格式布局 */
.info-table {
  padding: 16rpx;
}

.info-row {
  display: flex;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-cell {
  flex: 1;
  padding: 20rpx 16rpx;
  position: relative;
}

.info-cell:first-child {
  border-right: 1rpx solid #f0f0f0;
}

.info-label {
  font-size: 26rpx;
  color: #909399;
  margin-bottom: 10rpx;
  display: block;
}

.info-value {
  font-size: 30rpx;
  color: #303133;
  font-weight: 500;
}

/* 项目归属特殊样式 */
.project-info {
  padding: 16rpx;
}

.project-item {
  padding: 20rpx 16rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.project-item:last-child {
  border-bottom: none;
}

.project-label {
  font-size: 26rpx;
  color: #909399;
  margin-bottom: 10rpx;
  display: block;
}

.project-value {
  font-size: 30rpx;
  color: #303133;
  line-height: 1.5;
  word-break: break-all;
}

/* 柱状图样式 */
.column-chart-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.chart-wrapper {
  transform-origin: center;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-image {
  width: 100%;
  height: auto;
  display: block;
}

.zoom-controls {
  position: absolute;
  bottom: 30rpx;
  right: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.zoom-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #333;
  font-weight: bold;
}

.zoom-icon {
  line-height: 1;
}
</style>
