<template>
  <view class="form-container">
    <view 
      class="form-item"
      v-for="field in formConfig.fields" 
      :key="field.key"
    >
      <text 
        class="form-label"
        :class="{ 'required': field.required }"
      >{{ field.label }}</text>
      
      <!-- 文本输入框 -->
      <input 
        v-if="field.type === 'input'"
        class="form-input" 
        :type="field.inputType || 'text'"
        v-model="localFormData[field.key]" 
        :placeholder="field.placeholder" 
      />
      
      <!-- 数字输入框 -->
      <input 
        v-else-if="field.type === 'number'"
        class="form-input" 
        type="number"
        v-model="localFormData[field.key]" 
        :placeholder="field.placeholder" 
      />
      
      <!-- 选择器 -->
      <picker 
        v-else-if="field.type === 'picker'"
        class="form-picker" 
        :value="getPickerIndex(field)"
        :range="field.options" 
        @change="onPickerChange(field, $event)"
      >
        <view class="picker-value">
          {{ localFormData[field.key] || field.placeholder }}
        </view>
      </picker>
      
      <!-- 文本域 -->
      <textarea 
        v-else-if="field.type === 'textarea'"
        class="form-textarea" 
        v-model="localFormData[field.key]" 
        :placeholder="field.placeholder"
      ></textarea>
      
      <!-- 日期选择器 -->
      <picker 
        v-else-if="field.type === 'date'"
        class="form-picker" 
        mode="date"
        :value="localFormData[field.key]"
        @change="onDateChange(field, $event)"
      >
        <view class="picker-value">
          {{ localFormData[field.key] || field.placeholder }}
        </view>
      </picker>
      
      <!-- 时间选择器 -->
      <picker 
        v-else-if="field.type === 'time'"
        class="form-picker" 
        mode="time"
        :value="localFormData[field.key]"
        @change="onTimeChange(field, $event)"
      >
        <view class="picker-value">
          {{ localFormData[field.key] || field.placeholder }}
        </view>
      </picker>
    </view>
    
    <view class="form-footer">
      <button class="btn btn-cancel" @click="handleCancel">取消</button>
      <button class="btn btn-confirm" @click="handleSave">确定</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'RecordingForm',
  props: {
    // 表单配置
    formConfig: {
      type: Object,
      required: true
      // 格式：
      // {
      //   fields: [
      //     {
      //       key: 'standardStratum',
      //       label: '标准地层',
      //       type: 'picker',
      //       options: ['选项1', '选项2'],
      //       placeholder: '请选择标准地层',
      //       required: true
      //     },
      //     {
      //       key: 'mainLayerNo',
      //       label: '主层编号',
      //       type: 'input',
      //       placeholder: '请输入主层编号',
      //       required: true
      //     }
      //   ]
      // }
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => ({})
    },
    // 是否编辑模式
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localFormData: {},
      pickerIndexes: {} // 存储选择器索引
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.localFormData = JSON.parse(JSON.stringify(newVal));
        this.updatePickerIndexes();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 更新选择器索引
    updatePickerIndexes() {
      this.formConfig.fields.forEach(field => {
        if (field.type === 'picker' && field.options) {
          const value = this.localFormData[field.key];
          const index = field.options.indexOf(value);
          this.$set(this.pickerIndexes, field.key, index >= 0 ? index : 0);
        }
      });
    },
    
    // 获取选择器索引
    getPickerIndex(field) {
      return this.pickerIndexes[field.key] || 0;
    },
    
    // 选择器变化事件
    onPickerChange(field, event) {
      const index = event.detail.value;
      this.pickerIndexes[field.key] = index;
      this.localFormData[field.key] = field.options[index];
      
      // 如果是作业类型字段，触发onChange回调
      if (field.key === 'reportType' && field.onChange) {
        field.onChange(field.options[index]);
      }
    },
    
    // 日期变化事件
    onDateChange(field, event) {
      this.localFormData[field.key] = event.detail.value;
    },
    
    // 时间变化事件
    onTimeChange(field, event) {
      this.localFormData[field.key] = event.detail.value;
    },
    
    // 表单验证
    validateForm() {
      for (let field of this.formConfig.fields) {
        if (field.required) {
          const value = this.localFormData[field.key];
          if (!value && value !== 0) {
            uni.showToast({
              title: `请${field.type === 'picker' ? '选择' : '输入'}${field.label}`,
              icon: 'none'
            });
            return false;
          }
        }
      }
      return true;
    },
    
    // 处理保存
    handleSave() {
      if (!this.validateForm()) {
        return;
      }
      
      this.$emit('save', this.localFormData);
    },
    
    // 处理取消
    handleCancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
/* 表单样式 */
.form-container {
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.form-item {
  margin-bottom: 24rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  display: block;
}

.form-label.required::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  box-sizing: border-box;
}

.form-textarea {
  width: 100%;
  height: 160rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  box-sizing: border-box;
}

.form-picker {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 0 20rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.picker-value {
  font-size: 28rpx;
  color: #333;
}

.form-footer {
  display: flex;
  margin-top: 40rpx;
  padding-bottom: 30rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  margin: 0 10rpx;
  border: none;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-confirm {
  background-color: #1890ff;
  color: #fff;
}
</style>