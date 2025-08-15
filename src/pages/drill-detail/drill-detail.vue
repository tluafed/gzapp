<template>
  <view class="drill-detail-page">
    <!-- 顶部导航栏 -->
    <view class="app-header">
      <view class="icon icon-left" @click="goBack">
        <text class="back-arrow">&lt;</text>
      </view>
      <text class="header-title">GK01 钻孔详情</text>
      <view class="icon icon-right"></view>
    </view>

    <!-- 二级弹窗 -->
    <sub-popup :show="showSubPopup" :title="subPopupTitle" @close="closeSubPopup">
      <view class="sub-popup-content">
        <!-- 根据业务类型显示不同内容 -->
        <video-monitor 
          v-if="currentBusinessType === 'video'"
        />
        <column-chart
          v-else-if="currentBusinessType === 'chart'"
        />
        <start-check
          v-else-if="currentBusinessType === 'start-check'"
          :activeTabProp="startCheckActiveTab"
        />
        <single-check
          v-else-if="currentBusinessType === 'single-check'"
          :activeTabProp="singleCheckActiveTab"
        />
        <seal-check
          v-else-if="currentBusinessType === 'seal-check'"
          :activeTabProp="sealCheckActiveTab"
        />
        <drill-overview
          v-else-if="currentBusinessType === 'overview'"
        />
        <!-- 安全施工组件 -->
        <drill-disclosure
          v-else-if="currentBusinessType === 'disclosure'"
        />
        <hole-positioning
          v-else-if="currentBusinessType === 'positioning'"
        />
        <pipeline-detection
          v-else-if="currentBusinessType === 'pipeline'"
        />
        <excavation-work
          v-else-if="currentBusinessType === 'excavation'"
        />
        <protection-work
          v-else-if="currentBusinessType === 'protection'"
        />
        <strike-work
          v-else-if="currentBusinessType === 'strike'"
        />
        <drilling-work
          v-else-if="currentBusinessType === 'drilling'"
        />
        <safety-check
          v-else-if="currentBusinessType === 'safety-check'"
        />
        <seal-record
          v-else-if="currentBusinessType === 'seal-record'"
        />
        <quality-check
          v-else-if="currentBusinessType === 'quality-check'"
        />
        <!-- 编录数据组件 -->
        <Stratum
          v-else-if="currentBusinessType === 'stratum'"
        />
        <StandardPenetration
          v-else-if="currentBusinessType === 'standard-penetration'"
        />
        <DynamicProbe
          v-else-if="currentBusinessType === 'dynamic-probe'"
        />
        <InSituTest
          v-else-if="currentBusinessType === 'in-situ-test'"
        />
        <Sampling
          v-else-if="currentBusinessType === 'sampling'"
        />
        <WaterLevel
          v-else-if="currentBusinessType === 'water-level'"
        />
        <!-- 钻孔影像组件 -->
        <SingleBox
          v-else-if="currentBusinessType === 'single-box'"
        />
        <Overall
          v-else-if="currentBusinessType === 'overall'"
        />
        <Ground
          v-else-if="currentBusinessType === 'ground'"
        />
        <!-- 班报表组件 -->
        <ShiftReport
          v-else-if="currentBusinessType === 'shift-report'"
        />
        <view v-else>
          <text>{{ currentBusinessType }} 的详细内容将在这里显示</text>
        </view>
      </view>
    </sub-popup>

    <scroll-view class="main-content" scroll-y="true">
      <!-- 钻孔概况 -->
      <view class="feature-card">
        <text class="card-title">钻孔概况</text>
        <view class="feature-grid three-columns">
          <view class="grid-item" @click="handleItemClick('video')">
            <view class="icon-only blue">
              <text class="icon-text">📹</text>
            </view>
            <text class="grid-item-label">视频监控</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overview')">
            <view class="icon-only blue">
              <text class="icon-text">📄</text>
            </view>
            <text class="grid-item-label">钻孔概况</text>
          </view>
          <view class="grid-item" @click="handleItemClick('chart')">
            <view class="icon-only blue">
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
            <view class="custom-icon green">
              <text class="icon-text">A7</text>
            </view>
            <text class="grid-item-label">开工检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('single-check')">
            <view class="custom-icon orange">
              <text class="icon-text">A8</text>
            </view>
            <text class="grid-item-label">单孔报验</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-check')">
            <view class="custom-icon light">
              <text class="icon-text">A9</text>
            </view>
            <text class="grid-item-label">封孔验收</text>
          </view>
        </view>
      </view>

      <!-- 安全施工 -->
      <view class="feature-card">
        <text class="card-title">安全施工</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('disclosure')">
            <view class="custom-icon green">
              <text class="icon-text">交</text>
            </view>
            <text class="grid-item-label">钻孔交底</text>
          </view>
          <view class="grid-item" @click="handleItemClick('positioning')">
            <view class="custom-icon green">
              <text class="icon-text">开</text>
            </view>
            <text class="grid-item-label">开孔定位</text>
          </view>
          <view class="grid-item" @click="handleItemClick('pipeline')">
            <view class="custom-icon green">
              <text class="icon-text">管</text>
            </view>
            <text class="grid-item-label">管线探测</text>
          </view>
          <view class="grid-item" @click="handleItemClick('excavation')">
            <view class="custom-icon green">
              <text class="icon-text">挖</text>
            </view>
            <text class="grid-item-label">开挖0-3米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('protection')">
            <view class="custom-icon green">
              <text class="icon-text">围</text>
            </view>
            <text class="grid-item-label">围蔽防护</text>
          </view>
          <view class="grid-item" @click="handleItemClick('strike')">
            <view class="custom-icon green">
              <text class="icon-text">击</text>
            </view>
            <text class="grid-item-label">击进3-6米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('drilling')">
            <view class="custom-icon orange">
              <text class="icon-text">钻</text>
            </view>
            <text class="grid-item-label">机钻施工</text>
          </view>
          <view class="grid-item" @click="handleItemClick('safety-check')">
            <view class="custom-icon light">
              <text class="icon-text">安</text>
            </view>
            <text class="grid-item-label">安全检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-record')">
            <view class="custom-icon light">
              <text class="icon-text">封</text>
            </view>
            <text class="grid-item-label">封孔记录</text>
          </view>
          <view class="grid-item" @click="handleItemClick('quality-check')">
            <view class="custom-icon light">
              <text class="icon-text">验</text>
            </view>
            <text class="grid-item-label">质量验收</text>
          </view>
        </view>
      </view>

      <!-- 编录数据 -->
      <view class="feature-card">
        <text class="card-title">编录数据</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('stratum')">
            <view class="icon-only blue">
              <text class="icon-text">🏔️</text>
            </view>
            <text class="grid-item-label">地层</text>
          </view>
          <view class="grid-item" @click="handleItemClick('standard-penetration')">
            <view class="icon-only blue">
              <text class="icon-text">🔨</text>
            </view>
            <text class="grid-item-label">标贯</text>
          </view>
          <view class="grid-item" @click="handleItemClick('dynamic-probe')">
            <view class="icon-only blue">
              <text class="icon-text">⚡</text>
            </view>
            <text class="grid-item-label">动探</text>
          </view>
          <view class="grid-item" @click="handleItemClick('in-situ-test')">
            <view class="icon-only blue">
              <text class="icon-text">🔬</text>
            </view>
            <text class="grid-item-label">原位测试</text>
          </view>
          <view class="grid-item" @click="handleItemClick('sampling')">
            <view class="icon-only blue">
              <text class="icon-text">🪨</text>
            </view>
            <text class="grid-item-label">取样</text>
          </view>
          <view class="grid-item" @click="handleItemClick('water-level')">
            <view class="icon-only blue">
              <text class="icon-text">💧</text>
            </view>
            <text class="grid-item-label">水位</text>
          </view>
        </view>
      </view>

      <!-- 钻孔影像 -->
      <view class="feature-card">
        <text class="card-title">钻孔影像</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('single-box')">
            <view class="icon-only blue">
              <text class="icon-text">📦</text>
            </view>
            <text class="grid-item-label">单箱</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overall')">
            <view class="icon-only blue">
              <text class="icon-text">📚</text>
            </view>
            <text class="grid-item-label">整体</text>
          </view>
          <view class="grid-item" @click="handleItemClick('ground')">
            <view class="icon-only blue">
              <text class="icon-text">🏞️</text>
            </view>
            <text class="grid-item-label">地面</text>
          </view>
        </view>
      </view>

      <!-- 班报表 -->
      <view class="feature-card">
        <text class="card-title">班报表</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('shift-report')">
            <view class="icon-only blue">
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
import {
  Stratum,
  StandardPenetration,
  DynamicProbe,
  InSituTest,
  Sampling,
  WaterLevel
} from '@/components/drill-detail/recording';
import {
  SingleBox,
  Overall,
  Ground
} from '@/components/drill-detail/imaging';
import {
  ShiftReport
} from '@/components/drill-detail/report';
import {
  DrillDisclosure,
  HolePositioning,
  PipelineDetection,
  ExcavationWork,
  ProtectionWork,
  StrikeWork,
  DrillingWork,
  SafetyCheck,
  SealRecord,
  QualityCheck
} from '@/components/drill-detail/safety';
import {
  VideoMonitor,
  DrillOverview,
  ColumnChart,
  StartCheck,
  SingleCheck,
  SealCheck
} from '@/components/drill-detail/popups';

