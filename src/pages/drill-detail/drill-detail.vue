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
          :videoMonitors="videoMonitors"
          @play-video="playVideo"
        />
        <column-chart
          v-else-if="currentBusinessType === 'chart'"
          :layers="columnChartData.layers"
          :dataColumns="columnChartData.dataColumns"
        />
        <start-check
          v-else-if="currentBusinessType === 'start-check'"
          :formData="startCheckData.formData"
          :signatures="startCheckData.signatures"
          :photos="startCheckData.photos"
          :activeTabProp="startCheckActiveTab"
          @preview-photo="previewPhoto"
        />
        <single-check
          v-else-if="currentBusinessType === 'single-check'"
          :formData="singleCheckData.formData"
          :checkResult="singleCheckData.checkResult"
          :signatures="singleCheckData.signatures"
          :photos="singleCheckData.photos"
          :activeTabProp="singleCheckActiveTab"
          @preview-photo="previewPhoto"
        />
        <seal-check
          v-else-if="currentBusinessType === 'seal-check'"
          :formData="sealCheckData.formData"
          :checkItems="sealCheckData.checkItems"
          :checkResult="sealCheckData.checkResult"
          :signatures="sealCheckData.signatures"
          :photos="sealCheckData.photos"
          :activeTabProp="sealCheckActiveTab"
          @preview-photo="previewPhoto"
        />
        <drill-overview
          v-else-if="currentBusinessType === 'overview'"
          :basicInfo="overviewData.basicInfo"
          :progressInfo="overviewData.progressInfo"
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
            <view class="custom-icon blue">
              <text class="icon-text">📹</text>
            </view>
            <text class="grid-item-label">视频监控</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overview')">
            <view class="custom-icon green">
              <text class="icon-text">📊</text>
            </view>
            <text class="grid-item-label">钻孔概况</text>
          </view>
          <view class="grid-item" @click="handleItemClick('chart')">
            <view class="custom-icon orange">
              <text class="icon-text">📈</text>
            </view>
            <text class="grid-item-label">柱状图</text>
          </view>
        </view>
      </view>

      <!-- 施工过程 -->
      <view class="feature-card">
        <text class="card-title">施工过程</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('start-check')">
            <view class="custom-icon purple">
              <text class="icon-text">🔍</text>
            </view>
            <text class="grid-item-label">开工检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('single-check')">
            <view class="custom-icon blue">
              <text class="icon-text">📝</text>
            </view>
            <text class="grid-item-label">单孔报验</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-check')">
            <view class="custom-icon green">
              <text class="icon-text">✅</text>
            </view>
            <text class="grid-item-label">封孔验收</text>
          </view>
          <view class="grid-item" @click="handleItemClick('disclosure')">
            <view class="custom-icon orange">
              <text class="icon-text">📄</text>
            </view>
            <text class="grid-item-label">钻孔交底</text>
          </view>
          <view class="grid-item" @click="handleItemClick('positioning')">
            <view class="custom-icon purple">
              <text class="icon-text">📍</text>
            </view>
            <text class="grid-item-label">开孔定位</text>
          </view>
          <view class="grid-item" @click="handleItemClick('pipeline')">
            <view class="custom-icon blue">
              <text class="icon-text">🔌</text>
            </view>
            <text class="grid-item-label">管线探测</text>
          </view>
          <view class="grid-item" @click="handleItemClick('excavation')">
            <view class="custom-icon green">
              <text class="icon-text">⛏️</text>
            </view>
            <text class="grid-item-label">开挖0-3米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('protection')">
            <view class="custom-icon orange">
              <text class="icon-text">🛡️</text>
            </view>
            <text class="grid-item-label">围蔽防护</text>
          </view>
          <view class="grid-item" @click="handleItemClick('strike')">
            <view class="custom-icon purple">
              <text class="icon-text">🔨</text>
            </view>
            <text class="grid-item-label">击进3-6米</text>
          </view>
          <view class="grid-item" @click="handleItemClick('drilling')">
            <view class="custom-icon blue">
              <text class="icon-text">🔄</text>
            </view>
            <text class="grid-item-label">机钻施工</text>
          </view>
          <view class="grid-item" @click="handleItemClick('safety-check')">
            <view class="custom-icon green">
              <text class="icon-text">🔒</text>
            </view>
            <text class="grid-item-label">安全检查</text>
          </view>
          <view class="grid-item" @click="handleItemClick('seal-record')">
            <view class="custom-icon orange">
              <text class="icon-text">📝</text>
            </view>
            <text class="grid-item-label">封孔记录</text>
          </view>
          <view class="grid-item" @click="handleItemClick('quality-check')">
            <view class="custom-icon purple">
              <text class="icon-text">🏆</text>
            </view>
            <text class="grid-item-label">质量验收</text>
          </view>
        </view>
      </view>

      <!-- 地质信息 -->
      <view class="feature-card">
        <text class="card-title">地质信息</text>
        <view class="feature-grid four-columns">
          <view class="grid-item" @click="handleItemClick('stratum')">
            <view class="custom-icon blue">
              <text class="icon-text">🌍</text>
            </view>
            <text class="grid-item-label">地层</text>
          </view>
          <view class="grid-item" @click="handleItemClick('standard-penetration')">
            <view class="custom-icon green">
              <text class="icon-text">📏</text>
            </view>
            <text class="grid-item-label">标贯</text>
          </view>
          <view class="grid-item" @click="handleItemClick('dynamic-probe')">
            <view class="custom-icon orange">
              <text class="icon-text">🔍</text>
            </view>
            <text class="grid-item-label">动探</text>
          </view>
          <view class="grid-item" @click="handleItemClick('in-situ-test')">
            <view class="custom-icon purple">
              <text class="icon-text">🧪</text>
            </view>
            <text class="grid-item-label">原位测试</text>
          </view>
          <view class="grid-item" @click="handleItemClick('sampling')">
            <view class="custom-icon blue">
              <text class="icon-text">🧫</text>
            </view>
            <text class="grid-item-label">取样</text>
          </view>
          <view class="grid-item" @click="handleItemClick('water-level')">
            <view class="custom-icon green">
              <text class="icon-text">💧</text>
            </view>
            <text class="grid-item-label">水位</text>
          </view>
        </view>
      </view>

      <!-- 影像资料 -->
      <view class="feature-card">
        <text class="card-title">影像资料</text>
        <view class="feature-grid three-columns">
          <view class="grid-item" @click="handleItemClick('single-box')">
            <view class="custom-icon blue">
              <text class="icon-text">📦</text>
            </view>
            <text class="grid-item-label">单箱</text>
          </view>
          <view class="grid-item" @click="handleItemClick('overall')">
            <view class="custom-icon green">
              <text class="icon-text">🖼️</text>
            </view>
            <text class="grid-item-label">整体</text>
          </view>
          <view class="grid-item" @click="handleItemClick('ground')">
            <view class="custom-icon orange">
              <text class="icon-text">🏞️</text>
            </view>
            <text class="grid-item-label">地面</text>
          </view>
        </view>
      </view>

      <!-- 班报表 -->
      <view class="feature-card">
        <text class="card-title">班报表</text>
        <view class="feature-grid three-columns">
          <view class="grid-item" @click="handleItemClick('shift-report')">
            <view class="custom-icon purple">
              <text class="icon-text">📊</text>
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
    SealCheck
  },
  data() {
    return {
      // 页面数据
      showSubPopup: false,
      subPopupTitle: '',
      currentBusinessType: '',
      
      // 视频监控数据
      videoMonitors: [
        { id: 1, name: '钻机视角', thumbnail: '/static/images/video-thumb-1.jpg' },
        { id: 2, name: '全景视角', thumbnail: '/static/images/video-thumb-2.jpg' },
        { id: 3, name: '钻头视角', thumbnail: '/static/images/video-thumb-3.jpg' }
      ],
      
      // 柱状图数据
      columnChartData: {
        imageUrl: '/static/images/column-chart.png',
        scale: 1,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        layers: [
          { name: '粘土', thickness: 150, color: '#f5deb3' },
          { name: '砂土', thickness: 200, color: '#ffe4b5' },
          { name: '砾石', thickness: 180, color: '#d3d3d3' },
          { name: '岩石', thickness: 250, color: '#a9a9a9' }
        ],
        dataColumns: [
          {
            name: '标贯',
            values: [
              { position: 100, text: '10' },
              { position: 250, text: '15' },
              { position: 400, text: '25' },
              { position: 550, text: '30' }
            ]
          },
          {
            name: '取样',
            values: [
              { position: 150, text: 'S1' },
              { position: 350, text: 'S2' },
              { position: 500, text: 'S3' }
            ]
          }
        ]
      },
      
      // 开工检查数据
      startCheckActiveTab: 'form',
      startCheckData: {
        formData: [
          {
            title: '基本信息',
            items: [
              { label: '工程名称', value: '某某工程地质勘察' },
              { label: '钻孔编号', value: 'GK01' },
              { label: '检查日期', value: '2023-06-15' },
              { label: '检查人员', value: '张工' }
            ]
          },
          {
            title: '设备检查',
            items: [
              { label: '钻机型号', value: 'XY-2型' },
              { label: '设备状态', value: '良好' },
              { label: '安全装置', value: '齐全' }
            ]
          }
        ],
        signatures: [
          { role: '项目负责人', name: '李工', date: '2023-06-15', image: '/static/images/signature-1.png' },
          { role: '监理工程师', name: '王工', date: '2023-06-15', image: '/static/images/signature-2.png' },
          { role: '施工负责人', name: '张工', date: '2023-06-15', image: '/static/images/signature-3.png' }
        ],
        photos: [
          { url: '/static/images/start-check-1.jpg', description: '钻机就位' },
          { url: '/static/images/start-check-2.jpg', description: '安全装置检查' },
          { url: '/static/images/start-check-3.jpg', description: '现场环境' }
        ]
      },
      
      // 单孔报验数据
      singleCheckActiveTab: 'form',
      singleCheckData: {
        formData: [
          { label: '钻孔编号', value: 'GK01' },
          { label: '报验日期', value: '2023-07-20' },
          { label: '钻孔深度', value: '30.5米' },
          { label: '施工单位', value: '某某地质勘察公司' },
          { label: '施工负责人', value: '张工' },
          { label: '监理单位', value: '某某监理公司' },
          { label: '监理工程师', value: '王工' }
        ],
        checkResult: {
          status: 'passed',
          statusText: '验收通过',
          comments: '钻孔施工符合设计要求，各项指标达标，准予通过。'
        },
        signatures: [
          { role: '施工负责人', name: '张工', date: '2023-07-20', image: '/static/images/signature-3.png' },
          { role: '监理工程师', name: '王工', date: '2023-07-20', image: '/static/images/signature-2.png' },
          { role: '业主代表', name: '刘总', date: '2023-07-20', image: '/static/images/signature-4.png' }
        ],
        photos: [
          { url: '/static/images/single-check-1.jpg', description: '钻孔全景' },
          { url: '/static/images/single-check-2.jpg', description: '钻孔测量' },
          { url: '/static/images/single-check-3.jpg', description: '取样展示' }
        ]
      },
      
      // 封孔验收数据
      sealCheckActiveTab: 'form',
      sealCheckData: {
        formData: [
          { label: '钻孔编号', value: 'GK01' },
          { label: '验收日期', value: '2023-08-05' },
          { label: '封孔材料', value: '水泥浆' },
          { label: '封孔深度', value: '30.5米' },
          { label: '施工单位', value: '某某地质勘察公司' },
          { label: '监理单位', value: '某某监理公司' }
        ],
        checkItems: [
          { 
            name: '封孔材料', 
            status: 'passed', 
            statusText: '合格', 
            description: '使用标准水泥浆，配比符合规范要求' 
          },
          { 
            name: '封孔深度', 
            status: 'passed', 
            statusText: '合格', 
            description: '封孔深度达到设计要求的30.5米' 
          },
          { 
            name: '封孔质量', 
            status: 'passed', 
            statusText: '合格', 
            description: '封孔密实，无漏浆现象' 
          },
          { 
            name: '地表处理', 
            status: 'passed', 
            statusText: '合格', 
            description: '地表恢复良好，标识清晰' 
          }
        ],
        checkResult: {
          status: 'passed',
          statusText: '验收通过',
          comments: '封孔工作符合设计和规范要求，各项指标合格，准予通过验收。'
        },
        signatures: [
          { role: '施工负责人', name: '张工', date: '2023-08-05', image: '/static/images/signature-3.png' },
          { role: '监理工程师', name: '王工', date: '2023-08-05', image: '/static/images/signature-2.png' },
          { role: '业主代表', name: '刘总', date: '2023-08-05', image: '/static/images/signature-4.png' }
        ],
        photos: [
          { url: '/static/images/seal-check-1.jpg', description: '封孔前准备' },
          { url: '/static/images/seal-check-2.jpg', description: '封孔过程' },
          { url: '/static/images/seal-check-3.jpg', description: '封孔完成' },
          { url: '/static/images/seal-check-4.jpg', description: '地表恢复' }
        ]
      },
      
      // 钻孔概况数据
      overviewData: {
        basicInfo: [
          { label: '钻孔编号', value: 'GK01' },
          { label: '坐标X', value: '123456.78' },
          { label: '坐标Y', value: '987654.32' },
          { label: '设计深度', value: '30.5米' },
          { label: '实际深度', value: '30.5米' },
          { label: '开工日期', value: '2023-06-15' },
          { label: '完工日期', value: '2023-08-05' },
          { label: '施工单位', value: '某某地质勘察公司' }
        ],
        progressInfo: [
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
    
    // 柱状图触摸开始
    handleTouchStart(e) {
      if (e.touches.length === 1) {
        // 单指拖动
        this.columnChartData.isDragging = true
        this.columnChartData.startX = e.touches[0].clientX - this.columnChartData.translateX
        this.columnChartData.startY = e.touches[0].clientY - this.columnChartData.translateY
      } else if (e.touches.length === 2) {
        // 双指缩放 - 记录初始距离
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        this.initialDistance = Math.sqrt(dx * dx + dy * dy)
        this.initialScale = this.columnChartData.scale
      }
    },
    
    // 柱状图触摸移动
    handleTouchMove(e) {
      if (e.touches.length === 1 && this.columnChartData.isDragging) {
        // 单指拖动
        this.columnChartData.translateX = e.touches[0].clientX - this.columnChartData.startX
        this.columnChartData.translateY = e.touches[0].clientY - this.columnChartData.startY
      } else if (e.touches.length === 2) {
        // 双指缩放
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // 计算新的缩放比例
        this.columnChartData.scale = this.initialScale * (distance / this.initialDistance)
        
        // 限制缩放范围
        if (this.columnChartData.scale < 0.5) this.columnChartData.scale = 0.5
        if (this.columnChartData.scale > 3) this.columnChartData.scale = 3
      }
    },
    
    // 柱状图触摸结束
    handleTouchEnd() {
      this.columnChartData.isDragging = false
    },
    
    // 设置弹窗信息
    setPopupInfo(type) {
      this.currentBusinessType = type
      
      // 根据不同类型设置不同的标题
      switch(type) {
        case 'video':
          this.subPopupTitle = '视频监控'
          // 这里可以添加获取视频监控数据的逻辑
          // this.getVideoMonitors()
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
    
    // 播放视频
    playVideo(monitor) {
      // 播放视频的逻辑
      uni.showToast({
        title: `正在播放: ${monitor.name}`,
        icon: 'none'
      })
    },
    
    // 预览照片
    previewPhoto(photo) {
      uni.previewImage({
        urls: [photo.url],
        current: photo.url
      })
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
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
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

.blue {
  background-color: #e6f7ff;
  color: #1890ff;
}

.green {
  background-color: #e6f7e6;
  color: #52c41a;
}

.orange {
  background-color: #fff7e6;
  color: #fa8c16;
}

.purple {
  background-color: #f5e6ff;
  color: #722ed1;
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
