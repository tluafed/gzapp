<template>
  <view class="seal-check-container">
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
              <view class="form-value">粤港澳大湾区城际线路广州东至花都天贵工程 初步勘察-1标</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">工点</text>
              <view class="form-value">广州东至石牌</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">编号</text>
              <view class="form-value">L018B-Z2-1-A9-0369</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">工程项目</text>
              <view class="form-value multiline">粤港澳大湾区城际线路广州东至花都天贵工程详勘车站段及出入段线初步勘察</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">钻孔编号</text>
              <view class="form-value">MRNZ2-A256S</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">现场技术员</text>
              <view class="form-value">李新华</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">钻机机长</text>
              <view class="form-value">--请选择--</view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">日期</text>
              <view class="form-value">2025-08-15</view>
            </view>
          </view>
        </view>

        <!-- 自检意见 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">自检意见</text>
          </view>
          <view class="form-list">
            <view class="form-item">
              <text class="form-label required">开孔日期</text>
              <picker mode="date" :value="startDate" @change="onStartDateChange">
                <view class="form-input editable">2021-04-10</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">终孔日期</text>
              <picker mode="date" :value="endDate" @change="onEndDateChange">
                <view class="form-input editable">2021-04-15</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="form-label required">坐标X</text>
              <input class="form-input" v-model="formData.coordinateX" placeholder="请输入坐标X" />
            </view>
            
            <view class="form-item">
              <text class="form-label required">坐标Y</text>
              <input class="form-input" v-model="formData.coordinateY" placeholder="请输入坐标Y" />
            </view>
            
            <view class="form-item">
              <text class="form-label required">终孔深度 (m)</text>
              <input class="form-input" v-model="formData.finalDepth" placeholder="请输入终孔深度" />
            </view>
            
            <view class="form-item">
              <text class="form-label required">封孔方法</text>
              <view class="form-value-tags">
                <view class="tag" :class="{ active: formData.sealMethods.includes('孔底往上逐渐水泥浆') }" @click="toggleSealMethod('孔底往上逐渐水泥浆')">孔底往上逐渐水泥浆</view>
              </view>
            </view>
            
            <view class="form-item">
              <text class="form-label">水泥用量(包)</text>
              <input class="form-input" v-model="formData.cementAmount" placeholder="请填写水泥用量(包)" />
            </view>
            
            <view class="form-item">
              <text class="form-label">停置条件</text>
              <view class="form-value-tags">
                <view class="tag" :class="{ active: formData.stopConditions.includes('孔口返浆后停泥水泥浆') }" @click="toggleStopCondition('孔口返浆后停泥水泥浆')">孔口返浆后停泥水泥浆</view>
              </view>
            </view>
            
            <view class="form-item">
              <text class="form-label">孔口恢复</text>
              <view class="form-value-tags">
                <view class="tag" :class="{ active: formData.holeRestoration.includes('水泥砂浆恢复') }" @click="toggleHoleRestoration('水泥砂浆恢复')">水泥砂浆恢复</view>
              </view>
            </view>
            
            <view class="form-item">
              <text class="form-label">封孔录像</text>
              <view class="form-value-tags">
                <view class="tag" :class="{ active: formData.sealVideo.includes('内容完整，清晰') }" @click="toggleSealVideo('内容完整，清晰')">内容完整，清晰</view>
              </view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">自检意见</text>
              <textarea class="form-textarea" v-model="formData.selfCheckOpinion" placeholder="请输入自检意见"></textarea>
            </view>
          </view>
        </view>

        <!-- 验收意见 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">验收意见</text>
          </view>
          <view class="business-content">
            <view class="business-row">
              <view class="business-label">验收结论</view>
              <view class="radio-options">
                <view class="radio-option" :class="{ active: formData.acceptanceResult === 'agree' }" @click="setAcceptanceResult('agree')">
                  <view class="radio-circle">
                    <view class="radio-inner" v-if="formData.acceptanceResult === 'agree'"></view>
                  </view>
                  <text class="radio-text">同意自检意见，通过该孔封孔验收</text>
                </view>
                <view class="radio-option" :class="{ active: formData.acceptanceResult === 'disagree' }" @click="setAcceptanceResult('disagree')">
                  <view class="radio-circle">
                    <view class="radio-inner" v-if="formData.acceptanceResult === 'disagree'"></view>
                  </view>
                  <text class="radio-text">不同意自检意见，该孔重新封孔</text>
                </view>
              </view>
            </view>
            
            <view class="form-item">
              <text class="form-label required">验收意见</text>
              <textarea class="form-textarea" v-model="formData.acceptanceOpinion" placeholder="请输入验收意见"></textarea>
            </view>
            
            <view class="form-item">
              <text class="form-label">备注</text>
              <textarea class="form-textarea" v-model="formData.remarks" placeholder="请输入备注"></textarea>
            </view>
          </view>
        </view>

        <!-- 附件 -->
        <view class="info-section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">附件</text>
          </view>
          <view class="attachment-content">
            <view class="attachment-list" v-if="attachments.length > 0">
              <view class="attachment-item" v-for="(file, index) in attachments" :key="index">
                <view class="file-icon">📄</view>
                <view class="file-info">
                  <text class="file-name">{{ file.name }}</text>
                  <text class="file-size">{{ file.size }}</text>
                </view>
                <view class="file-actions">
                  <text class="action-btn" @click="previewFile(file)">查看</text>
                  <text class="action-btn delete" @click="deleteFile(index)">删除</text>
                </view>
              </view>
            </view>
            
            <view class="upload-section">
              <view class="upload-btn" @click="uploadFile">
                <text class="upload-icon">+</text>
                <text class="upload-text">上传附件</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 底部按钮 -->
        <view class="form-actions">
          <button class="action-btn save-btn" @click="saveForm">保存</button>
          <button class="action-btn submit-btn" @click="submitForm">提交</button>
        </view>
      </view>
      
      <!-- 流程信息 -->
      <view v-else-if="activeTab === 'process'" class="process-content">
        <view class="process-list">
          <view class="process-item current">
            <view class="process-dot current"></view>
            <view class="process-info">
              <view class="process-title">发起申请</view>
              <view class="process-status current">进行中</view>
              <view class="process-detail">
                <text class="process-user">操作人：陈欣雄</text>
                <text class="process-time">开始时间：2025-08-15 09:30:00</text>
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
  name: 'SealCheck',
  props: {
    activeTabProp: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      activeTab: this.activeTabProp,
      startDate: '2021-04-10',
      endDate: '2021-04-15',
      formData: {
        coordinateX: '248669.9375',
        coordinateY: '389717.8516',
        finalDepth: '16',
        sealMethods: ['孔底往上逐渐水泥浆'],
        cementAmount: '',
        stopConditions: ['孔口返浆后停泥水泥浆'],
        holeRestoration: ['水泥砂浆恢复'],
        sealVideo: ['内容完整，清晰'],
        selfCheckOpinion: '',
        acceptanceResult: 'agree',
        acceptanceOpinion: '',
        remarks: ''
      },
      attachments: [
        { name: '封孔验收表.pdf', size: '2.1MB' },
        { name: '封孔录像.mp4', size: '45.8MB' },
        { name: '现场照片.zip', size: '8.3MB' }
      ]
    }
  },
  watch: {
    activeTabProp(newVal) {
      this.activeTab = newVal
    }
  },
  methods: {
    onStartDateChange(e) {
      this.startDate = e.detail.value
    },
    
    onEndDateChange(e) {
      this.endDate = e.detail.value
    },
    
    toggleSealMethod(value) {
      const index = this.formData.sealMethods.indexOf(value);
      if (index === -1) {
        this.formData.sealMethods.push(value);
      } else {
        this.formData.sealMethods.splice(index, 1);
      }
    },
    
    toggleStopCondition(value) {
      const index = this.formData.stopConditions.indexOf(value);
      if (index === -1) {
        this.formData.stopConditions.push(value);
      } else {
        this.formData.stopConditions.splice(index, 1);
      }
    },
    
    toggleHoleRestoration(value) {
      const index = this.formData.holeRestoration.indexOf(value);
      if (index === -1) {
        this.formData.holeRestoration.push(value);
      } else {
        this.formData.holeRestoration.splice(index, 1);
      }
    },
    
    toggleSealVideo(value) {
      const index = this.formData.sealVideo.indexOf(value);
      if (index === -1) {
        this.formData.sealVideo.push(value);
      } else {
        this.formData.sealVideo.splice(index, 1);
      }
    },
    
    setAcceptanceResult(value) {
      this.formData.acceptanceResult = value;
    },
    
    previewFile(file) {
      uni.showToast({
        title: `预览 ${file.name}`,
        icon: 'none'
      })
    },
    
    deleteFile(index) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这个附件吗？',
        success: (res) => {
          if (res.confirm) {
            this.attachments.splice(index, 1)
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    },
    
    uploadFile() {
      uni.chooseFile({
        count: 1,
        success: (res) => {
          const file = res.tempFiles[0]
          // 模拟上传
          this.attachments.push({
            name: file.name || '新文件.pdf',
            size: this.formatFileSize(file.size || 1024000)
          })
          uni.showToast({
            title: '上传成功',
            icon: 'success'
          })
        }
      })
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i]
    },
    
    saveForm() {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
      this.$emit('save', this.formData)
    },
    
    submitForm() {
      uni.showModal({
        title: '确认提交',
        content: '是否确认提交封孔验收申请？提交后将进入审核流程。',
        confirmText: '确认提交',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 模拟提交过程
            uni.showLoading({
              title: '提交中...'
            })
            
            setTimeout(() => {
              uni.hideLoading()
              uni.showToast({
                title: '提交成功',
                icon: 'success'
              })
              this.$emit('submit', this.formData)
            }, 1500)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.seal-check-container {
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
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #d9d9d9;
}

.form-input.editable {
  background-color: #fff;
  border: 1rpx solid #d9d9d9;
  color: #333;
}

.form-textarea {
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #d9d9d9;
  min-height: 120rpx;
  line-height: 1.6;
}

/* 标签样式 */
.form-value-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 16rpx 0;
}

.tag {
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  border: 1rpx solid #e8e8e8;
  cursor: pointer;
}

.tag.active {
  color: #1890ff;
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

/* 单选框样式 */
.radio-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 16rpx 0;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-circle {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #d9d9d9;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-option.active .radio-circle {
  border-color: #1890ff;
}

.radio-inner {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background-color: #1890ff;
}

.radio-text {
  font-size: 28rpx;
  color: #333;
}

.radio-option.active .radio-text {
  color: #1890ff;
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

/* 附件样式 */
.attachment-content {
  padding: 20rpx 30rpx 30rpx 30rpx;
}

.attachment-list {
  margin-bottom: 30rpx;
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

.action-btn.delete {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.upload-section {
  display: flex;
  justify-content: center;
  padding: 30rpx 0;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  height: 120rpx;
  border: 2rpx dashed #d9d9d9;
  border-radius: 8rpx;
  background-color: #fafafa;
  color: #666;
}

.upload-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.upload-text {
  font-size: 24rpx;
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

/* 底部按钮样式 */
.form-actions {
  display: flex;
  gap: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #f0f0f0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 8rpx;
  font-size: 32rpx;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  background-color: #f5f5f5;
  color: #666;
}

.save-btn:active {
  background-color: #e8e8e8;
}

.submit-btn {
  background-color: #1890ff;
  color: #fff;
}

.submit-btn:active {
  background-color: #096dd9;
}
</style>