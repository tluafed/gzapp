<template>
  <recording-container
    :dataList="dynamicProbeList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :emptyText="'暂无动探数据，请点击右下角按钮添加'"
    :addTitle="'新增动探'"
    :editTitle="'编辑动探'"
    @save="handleSave"
    @edit-item="handleEditItem"
    @add-item="handleAddItem"
  />
</template>

<script>
import RecordingContainer from './common/RecordingContainer.vue';

export default {
  name: 'DynamicProbe',
  components: {
    RecordingContainer
  },
  data() {
    return {
      dynamicProbeList: [
        {
          id: 1,
          drillRodLength: 3,
          probeType: '重型',
          startDepth: 2,
          endDepth: 2.1,
          hitCount: 3,
          remarks: 'gh'
        },
        {
          id: 2,
          drillRodLength: 4,
          probeType: '轻型',
          startDepth: 3.5,
          endDepth: 3.6,
          hitCount: 8,
          remarks: '正常探测'
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'probeType',
        subtitleFormat: (item) => `钻杆长度: ${item.drillRodLength}m`,
        fields: [
          [
            { key: 'startDepth', label: '起始深度', suffix: 'm' },
            { key: 'endDepth', label: '终止深度', suffix: 'm' }
          ],
          [
            { key: 'hitCount', label: '击数' },
            { key: 'startDepth', label: '探测范围', format: (value, item) => `${item.startDepth}m - ${item.endDepth}m` }
          ],
          [
            { key: 'remarks', label: '备注', fullWidth: true, isDescription: true }
          ]
        ]
      },
      
      // 表单配置
      formConfig: {
        fields: [
          {
            key: 'drillRodLength',
            label: '钻杆长度',
            type: 'number',
            placeholder: '请输入钻杆长度(m)',
            required: true
          },
          {
            key: 'probeType',
            label: '动探类型',
            type: 'picker',
            options: ['重型', '轻型', '超重型'],
            placeholder: '请选择动探类型',
            required: true
          },
          {
            key: 'startDepth',
            label: '起始深度',
            type: 'number',
            placeholder: '请输入起始深度(m)',
            required: true
          },
          {
            key: 'endDepth',
            label: '终止深度',
            type: 'number',
            placeholder: '请输入终止深度(m)',
            required: true
          },
          {
            key: 'hitCount',
            label: '击数',
            type: 'number',
            placeholder: '请输入击数',
            required: true
          },
          {
            key: 'remarks',
            label: '备注',
            type: 'textarea',
            placeholder: '请输入备注信息'
          }
        ]
      }
    }
  },
  methods: {
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      // 验证深度范围
      if (parseFloat(data.endDepth) <= parseFloat(data.startDepth)) {
        uni.showToast({
          title: '终止深度必须大于起始深度',
          icon: 'none'
        });
        return;
      }
      
      if (isEdit) {
        // 编辑现有动探
        if (editIndex > -1) {
          this.dynamicProbeList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新动探
        const newId = this.dynamicProbeList.length > 0 ? Math.max(...this.dynamicProbeList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.dynamicProbeList.push(data);
      }
      
      // 按起始深度排序
      this.dynamicProbeList.sort((a, b) => a.startDepth - b.startDepth);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      console.log('编辑动探:', item);
    },
    
    // 处理新增项目
    handleAddItem() {
      console.log('新增动探');
    }
  }
}
</script>

<style scoped>
/* 这里不需要任何样式，因为所有样式都在通用组件中 */
</style>