<template>
  <recording-container
    :dataList="inSituTestList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :emptyText="'暂无原位测试数据，请点击右下角按钮添加'"
    :addTitle="'新增原位测试'"
    :editTitle="'编辑原位测试'"
    @save="handleSave"
    @edit-item="handleEditItem"
    @add-item="handleAddItem"
  />
</template>

<script>
import RecordingContainer from './common/RecordingContainer.vue';

export default {
  name: 'InSituTest',
  components: {
    RecordingContainer
  },
  data() {
    return {
      inSituTestList: [
        {
          id: 1,
          soilTest: '3组',
          thermalTest: '3组',
          rockMineralTest: '3组',
          waveVelocity: '',
          resistivity: '3点',
          groundTemperatureTest: '',
          pumpingTest: '',
          layerMeasurement: '',
          permeability: '',
          staticProbe: '',
          crossPlate: '',
          organicMatter: '',
          gas: '3点'
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'soilTest',
        subtitleFormat: (item) => {
          const tests = [];
          if (item.thermalTest) tests.push(`热物理: ${item.thermalTest}`);
          if (item.rockMineralTest) tests.push(`岩矿鉴定: ${item.rockMineralTest}`);
          return tests.join(' | ');
        },
        fields: [
          [
            { key: 'soilTest', label: '土腐' },
            { key: 'thermalTest', label: '热物理' }
          ],
          [
            { key: 'rockMineralTest', label: '岩矿鉴定' },
            { key: 'resistivity', label: '电阻率' }
          ],
          [
            { key: 'waveVelocity', label: '波速' },
            { key: 'gas', label: '氯气' }
          ],
          [
            { key: 'groundTemperatureTest', label: '地温测试', fullWidth: true },
            { key: 'pumpingTest', label: '抽水试验', fullWidth: true }
          ]
        ]
      },
      
      // 表单配置
      formConfig: {
        fields: [
          {
            key: 'soilTest',
            label: '土腐',
            type: 'input',
            placeholder: '请输入土腐测试信息',
            required: false
          },
          {
            key: 'thermalTest',
            label: '热物理',
            type: 'input',
            placeholder: '请输入热物理测试信息',
            required: false
          },
          {
            key: 'rockMineralTest',
            label: '岩矿鉴定',
            type: 'input',
            placeholder: '请输入岩矿鉴定信息',
            required: false
          },
          {
            key: 'waveVelocity',
            label: '波速',
            type: 'input',
            placeholder: '请输入波速测试信息',
            required: false
          },
          {
            key: 'resistivity',
            label: '电阻率',
            type: 'input',
            placeholder: '请输入电阻率测试信息',
            required: false
          },
          {
            key: 'groundTemperatureTest',
            label: '地温测试',
            type: 'input',
            placeholder: '请输入地温测试信息',
            required: false
          },
          {
            key: 'pumpingTest',
            label: '抽水试验',
            type: 'input',
            placeholder: '请输入抽水试验信息',
            required: false
          },
          {
            key: 'layerMeasurement',
            label: '分层观测',
            type: 'input',
            placeholder: '请输入分层观测信息',
            required: false
          },
          {
            key: 'permeability',
            label: '渗压',
            type: 'input',
            placeholder: '请输入渗压测试信息',
            required: false
          },
          {
            key: 'staticProbe',
            label: '静探',
            type: 'input',
            placeholder: '请输入静探测试信息',
            required: false
          },
          {
            key: 'crossPlate',
            label: '十字板',
            type: 'input',
            placeholder: '请输入十字板测试信息',
            required: false
          },
          {
            key: 'organicMatter',
            label: '有害气体',
            type: 'input',
            placeholder: '请输入有害气体测试信息',
            required: false
          },
          {
            key: 'gas',
            label: '氯气',
            type: 'input',
            placeholder: '请输入氯气测试信息',
            required: false
          }
        ]
      }
    }
  },
  methods: {
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      if (isEdit) {
        // 编辑现有原位测试
        if (editIndex > -1) {
          this.inSituTestList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新原位测试
        const newId = this.inSituTestList.length > 0 ? Math.max(...this.inSituTestList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.inSituTestList.push(data);
      }
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      console.log('编辑原位测试:', item);
    },
    
    // 处理新增项目
    handleAddItem() {
      console.log('新增原位测试');
    }
  }
}
</script>

<style scoped>
/* 这里不需要任何样式，因为所有样式都在通用组件中 */
</style>
