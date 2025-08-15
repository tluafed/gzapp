<template>
  <view class="quality-check-container">
    <view class="form-content">
      <!-- 基本信息 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">基本信息</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">项目名称</text>
            <view class="form-value">粤港澳大湾区城际线路广州东至花都天贵工程</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">勘察阶段</text>
            <view class="form-value">初步勘察</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">钻孔编号</text>
            <view class="form-value">MRNZ2-A256S</view>
          </view>
        </view>
      </view>

      <!-- 钻探质量 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">钻探质量</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">钻探质量检查项</text>
            <view class="form-value-tags">
              <view class="tag" 
                v-for="(item, index) in qualityCheckOptions" 
                :key="index"
                :class="{ active: formData.qualityCheckItems.includes(item) }" 
                @click="toggleQualityCheckItem(item)">
                {{ item }}
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机长签名</text>
            <input class="form-input" v-model="formData.drillerSignature" placeholder="请输入机长姓名" />
          </view>
          
          <view class="form-item">
            <text class="form-label">勘察现场技术员签名</text>
            <input class="form-input" v-model="formData.technicianSignature" placeholder="请输入勘察现场技术员姓名" />
          </view>
          
          <view class="form-item">
            <text class="form-label">复核人签名</text>
            <input class="form-input" v-model="formData.reviewerSignature" placeholder="请输入复核人姓名" />
          </view>
        </view>
      </view>

      <!-- 编录检查 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">编录检查</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">编录质量检查项</text>
            <view class="form-value-tags">
              <view class="tag" 
                v-for="(item, index) in recordingCheckOptions" 
                :key="index"
                :class="{ active: formData.recordingCheckItems.includes(item) }" 
                @click="toggleRecordingCheckItem(item)">
                {{ item }}
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">存在问题及处理意见</text>
            <textarea class="form-textarea" v-model="formData.issues" placeholder="请输入存在问题及处理意见"></textarea>
          </view>
          
          <view class="form-item">
            <text class="form-label">机长签名</text>
            <input class="form-input" v-model="formData.drillerSignature2" placeholder="请输入机长姓名" />
          </view>
          
          <view class="form-item">
            <text class="form-label">勘察现场技术员签名</text>
            <input class="form-input" v-model="formData.technicianSignature2" placeholder="请输入勘察现场技术员姓名" />
          </view>
          
          <view class="form-item">
            <text class="form-label">复核人签名</text>
            <input class="form-input" v-model="formData.reviewerSignature2" placeholder="请输入复核人姓名" />
          </view>
        </view>
      </view>

      <!-- 安全文明施工 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">安全文明施工</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">场地清扫</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.siteCleaning === '是' }" @click="formData.siteCleaning = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.siteCleaning === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.siteCleaning === '否' }" @click="formData.siteCleaning = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.siteCleaning === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">余泥外运</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.wasteRemoval === '是' }" @click="formData.wasteRemoval = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.wasteRemoval === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.wasteRemoval === '否' }" @click="formData.wasteRemoval = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.wasteRemoval === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 钻探抽水 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">钻探抽水</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">孔深</text>
            <view class="form-value">{{ formData.holeDepth }}米</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">土厚度</text>
            <input class="form-input" v-model="formData.soilThickness" placeholder="请输入土厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">填石厚度</text>
            <input class="form-input" v-model="formData.fillingStoneThickness" placeholder="请输入填石厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">卵石厚度</text>
            <input class="form-input" v-model="formData.pebbleThickness" placeholder="请输入卵石厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">岩 红层厚度</text>
            <input class="form-input" v-model="formData.redRockThickness" placeholder="请输入岩红层厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">岩 花岗岩岩厚度</text>
            <input class="form-input" v-model="formData.graniteThickness" placeholder="请输入花岗岩岩厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">岩 灰岩厚度</text>
            <input class="form-input" v-model="formData.limestoneThickness" placeholder="请输入灰岩厚度" />
          </view>
          
          <view class="form-item">
            <text class="form-label">误工天数</text>
            <input class="form-input" v-model="formData.downtime" placeholder="请输入误工天数" />
          </view>
          
          <view class="form-item">
            <text class="form-label">夜间施工</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.nightWork === '是' }" @click="formData.nightWork = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.nightWork === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.nightWork === '否' }" @click="formData.nightWork = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.nightWork === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">抽水</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.pumping === '是' }" @click="formData.pumping = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.pumping === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.pumping === '否' }" @click="formData.pumping = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.pumping === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">注水</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.waterInjection === '是' }" @click="formData.waterInjection = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.waterInjection === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.waterInjection === '否' }" @click="formData.waterInjection = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.waterInjection === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">土降深次数</text>
            <input class="form-input" v-model="formData.soilDepthCount" placeholder="请输入土降深次数" />
          </view>
          
          <view class="form-item">
            <text class="form-label">岩降深次数</text>
            <input class="form-input" v-model="formData.rockDepthCount" placeholder="请输入岩降深次数" />
          </view>
          
          <view class="form-item">
            <text class="form-label">场景及岩芯照片数量</text>
            <view class="form-value">{{ formData.photoCount }}</view>
          </view>
        </view>
      </view>

      <!-- 取样 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">取样</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">原状土样 薄壁组数</text>
            <view class="form-value">{{ formData.thinWallSoilCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">原状土样 厚壁组数</text>
            <view class="form-value">{{ formData.thickWallSoilCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">扰动样组数</text>
            <view class="form-value">{{ formData.disturbedSampleCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">岩样组数</text>
            <view class="form-value">{{ formData.rockSampleCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">水样组数</text>
            <view class="form-value">{{ formData.waterSampleCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">土易溶盐组数</text>
            <view class="form-value">{{ formData.solubleSaltCount }}</view>
          </view>
        </view>
      </view>

      <!-- 原位测试 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">原位测试</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">标贯次数</text>
            <view class="form-value">{{ formData.sptCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">动探深度</text>
            <view class="form-value">{{ formData.dynamicProbeDepth }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">旁压点数</text>
            <view class="form-value">{{ formData.pressurePointCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">静探深度</text>
            <view class="form-value">{{ formData.staticProbeDepth }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">十字板点数</text>
            <view class="form-value">{{ formData.vaneShearsCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">波速点数</text>
            <view class="form-value">{{ formData.waveVelocityCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">电导率点数</text>
            <view class="form-value">{{ formData.conductivityCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">地温点数</text>
            <view class="form-value">{{ formData.groundTempCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">气点数</text>
            <view class="form-value">{{ formData.gasPointCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">有害气体点数</text>
            <view class="form-value">{{ formData.harmfulGasCount }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">原位测试合格</text>
            <view class="radio-options">
              <view class="radio-option" :class="{ active: formData.inSituTestPass === '是' }" @click="formData.inSituTestPass = '是'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.inSituTestPass === '是'"></view>
                </view>
                <text class="radio-text">是</text>
              </view>
              <view class="radio-option" :class="{ active: formData.inSituTestPass === '否' }" @click="formData.inSituTestPass = '否'">
                <view class="radio-circle">
                  <view class="radio-inner" v-if="formData.inSituTestPass === '否'"></view>
                </view>
                <text class="radio-text">否</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 验收意见 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">验收意见</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">验收或处理意见</text>
            <textarea class="form-textarea" v-model="formData.acceptanceOpinion" placeholder="请输入验收或处理意见"></textarea>
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
</template>

<script>
export default {
  name: 'QualityCheck',
  data() {
    return {
      qualityCheckOptions: [
        '钻孔符合要求',
        '水位观测及记录合格',
        '岩芯采取率规范',
        '回次进尺规范',
        '岩芯摆放和保护规范',
        '送样量满足符合要求',
        '现场记录表单填写规范、交时',
        '回次标签、样签及班报表填写合格',
        '原位测试仪器及数量符合要求',
        '取样代表性及质量、样品现场保护规范'
      ],
      recordingCheckOptions: [
        '分层准确',
        '表露记录和描述规范',
        '编录及时',
        '岩芯照片拍摄及时'
      ],
      formData: {
        // 钻探质量
        qualityCheckItems: [],
        drillerSignature: '',
        technicianSignature: '',
        reviewerSignature: '',
        
        // 编录检查
        recordingCheckItems: [],
        issues: '',
        drillerSignature2: '',
        technicianSignature2: '',
        reviewerSignature2: '',
        
        // 安全文明施工
        siteCleaning: '是',
        wasteRemoval: '是',
        
        // 钻探抽水
        holeDepth: '16.5',
        soilThickness: '',
        fillingStoneThickness: '',
        pebbleThickness: '',
        redRockThickness: '',
        graniteThickness: '',
        limestoneThickness: '',
        downtime: '',
        nightWork: '否',
        pumping: '否',
        waterInjection: '否',
        soilDepthCount: '',
        rockDepthCount: '',
        photoCount: '24',
        
        // 取样
        thinWallSoilCount: '5',
        thickWallSoilCount: '3',
        disturbedSampleCount: '8',
        rockSampleCount: '6',
        waterSampleCount: '2',
        solubleSaltCount: '1',
        
        // 原位测试
        sptCount: '12',
        dynamicProbeDepth: '15.5',
        pressurePointCount: '8',
        staticProbeDepth: '16.0',
        vaneShearsCount: '4',
        waveVelocityCount: '6',
        conductivityCount: '3',
        groundTempCount: '2',
        gasPointCount: '1',
        harmfulGasCount: '1',
        inSituTestPass: '是',
        
        // 验收意见
        acceptanceOpinion: ''
      }
    }
  },
  methods: {
    toggleQualityCheckItem(item) {
      const index = this.formData.qualityCheckItems.indexOf(item);
      if (index === -1) {
        this.formData.qualityCheckItems.push(item);
      } else {
        this.formData.qualityCheckItems.splice(index, 1);
      }
    },
    
    toggleRecordingCheckItem(item) {
      const index = this.formData.recordingCheckItems.indexOf(item);
      if (index === -1) {
        this.formData.recordingCheckItems.push(item);
      } else {
        this.formData.recordingCheckItems.splice(index, 1);
      }
    },
    
    saveForm() {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
    },
    
    submitForm() {
      uni.showModal({
        title: '确认提交',
        content: '是否确认提交质量验收？提交后将完成流程移交。',
        confirmText: '确认提交',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 模拟提交过程
            uni.showLoading({
              title: '提交中...'
            });
            
            setTimeout(() => {
              uni.hideLoading();
              uni.showToast({
                title: '提交成功',
                icon: 'success'
              });
            }, 1500);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.quality-check-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-content {
  flex: 1;
  padding: 20rpx;
  background-color: #fff;
  overflow-y: auto;
  padding-bottom: 120rpx; /* 为底部按钮留出空间 */
}

.info-section {
  margin-bottom: 24rpx;
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
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
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

.form-input {
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #d9d9d9;
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
  gap: 30rpx;
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

/* 底部按钮样式 */
.form-actions {
  display: flex;
  gap: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-top: 1rpx solid #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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