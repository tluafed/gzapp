<template>
  <view class="shift-report-container">
    <view class="content-card">
      <view class="section-title">班报表</view>
      
      <view class="date-selector">
        <view class="selector-label">选择日期：</view>
        <picker mode="date" :value="currentDate" @change="dateChange" class="date-picker">
          <view class="picker-value">{{ currentDate }}</view>
        </picker>
      </view>
      
      <view class="shift-tabs">
        <view 
          class="tab-item" 
          :class="{ active: currentShift === 'morning' }"
          @click="switchShift('morning')"
        >
          早班
        </view>
        <view 
          class="tab-item" 
          :class="{ active: currentShift === 'afternoon' }"
          @click="switchShift('afternoon')"
        >
          中班
        </view>
        <view 
          class="tab-item" 
          :class="{ active: currentShift === 'night' }"
          @click="switchShift('night')"
        >
          晚班
        </view>
      </view>
      
      <view class="report-form">
        <view class="form-group">
          <view class="form-title">基本信息</view>
          <view class="form-item">
            <text class="item-label">钻孔编号：</text>
            <text class="item-value">GK01</text>
          </view>
          <view class="form-item">
            <text class="item-label">班次：</text>
            <text class="item-value">{{ shiftName }}</text>
          </view>
          <view class="form-item">
            <text class="item-label">班组长：</text>
            <text class="item-value">张工</text>
          </view>
        </view>
        
        <view class="form-group">
          <view class="form-title">工作内容</view>
          <view class="form-item">
            <text class="item-label">起始深度：</text>
            <input type="digit" class="item-input" placeholder="请输入起始深度" />
          </view>
          <view class="form-item">
            <text class="item-label">终止深度：</text>
            <input type="digit" class="item-input" placeholder="请输入终止深度" />
          </view>
          <view class="form-item">
            <text class="item-label">岩性描述：</text>
            <textarea class="item-textarea" placeholder="请输入岩性描述"></textarea>
          </view>
        </view>
        
        <view class="form-group">
          <view class="form-title">设备使用</view>
          <view class="form-item">
            <text class="item-label">钻机型号：</text>
            <input type="text" class="item-input" placeholder="请输入钻机型号" />
          </view>
          <view class="form-item">
            <text class="item-label">钻头类型：</text>
            <input type="text" class="item-input" placeholder="请输入钻头类型" />
          </view>
          <view class="form-item">
            <text class="item-label">泥浆参数：</text>
            <input type="text" class="item-input" placeholder="请输入泥浆参数" />
          </view>
        </view>
        
        <view class="form-group">
          <view class="form-title">异常情况</view>
          <view class="form-item full-width">
            <textarea class="item-textarea" placeholder="请输入异常情况描述"></textarea>
          </view>
        </view>
      </view>
      
      <view class="action-bar">
        <button class="action-button">保存草稿</button>
        <button class="action-button primary">提交报表</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ShiftReport',
  data() {
    return {
      currentDate: this.formatDate(new Date()),
      currentShift: 'morning'
    }
  },
  computed: {
    shiftName() {
      const shiftMap = {
        'morning': '早班',
        'afternoon': '中班',
        'night': '晚班'
      };
      return shiftMap[this.currentShift] || '早班';
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    dateChange(e) {
      this.currentDate = e.detail.value;
    },
    switchShift(shift) {
      this.currentShift = shift;
    }
  }
}
</script>

<style>
.shift-report-container {
  padding: 20rpx;
}

.content-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 30rpx;
  border-left: 8rpx solid #1890ff;
  padding-left: 20rpx;
}

.date-selector {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.selector-label {
  font-size: 28rpx;
  color: #666;
  margin-right: 20rpx;
}

.date-picker {
  flex: 1;
}

.picker-value {
  font-size: 28rpx;
  color: #333;
  padding: 10rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.shift-tabs {
  display: flex;
  margin-bottom: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
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
}

.report-form {
  margin-bottom: 30rpx;
}

.form-group {
  margin-bottom: 30rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
  padding: 20rpx;
}

.form-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
  padding-bottom: 10rpx;
}

.form-item {
  display: flex;
  margin-bottom: 20rpx;
}

.form-item:last-child {
  margin-bottom: 0;
}

.item-label {
  width: 160rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 60rpx;
}

.item-value {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  line-height: 60rpx;
}

.item-input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
  background-color: #fff;
  border-radius: 6rpx;
  padding: 0 20rpx;
}

.item-textarea {
  flex: 1;
  height: 160rpx;
  font-size: 28rpx;
  background-color: #fff;
  border-radius: 6rpx;
  padding: 10rpx 20rpx;
}

.full-width {
  display: block;
}

.action-bar {
  display: flex;
  justify-content: space-between;
}

.action-button {
  width: 48%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  background-color: #f5f5f5;
  color: #666;
}

.action-button.primary {
  background-color: #1890ff;
  color: #fff;
}
</style>