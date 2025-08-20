<template>
  <view class="ground-container">
    <!-- 影像列表 -->
    <scroll-view scroll-y class="image-list" :style="{ height: scrollHeight + 'px' }">
      <view class="image-item" v-for="(image, index) in imageList" :key="index" @click="previewImage(image)">
        <image 
          :src="image.url" 
          mode="aspectFill" 
          class="ground-image"
          :lazy-load="true"
        ></image>
      </view>
      
      <!-- 空状态 -->
      <view v-if="imageList.length === 0" class="empty-state">
        <text class="empty-text">暂无地面影像</text>
        <text class="empty-hint">点击右下角按钮添加照片</text>
      </view>
    </scroll-view>
    
    <!-- 添加按钮 -->
    <view class="add-button" @click="addImage">
      <text class="add-icon">+</text>
    </view>
    
    <!-- 全屏图片预览 -->
    <view v-if="showPreview" class="fullscreen-preview" @click="closePreview">
      <image 
        :src="currentPreviewImage.url" 
        mode="widthFix" 
        class="fullscreen-image"
        @click.stop
        :enable-zoom="true"
        :show-menu-by-longpress="false"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Ground',
  data() {
    return {
      scrollHeight: 0,
      showPreview: false,
      currentPreviewImage: {},
      imageList: [
        {
          id: 1,
          url: '/static/images/ground1.jpg'
        },
        {
          id: 2,
          url: '/static/images/ground2.jpg'
        }
      ]
    }
  },
  mounted() {
    this.calculateScrollHeight()
  },
  methods: {
    // 计算滚动区域高度
    calculateScrollHeight() {
      const systemInfo = uni.getSystemInfoSync()
      const windowHeight = systemInfo.windowHeight
      // 减去顶部导航栏和标签页的高度
      this.scrollHeight = windowHeight - 200
    },
    
    // 预览图片
    previewImage(image) {
      this.currentPreviewImage = image
      this.showPreview = true
    },
    
    // 关闭预览
    closePreview() {
      this.showPreview = false
      this.currentPreviewImage = {}
    },
    
    // 添加图片
    addImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0]
          this.uploadImage(tempFilePath)
        },
        fail: (err) => {
          console.error('选择图片失败:', err)
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 上传图片
    uploadImage(filePath) {
      uni.showLoading({
        title: '上传中...'
      })
      
      // 模拟上传过程
      setTimeout(() => {
        const newImage = {
          id: Date.now(),
          url: filePath
        }
        
        this.imageList.push(newImage)
        
        uni.hideLoading()
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })
      }, 1500)
    }
  }
}
</script>

<style scoped>
.ground-container {
  position: relative;
  height: 100vh;
  background-color: #f5f5f5;
}

.image-list {
  padding: 20rpx;
}

.image-item {
  position: relative;
  width: 100%;
  height: 400rpx;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.ground-image {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
  color: #999;
}

.empty-text {
  font-size: 32rpx;
  margin-bottom: 20rpx;
}

.empty-hint {
  font-size: 28rpx;
}

.add-button {
  position: fixed;
  bottom: 100rpx;
  right: 40rpx;
  width: 120rpx;
  height: 120rpx;
  background-color: #1890ff;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 20rpx rgba(24, 144, 255, 0.3);
  z-index: 100;
}

.add-icon {
  color: white;
  font-size: 60rpx;
  font-weight: 300;
  line-height: 1;
}

.fullscreen-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.fullscreen-image {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
