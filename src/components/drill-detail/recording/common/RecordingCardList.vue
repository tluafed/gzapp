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
        <view class="status-indicator" :class="currentStatus.type">
          <text class="status-dot"></text>
        </view>
        <view class="status-info">
          <text class="status-text" :class="currentStatus.type">{{ currentStatus.text }}</text>
          <text class="status-time" v-if="currentStatus.timestamp">{{ currentStatus.timestamp }}</text>
        </view>
      </view>
      
      <!-- 功能按钮 -->
      <view class="action-buttons" v-if="shouldShowButtons">
        <button 
          class="action-btn primary"
          @click="handleAddAction"
        >
          添加
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
      type: [Object, Function],
      required: true
    },
    // 获取卡片配置的函数
    getCardConfigForItem: {
      type: Function,
      default: null
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 编录状态：unsubmitted(未提交), submitted(已提交), approved(已审核)
    recordingStatus: {
      type: String,
      default: 'unsubmitted'
    },
    // 提交时间戳
    submitTime: {
      type: String,
      default: ''
    },
    // 审核时间戳
    approveTime: {
      type: String,
      default: ''
    },
    // 用户角色：technician(技术员), other(其他)
    userRole: {
      type: String,
      default: 'technician'
    }
  },
  computed: {
    // 当前状态配置
    currentStatus() {
      switch (this.recordingStatus) {
        case 'unsubmitted':
          return {
            type: 'unsubmitted',
            text: '未提交',
            timestamp: ''
          };
        case 'submitted':
          return {
            type: 'submitted',
            text: '已提交',
            timestamp: this.submitTime
          };
        case 'approved':
          return {
            type: 'approved',
            text: '已审核',
            timestamp: this.approveTime
          };
        default:
          return {
            type: 'unsubmitted',
            text: '未提交',
            timestamp: ''
          };
      }
    },
    // 是否显示按钮
    shouldShowButtons() {
      return this.userRole === 'technician' && this.recordingStatus === 'unsubmitted';
    }
  },
  methods: {
    // 获取当前项目的卡片配置
    getItemCardConfig(item) {
      if (this.getCardConfigForItem) {
        return this.getCardConfigForItem(item);
      }
      if (typeof this.cardConfig === 'function') {
        return this.cardConfig(item);
      }
      return this.cardConfig;
    },
    
    // 获取卡片标题
    getCardTitle(item) {
      const config = this.getItemCardConfig(item);
      return item[config.titleField] || '';
    },
    
    // 获取卡片副标题
    getCardSubtitle(item) {
      const config = this.getItemCardConfig(item);
      if (config.subtitleFormat) {
        return config.subtitleFormat(item);
      }
      if (config.subtitleField) {
        return item[config.subtitleField] || '';
      }
      return '';
    },
    
    // 获取卡片行数据
    getCardRows(item) {
      const config = this.getItemCardConfig(item);
      return config.fields || [];
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
    
    // 处理添加按钮点击
    handleAddAction() {
      this.$emit('add-action');
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
  line-clamp: 2;
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

.status-indicator.unsubmitted .status-dot {
  background-color: #999999;
}

.status-indicator.submitted .status-dot {
  background-color: #fa8c16;
}

.status-indicator.approved .status-dot {
  background-color: #52c41a;
}

.status-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-text {
  font-size: 26rpx;
  font-weight: 500;
  line-height: 1.2;
}

.status-text.unsubmitted {
  color: #999999;
}

.status-text.submitted {
  color: #fa8c16;
}

.status-text.approved {
  color: #52c41a;
}

.status-time {
  font-size: 22rpx;
  color: #999999;
  margin-top: 2rpx;
  line-height: 1.2;
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