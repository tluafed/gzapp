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
    
    <!-- 新增按钮 -->
    <view class="add-button" @click="addItem">
      <text class="add-icon">+</text>
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
      // 格式：
      // {
      //   titleField: 'standardStratum', // 标题字段
      //   subtitleField: 'depth', // 副标题字段（可选）
      //   subtitleFormat: (item) => `${item.topDepth}m - ${item.bottomDepth}m`, // 副标题格式化函数
      //   fields: [
      //     [
      //       { key: 'mainLayerNo', label: '主层编号' },
      //       { key: 'subLayerNo', label: '亚层编号' }
      //     ],
      //     [
      //       { key: 'description', label: '描述', fullWidth: true, isDescription: true }
      //     ]
      //   ]
      // }
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据，请点击右下角按钮添加'
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
    
    // 新增项目
    addItem() {
      this.$emit('add-item');
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
  padding: 24rpx 20rpx 120rpx 20rpx;
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

/* 新增按钮 */
.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 56rpx;
  background-color: #1890ff;
  box-shadow: 0 6rpx 20rpx rgba(24, 144, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.add-icon {
  font-size: 56rpx;
  color: #ffffff;
  font-weight: 300;
  line-height: 1;
}
</style>