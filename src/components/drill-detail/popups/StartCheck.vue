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
        :class="{ active: activeTab === 'photos' }" 
        @click="activeTab = 'photos'"
      >
        现场照片
      </view>
    </view>
    
    <view class="tab-content">
      <!-- 表单信息 -->
      <view v-if="activeTab === 'form'" class="form-content">
        <view class="form-group" v-for="(group, groupIndex) in formData" :key="groupIndex">
          <view class="group-title">{{ group.title }}</view>
          <view class="form-items">
            <view class="form-item" v-for="(item, itemIndex) in group.items" :key="itemIndex">
              <text class="item-label">{{ item.label }}</text>
              <text class="item-value">{{ item.value }}</text>
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
  name: 'StartCheck',
  props: {
    formData: {
      type: Array,
      default: () => [
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
      ]
    },
    signatures: {
      type: Array,
      default: () => [
        { role: '项目负责人', name: '李工', date: '2023-06-15', image: '/static/images/signature-1.png' },
        { role: '监理工程师', name: '王工', date: '2023-06-15', image: '/static/images/signature-2.png' },
        { role: '施工负责人', name: '张工', date: '2023-06-15', image: '/static/images/signature-3.png' }
      ]
    },
    photos: {
      type: Array,
      default: () => [
        { url: '/static/images/start-check-1.jpg', description: '钻机就位' },
        { url: '/static/images/start-check-2.jpg', description: '安全装置检查' },
        { url: '/static/images/start-check-3.jpg', description: '现场环境' }
      ]
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
      uni.previewImage({
        urls: [photo.url],
        current: photo.url
      })
      this.$emit('preview-photo', photo)
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