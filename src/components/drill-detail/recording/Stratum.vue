<template>
  <recording-container
    :dataList="stratumList"
    :cardConfig="cardConfig"
    :formConfig="formConfig"
    :statusConfig="statusConfig"
    :buttonConfig="buttonConfig"
    :emptyText="emptyText"
    :addTitle="addTitle"
    :editTitle="editTitle"
    @edit-item="handleEditItem"
    @left-action="handleSubmit"
    @right-action="handleAddItem"
    @save="handleSave"
  />
</template>

<script>
import { RecordingContainer } from './common';

export default {
  name: 'Stratum',
  components: {
    RecordingContainer
  },
  data() {
    return {
      // 地层数据列表
      stratumList: [
        {
          id: 1,
          standardStratum: '1-1-0 杂填土',
          mainLayerNo: '1',
          subLayerNo: '1',
          subSubLayerNo: '',
          topDepth: 0,
          bottomDepth: 2.5,
          rockSoilType: '填土',
          rockSoilName: '杂填土',
          geologicalAge: 'Q4',
          geologicalOrigin: 'ml',
          recoveryRate: 85,
          description: '灰褐色，稍湿，稍压实，由黏土混建筑垃圾组成，为近代人工填土，不均匀'
        },
        {
          id: 2,
          standardStratum: '2-1-0 粉质黏土',
          mainLayerNo: '2',
          subLayerNo: '1',
          subSubLayerNo: '',
          topDepth: 2.5,
          bottomDepth: 5.8,
          rockSoilType: '黏性土',
          rockSoilName: '粉质黏土',
          geologicalAge: 'Q3',
          geologicalOrigin: 'al',
          recoveryRate: 92,
          description: '褐黄色，可塑，中等压缩性，切面光滑，干强度中等，韧性中等'
        },
        {
          id: 3,
          standardStratum: '3-1-0 砂质粉土',
          mainLayerNo: '3',
          subLayerNo: '1',
          subSubLayerNo: '',
          topDepth: 5.8,
          bottomDepth: 8.2,
          rockSoilType: '砂土',
          rockSoilName: '砂质粉土',
          geologicalAge: 'Q3',
          geologicalOrigin: 'al',
          recoveryRate: 88,
          description: '灰色，湿，松散，以粉砂为主，含少量细砂，夹薄层粉质黏土'
        }
      ],
      
      // 卡片配置
      cardConfig: {
        titleField: 'standardStratum',
        subtitleFormat: (item) => `${item.topDepth}m - ${item.bottomDepth || '?'}m`,
        fields: [
          [
            { key: 'mainLayerNo', label: '主层编号' },
            { key: 'subLayerNo', label: '亚层编号' }
          ],
          [
            { key: 'rockSoilType', label: '岩土类别' },
            { key: 'rockSoilName', label: '岩土名称' }
          ],
          [
            { key: 'geologicalAge', label: '地质时代' },
            { key: 'geologicalOrigin', label: '地质成因' }
          ],
          [
            { key: 'recoveryRate', label: '采取率', suffix: '%', fullWidth: true }
          ],
          [
            { key: 'description', label: '岩土描述', fullWidth: true, isDescription: true }
          ]
        ]
      },
      
      // 表单配置
      formConfig: {
        fields: [
          {
            key: 'standardStratum',
            label: '标准地层',
            type: 'picker',
            options: ['1-1-0 杂填土', '2-1-0 粉质黏土', '3-1-0 砂质粉土', '4-1-0 中砂', '5-1-0 强风化花岗岩'],
            placeholder: '请选择标准地层'
          },
          {
            key: 'mainLayerNo',
            label: '主层编号',
            type: 'input',
            placeholder: '请输入主层编号',
            required: true
          },
          {
            key: 'subLayerNo',
            label: '亚层编号',
            type: 'input',
            placeholder: '请输入亚层编号'
          },
          {
            key: 'subSubLayerNo',
            label: '次亚层号',
            type: 'input',
            placeholder: '请输入次亚层编号'
          },
          {
            key: 'topDepth',
            label: '层顶深度',
            type: 'number',
            placeholder: '请输入层顶深度',
            required: true
          },
          {
            key: 'bottomDepth',
            label: '层底深度',
            type: 'number',
            placeholder: '请输入层底深度'
          },
          {
            key: 'rockSoilType',
            label: '岩土类别',
            type: 'picker',
            options: ['填土', '黏性土', '砂土', '碎石土', '岩石'],
            placeholder: '请选择岩土类别'
          },
          {
            key: 'rockSoilName',
            label: '岩土名称',
            type: 'picker',
            options: ['杂填土', '粉质黏土', '砂质粉土', '中砂', '强风化花岗岩'],
            placeholder: '请选择岩土名称'
          },
          {
            key: 'geologicalAge',
            label: '地质时代',
            type: 'picker',
            options: ['Q4', 'Q3', 'Q2', 'Q1', 'N', 'E', 'K', 'J'],
            placeholder: '请选择地质时代'
          },
          {
            key: 'geologicalOrigin',
            label: '地质成因',
            type: 'picker',
            options: ['ml', 'al', 'pl', 'dl', 'el'],
            placeholder: '请选择地质成因'
          },
          {
            key: 'recoveryRate',
            label: '采取率',
            type: 'number',
            placeholder: '请输入采取率',
            required: true
          },
          {
            key: 'description',
            label: '岩土描述',
            type: 'textarea',
            placeholder: '请输入岩土描述'
          }
        ]
      },
      
      // 编录状态配置 - 已编录状态（橙色）
      statusConfig: {
        type: 'recorded',
        text: '已编录'
      },
      
      // 按钮配置 - 提交和添加
      buttonConfig: {
        leftButton: {
          text: '提交',
          disabled: false
        },
        rightButton: {
          text: '添加',
          disabled: false
        }
      },
      
      // 其他配置
      emptyText: '暂无地层数据',
      addTitle: '新增地层',
      editTitle: '编辑地层'
    }
  },
  methods: {
    // 处理编辑项目
    handleEditItem(item) {
      console.log('编辑地层:', item);
    },
    
    // 处理提交按钮
    handleSubmit() {
      uni.showToast({
        title: '地层数据已提交',
        icon: 'success'
      });
    },
    
    // 处理添加按钮
    handleAddItem() {
      console.log('添加新地层');
    },
    
    // 处理保存
    handleSave(saveData) {
      const { data, isEdit, editIndex } = saveData;
      
      if (isEdit) {
        // 编辑现有地层
        if (editIndex > -1) {
          this.stratumList.splice(editIndex, 1, data);
        }
      } else {
        // 添加新地层
        const newId = this.stratumList.length > 0 ? Math.max(...this.stratumList.map(item => item.id)) + 1 : 1;
        data.id = newId;
        this.stratumList.push(data);
      }
      
      // 按层顶深度排序
      this.stratumList.sort((a, b) => a.topDepth - b.topDepth);
      
      // 提示成功
      uni.showToast({
        title: isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    }
  }
}
</script>

<style scoped>
/* 使用通用组件，无需额外样式 */
</style>
