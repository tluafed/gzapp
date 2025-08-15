<template>
  <view class="recording-container">
    <view class="recording-content">
      <!-- 卡片列表 -->
      <recording-card-list
        :dataList="dataList"
        :cardConfig="cardConfig"
        :emptyText="emptyText"
        @edit-item="handleEditItem"
        @add-item="handleAddItem"
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
    
    // 处理新增项目
    handleAddItem() {
      this.isEdit = false;
      this.currentFormData = this.getEmptyFormData();
      this.showFormPopup = true;
      this.$emit('add-item');
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