<template>
  <view class="image-preview-container">
    <view 
      class="image-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <image 
        class="preview-image"
        :src="imageUrl"
        mode="widthFix"
        :style="imageStyle"
        @load="onImageLoad"
        @error="onImageError"
      />
    </view>
    
    <!-- 缩放提示 -->
    <view class="zoom-tip" v-if="showZoomTip">
      <text>双指缩放，单指拖动</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ColumnChart',
  props: {
    imageUrl: {
      type: String,
      default: '/static/images/column-chart-sample.jpg' // 默认柱状图图片
    }
  },
  data() {
    return {
      scale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      isScaling: false,
      startX: 0,
      startY: 0,
      initialDistance: 0,
      initialScale: 1,
      showZoomTip: true,
      imageLoaded: false
    }
  },
  mounted() {
    // 3秒后隐藏缩放提示
    setTimeout(() => {
      this.showZoomTip = false
    }, 3000)
  },
  methods: {
    handleTouchStart(e) {
      e.preventDefault()
      
      if (e.touches.length === 1) {
        // 单指拖动
        this.isDragging = true
        this.isScaling = false
        this.startX = e.touches[0].clientX - this.translateX
        this.startY = e.touches[0].clientY - this.translateY
      } else if (e.touches.length === 2) {
        // 双指缩放
        this.isDragging = false
        this.isScaling = true
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        this.initialDistance = Math.sqrt(dx * dx + dy * dy)
        this.initialScale = this.scale
      }
    },
    
    handleTouchMove(e) {
      e.preventDefault()
      
      if (e.touches.length === 1 && this.isDragging && !this.isScaling) {
        // 单指拖动
        this.translateX = e.touches[0].clientX - this.startX
        this.translateY = e.touches[0].clientY - this.startY
      } else if (e.touches.length === 2 && this.isScaling) {
        // 双指缩放
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (this.initialDistance > 0) {
          let newScale = this.initialScale * (distance / this.initialDistance)
          
          // 限制缩放范围
          if (newScale < 0.5) newScale = 0.5
          if (newScale > 4) newScale = 4
          
          this.scale = newScale
        }
      }
    },
    
    handleTouchEnd(e) {
      this.isDragging = false
      this.isScaling = false
      
      // 边界检查和回弹
      this.checkBounds()
    },
    
    checkBounds() {
      // 如果缩放比例小于1，重置位置
      if (this.scale <= 1) {
        this.scale = 1
        this.translateX = 0
        this.translateY = 0
        return
      }
      
      // 获取容器和图片尺寸进行边界检查
      // 这里简化处理，实际项目中可以根据具体需求调整
      const maxTranslate = 200 * this.scale
      
      if (this.translateX > maxTranslate) this.translateX = maxTranslate
      if (this.translateX < -maxTranslate) this.translateX = -maxTranslate
      if (this.translateY > maxTranslate) this.translateY = maxTranslate
      if (this.translateY < -maxTranslate) this.translateY = -maxTranslate
    },
    
    onImageLoad() {
      this.imageLoaded = true
      console.log('柱状图图片加载成功')
    },
    
    onImageError() {
      console.error('柱状图图片加载失败')
      uni.showToast({
        title: '图片加载失败',
        icon: 'none'
      })
    },
    
    // 双击重置
    handleDoubleClick() {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    }
  },
  computed: {
    imageStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
        transition: (this.isDragging || this.isScaling) ? 'none' : 'transform 0.3s ease'
      }
    }
  }
}
</script>

<style scoped>
.image-preview-container {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;
}

.image-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  display: block;
  transform-origin: center center;
}

.zoom-tip {
  position: absolute;
  top: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 16rpx 32rpx;
  border-radius: 40rpx;
  font-size: 24rpx;
  z-index: 10;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
