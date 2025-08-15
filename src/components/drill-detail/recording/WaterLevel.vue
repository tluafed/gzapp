<template>
  <recording-container
    :dataList="waterLevelList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :emptyText="'暂无水位数据，请点击右下角按钮添加'"
    :addTitle="'新增水位记录'"
    :editTitle="'编辑水位记录'"
    @save="handleSave"
    @edit-item="handleEditItem"
    @add-item="handleAddItem"
  />
</template>

<script>
import RecordingContainer from './common/RecordingContainer.vue';

export default {
  name: 'WaterLevel',
  components: {
    RecordingContainer
  },
  data() {
    return {
      waterLevelList: [
        {
          id: 1,
          name: '初见水位',
          depth: 35,
          property: '潜水',
          measureTime: '2024-09-25'
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'name',
        subtitleFormat: (item) => `${item.property} | ${item.measureTime}`,
        fields: [
          [
            { key: 'depth', label: '埋深', suffix: 'm' },
            { key: 'property', label: '性质' }
          ],
          [
            { key: 'measureTime', label: '测量时间', fullWidth: true }
          ]
        ]
      },
      
      // 表单配置
      formConfig: {
        fields: [
          {
            key: 'name',
            label: '名称',
            type: 'picker',
            options: ['初见水位', '稳定水位', '承压水位', '季节性水位'],
            placeholder: '请选择水位名称',
            required: true
          },
          {
            key: 'depth',
            label: '埋深',
            type: 'number',
            placeholder: '请输入埋深(m)',
            required: true
          },
          {
            key: 'property',
            label: '性质',
            type: 'picker',
            options: ['潜水', '承压水', '上层滞水', '裂隙水', '岩溶水'],
            placeholder: '请选择水位性质',
            required: true
          },
          {
            key: 'measureTime',
            label: '测量时间',
            type: 'date',
            placeholder: '请选择测量时间',
            required: true
          }
        ]
      }
    }
  },
  methods: {
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      // 验证埋深
      if (parseFloat(data.depth) < 0) {
        uni.showToast({
          title: '埋深不能为负数',
          icon: 'none'
        });
        return;
      }
      
      if (isEdit) {
        // 编辑现有水位记录
        if (editIndex > -1) {
          this.waterLevelList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新水位记录
        const newId = this.waterLevelList.length > 0 ? Math.max(...this.waterLevelList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.waterLevelList.push(data);
      }
      
      // 按埋深排序
      this.waterLevelList.sort((a, b) => a.depth - b.depth);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      console.log('编辑水位记录:', item);
    },
    
    // 处理新增项目
    handleAddItem() {
      console.log('新增水位记录');
    }
  }
}
</script>

<style scoped>
/* 这里不需要任何样式，因为所有样式都在通用组件中 */
</style>
