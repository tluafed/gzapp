<template>
  <view class="card-list-container">
    <!-- 卡片列表 -->
    <view class="card-list" v-if="dataList.length > 0">
      <view 
        class="data-card"
        v-for="(item, index) in dataList" 
        :key="index"
        @click="editItem(item)"
      >
        <!-- 卡片头部 -->
        <view class="card-header">
          <text class="card-title">{{ getCardTitle(item) }}</text>
          <text class="card-subtitle" v-if="getCardSubtitle(item)">{{ getCardSubtitle(item) }}</text>
        </view>
        
        <!-- 卡片内容 -->
        <view class="card-content">
          <view 
            class="info-row"
            v-for="(row, rowIndex) in getCardRows(item)" 
            :key="rowIndex"
          >
            <view 
              class="info-item"
              :class="{ 'full-width': field.fullWidth }"
              v-for="field in row" 
              :key="field.key"
            >
              <text class="info-label">{{ field.label }}:</text>
              <text 
                class="info-value"
                :class="{ 'description': field.isDescription }"
              >{{ getFieldValue(item, field) }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <text class="empty-text">{{ emptyText }}</text>
    </view>
    
    <!-- 底部功能栏 -->
    <view class="bottom-toolbar">
      <!-- 编录状态 -->
      <view class="status-section">
        <view class="status-indicator" :class="statusConfig.type">
          <text class="status-dot"></text>
        </view>
        <text class="status-text">{{ statusConfig.text }}</text>
      </view>
      
      <!-- 功能按钮 -->
      <view class="action-buttons">
        <button 
          class="action-btn"
          :class="{ 'disabled': buttonConfig.leftButton.disabled }"
          :disabled="buttonConfig.leftButton.disabled"
          @click="handleLeftAction"
        >
          {{ buttonConfig.leftButton.text }}
        </button>
        <button 
          class="action-btn primary"
          :class="{ 'disabled': buttonConfig.rightButton.disabled }"
          :disabled="buttonConfig.rightButton.disabled"
          @click="handleRightAction"
        >
          {{ buttonConfig.rightButton.text }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'RecordingCardList',
  props: {
    // 数据列表
    dataList: {
      type: Array,
      default: () => []
    },
    // 卡片配置
    cardConfig: {
      type: Object,
      required: true
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 编录状态配置
    statusConfig: {
      type: Object,
      default: () => ({
        type: 'pending', // pending(待编录-灰色), recorded(已编录-橙色), approved(校核通过-绿色)
        text: '待编录'
      })
    },
    // 按钮配置
    buttonConfig: {
      type: Object,
      default: () => ({
        leftButton: {
          text: '提交',
          disabled: false
        },
        rightButton: {
          text: '添加',
          disabled: false
        }
      })
    }
  },
  methods: {
    // 获取卡片标题
    getCardTitle(item) {
      return item[this.cardConfig.titleField] || '';
    },
    
    // 获取卡片副标题
    getCardSubtitle(item) {
      if (this.cardConfig.subtitleFormat) {
        return this.cardConfig.subtitleFormat(item);
      }
      if (this.cardConfig.subtitleField) {
        return item[this.cardConfig.subtitleField] || '';
      }
      return '';
    },
    
    // 获取卡片行数据
    getCardRows(item) {
      return this.cardConfig.fields || [];
    },
    
    // 获取字段值
    getFieldValue(item, field) {
      if (field.format) {
        return field.format(item[field.key], item);
      }
      const value = item[field.key];
      if (field.suffix) {
        return value + field.suffix;
      }
      return value || '';
    },
    
    // 编辑项目
    editItem(item) {
      this.$emit('edit-item', item);
    },
    
    // 处理左侧按钮点击
    handleLeftAction() {
      if (!this.buttonConfig.leftButton.disabled) {
        this.$emit('left-action');
      }
    },
    
    // 处理右侧按钮点击
    handleRightAction() {
      if (!this.buttonConfig.rightButton.disabled) {
        this.$emit('right-action');
      }
    }
  }
}
</script>

<style scoped>
/* 卡片列表容器 */
.card-list-container {
  width: 100%;
  background-color: #e8e8e8 !important;
  min-height: 100vh;
  position: relative;
}

/* 卡片列表 */
.card-list {
  width: 100%;
  background-color: #e8e8e8 !important;
  padding: 24rpx 20rpx 160rpx 20rpx;
  box-sizing: border-box;
  min-height: 100vh;
}

/* 数据卡片 */
.data-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-left: 6rpx solid #1890ff;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 28rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid #f5f5f5;
}

/* 卡片标题 */
.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1890ff;
}

/* 卡片副标题 */
.card-subtitle {
  font-size: 26rpx;
  color: #666666;
  background-color: #f8f9fa;
  padding: 6rpx 18rpx;
  border-radius: 24rpx;
}

/* 卡片内容 */
.card-content {
  padding: 24rpx 28rpx;
  background-color: #ffffff;
}

.info-row {
  display: flex;
  margin-bottom: 16rpx;
}

.info-item {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.info-item.full-width {
  flex: 2;
}

.info-label {
  font-size: 26rpx;
  color: #666666;
  margin-right: 12rpx;
  white-space: nowrap;
  min-width: 120rpx;
}

.info-value {
  font-size: 26rpx;
  color: #333333;
  flex: 1;
  line-height: 1.4;
}

.info-value.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
  background-color: #e8e8e8 !important;
}

.empty-text {
  font-size: 30rpx;
  color: #999999;
}

/* 底部功能栏 */
.bottom-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
}

/* 状态区域 */
.status-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.status-indicator {
  display: flex;
  align-items: center;
  margin-right: 16rpx;
}

.status-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 8rpx;
}

.status-indicator.pending .status-dot {
  background-color: #999999;
}

.status-indicator.recorded .status-dot {
  background-color: #fa8c16;
}

.status-indicator.approved .status-dot {
  background-color: #52c41a;
}

.status-text {
  font-size: 26rpx;
  color: #666666;
}

/* 按钮区域 */
.action-buttons {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  height: 64rpx;
  padding: 0 32rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  border: 1rpx solid #d9d9d9;
  background-color: #ffffff;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120rpx;
}

.action-btn.primary {
  background-color: #1890ff;
  color: #ffffff;
  border-color: #1890ff;
}

.action-btn.disabled {
  background-color: #f5f5f5;
  color: #cccccc;
  border-color: #e8e8e8;
  cursor: not-allowed;
}

.action-btn.primary.disabled {
  background-color: #f5f5f5;
  color: #cccccc;
  border-color: #e8e8e8;
}
</style>