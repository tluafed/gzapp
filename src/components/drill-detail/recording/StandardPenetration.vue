<template>
  <recording-container
    :dataList="penetrationList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :emptyText="'暂无标贯数据，请点击右下角按钮添加'"
    :addTitle="'新增标贯'"
    :editTitle="'编辑标贯'"
    @save="handleSave"
    @edit-item="handleEditItem"
    @add-item="handleAddItem"
  />
</template>

<script>
import { RecordingContainer } from './common';

export default {
  name: 'StandardPenetration',
  components: {
    RecordingContainer
  },
  data() {
    return {
      penetrationList: [
        {
          id: 1,
          drillRodLength: 2,
          belongingStratum: '0-1-1 溶洞',
          hitRecords: [
            { hitNumber: 1, startDepth: 1, endDepth: 1.15, hitCount: 3 },
            { hitNumber: 2, startDepth: 1.15, endDepth: 1.25, hitCount: 4 },
            { hitNumber: 3, startDepth: 1.25, endDepth: 1.35, hitCount: 6 },
            { hitNumber: 4, startDepth: 1.35, endDepth: 1.45, hitCount: 9 }
          ],
          remarks: 'M',
          totalHitCount: 19,
          effectiveHitCount: 15
        },
        {
          id: 2,
          drillRodLength: 3,
          belongingStratum: '1-1-0 杂填土',
          hitRecords: [
            { hitNumber: 1, startDepth: 2, endDepth: 2.15, hitCount: 5 },
            { hitNumber: 2, startDepth: 2.15, endDepth: 2.25, hitCount: 6 },
            { hitNumber: 3, startDepth: 2.25, endDepth: 2.35, hitCount: 8 },
            { hitNumber: 4, startDepth: 2.35, endDepth: 2.45, hitCount: 12 }
          ],
          remarks: '正常',
          totalHitCount: 31,
          effectiveHitCount: 20
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'belongingStratum',
        subtitleFormat: (item) => `钻杆长度: ${item.drillRodLength}m`,
        fields: [
          [
            { key: 'totalHitCount', label: '总击数' },
            { key: 'effectiveHitCount', label: '有效击数' }
          ],
          [
            { key: 'hitRecords', label: '击次记录', fullWidth: true, format: this.formatHitRecords }
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
            key: 'belongingStratum',
            label: '所属地层',
            type: 'picker',
            options: ['0-1-1 溶洞', '1-1-0 杂填土', '2-1-0 粉质黏土', '3-1-0 砂质粉土'],
            placeholder: '请选择所属地层',
            required: true
          },
          {
            key: 'hit1StartDepth',
            label: '第1击起始深度',
            type: 'number',
            placeholder: '请输入起始深度(m)',
            required: true
          },
          {
            key: 'hit1EndDepth',
            label: '第1击终止深度',
            type: 'number',
            placeholder: '请输入终止深度(m)',
            required: true
          },
          {
            key: 'hit1Count',
            label: '第1击击数',
            type: 'number',
            placeholder: '请输入击数',
            required: true
          },
          {
            key: 'hit2StartDepth',
            label: '第2击起始深度',
            type: 'number',
            placeholder: '请输入起始深度(m)',
            required: true
          },
          {
            key: 'hit2EndDepth',
            label: '第2击终止深度',
            type: 'number',
            placeholder: '请输入终止深度(m)',
            required: true
          },
          {
            key: 'hit2Count',
            label: '第2击击数',
            type: 'number',
            placeholder: '请输入击数',
            required: true
          },
          {
            key: 'hit3StartDepth',
            label: '第3击起始深度',
            type: 'number',
            placeholder: '请输入起始深度(m)',
            required: true
          },
          {
            key: 'hit3EndDepth',
            label: '第3击终止深度',
            type: 'number',
            placeholder: '请输入终止深度(m)',
            required: true
          },
          {
            key: 'hit3Count',
            label: '第3击击数',
            type: 'number',
            placeholder: '请输入击数',
            required: true
          },
          {
            key: 'hit4StartDepth',
            label: '第4击起始深度',
            type: 'number',
            placeholder: '请输入起始深度(m)',
            required: true
          },
          {
            key: 'hit4EndDepth',
            label: '第4击终止深度',
            type: 'number',
            placeholder: '请输入终止深度(m)',
            required: true
          },
          {
            key: 'hit4Count',
            label: '第4击击数',
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
    // 格式化击次记录显示
    formatHitRecords(hitRecords) {
      if (!hitRecords || !Array.isArray(hitRecords)) return '';
      return hitRecords.map(record => 
        `第${record.hitNumber}击: ${record.startDepth}m-${record.endDepth}m (${record.hitCount}击)`
      ).join('; ');
    },
    
    // 处理保存
    handleSave({ data, isEdit, editIndex }) {
      // 将表单数据转换为击次记录格式
      const hitRecords = [
        {
          hitNumber: 1,
          startDepth: data.hit1StartDepth,
          endDepth: data.hit1EndDepth,
          hitCount: data.hit1Count
        },
        {
          hitNumber: 2,
          startDepth: data.hit2StartDepth,
          endDepth: data.hit2EndDepth,
          hitCount: data.hit2Count
        },
        {
          hitNumber: 3,
          startDepth: data.hit3StartDepth,
          endDepth: data.hit3EndDepth,
          hitCount: data.hit3Count
        },
        {
          hitNumber: 4,
          startDepth: data.hit4StartDepth,
          endDepth: data.hit4EndDepth,
          hitCount: data.hit4Count
        }
      ];
      
      // 计算总击数和有效击数
      const totalHitCount = hitRecords.reduce((sum, record) => sum + record.hitCount, 0);
      const effectiveHitCount = hitRecords.slice(1).reduce((sum, record) => sum + record.hitCount, 0); // 后三击为有效击数
      
      // 构建最终数据
      const finalData = {
        id: data.id,
        drillRodLength: data.drillRodLength,
        belongingStratum: data.belongingStratum,
        hitRecords: hitRecords,
        remarks: data.remarks || '',
        totalHitCount: totalHitCount,
        effectiveHitCount: effectiveHitCount
      };
      
      if (isEdit) {
        // 编辑现有标贯
        if (editIndex > -1) {
          this.penetrationList.splice(editIndex, 1, finalData);
        }
      } else {
        // 添加新标贯
        const newId = this.penetrationList.length > 0 ? Math.max(...this.penetrationList.map(item => item.id)) + 1 : 1;
        finalData.id = newId;
        this.penetrationList.push(finalData);
      }
      
      // 按钻杆长度排序
      this.penetrationList.sort((a, b) => a.drillRodLength - b.drillRodLength);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 处理编辑项目 - 需要将击次记录转换为表单格式
    handleEditItem(item) {
      // 将击次记录转换为表单字段
      const formData = {
        id: item.id,
        drillRodLength: item.drillRodLength,
        belongingStratum: item.belongingStratum,
        remarks: item.remarks
      };
      
      // 转换击次记录
      if (item.hitRecords && item.hitRecords.length >= 4) {
        formData.hit1StartDepth = item.hitRecords[0].startDepth;
        formData.hit1EndDepth = item.hitRecords[0].endDepth;
        formData.hit1Count = item.hitRecords[0].hitCount;
        
        formData.hit2StartDepth = item.hitRecords[1].startDepth;
        formData.hit2EndDepth = item.hitRecords[1].endDepth;
        formData.hit2Count = item.hitRecords[1].hitCount;
        
        formData.hit3StartDepth = item.hitRecords[2].startDepth;
        formData.hit3EndDepth = item.hitRecords[2].endDepth;
        formData.hit3Count = item.hitRecords[2].hitCount;
        
        formData.hit4StartDepth = item.hitRecords[3].startDepth;
        formData.hit4EndDepth = item.hitRecords[3].endDepth;
        formData.hit4Count = item.hitRecords[3].hitCount;
      }
      
      console.log('编辑标贯:', formData);
    },
    
    // 处理新增项目
    handleAddItem() {
      console.log('新增标贯');
    }
  }
}
</script>

<style scoped>
/* 这里不需要任何样式，因为所有样式都在通用组件中 */
</style>