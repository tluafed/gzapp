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
          reportType: '人工挖探',
          workType: 'manual',
          startDepth: 25,
          holeDepth: '钻具全长与上余',
          advance: '1.0',
          rockCoreLength: '0.9',
          holeCondition: '进尺正常，土质较软，无塌孔现象'
        },
        {
          id: 2,
          reportType: '锤击贯入',
          workType: 'hammer',
          drillType: '合金',
          drillSpec: '110mm',
          startDepth: 25,
          drillToolLength: '26.2',
          remainder: '0.8',
          holeDepth: '25.4',
          advance: '0.45',
          rockCoreLength: '0.4',
          holeCondition: '锤击贯入正常，土质为中密砂土'
        },
        {
          id: 3,
          reportType: '回转钻进',
          workType: 'rotary',
          drillType: '合金',
          drillSpec: '110mm',
          startDepth: 25,
          drillToolLength: '26.2',
          remainder: '0.8',
          holeDepth: '25.4',
          advance: '0.45',
          rockCoreLength: '0.4',
          holeCondition: '回转钻进正常，土质为中密砂土'
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
          startDepth: 25,
          remainder: '0.8',
          holeDepth: '25.4',
          advance: '0.45',
          sampleType: '原状土',
          samplingDepthFrom: '8.0',
          samplingDepthTo: '8.5',
          rockCoreLength: '0.4',
          holeCondition: '取样顺利，土层稳定'
        }
      ],
      
      // 报表类型配置
      reportTypes: [
        { key: 'manual', name: '人工挖深' },
        { key: 'hammer', name: '锤击贯入' },
        { key: 'rotary', name: '回转钻进' },
        { key: 'standard', name: '标贯试验' },
        { key: 'sampling', name: '取样' }
      ],
      
      // 不同报表类型的配置
      reportConfigs: {
        manual: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m | 进尺: ${item.advance}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'holeDepth', label: '孔深' }
              ],
              [
                { key: 'advance', label: '进尺', suffix: 'm' },
                { key: 'rockCoreLength', label: '岩(土)芯长度', suffix: 'm' }
              ],
              [
                { key: 'holeCondition', label: '孔内情况', isDescription: true, fullWidth: true }
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
        hammer: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `钻头类型: ${item.drillType || ''} | 钻头规格: ${item.drillSpec || ''}`,
            fields: [
              [
                { key: 'drillType', label: '钻头类型' },
                { key: 'drillSpec', label: '钻头规格' }
              ],
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
                { key: 'rockCoreLength', label: '岩(土)芯长度', suffix: 'm' }
              ],
              [
                { key: 'holeCondition', label: '孔内情况', isDescription: true, fullWidth: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'drillType',
                label: '钻头类型',
                type: 'picker',
                options: ['合金', '钢粒', '金刚石', '其他'],
                placeholder: '请选择钻头类型',
                required: true
              },
              {
                key: 'drillSpec',
                label: '钻头规格',
                type: 'picker',
                options: ['110mm', '130mm', '150mm', '其他'],
                placeholder: '请选择钻头规格',
                required: true
              },
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
        rotary: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `钻头类型: ${item.drillType || ''} | 钻头规格: ${item.drillSpec || ''}`,
            fields: [
              [
                { key: 'drillType', label: '钻头类型' },
                { key: 'drillSpec', label: '钻头规格' }
              ],
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
                { key: 'rockCoreLength', label: '岩(土)芯长度', suffix: 'm' }
              ],
              [
                { key: 'holeCondition', label: '孔内情况', isDescription: true, fullWidth: true }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'drillType',
                label: '钻头类型',
                type: 'picker',
                options: ['合金', '钢粒', '金刚石', '其他'],
                placeholder: '请选择钻头类型',
                required: true
              },
              {
                key: 'drillSpec',
                label: '钻头规格',
                type: 'picker',
                options: ['110mm', '130mm', '150mm', '其他'],
                placeholder: '请选择钻头规格',
                required: true
              },
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
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m | 样品类型: ${item.sampleType || ''}`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'remainder', label: '上余', suffix: 'm' }
              ],
              [
                { key: 'holeDepth', label: '孔深', suffix: 'm' },
                { key: 'advance', label: '进尺', suffix: 'm' }
              ],
              [
                { key: 'sampleType', label: '样品类型' },
                { key: 'samplingDepthFrom', label: '取样深度自', suffix: 'm' }
              ],
              [
                { key: 'samplingDepthTo', label: '取样深度至', suffix: 'm' },
                { key: 'rockCoreLength', label: '岩(土)芯长度', suffix: 'm' }
              ],
              [
                { key: 'holeCondition', label: '孔内情况', isDescription: true, fullWidth: true }
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
                key: 'sampleType',
                label: '样品类型',
                type: 'picker',
                options: ['原状土', '扰动土', '岩石', '水样'],
                placeholder: '请选择样品类型',
                required: true
              },
              {
                key: 'samplingDepthFrom',
                label: '取样深度自(m)',
                type: 'input',
                placeholder: '填写取样深度自(m)',
                required: true
              },
              {
                key: 'samplingDepthTo',
                label: '取样深度至(m)',
                type: 'input',
                placeholder: '填写取样深度至(m)',
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
      // 直接设置默认类型为第一个，不显示类型选择器
      this.currentReportType = this.reportTypes[0].key;
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