<template>
  <view class="column-chart-container">
    <view class="chart-header">
      <text class="chart-title">钻孔柱状图</text>
      <view class="chart-legend">
        <view class="legend-item" v-for="(item, index) in legendItems" :key="index">
          <view class="legend-color" :style="{ backgroundColor: item.color }"></view>
          <text class="legend-text">{{ item.name }}</text>
        </view>
      </view>
    </view>
    
    <scroll-view class="chart-scroll" scroll-y="true">
      <view class="chart-content">
        <!-- 深度刻度 -->
        <view class="depth-scale">
          <view class="depth-mark" v-for="(mark, index) in depthMarks" :key="index">
            <text class="depth-value">{{ mark }}m</text>
            <view class="depth-line"></view>
          </view>
        </view>
        
        <!-- 柱状图内容 -->
        <view class="column-content">
          <view class="column-layers">
            <view 
              v-for="(layer, index) in layers" 
              :key="index" 
              class="layer-item"
              :style="{ 
                height: layer.thickness + 'rpx',
                backgroundColor: layer.color
              }"
            >
              <text class="layer-name">{{ layer.name }}</text>
            </view>
          </view>
          
          <!-- 其他数据列 -->
          <view class="data-columns">
            <view class="data-column" v-for="(column, colIndex) in dataColumns" :key="colIndex">
              <text class="column-header">{{ column.name }}</text>
              <view class="column-values">
                <view 
                  v-for="(value, valIndex) in column.values" 
                  :key="valIndex"
                  class="value-item"
                  :style="{ top: value.position + 'rpx' }"
                >
                  {{ value.text }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'ColumnChart',
  props: {
    layers: {
      type: Array,
      default: () => [
        { name: '粘土', thickness: 150, color: '#f5deb3' },
        { name: '砂土', thickness: 200, color: '#ffe4b5' },
        { name: '砾石', thickness: 180, color: '#d3d3d3' },
        { name: '岩石', thickness: 250, color: '#a9a9a9' }
      ]
    },
    dataColumns: {
      type: Array,
      default: () => [
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
    scale: {
      type: Number,
      default: 1
    },
    translateX: {
      type: Number,
      default: 0
    },
    translateY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      legendItems: [
        { name: '粘土', color: '#f5deb3' },
        { name: '砂土', color: '#ffe4b5' },
        { name: '砾石', color: '#d3d3d3' },
        { name: '岩石', color: '#a9a9a9' }
      ],
      depthMarks: [0, 5, 10, 15, 20, 25, 30],
      isDragging: false,
      startX: 0,
      startY: 0,
      initialDistance: 0,
      initialScale: 1,
      currentScale: this.scale,
      currentTranslateX: this.translateX,
      currentTranslateY: this.translateY
    }
  },
  methods: {
    handleTouchStart(e) {
      if (e.touches.length === 1) {
        // 单指拖动
        this.isDragging = true
        this.startX = e.touches[0].clientX - this.currentTranslateX
        this.startY = e.touches[0].clientY - this.currentTranslateY
      } else if (e.touches.length === 2) {
        // 双指缩放 - 记录初始距离
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        this.initialDistance = Math.sqrt(dx * dx + dy * dy)
        this.initialScale = this.currentScale
      }
    },
    
    handleTouchMove(e) {
      if (e.touches.length === 1 && this.isDragging) {
        // 单指拖动
        this.currentTranslateX = e.touches[0].clientX - this.startX
        this.currentTranslateY = e.touches[0].clientY - this.startY
        this.$emit('update:translateX', this.currentTranslateX)
        this.$emit('update:translateY', this.currentTranslateY)
      } else if (e.touches.length === 2) {
        // 双指缩放
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // 计算新的缩放比例
        this.currentScale = this.initialScale * (distance / this.initialDistance)
        
        // 限制缩放范围
        if (this.currentScale < 0.5) this.currentScale = 0.5
        if (this.currentScale > 3) this.currentScale = 3
        
        this.$emit('update:scale', this.currentScale)
      }
    },
    
    handleTouchEnd() {
      this.isDragging = false
    }
  },
  computed: {
    chartStyle() {
      return {
        transform: `scale(${this.currentScale}) translate(${this.currentTranslateX}px, ${this.currentTranslateY}px)`,
        transition: this.isDragging ? 'none' : 'transform 0.3s'
      }
    }
  }
}
</script>

<style scoped>
.column-chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.chart-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 24rpx;
  height: 24rpx;
  margin-right: 8rpx;
  border: 1rpx solid #ddd;
}

.legend-text {
  font-size: 24rpx;
  color: #666;
}

.chart-scroll {
  flex: 1;
}

.chart-content {
  display: flex;
  padding: 20rpx;
  position: relative;
}

.depth-scale {
  width: 80rpx;
  position: relative;
}

.depth-mark {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}

.depth-mark:nth-child(1) { top: 0; }
.depth-mark:nth-child(2) { top: 250rpx; }
.depth-mark:nth-child(3) { top: 500rpx; }
.depth-mark:nth-child(4) { top: 750rpx; }
.depth-mark:nth-child(5) { top: 1000rpx; }
.depth-mark:nth-child(6) { top: 1250rpx; }
.depth-mark:nth-child(7) { top: 1500rpx; }

.depth-value {
  font-size: 24rpx;
  color: #999;
  width: 50rpx;
  text-align: right;
}

.depth-line {
  height: 1rpx;
  width: 20rpx;
  background-color: #ddd;
  margin-left: 10rpx;
}

.column-content {
  flex: 1;
  display: flex;
  position: relative;
}

.column-layers {
  width: 200rpx;
  position: relative;
  border-left: 1rpx solid #ddd;
  border-right: 1rpx solid #ddd;
}

.layer-item {
  width: 100%;
  position: relative;
  border-bottom: 1rpx dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-name {
  font-size: 24rpx;
  color: #333;
}

.data-columns {
  flex: 1;
  display: flex;
}

.data-column {
  flex: 1;
  position: relative;
  border-right: 1rpx solid #ddd;
  padding: 0 10rpx;
}

.column-header {
  font-size: 24rpx;
  color: #666;
  text-align: center;
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
  position: sticky;
  top: 0;
  background-color: #fff;
}

.column-values {
  position: relative;
  height: 1500rpx; /* 与深度刻度对应 */
}

.value-item {
  position: absolute;
  font-size: 24rpx;
  color: #333;
  transform: translateY(-50%);
}
</style>