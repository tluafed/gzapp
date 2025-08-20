<template>
  <view class="shift-report-container">
    <!-- 报表类型选择弹窗 -->
    <sub-popup 
      :show="showTypeSelector" 
      title="选择作业类型" 
      @close="closeTypeSelector"
    >
      <view class="type-selector">
        <view 
          class="type-item"
          v-for="type in reportTypes" 
          :key="type.key"
          @click="selectReportType(type)"
        >
          <text class="type-name">{{ type.name }}</text>
        </view>
      </view>
    </sub-popup>

    <recording-container
      :dataList="shiftReportList"
      :cardConfig="getCardConfigForItem"
      :formConfig="getFormConfigForItem"
      :emptyText="'暂无班报表数据，请点击右下角按钮添加'"
      :addTitle="'新增班报表'"
      :editTitle="'编辑班报表'"
      @save="handleSave"
      @edit-item="handleEditItem"
      @add-item="handleAddItem"
    />
  </view>
</template>

<script>
import RecordingContainer from '../recording/common/RecordingContainer.vue';
import SubPopup from '../../sub-popup/sub-popup.vue';

export default {
  name: 'ShiftReport',
  components: {
    RecordingContainer,
    SubPopup
  },
  data() {
    return {
      showTypeSelector: false,
      currentReportType: 'manual',
      selectedWorkType: '',
      shiftReportList: [
        {
          id: 1,
          reportType: '人工挖深',
          workType: 'manual',
          startDepth: 20,
          holeDepth: '钻具全长20.5m与上余0.3m',
          advance: '1.0m',
          rockCoreLength: '0.9m',
          holeCondition: '进尺正常，土质较软，无塌孔现象'
        },
        {
          id: 2,
          reportType: '机械开挖',
          workType: 'mechanical',
          machineType: '挖掘机',
          excavationDepth: 3.5,
          soilType: '粘土夹砂层',
          workEfficiency: '良好',
          workCondition: '机械运行正常，开挖效率高，土质稳定'
        },
        {
          id: 3,
          reportType: '管线探测',
          workType: 'pipeline',
          detectionMethod: '电磁感应法',
          detectionDepth: 2.0,
          pipelineFound: '是',
          pipelineType: '给水管',
          pipelineDepth: '1.8m',
          detectionResult: '发现DN200给水管，埋深1.8m，管线完好'
        },
        {
          id: 4,
          reportType: '标贯试验',
          workType: 'standard',
          startDepth: 25,
          drillToolLength: '26.2',
          remainder: '0.8',
          holeDepth: '25.4',
          advance: '0.45',
          rodLength: '25.0',
          standardDepthFrom: '25.0',
          standardDepthTo: '25.45',
          hit15cm: '8',
          hit10cm1: '12',
          hit10cm2: '15',
          hit10cm3: '18',
          rockCoreLength: '0.4',
          holeCondition: '标贯正常，土质为中密砂土'
        },
        {
          id: 5,
          reportType: '取样',
          workType: 'sampling',
          startDepth: 8,
          sampleType: '原状土',
          samplingDepthFrom: '8.0',
          samplingDepthTo: '8.5',
          sampleQuantity: '3组',
          sampleCondition: '土样完整，颜色为灰褐色，质地均匀',
          rockCoreLength: '0.5m',
          holeCondition: '取样顺利，土层稳定'
        }
      ],
      
      // 报表类型配置
      reportTypes: [
        { key: 'manual', name: '人工挖深' },
        { key: 'mechanical', name: '机械开挖' },
        { key: 'pipeline', name: '管线探测' },
        { key: 'standard', name: '标贯试验' },
        { key: 'sampling', name: '取样' }
      ],
      
      // 不同报表类型的配置
      reportConfigs: {
        manual: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m | 进尺: ${item.advance}`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'advance', label: '进尺' }
              ],
              [
                { key: 'holeDepth', label: '孔深', fullWidth: true }
              ],
              [
                { key: 'rockCoreLength', label: '岩(土)芯长度' },
                { key: 'holeCondition', label: '孔内情况', isDescription: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'startDepth',
                label: '起始深度',
                type: 'number',
                placeholder: '请输入起始深度(m)',
                required: true
              },
              {
                key: 'holeDepth',
                label: '孔深',
                type: 'input',
                placeholder: '填写钻具全长与上余',
                required: true
              },
              {
                key: 'advance',
                label: '进尺',
                type: 'input',
                placeholder: '填写进尺(m)',
                required: true
              },
              {
                key: 'rockCoreLength',
                label: '岩(土)芯长度',
                type: 'input',
                placeholder: '填写岩(土)芯长度',
                required: false
              },
              {
                key: 'holeCondition',
                label: '孔内情况',
                type: 'textarea',
                placeholder: '填写进尺快慢、缩径、塌孔、掉块、掉钻、溶洞、漏水等',
                required: false
              }
            ]
          }
        },
        mechanical: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `机械类型: ${item.machineType || ''} | 开挖深度: ${item.excavationDepth || ''}m`,
            fields: [
              [
                { key: 'machineType', label: '机械类型' },
                { key: 'excavationDepth', label: '开挖深度', suffix: 'm' }
              ],
              [
                { key: 'soilType', label: '土质情况', fullWidth: true }
              ],
              [
                { key: 'workEfficiency', label: '作业效率' },
                { key: 'workCondition', label: '作业情况', isDescription: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'machineType',
                label: '机械类型',
                type: 'picker',
                options: ['挖掘机', '推土机', '装载机', '其他'],
                placeholder: '请选择机械类型',
                required: true
              },
              {
                key: 'excavationDepth',
                label: '开挖深度',
                type: 'number',
                placeholder: '请输入开挖深度(m)',
                required: true
              },
              {
                key: 'soilType',
                label: '土质情况',
                type: 'input',
                placeholder: '描述土质情况',
                required: true
              },
              {
                key: 'workEfficiency',
                label: '作业效率',
                type: 'input',
                placeholder: '填写作业效率',
                required: false
              },
              {
                key: 'workCondition',
                label: '作业情况',
                type: 'textarea',
                placeholder: '填写作业过程中的具体情况',
                required: false
              }
            ]
          }
        },
        pipeline: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `探测方法: ${item.detectionMethod || ''} | 探测深度: ${item.detectionDepth || ''}m`,
            fields: [
              [
                { key: 'detectionMethod', label: '探测方法' },
                { key: 'detectionDepth', label: '探测深度', suffix: 'm' }
              ],
              [
                { key: 'pipelineFound', label: '发现管线' },
                { key: 'pipelineType', label: '管线类型' }
              ],
              [
                { key: 'pipelineDepth', label: '管线埋深' },
                { key: 'detectionResult', label: '探测结果', isDescription: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'detectionMethod',
                label: '探测方法',
                type: 'picker',
                options: ['电磁感应法', '探地雷达法', '管线仪探测', '人工探测'],
                placeholder: '请选择探测方法',
                required: true
              },
              {
                key: 'detectionDepth',
                label: '探测深度',
                type: 'number',
                placeholder: '请输入探测深度(m)',
                required: true
              },
              {
                key: 'pipelineFound',
                label: '发现管线',
                type: 'picker',
                options: ['是', '否'],
                placeholder: '是否发现管线',
                required: true
              },
              {
                key: 'pipelineType',
                label: '管线类型',
                type: 'picker',
                options: ['给水管', '排水管', '燃气管', '电力管', '通信管', '其他'],
                placeholder: '请选择管线类型',
                required: false
              },
              {
                key: 'pipelineDepth',
                label: '管线埋深',
                type: 'input',
                placeholder: '填写管线埋深(m)',
                required: false
              },
              {
                key: 'detectionResult',
                label: '探测结果',
                type: 'textarea',
                placeholder: '详细描述探测结果和发现的情况',
                required: false
              }
            ]
          }
        },
        standard: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m | 标贯深度: ${item.standardDepthFrom || ''}m - ${item.standardDepthTo || ''}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'drillToolLength', label: '钻具全长', suffix: 'm' }
              ],
              [
                { key: 'remainder', label: '上余', suffix: 'm' },
                { key: 'holeDepth', label: '孔深', suffix: 'm' }
              ],
              [
                { key: 'advance', label: '进尺', suffix: 'm' },
                { key: 'rodLength', label: '杆长', suffix: 'm' }
              ],
              [
                { key: 'standardDepthFrom', label: '标贯深度自', suffix: 'm' },
                { key: 'standardDepthTo', label: '标贯深度至', suffix: 'm' }
              ],
              [
                { key: 'hit15cm', label: '击数15cm' },
                { key: 'hit10cm1', label: '击数10cm' }
              ],
              [
                { key: 'hit10cm2', label: '击数10cm' },
                { key: 'hit10cm3', label: '击数10cm' }
              ],
              [
                { key: 'rockCoreLength', label: '岩(土)芯长度', suffix: 'm' },
                { key: 'holeCondition', label: '孔内情况', isDescription: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'startDepth',
                label: '起始深度',
                type: 'number',
                placeholder: '请输入起始深度',
                required: true
              },
              {
                key: 'drillToolLength',
                label: '钻具全长(m)',
                type: 'input',
                placeholder: '填写钻具全长(m)',
                required: true
              },
              {
                key: 'remainder',
                label: '上余(m)',
                type: 'input',
                placeholder: '填写上余',
                required: true
              },
              {
                key: 'holeDepth',
                label: '孔深',
                type: 'input',
                placeholder: '填写钻具全长与上余',
                required: true
              },
              {
                key: 'advance',
                label: '进尺(m)',
                type: 'input',
                placeholder: '填写进尺',
                required: true
              },
              {
                key: 'rodLength',
                label: '杆长',
                type: 'input',
                placeholder: '填写杆长',
                required: false
              },
              {
                key: 'standardDepthFrom',
                label: '标贯深度自(m)',
                type: 'input',
                placeholder: '填写标贯深度自(m)',
                required: true
              },
              {
                key: 'standardDepthTo',
                label: '标贯深度至(m)',
                type: 'input',
                placeholder: '填写标贯深度至(m)',
                required: true
              },
              {
                key: 'hit15cm',
                label: '击数15cm',
                type: 'input',
                placeholder: '击数15cm',
                required: false
              },
              {
                key: 'hit10cm1',
                label: '击数10cm',
                type: 'input',
                placeholder: '击数10cm',
                required: false
              },
              {
                key: 'hit10cm2',
                label: '击数10cm',
                type: 'input',
                placeholder: '击数10cm',
                required: false
              },
              {
                key: 'hit10cm3',
                label: '击数10cm',
                type: 'input',
                placeholder: '击数10cm',
                required: false
              },
              {
                key: 'rockCoreLength',
                label: '岩(土)芯长度',
                type: 'input',
                placeholder: '填写岩(土)芯长度',
                required: false
              },
              {
                key: 'holeCondition',
                label: '孔内情况',
                type: 'textarea',
                placeholder: '填写进尺快慢、缩径、塌孔、掉块、掉钻、溶洞、漏水等',
                required: false
              }
            ]
          }
        },
        sampling: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `样品类型: ${item.sampleType || ''} | 取样深度: ${item.samplingDepthFrom || ''}m - ${item.samplingDepthTo || ''}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'sampleType', label: '样品类型' }
              ],
              [
                { key: 'samplingDepthFrom', label: '取样深度自', suffix: 'm' },
                { key: 'samplingDepthTo', label: '取样深度至', suffix: 'm' }
              ],
              [
                { key: 'sampleQuantity', label: '样品数量' },
                { key: 'sampleCondition', label: '样品状况', isDescription: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'startDepth',
                label: '起始深度',
                type: 'number',
                placeholder: '请输入起始深度(m)',
                required: true
              },
              {
                key: 'sampleType',
                label: '样品类型',
                type: 'picker',
                options: ['原状土', '扰动土', '岩石', '水样'],
                placeholder: '请选择样品类型',
                required: true
              },
              {
                key: 'samplingDepthFrom',
                label: '取样深度自',
                type: 'input',
                placeholder: '填写取样深度自(m)',
                required: true
              },
              {
                key: 'samplingDepthTo',
                label: '取样深度至',
                type: 'input',
                placeholder: '填写取样深度至(m)',
                required: true
              },
              {
                key: 'sampleQuantity',
                label: '样品数量',
                type: 'input',
                placeholder: '填写样品数量',
                required: false
              },
              {
                key: 'sampleCondition',
                label: '样品状况',
                type: 'textarea',
                placeholder: '描述样品的完整性、颜色、质地等状况',
                required: false
              },
              {
                key: 'rockCoreLength',
                label: '岩(土)芯长度',
                type: 'input',
                placeholder: '填写岩(土)芯长度',
                required: false
              },
              {
                key: 'holeCondition',
                label: '孔内情况',
                type: 'textarea',
                placeholder: '填写进尺快慢、缩径、塌孔、掉块、掉钻、溶洞、漏水等',
                required: false
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    // 根据数据项获取卡片配置
    getCardConfigForItem(item) {
      const workType = item.workType || 'manual';
      return this.reportConfigs[workType]?.cardConfig || this.reportConfigs.manual.cardConfig;
    },
    
    // 根据数据项获取表单配置
    getFormConfigForItem(item) {
      const workType = item.workType || this.currentReportType;
      const baseConfig = this.reportConfigs[workType]?.formConfig || this.reportConfigs.manual.formConfig;
      
      // 在表单配置前添加报表类型选择，支持动态切换
      return {
        fields: [
          {
            key: 'reportType',
            label: '作业类型',
            type: 'picker',
            options: this.reportTypes.map(type => type.name),
            placeholder: '请选择作业类型',
            required: true,
            onChange: this.handleReportTypeChange
          },
          ...baseConfig.fields
        ]
      };
    },
    
    // 处理新增项目
    handleAddItem() {
      this.showTypeSelector = true;
    },
    
    // 关闭类型选择器
    closeTypeSelector() {
      this.showTypeSelector = false;
    },
    
    // 选择报表类型
    selectReportType(type) {
      this.currentReportType = type.key;
      this.closeTypeSelector();
    },
    
    // 处理报表类型变更（表单中的动态切换）
    handleReportTypeChange(value) {
      const reportType = this.reportTypes.find(type => type.name === value);
      if (reportType && reportType.key !== this.currentReportType) {
        this.currentReportType = reportType.key;
        // 触发表单重新渲染
        this.$nextTick(() => {
          // 可以在这里添加表单切换的动画效果
        });
      }
    },
    
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      // 验证起始深度
      if (parseFloat(data.startDepth) < 0) {
        uni.showToast({
          title: '起始深度不能为负数',
          icon: 'none'
        });
        return;
      }
      
      // 设置工作类型
      const reportType = this.reportTypes.find(type => type.name === data.reportType);
      if (reportType) {
        data.workType = reportType.key;
      }
      
      if (isEdit) {
        // 编辑现有班报表
        if (editIndex > -1) {
          this.shiftReportList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新班报表
        const newId = this.shiftReportList.length > 0 ? Math.max(...this.shiftReportList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.shiftReportList.push(data);
      }
      
      // 按起始深度排序
      this.shiftReportList.sort((a, b) => a.startDepth - b.startDepth);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目
    handleEditItem(item) {
      // 根据编辑项目的报表类型设置当前类型
      const reportType = this.reportTypes.find(type => type.name === item.reportType);
      if (reportType) {
        this.currentReportType = reportType.key;
      }
      console.log('编辑班报表:', item);
    }
  }
}
</script>

<style scoped>
.shift-report-container {
  min-height: 100vh;
  width: 100%;
  background-color: #e8e8e8 !important;
}

.type-selector {
  padding: 20rpx;
}

.type-item {
  padding: 30rpx 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  border: 2rpx solid transparent;
  transition: all 0.2s ease;
}

.type-item:active {
  background-color: #e9ecef;
  border-color: #1890ff;
  transform: scale(0.98);
}

.type-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  text-align: center;
}
</style>