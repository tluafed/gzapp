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
    <sub-popup 
      :show="showSubPopup" 
      :title="subPopupTitle" 
      @close="closeSubPopup"
    >
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
        <view class="card-header-with-status">
          <text class="card-title">编录数据</text>
          <view class="recording-status-section">
            <!-- 编录状态显示 -->
            <view class="status-badge" :class="recordingDataStatus.type">
              <text class="status-text">{{ recordingDataStatus.text }}</text>
            </view>
            <!-- 审核功能按钮 -->
            <view class="action-buttons" v-if="recordingActionButtons.length > 0">
              <button 
                v-for="button in recordingActionButtons" 
                :key="button.key"
                class="action-btn" 
                :class="button.type"
                @click="handleRecordingDataAction(button.key)"
              >
                {{ button.text }}
              </button>
            </view>
          </view>
        </view>
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
          <view class="grid-item" @click="handleItemClick('shift-report')">
            <view class="icon-only blue">
              <text class="icon-text">📋</text>
            </view>
            <text class="grid-item-label">班报表</text>
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
    </scroll-view>

    <!-- 编录数据确认弹窗 -->
    <view class="confirm-popup" v-if="showRecordingConfirmDialog">
      <view class="confirm-mask" @click="closeRecordingConfirmDialog"></view>
      <view class="confirm-content">
        <view class="confirm-header">
          <text class="confirm-title">{{ recordingConfirmConfig.title }}</text>
        </view>
        <view class="confirm-body">
          <text class="confirm-message">{{ recordingConfirmConfig.message }}</text>
          <textarea 
            v-if="recordingConfirmConfig.needRemark"
            class="confirm-textarea"
            v-model="recordingRemarkText"
            :placeholder="recordingConfirmConfig.remarkPlaceholder"
          ></textarea>
        </view>
        <view class="confirm-footer">
          <button class="confirm-btn cancel" @click="closeRecordingConfirmDialog">取消</button>
          <button class="confirm-btn confirm" @click="handleRecordingConfirm">确定</button>
        </view>
      </view>
    </view>
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
      sealCheckActiveTab: 'form',
      
      // 当前用户角色：technician(技术员), auditor(审核员), other(其他)
      currentUserRole: 'technician',
      
      // 编录数据整体状态：unsubmitted(未提交), submitted(已提交), approved(已审核)
      recordingDataOverallStatus: 'unsubmitted',
      
      // 编录数据提交和审核时间
      recordingSubmitTime: '',
      recordingApproveTime: '',
      
      // 确认弹窗状态
      showRecordingConfirmDialog: false,
      recordingConfirmConfig: {},
      recordingRemarkText: '',
      currentRecordingAction: ''
    }
  },
  computed: {
    // 编录数据整体状态配置
    recordingDataStatus() {
      switch (this.recordingDataOverallStatus) {
        case 'unsubmitted':
          return { type: 'unsubmitted', text: '未提交' };
        case 'submitted':
          return { type: 'submitted', text: '已提交' };
        case 'approved':
          return { type: 'approved', text: '已审核' };
        default:
          return { type: 'unsubmitted', text: '未提交' };
      }
    },
    
    // 编录数据操作按钮
    recordingActionButtons() {
      const buttons = [];
      
      // 状态1：技术员 + 未提交 -> 提交按钮
      if (this.currentUserRole === 'technician' && this.recordingDataOverallStatus === 'unsubmitted') {
        buttons.push({ key: 'submit', text: '提交', type: 'primary' });
      }
      // 状态2：技术员 + 已提交 -> 撤回按钮
      else if (this.currentUserRole === 'technician' && this.recordingDataOverallStatus === 'submitted') {
        buttons.push({ key: 'withdraw', text: '撤回', type: 'default' });
      }
      // 状态4：审核员 + 已提交 -> 审核不通过 + 审核通过
      else if (this.currentUserRole === 'auditor' && this.recordingDataOverallStatus === 'submitted') {
        buttons.push({ key: 'reject', text: '审核不通过', type: 'danger' });
        buttons.push({ key: 'approve', text: '审核通过', type: 'success' });
      }
      // 状态3、5、6：无按钮
      
      return buttons;
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
    },
    
    
    // 处理编录数据整体操作
    handleRecordingDataAction(action) {
      this.currentRecordingAction = action;
      
      switch (action) {
        case 'submit':
          this.showRecordingConfirmDialog = true;
          this.recordingConfirmConfig = {
            title: '提交确认',
            message: '确定要提交所有编录数据吗？',
            needRemark: true,
            remarkPlaceholder: '请输入备注信息'
          };
          break;
        case 'withdraw':
          this.showRecordingConfirmDialog = true;
          this.recordingConfirmConfig = {
            title: '撤回确认',
            message: '确定要撤回编录数据吗？',
            needRemark: false
          };
          break;
        case 'reject':
          this.showRecordingConfirmDialog = true;
          this.recordingConfirmConfig = {
            title: '审核不通过',
            message: '确定编录数据审核不通过吗？',
            needRemark: true,
            remarkPlaceholder: '请输入审批意见'
          };
          break;
        case 'approve':
          this.showRecordingConfirmDialog = true;
          this.recordingConfirmConfig = {
            title: '审核通过',
            message: '确定编录数据审核通过吗？',
            needRemark: true,
            remarkPlaceholder: '请输入审批意见'
          };
          break;
      }
    },
    
    // 关闭编录数据确认弹窗
    closeRecordingConfirmDialog() {
      this.showRecordingConfirmDialog = false;
      this.recordingRemarkText = '';
      this.currentRecordingAction = '';
    },
    
    // 处理编录数据确认操作
    handleRecordingConfirm() {
      if (this.recordingConfirmConfig.needRemark && !this.recordingRemarkText.trim()) {
        uni.showToast({
          title: this.recordingConfirmConfig.remarkPlaceholder,
          icon: 'none'
        });
        return;
      }
      
      const action = this.currentRecordingAction;
      const remark = this.recordingRemarkText;
      
      switch (action) {
        case 'submit':
          // 提交操作：未提交 -> 已提交
          this.recordingDataOverallStatus = 'submitted';
          this.recordingSubmitTime = new Date().toLocaleString();
          uni.showToast({
            title: '编录数据提交成功',
            icon: 'success'
          });
          console.log(`提交编录数据，备注：${remark}`);
          break;
          
        case 'withdraw':
          // 撤回操作：已提交 -> 未提交
          this.recordingDataOverallStatus = 'unsubmitted';
          this.recordingSubmitTime = '';
          uni.showToast({
            title: '编录数据撤回成功',
            icon: 'success'
          });
          console.log('撤回编录数据');
          break;
          
        case 'reject':
          // 审核不通过：已提交 -> 未提交
          this.recordingDataOverallStatus = 'unsubmitted';
          this.recordingSubmitTime = '';
          uni.showToast({
            title: '编录数据审核不通过',
            icon: 'none'
          });
          console.log(`编录数据审核不通过，审批意见：${remark}`);
          break;
          
        case 'approve':
          // 审核通过：已提交 -> 已审核
          this.recordingDataOverallStatus = 'approved';
          this.recordingApproveTime = new Date().toLocaleString();
          uni.showToast({
            title: '编录数据审核通过',
            icon: 'success'
          });
          console.log(`编录数据审核通过，审批意见：${remark}`);
          break;
      }
      
      this.closeRecordingConfirmDialog();
    },
    
    // 切换用户角色（用于测试）
    switchUserRole(role) {
      this.currentUserRole = role;
      uni.showToast({
        title: `切换为${role === 'technician' ? '技术员' : role === 'auditor' ? '审核员' : '其他'}`,
        icon: 'none'
      });
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

/* 编录数据卡片头部样式 */
.card-header-with-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.recording-status-section {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.status-badge {
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 500;
}

.status-badge.unsubmitted {
  background-color: #f5f5f5;
  color: #999999;
}

.status-badge.submitted {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-badge.approved {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-text {
  font-size: 22rpx;
}

.action-buttons {
  display: flex;
  gap: 12rpx;
}

.action-btn {
  height: 56rpx;
  padding: 0 20rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  border: 1rpx solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80rpx;
}

.action-btn.default {
  background-color: #ffffff;
  color: #666666;
  border-color: #d9d9d9;
}

.action-btn.primary {
  background-color: #1890ff;
  color: #ffffff;
  border-color: #1890ff;
}

.action-btn.success {
  background-color: #52c41a;
  color: #ffffff;
  border-color: #52c41a;
}

.action-btn.danger {
  background-color: #ff4d4f;
  color: #ffffff;
  border-color: #ff4d4f;
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
  padding: 0;
  height: 100%;
}

/* 确认弹窗样式 */
.confirm-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
}

.confirm-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.confirm-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
}

.confirm-header {
  padding: 40rpx 30rpx 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.confirm-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
  text-align: center;
}

.confirm-body {
  padding: 30rpx;
}

.confirm-message {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 20rpx;
}

.confirm-textarea {
  width: 100%;
  height: 160rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333333;
  background-color: #ffffff;
  box-sizing: border-box;
}

.confirm-footer {
  display: flex;
  border-top: 1rpx solid #f0f0f0;
}

.confirm-btn {
  flex: 1;
  height: 88rpx;
  border: none;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-btn.cancel {
  background-color: #ffffff;
  color: #666666;
  border-right: 1rpx solid #f0f0f0;
}

.confirm-btn.confirm {
  background-color: #ffffff;
  color: #1890ff;
  border-radius: 0 0 16rpx 0;
}

.confirm-btn.cancel:first-child {
  border-radius: 0 0 0 16rpx;
}
</style>
