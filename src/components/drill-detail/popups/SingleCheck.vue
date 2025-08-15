<template>
  <view class="single-check-container">
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
        :class="{ active: activeTab === 'photos' }" 
        @click="activeTab = 'photos'"
      >
        现场照片
      </view>
    </view>
    
    <view class="tab-content">
      <!-- 表单信息 -->
      <view v-if="activeTab === 'form'" class="form-content">
        <view class="form-group">
          <view class="group-title">单孔报验信息</view>
          <view class="form-items">
            <view class="form-item" v-for="(item, itemIndex) in formData" :key="itemIndex">
              <text class="item-label">{{ item.label }}</text>
              <text class="item-value">{{ item.value }}</text>
            </view>
          </view>
        </view>
        
        <view class="check-result">
          <view class="result-title">验收结果</view>
          <view class="result-content">
            <view class="result-status" :class="checkResult.status">
              {{ checkResult.statusText }}
            </view>
            <view class="result-comments">
              <text class="comments-label">验收意见：</text>
              <text class="comments-text">{{ checkResult.comments }}</text>
            </view>
          </view>
        </view>
        
        <view class="signature-section">
          <view class="signature-title">签名确认</view>
          <view class="signatures">
            <view class="signature-item" v-for="(sig, sigIndex) in signatures" :key="sigIndex">
              <text class="signature-role">{{ sig.role }}</text>
              <image class="signature-image" :src="sig.image" mode="aspectFit" />
              <text class="signature-name">{{ sig.name }}</text>
              <text class="signature-date">{{ sig.date }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 现场照片 -->
      <view v-else-if="activeTab === 'photos'" class="photos-content">
        <view class="photo-grid">
          <view class="photo-item" v-for="(photo, photoIndex) in photos" :key="photoIndex" @click="previewPhoto(photo)">
            <image class="photo-image" :src="photo.url" mode="aspectFill" />
            <text class="photo-desc">{{ photo.description }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SingleCheck',
  props: {
    formData: {
      type: Array,
      default: () => []
    },
    checkResult: {
      type: Object,
      default: () => ({
        status: 'pending',
        statusText: '待验收',
        comments: ''
      })
    },
    signatures: {
      type: Array,
      default: () => []
    },
    photos: {
      type: Array,
      default: () => []
    },
    activeTabProp: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      activeTab: this.activeTabProp
    }
  },
  watch: {
    activeTabProp(newVal) {
      this.activeTab = newVal
    }
  },
  methods: {
    previewPhoto(photo) {
      // 预览照片
      this.$emit('preview-photo', photo)
    }
  }
}
</script>

<style scoped>
.single-check-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tab-header {
  display: flex;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
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
}

/* 表单样式 */
.form-content {
  padding: 20rpx;
}

.form-group {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.group-title {
  padding: 20rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  background-color: #f5f7fa;
  border-bottom: 1rpx solid #eee;
}

.form-items {
  padding: 10rpx 0;
}

.form-item {
  display: flex;
  padding: 15rpx 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.form-item:last-child {
  border-bottom: none;
}

.item-label {
  width: 200rpx;
  font-size: 26rpx;
  color: #666;
}

.item-value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

/* 验收结果 */
.check-result {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.result-title {
  padding: 20rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  background-color: #f5f7fa;
  border-bottom: 1rpx solid #eee;
}

.result-content {
  padding: 20rpx;
}

.result-status {
  display: inline-block;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  margin-bottom: 20rpx;
}

.result-status.passed {
  background-color: #e6f7e6;
  color: #52c41a;
}

.result-status.failed {
  background-color: #fff1f0;
  color: #f5222d;
}

.result-status.pending {
  background-color: #fff7e6;
  color: #fa8c16;
}

.result-comments {
  font-size: 26rpx;
  line-height: 1.6;
}

.comments-label {
  color: #666;
}

.comments-text {
  color: #333;
}

/* 签名区域 */
.signature-section {
  margin-top: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.signature-title {
  padding: 20rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  background-color: #f5f7fa;
  border-bottom: 1rpx solid #eee;
}

.signatures {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
}

.signature-item {
  width: 33.33%;
  padding: 10rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signature-role {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.signature-image {
  width: 120rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
  border-bottom: 1rpx solid #ddd;
}

.signature-name {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.signature-date {
  font-size: 22rpx;
  color: #999;
}

/* 照片样式 */
.photos-content {
  padding: 20rpx;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;
}

.photo-item {
  width: 33.33%;
  padding: 10rpx;
  box-sizing: border-box;
}

.photo-image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
  margin-bottom: 8rpx;
}

.photo-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>