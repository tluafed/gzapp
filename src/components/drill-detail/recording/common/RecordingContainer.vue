<template>
  <view class="recording-container">
    <view class="recording-content">
      <!-- 卡片列表 -->
      <recording-card-list
        :dataList="dataList"
        :cardConfig="cardConfig"
        :emptyText="emptyText"
        :statusConfig="statusConfig"
        :buttonConfig="buttonConfig"
        @edit-item="handleEditItem"
        @left-action="handleLeftAction"
        @right-action="handleRightAction"
      />
      
      <!-- 编辑/新增二级弹窗 -->
      <sub-popup 
        :show="showFormPopup" 
        :title="isEdit ? editTitle : addTitle" 
        @close="closePopup"
      >
        <recording-form
          :formConfig="formConfig"
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
    // 卡片配置
    cardConfig: {
      type: Object,
      required: true
    },
    // 表单配置
    formConfig: {
      type: Object,
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
  data() {
    return {
      showFormPopup: false,
      currentFormData: {},
      isEdit: false,
      editIndex: -1
    }
  },
  methods: {
    // 处理编辑项目
    handleEditItem(item) {
      this.isEdit = true;
      this.editIndex = this.dataList.findIndex(data => data.id === item.id);
      this.currentFormData = JSON.parse(JSON.stringify(item));
      this.showFormPopup = true;
      this.$emit('edit-item', item);
    },
    
    // 处理左侧按钮点击
    handleLeftAction() {
      this.$emit('left-action');
    },
    
    // 处理右侧按钮点击（通常是添加）
    handleRightAction() {
      this.isEdit = false;
      this.currentFormData = this.getEmptyFormData();
      this.showFormPopup = true;
      this.$emit('right-action');
    },
    
    // 获取空表单数据
    getEmptyFormData() {
      const emptyData = { id: null };
      this.formConfig.fields.forEach(field => {
        emptyData[field.key] = field.defaultValue || '';
      });
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