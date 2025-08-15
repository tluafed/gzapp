<template>
  <view class="shift-report-container">
    <!-- 报表类型选择弹窗 -->
    <sub-popup 
      :show="showTypeSelector" 
      title="选择报表类型" 
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
      :cardConfig="currentCardConfig"
      :formConfig="currentFormConfig"
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
      shiftReportList: [
        {
          id: 1,
          reportType: '人工挖深',
          startDepth: 25,
          holeDepth: '填写钻具全长与上余',
          advance: '填写进尺',
          rockCoreLength: '填写岩(土)芯长度',
          holeCondition: '填写进尺快慢、缩径、塌孔、掉块、掉钻、溶洞、漏水等'
        }
      ],
      
      // 报表类型配置
      reportTypes: [
        { key: 'manual', name: '人工挖深' },
        { key: 'standard', name: '标贯试验' },
        { key: 'hammer', name: '锤击贯入' },
        { key: 'rotary', name: '回转钻进' },
        { key: 'sampling', name: '取样' }
      ],
      
      // 不同报表类型的配置
      reportConfigs: {
        manual: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'advance', label: '进尺' }
              ],
              [
                { key: 'holeDepth', label: '孔深', fullWidth: true }
              ],
              [
                { key: 'holeCondition', label: '孔内情况', fullWidth: true, isDescription: true }
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
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'drillToolLength', label: '钻具全长', suffix: 'm' }
              ],
              [
                { key: 'remainder', label: '上余', suffix: 'm' },
                { key: 'advance', label: '进尺', suffix: 'm' }
              ],
              [
                { key: 'standardDepthFrom', label: '标贯深度自', suffix: 'm' },
                { key: 'standardDepthTo', label: '标贯深度至', suffix: 'm' }
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
                key: 'drillToolLength',
                label: '钻具全长',
                type: 'input',
                placeholder: '填写钻具全长(m)',
                required: true
              },
              {
                key: 'remainder',
                label: '上余',
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
                label: '进尺',
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
                label: '标贯深度自',
                type: 'input',
                placeholder: '填写标贯深度自(m)',
                required: false
              },
              {
                key: 'standardDepthTo',
                label: '标贯深度至',
                type: 'input',
                placeholder: '填写标贯深度至(m)',
                required: false
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
                { key: 'advance', label: '进尺', suffix: 'm' }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'drillType',
                label: '钻头类型',
                type: 'picker',
                options: ['合金', '钢粒', '金刚石'],
                placeholder: '请选择钻头类型',
                required: true
              },
              {
                key: 'drillSpec',
                label: '钻头规格',
                type: 'picker',
                options: ['110mm', '130mm', '150mm'],
                placeholder: '请选择钻头规格',
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
                key: 'drillToolLength',
                label: '钻具全长',
                type: 'input',
                placeholder: '填写钻具全长(m)',
                required: true
              },
              {
                key: 'remainder',
                label: '上余',
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
                label: '进尺',
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
                { key: 'advance', label: '进尺', suffix: 'm' }
              ]
            ]
          },
          formConfig: {
            fields: [
              {
                key: 'drillType',
                label: '钻头类型',
                type: 'picker',
                options: ['合金', '钢粒', '金刚石'],
                placeholder: '请选择钻头类型',
                required: true
              },
              {
                key: 'drillSpec',
                label: '钻头规格',
                type: 'picker',
                options: ['110mm', '130mm', '150mm'],
                placeholder: '请选择钻头规格',
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
                key: 'drillToolLength',
                label: '钻具全长',
                type: 'input',
                placeholder: '填写钻具全长(m)',
                required: true
              },
              {
                key: 'remainder',
                label: '上余',
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
                label: '进尺',
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
        sampling: {
          cardConfig: {
            titleField: 'reportType',
            subtitleFormat: (item) => `起始深度: ${item.startDepth}m`,
            fields: [
              [
                { key: 'startDepth', label: '起始深度', suffix: 'm' },
                { key: 'remainder', label: '上余', suffix: 'm' }
              ],
              [
                { key: 'sampleType', label: '样品类型' },
                { key: 'samplingDepthFrom', label: '取样深度自', suffix: 'm' }
              ],
              [
                { key: 'samplingDepthTo', label: '取样深度至', suffix: 'm' },
                { key: 'advance', label: '进尺', suffix: 'm' }
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
                key: 'remainder',
                label: '上余',
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
                label: '进尺',
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
                label: '取样深度自',
                type: 'input',
                placeholder: '填写取样深度自(m)',
                required: false
              },
              {
                key: 'samplingDepthTo',
                label: '取样深度至',
                type: 'input',
                placeholder: '填写取样深度至(m)',
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
  computed: {
    currentCardConfig() {
      return this.reportConfigs[this.currentReportType].cardConfig;
    },
    currentFormConfig() {
      const baseConfig = this.reportConfigs[this.currentReportType].formConfig;
      // 在表单配置前添加报表类型选择
      return {
        fields: [
          {
            key: 'reportType',
            label: '作业类型',
            type: 'picker',
            options: this.reportTypes.map(type => type.name),
            placeholder: '请选择作业类型',
            required: true
          },
          ...baseConfig.fields
        ]
      };
    }
  },
  methods: {
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
}

.type-item:active {
  background-color: #e9ecef;
  border-color: #1890ff;
}

.type-name {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}
</style>