export default {
  name: 'DrillDetail',
  components: {
    SubPopup,
    VideoMonitor,
    DrillOverview,
    ColumnChart,
    StartCheck,
    SingleCheck,
    SealCheck,
    DrillDisclosure,
    HolePositioning,
    PipelineDetection,
    ExcavationWork,
    ProtectionWork,
    StrikeWork,
    DrillingWork,
    SafetyCheck,
    SealRecord,
    QualityCheck,
    Stratum,
    StandardPenetration,
    DynamicProbe,
    InSituTest,
    Sampling,
    WaterLevel,
    SingleBox,
    Overall,
    Ground,
    ShiftReport
  },
  data() {
    return {
      // 页面数据
      showSubPopup: false,
      subPopupTitle: '',
      currentBusinessType: '',
      
      // 标签页状态
      startCheckActiveTab: 'form',
      singleCheckActiveTab: 'form',
      sealCheckActiveTab: 'form'
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    
    // 处理功能项点击
    handleItemClick(type) {
      this.setPopupInfo(type)
      
      // 显示弹窗
      this.showSubPopup = true
    },
    
    // 设置弹窗信息
    setPopupInfo(type) {
      this.currentBusinessType = type
      
      // 根据不同类型设置不同的标题
      switch(type) {
        case 'video':
          this.subPopupTitle = '视频监控'
          break
        case 'overview':
          this.subPopupTitle = '钻孔概况'
          break
        case 'chart':
          this.subPopupTitle = '柱状图'
          break
        case 'start-check':
          this.subPopupTitle = '开工检查'
          this.startCheckActiveTab = 'form' // 默认显示表单信息
          break
        case 'single-check':
          this.subPopupTitle = '单孔报验'
          this.singleCheckActiveTab = 'form' // 默认显示表单信息
          break
        case 'seal-check':
          this.subPopupTitle = '封孔验收'
          this.sealCheckActiveTab = 'form' // 默认显示表单信息
          break
        case 'disclosure':
          this.subPopupTitle = '钻孔交底'
          break
        case 'positioning':
          this.subPopupTitle = '开孔定位'
          break
        case 'pipeline':
          this.subPopupTitle = '管线探测'
          break
        case 'excavation':
          this.subPopupTitle = '开挖0-3米'
          break
        case 'protection':
          this.subPopupTitle = '围蔽防护'
          break
        case 'strike':
          this.subPopupTitle = '击进3-6米'
          break
        case 'drilling':
          this.subPopupTitle = '机钻施工'
          break
        case 'safety-check':
          this.subPopupTitle = '安全检查'
          break
        case 'seal-record':
          this.subPopupTitle = '封孔记录'
          break
        case 'quality-check':
          this.subPopupTitle = '质量验收'
          break
        case 'stratum':
          this.subPopupTitle = '地层'
          break
        case 'standard-penetration':
          this.subPopupTitle = '标贯'
          break
        case 'dynamic-probe':
          this.subPopupTitle = '动探'
          break
        case 'in-situ-test':
          this.subPopupTitle = '原位测试'
          break
        case 'sampling':
          this.subPopupTitle = '取样'
          break
        case 'water-level':
          this.subPopupTitle = '水位'
          break
        case 'single-box':
          this.subPopupTitle = '单箱'
          break
        case 'overall':
          this.subPopupTitle = '整体'
          break
        case 'ground':
          this.subPopupTitle = '地面'
          break
        case 'shift-report':
          this.subPopupTitle = '班报表'
          break
        default:
          this.subPopupTitle = '详情'
      }
    },
    
    // 切换开工检查标签页
    switchStartCheckTab(tab) {
      this.startCheckActiveTab = tab
    },
    
    // 切换单孔报验标签页
    switchSingleCheckTab(tab) {
      this.singleCheckActiveTab = tab
    },
    
    // 切换封孔验收标签页
    switchSealCheckTab(tab) {
      this.sealCheckActiveTab = tab
    },
    
    // 关闭弹窗
    closeSubPopup() {
      this.showSubPopup = false
    }
  }
}
</script>

<style>
.drill-detail-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
}

/* 顶部导航栏样式 */
.app-header {
  height: 130rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

.header-title {
  font-size: 34rpx;
  font-weight: 500;
  color: #333;
}

.icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  padding: 20rpx;
}

/* 功能卡片样式 */
.feature-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

/* 网格布局 */
.feature-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;
}

.three-columns .grid-item {
  width: 33.33%;
}

.four-columns .grid-item {
  width: 25%;
}

.grid-item {
  padding: 10rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
}

.custom-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.icon-only {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.blue {
  color: #1890ff;
}

.green {
  background-color: #7ed321;
  color: #ffffff;
}

.orange {
  background-color: #f5a623;
  color: #ffffff;
}

.purple {
  background-color: #f5e6ff;
  color: #722ed1;
}

.light {
  background-color: #f5f5f5;
  color: #999999;
}

.icon-text {
  font-size: 36rpx;
}

.grid-item-label {
  font-size: 26rpx;
  color: #666;
  text-align: center;
}

/* 二级弹窗内容样式 */
.sub-popup-content {
  padding: 20rpx;
  height: 100%;
}
</style>
