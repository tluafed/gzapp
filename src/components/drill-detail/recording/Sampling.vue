<template>
  <recording-container
    :dataList="samplingList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :emptyText="'暂无取样数据，请点击右下角按钮添加'"
    :addTitle="'新增取样记录'"
    :editTitle="'编辑取样记录'"
    @save="handleSave"
    @edit-item="handleEditItem"
    @add-item="handleAddItem"
  />
</template>

<script>
import RecordingContainer from './common/RecordingContainer.vue';

export default {
  name: 'Sampling',
  components: {
    RecordingContainer
  },
  data() {
    return {
      samplingList: [
        {
          id: 1,
          sampleNumber: 'ZD-ZK002-03',
          belongingStratum: '0-1-1 溶洞',
          sampleType: '原状土',
          sampleDepth: 3,
          sampleLength: 0.2,
          testItems: {
            soilPhysicalMoisture: true,
            soilPhysicalDensity: true,
            soilPhysicalSpecificGravity: false,
            soilPhysicalLimitMoisture: false,
            consolidationCoefficient: true,
            consolidationPreconsolidationPressure: false,
            consolidationReboundIndex: true,
            shearStrengthQuick: false,
            shearStrengthConsolidatedQuick: true,
            shearStrengthSlow: false,
            particleAnalysisScreening: false,
            particleAnalysisPowderGrain: true,
            triaxialCompressionUU: false,
            triaxialCompressionCU: false,
            triaxialCompressionCD: false,
            unconfined: false,
            unconfinedSensitivity: false,
            permeabilityVertical: false,
            permeabilityHorizontal: false,
            sandRelativeDensity: false,
            thermalPhysical: false,
            freeSwellingRatio: false,
            solubleSalt: false,
            organicContent: false,
            strike: false,
            naturalRepose: false,
            phValue: false
          }
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'sampleNumber',
        subtitleFormat: (item) => `${item.belongingStratum} | ${item.sampleType}`,
        fields: [
          [
            { key: 'sampleDepth', label: '取样顶深度', suffix: 'm' },
            { key: 'sampleLength', label: '取样长度', suffix: 'm' }
          ],
          [
            { key: 'belongingStratum', label: '所属地层', fullWidth: true }
          ],
          [
            { key: 'testItems', label: '试验项目', fullWidth: true, format: (value) => this.formatTestItems(value) }
          ]
        ]
      },
      
      // 表单配置
      formConfig: {
        fields: [
          {
            key: 'sampleNumber',
            label: '取样编号',
            type: 'input',
            placeholder: '请输入取样编号',
            required: true
          },
          {
            key: 'belongingStratum',
            label: '所属地层',
            type: 'input',
            placeholder: '请输入所属地层',
            required: true
          },
          {
            key: 'sampleType',
            label: '取样类型',
            type: 'picker',
            options: ['原状土', '扰动土', '岩石', '水样'],
            placeholder: '请选择取样类型',
            required: true
          },
          {
            key: 'sampleDepth',
            label: '取样顶深度',
            type: 'number',
            placeholder: '请输入取样顶深度(m)',
            required: true
          },
          {
            key: 'sampleLength',
            label: '取样长度',
            type: 'number',
            placeholder: '请输入取样长度(m)',
            required: true
          }
        ]
      }
    }
  },
  methods: {
    // 格式化试验项目显示
    formatTestItems(testItems) {
      const selectedItems = [];
      const itemNames = {
        soilPhysicalMoisture: '土物理试验-含水率',
        soilPhysicalDensity: '土物理试验-密度',
        soilPhysicalSpecificGravity: '土物理试验-土粒比重',
        soilPhysicalLimitMoisture: '土物理试验-界限含水率',
        consolidationCoefficient: '固结-固结系数',
        consolidationPreconsolidationPressure: '固结-先期固结压力',
        consolidationReboundIndex: '固结-回弹指数',
        shearStrengthQuick: '抗剪强度-快剪',
        shearStrengthConsolidatedQuick: '抗剪强度-固结快剪',
        shearStrengthSlow: '抗剪强度-慢剪',
        particleAnalysisScreening: '颗粒分析-筛分',
        particleAnalysisPowderGrain: '颗粒分析-粉粒粒分析',
        triaxialCompressionUU: '三轴压缩-UU',
        triaxialCompressionCU: '三轴压缩-CU',
        triaxialCompressionCD: '三轴压缩-CD',
        unconfined: '无侧限抗压强度-原状',
        unconfinedSensitivity: '无侧限抗压强度-灵敏度',
        permeabilityVertical: '渗透系数-垂直',
        permeabilityHorizontal: '渗透系数-水平',
        sandRelativeDensity: '砂的相对密度',
        thermalPhysical: '热物理',
        freeSwellingRatio: '自由膨胀率',
        solubleSalt: '易溶盐',
        organicContent: '有机质含量',
        strike: '击实',
        naturalRepose: '天然坡角',
        phValue: 'pH值'
      };
      
      for (const [key, value] of Object.entries(testItems)) {
        if (value && itemNames[key]) {
          selectedItems.push(itemNames[key]);
        }
      }
      
      return selectedItems.length > 0 ? selectedItems.join('、') : '暂无选择试验项目';
    },
    
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      // 验证深度
      if (parseFloat(data.sampleLength) <= 0) {
        uni.showToast({
          title: '取样长度必须大于0',
          icon: 'none'
        });
        return;
      }
      
      // 如果没有试验项目数据，初始化为空对象
      if (!data.testItems) {
        data.testItems = {};
      }
      
      if (isEdit) {
        // 编辑现有取样记录
        if (editIndex > -1) {
          this.samplingList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新取样记录
        const newId = this.samplingList.length > 0 ? Math.max(...this.samplingList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.samplingList.push(data);
      }
      
      // 按取样深度排序
      this.samplingList.sort((a, b) => a.sampleDepth - b.sampleDepth);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      console.log('编辑取样记录:', item);
    },
    
    // 处理新增项目
    handleAddItem() {
      console.log('新增取样记录');
    }
  }
}
</script>

<style scoped>
/* 这里不需要任何样式，因为所有样式都在通用组件中 */
</style>
