<template>
  <view class="hole-positioning-container">
    <view class="form-content">
      <!-- 开孔定位信息 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">开孔定位信息</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">钻孔开孔经度</text>
            <view class="form-value">{{ formData.longitude || '自动获取' }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">根据经纬度计算的距离</text>
            <view class="form-value">{{ formData.calculatedDistance || '自动获取' }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">是否在原位施工</text>
            <view class="form-value-tags">
              <view class="tag" :class="{ active: formData.isOriginalPosition === '是' }" @tap="selectOriginalPosition('是')">是</view>
              <view class="tag" :class="{ active: formData.isOriginalPosition === '否' }" @tap="selectOriginalPosition('否')">否</view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">偏移方向</text>
            <input class="form-input" v-model="formData.offsetDirection" placeholder="请输入偏移方向" />
          </view>
          
          <view class="form-item">
            <text class="form-label">偏移距离</text>
            <input class="form-input" v-model="formData.offsetDistance" placeholder="请输入偏移距离" type="number" />
          </view>
          
          <view class="form-item">
            <text class="form-label">移孔报审情况</text>
            <view class="form-value-tags">
              <view class="tag" :class="{ active: formData.holeMovementStatus === '已报审' }" @tap="selectHoleMovementStatus('已报审')">已报审</view>
              <view class="tag" :class="{ active: formData.holeMovementStatus === '未报审' }" @tap="selectHoleMovementStatus('未报审')">未报审</view>
              <view class="tag" :class="{ active: formData.holeMovementStatus === '无需报审' }" @tap="selectHoleMovementStatus('无需报审')">无需报审</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 开孔移位审批流程 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">开孔移位审批流程</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">审批人姓名</text>
            <view class="form-value-tags">
              <view class="tag" :class="{ active: formData.approverName === '张三' }" @tap="selectApproverName('张三')">张三</view>
              <view class="tag" :class="{ active: formData.approverName === '李四' }" @tap="selectApproverName('李四')">李四</view>
              <view class="tag" :class="{ active: formData.approverName === '王五' }" @tap="selectApproverName('王五')">王五</view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">审批日期</text>
            <view class="form-value">{{ formData.approvalDate || '自动获取' }}</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">审批意见</text>
            <textarea class="form-textarea" v-model="formData.approvalOpinion" placeholder="请输入审批意见" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HolePositioning',
  data() {
    return {
      formData: {
        longitude: '',
        calculatedDistance: '',
        isOriginalPosition: '',
        offsetDirection: '',
        offsetDistance: '',
        holeMovementStatus: '',
        approverName: '',
        approvalDate: '',
        approvalOpinion: ''
      }
    }
  },
  mounted() {
    this.getCurrentLocation();
    this.getCurrentDate();
  },
  methods: {
    // 获取当前位置
    getCurrentLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.formData.longitude = res.longitude.toFixed(6);
          this.calculateDistance();
        },
        fail: (err) => {
          console.log('获取位置失败:', err);
          this.formData.longitude = '获取失败';
        }
      });
    },
    
    // 计算距离（示例）
    calculateDistance() {
      // 这里应该根据实际的设计坐标计算距离
      // 暂时使用模拟数据
      this.formData.calculatedDistance = '2.5米';
    },
    
    // 获取当前日期
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      this.formData.approvalDate = `${year}-${month}-${day}`;
    },
    
    // 选择是否在原位施工
    selectOriginalPosition(value) {
      this.formData.isOriginalPosition = value;
    },
    
    // 选择移孔报审情况
    selectHoleMovementStatus(value) {
      this.formData.holeMovementStatus = value;
    },
    
    // 选择审批人姓名
    selectApproverName(value) {
      this.formData.approverName = value;
    }
  }
}
</script>

<style scoped>
.hole-positioning-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-content {
  flex: 1;
  padding: 20rpx;
  background-color: #fff;
  overflow-y: auto;
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
  background-color: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e8e8e8;
  min-height: 24rpx;
}

.form-textarea {
  font-size: 28rpx;
  color: #333;
  background-color: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e8e8e8;
  min-height: 120rpx;
  resize: none;
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
</style>
