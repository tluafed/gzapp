<template>
  <view class="safety-bottom-bar" v-if="shouldShowBar">
    <!-- 状态区域 -->
    <view class="status-section">
      <view class="status-indicator" :class="statusConfig.type">
        <text class="status-dot"></text>
      </view>
      <text class="status-text">{{ statusConfig.text }}</text>
      <text class="status-time" v-if="statusConfig.time">({{ statusConfig.time }})</text>
    </view>
    
    <!-- 功能按钮区域 -->
    <view class="action-buttons" v-if="buttonConfig.buttons && buttonConfig.buttons.length > 0">
      <button 
        v-for="(button, index) in buttonConfig.buttons"
        :key="index"
        class="action-btn"
        :class="{ 'primary': button.primary, 'danger': button.danger }"
        @click="handleButtonClick(button.action)"
      >
        {{ button.text }}
      </button>
    </view>
    
    <!-- 确认弹窗 -->
    <view class="confirm-popup-overlay" v-if="showConfirmPopup" @click="closeConfirmPopup">
      <view class="confirm-popup" @click.stop>
        <view class="popup-header">
          <text class="popup-title">{{ confirmDialog.title }}</text>
        </view>
        <view class="popup-content">
          <text class="popup-description">{{ confirmDialog.description }}</text>
          <textarea 
            class="popup-input"
            v-model="confirmDialog.inputValue"
            :placeholder="confirmDialog.placeholder"
            :maxlength="200"
          ></textarea>
          <view class="char-count">{{ confirmDialog.inputValue.length }}/200</view>
        </view>
        <view class="popup-footer">
          <button class="popup-btn cancel-btn" @click="closeConfirmPopup">取消</button>
          <button class="popup-btn confirm-btn" @click="handleConfirmSubmit">确认</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SafetyBottomBar',
  props: {
    // 状态配置
    statusConfig: {
      type: Object,
      required: true
      // 格式：
      // {
      //   type: 'unsubmitted', // unsubmitted(未提交-灰色), submitted(已提交-橙色), reviewed(已审核-绿色)
      //   text: '未提交',
      //   time: '2024-01-15 14:30' // 可选，显示时间
      // }
    },
    // 按钮配置
    buttonConfig: {
      type: Object,
      default: () => ({
        buttons: []
      })
      // 格式：
      // {
      //   buttons: [
      //     { text: '保存', action: 'save' },
      //     { text: '提交', action: 'submit', primary: true },
      //     { text: '撤回', action: 'withdraw' },
      //     { text: '审核不通过', action: 'reject', danger: true },
      //     { text: '审核通过', action: 'approve', primary: true }
      //   ]
      // }
    },
    // 是否显示底栏
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 是否应该显示底栏
    shouldShowBar() {
      return this.visible;
    }
  },
  data() {
    return {
      showConfirmPopup: false,
      confirmDialog: {
        title: '',
        description: '',
        placeholder: '',
        inputValue: '',
        action: ''
      }
    }
  },
  methods: {
    // 处理按钮点击
    handleButtonClick(action) {
      if (action === 'submit') {
        // 提交需要输入备注
        this.showConfirmDialog('确认提交', '请输入备注信息：', '请审批', action);
      } else if (action === 'reject') {
        // 审核不通过需要输入意见
        this.showConfirmDialog('审核不通过', '请输入审核不通过的原因：', '审核不通过，请修改', action);
      } else if (action === 'approve') {
        // 审核通过需要输入意见
        this.showConfirmDialog('审核通过', '请输入审核意见：', '同意', action);
      } else {
        // 其他操作直接触发
        this.$emit('action', action);
      }
    },
    
    // 显示确认弹窗
    showConfirmDialog(title, description, placeholder, action) {
      this.confirmDialog = {
        title,
        description,
        placeholder,
        inputValue: placeholder, // 设置默认值
        action
      };
      this.showConfirmPopup = true;
    },
    
    // 处理确认提交
    handleConfirmSubmit() {
      const value = this.confirmDialog.inputValue.trim();
      if (!value) {
        uni.showToast({
          title: '请输入必要信息',
          icon: 'none'
        });
        return;
      }
      
      this.$emit('action', this.confirmDialog.action, value);
      this.closeConfirmPopup();
    },
    
    // 关闭确认弹窗
    closeConfirmPopup() {
      this.showConfirmPopup = false;
      this.confirmDialog = {
        title: '',
        description: '',
        placeholder: '',
        inputValue: '',
        action: ''
      };
    }
  }
}
</script>

<style scoped>
/* 底部功能栏 */
.safety-bottom-bar {
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

.status-indicator.reviewed .status-dot {
  background-color: #52c41a;
}

.status-text {
  font-size: 26rpx;
  color: #666666;
}

.status-time {
  font-size: 24rpx;
  color: #999999;
  margin-left: 8rpx;
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

.action-btn.danger {
  background-color: #ff4d4f;
  color: #ffffff;
  border-color: #ff4d4f;
}

/* 确认弹窗样式 */
.confirm-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-popup {
  width: 600rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
}

.popup-header {
  padding: 40rpx 30rpx 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.popup-content {
  padding: 30rpx;
}

.popup-description {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 20rpx;
  display: block;
}

.popup-input {
  width: 100%;
  min-height: 120rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333333;
  background-color: #ffffff;
  box-sizing: border-box;
  resize: none;
}

.popup-input:focus {
  border-color: #1890ff;
  outline: none;
}

.char-count {
  font-size: 24rpx;
  color: #999999;
  text-align: right;
  margin-top: 10rpx;
}

.popup-footer {
  display: flex;
  border-top: 1rpx solid #f0f0f0;
}

.popup-btn {
  flex: 1;
  height: 88rpx;
  border: none;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #333333;
}

.cancel-btn {
  border-right: 1rpx solid #f0f0f0;
  color: #666666;
}

.confirm-btn {
  background-color: #1890ff;
  color: #ffffff;
}

.popup-btn:active {
  opacity: 0.8;
}
</style>
