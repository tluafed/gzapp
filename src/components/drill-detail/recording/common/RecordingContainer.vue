<template>
  <view class="recording-container">
    <view class="recording-content">
      <!-- 卡片列表 -->
      <recording-card-list
        :dataList="dataList"
        :cardConfig="cardConfig"
        :getCardConfigForItem="getCardConfigForItem"
        :emptyText="emptyText"
        :recordingStatus="recordingStatus"
        :submitTime="submitTime"
        :approveTime="approveTime"
        :userRole="userRole"
        @edit-item="handleEditItem"
        @add-action="handleAddAction"
      />
      
      <!-- 编辑/新增二级弹窗 -->
      <sub-popup 
        :show="showFormPopup" 
        :title="isEdit ? editTitle : addTitle" 
        @close="closePopup"
      >
        <recording-form
          :formConfig="currentFormConfig"
          :formData="currentFormData"
          :isEdit="isEdit"
          @save="handleSave"
          @cancel="closePopup"
        />
      </sub-popup>
    </view>
  </view>
</template>

<script>
import SubPopup from '../../../sub-popup/sub-popup.vue';
import RecordingCardList from './RecordingCardList.vue';
import RecordingForm from './RecordingForm.vue';

export default {
  name: 'RecordingContainer',
  components: {
    SubPopup,
    RecordingCardList,
    RecordingForm
  },
  props: {
    // 数据列表
    dataList: {
      type: Array,
      default: () => []
    },
    // 卡片配置 - 支持单个配置或多个配置对象
    cardConfig: {
      type: [Object, Function],
      required: true
    },
    // 表单配置 - 支持单个配置或多个配置对象
    formConfig: {
      type: [Object, Function],
      required: true
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据，请点击右下角按钮添加'
    },
    // 弹窗标题
    addTitle: {
      type: String,
      default: '新增'
    },
    editTitle: {
      type: String,
      default: '编辑'
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
  data() {
    return {
      showFormPopup: false,
      currentFormData: {},
      isEdit: false,
      editIndex: -1
    }
  },
  computed: {
    // 获取当前表单配置
    currentFormConfig() {
      if (typeof this.formConfig === 'function') {
        return this.formConfig(this.currentFormData);
      }
      return this.formConfig;
    }
  },
  watch: {
    // 监听表单数据变化，重新获取配置
    currentFormData: {
      handler() {
        this.$forceUpdate();
      },
      deep: true
    }
  },
  methods: {
    // 根据数据项获取卡片配置
    getCardConfigForItem(item) {
      if (typeof this.cardConfig === 'function') {
        return this.cardConfig(item);
      }
      return this.cardConfig;
    },
    
    // 根据数据项获取表单配置
    getFormConfigForItem(item) {
      if (typeof this.formConfig === 'function') {
        return this.formConfig(item);
      }
      return this.formConfig;
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      this.isEdit = true;
      this.editIndex = this.dataList.findIndex(data => data.id === item.id);
      this.currentFormData = JSON.parse(JSON.stringify(item));
      this.showFormPopup = true;
      this.$emit('edit-item', item);
    },
    
    // 处理添加按钮点击
    handleAddAction() {
      this.isEdit = false;
      this.currentFormData = this.getEmptyFormData();
      this.showFormPopup = true;
      this.$emit('add-item');
    },
    
    // 获取空表单数据
    getEmptyFormData() {
      const emptyData = { id: null };
      // 为新增设置默认的作业类型
      if (this.$parent && this.$parent.reportTypes && this.$parent.reportTypes.length > 0) {
        emptyData.reportType = this.$parent.reportTypes[0].name;
        emptyData.workType = this.$parent.reportTypes[0].key;
      }
      const config = typeof this.formConfig === 'function' ? this.formConfig(emptyData) : this.formConfig;
      if (config && config.fields) {
        config.fields.forEach(field => {
          if (!emptyData.hasOwnProperty(field.key)) {
            emptyData[field.key] = field.defaultValue || '';
          }
        });
      }
      return emptyData;
    },
    
    // 关闭弹窗
    closePopup() {
      this.showFormPopup = false;
    },
    
    // 处理保存
    handleSave(formData) {
      this.$emit('save', {
        data: formData,
        isEdit: this.isEdit,
        editIndex: this.editIndex
      });
      this.closePopup();
    }
  }
}
</script>

<style scoped>
.recording-container {
  min-height: 100vh;
  width: 100%;
  background-color: #e8e8e8 !important;
  padding: 0;
  margin: 0;
}

.recording-content {
  min-height: 100vh;
  width: 100%;
  background-color: #e8e8e8 !important;
  padding: 0;
  margin: 0;
  position: relative;
}
</style>