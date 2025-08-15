<template>
  <view class="start-check-container">
    <view class="tab-header">
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'form' }" 
        @click="activeTab = 'form'"
      >
        表单信息
      </view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'process' }" 
        @click="activeTab = 'process'"
      >
        流程信息
      </view>
    </view>
    
    <view class="tab-content">
      <!-- 表单信息 -->
      <view v-if="activeTab === 'form'" class="form-content">
        <!-- 基本信息 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">基本信息</text>
          </view>
          <view class="form-list">
            <view class="form-item">
              <text class="form-label required">标段</text>
              <picker mode="selector" :value="0" :range="['afb2a52a-8879-40ee-bb5b-08c6e25c8a1b']">
                <view class="form-value">afb2a52a-8879-40ee-bb5b-08c6e25c8a1b</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">工点</text>
              <picker mode="selector" :value="0" :range="['L018B00001']">
                <view class="form-value">L018B00001</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">编号</text>
              <input class="form-input" value="L018B-Z3-1-A7-1819" />
            </view>
            
            <view class="form-item">
              <text class="form-label required">工程项目</text>
              <view class="form-value multiline">粤港澳大湾区城际线路广州东至花都天贵工程【广州东站-京溪站区间】详勘勘察</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">钻孔编号</text>
              <picker mode="selector" :value="0" :range="['MRNZ3-GJ-01']">
                <view class="form-value">MRNZ3-GJ-01</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">编录技术员</text>
              <picker mode="selector" :value="0" :range="['5ee3647e-3ddd-4327-acf5-273f06e811cd']">
                <view class="form-value">5ee3647e-3ddd-4327-acf5-273f06e811cd</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">机台编号</text>
              <picker mode="selector" :value="0" :range="['1#刘建祥']">
                <view class="form-value">1#刘建祥</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">机长</text>
              <picker mode="selector" :value="0" :range="['刘建祥']">
                <view class="form-value">刘建祥</view>
              </picker>
            </view>
          </view>
        </view>

        <!-- 相关业务 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">相关业务</text>
          </view>
          <view class="business-content">
            <view class="business-row">
              <view class="business-label">围敝类型</view>
              <view class="option-group">
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">防撞墙</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">反光条及挡土</text>
                </view>
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">警示筒</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">单色布</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">抽水机械马达</text>
                </view>
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">引路牌</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">警示灯</text>
                </view>
              </view>
            </view>
            <view class="business-row">
              <view class="business-label">技术准备</view>
              <view class="option-group">
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">责任条款验收表</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">班组表及岗心牌</text>
                </view>
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">标识牌及取样器</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">安全帽眼镜等一</text>
                </view>
              </view>
            </view>
            <view class="business-row">
              <view class="business-label">管线排查</view>
              <view class="option-group">
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">已按委管线图</text>
                </view>
                <view class="option-item">
                  <view class="option-icon"></view>
                  <text class="option-text">孔位已确保既有管线</text>
                </view>
                <view class="option-item checked">
                  <view class="option-icon">✓</view>
                  <text class="option-text">已征询管线权属单位意见</text>
                </view>
              </view>
            </view>
            <view class="business-row">
              <view class="business-label">人工挖探</view>
              <view class="option-group">
                <view class="option-item checked radio">
                  <view class="option-icon radio-icon"></view>
                  <text class="option-text">洛阳铲挖探</text>
                </view>
                <view class="option-item radio">
                  <view class="option-icon radio-icon"></view>
                  <text class="option-text">坑探</text>
                </view>
              </view>
            </view>
            <view class="business-row">
              <view class="business-label">封孔准备</view>
              <view class="option-group">
                <view class="option-item checked radio">
                  <view class="option-icon radio-icon"></view>
                  <text class="option-text">黄泥到位</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 附件 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">附件</text>
          </view>
          <view class="attachment-list">
            <view class="attachment-item" v-for="(file, index) in attachments" :key="index">
              <view class="file-icon">📄</view>
              <view class="file-info">
                <text class="file-name">{{ file.name }}</text>
                <text class="file-size">{{ file.size }}</text>
              </view>
              <view class="file-actions">
                <text class="action-btn" @click="previewFile(file)">查看</text>
                <text class="action-btn" @click="downloadFile(file)">下载</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 流程信息 -->
      <view v-else-if="activeTab === 'process'" class="process-content">
        <view class="process-list">
          <view class="process-item current">
            <view class="process-dot current"></view>
            <view class="process-info">
              <view class="process-title">监理审批</view>
              <view class="process-status current">进行中</view>
              <view class="process-detail">
                <text class="process-user">操作人：王监理</text>
              </view>
            </view>
          </view>
          
          <view class="process-item completed">
            <view class="process-dot completed"></view>
            <view class="process-info">
              <view class="process-title">项目总工审批</view>
              <view class="process-status completed">已同意</view>
              <view class="process-detail">
                <text class="process-user">操作人：李总工</text>
                <text class="process-time">完成时间：2025-02-01 10:30:05</text>
              </view>
            </view>
          </view>
          
          <view class="process-item completed">
            <view class="process-dot completed"></view>
            <view class="process-info">
              <view class="process-title">发起申请</view>
              <view class="process-status completed">已提交</view>
              <view class="process-detail">
                <text class="process-user">操作人：陈欣雄</text>
                <text class="process-time">完成时间：2025-02-01 08:18:00</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'StartCheck',
  props: {
    activeTabProp: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      activeTab: this.activeTabProp,
      attachments: [
        { name: '开工检查表.pdf', size: '2.5MB' },
        { name: '现场照片.zip', size: '15.8MB' },
        { name: '设备检查记录.doc', size: '1.2MB' }
      ]
    }
  },
  watch: {
    activeTabProp(newVal) {
      this.activeTab = newVal
    }
  },
  methods: {
    previewFile(file) {
      uni.showToast({
        title: `预览 ${file.name}`,
        icon: 'none'
      })
    },
    
    downloadFile(file) {
      uni.showToast({
        title: `下载 ${file.name}`,
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.start-check-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tab-header {
  display: flex;
  border-bottom: 1rpx solid #eee;
  background-color: #fff;
  margin-top: -0;
  padding-top: 0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #1890ff;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #1890ff;
  border-radius: 2rpx;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
}

/* 表单信息样式 */
.form-content {
  padding: 12rpx;
  background-color: #fff;
}

.info-section {
  margin-bottom: 40rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  position: relative;
}

.info-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #e8e8e8, transparent);
}

.info-section:last-child {
  margin-bottom: 30rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.section-indicator {
  width: 8rpx;
  height: 32rpx;
  background-color: #1890ff;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.form-list {
  padding: 0;
}

.form-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.form-item:last-child {
  border-bottom: none;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  position: relative;
}

.form-label.required::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 8rpx;
}

.form-value {
  font-size: 28rpx;
  color: #666;
  background-color: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e8e8e8;
  min-height: 24rpx;
  line-height: 1.4;
}

.form-value.multiline {
  line-height: 1.6;
  min-height: 60rpx;
}

.form-input {
  font-size: 28rpx;
  color: #333;
  background-color: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e8e8e8;
}

/* 相关业务样式 */
.business-content {
  padding: 20rpx 30rpx 30rpx 30rpx;
}

.business-row {
  margin-bottom: 40rpx;
}

.business-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.option-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.option-item {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #666;
  margin-right: 30rpx;
  margin-bottom: 15rpx;
}

.option-item.checked {
  color: #1890ff;
}

.option-icon {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #d9d9d9;
  border-radius: 4rpx;
  margin-right: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: bold;
  background-color: #fff;
}

.option-item.checked .option-icon {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.radio-icon {
  border-radius: 50% !important;
  font-size: 24rpx;
}

.option-item.radio .option-icon {
  border-radius: 50%;
}

.option-item.radio.checked .option-icon {
  background-color: #fff;
  border-color: #1890ff;
  border-width: 6rpx;
  position: relative;
}

.option-item.radio.checked .option-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rpx;
  height: 12rpx;
  background-color: #1890ff;
  border-radius: 50%;
}

.option-text {
  flex: 1;
}

/* 附件样式 */
.attachment-list {
  padding: 20rpx 30rpx 30rpx 30rpx;
}

.attachment-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.attachment-item:last-child {
  border-bottom: none;
}

.file-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.file-size {
  font-size: 24rpx;
  color: #999;
}

.file-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  font-size: 26rpx;
  color: #1890ff;
  padding: 8rpx 16rpx;
  border: 1rpx solid #1890ff;
  border-radius: 6rpx;
  background-color: transparent;
}

/* 流程信息样式 */
.process-content {
  padding: 30rpx;
  background-color: #fff;
}

.process-list {
  position: relative;
}

.process-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 50rpx;
  position: relative;
}

.process-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 22rpx;
  top: 44rpx;
  bottom: -50rpx;
  width: 2rpx;
  background-color: #e8e8e8;
}

.process-dot {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-dot.current {
  background-color: #1890ff;
  border: 4rpx solid #e6f7ff;
}

.process-dot.completed {
  background-color: #52c41a;
  border: 4rpx solid #f6ffed;
}

.process-info {
  flex: 1;
  padding-top: 4rpx;
}

.process-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.process-status {
  font-size: 28rpx;
  margin-bottom: 12rpx;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  display: inline-block;
}

.process-status.current {
  background-color: #e6f7ff;
  color: #1890ff;
}

.process-status.completed {
  background-color: #f6ffed;
  color: #52c41a;
}

.process-detail {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.process-user {
  font-size: 26rpx;
  color: #666;
}

.process-time {
  font-size: 24rpx;
  color: #999;
}
</style>
