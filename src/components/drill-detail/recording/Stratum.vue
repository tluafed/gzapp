<template>
  <view class="stratum-container">
    <view class="recording-content">
      <!-- 地层卡片列表 -->
      <view class="stratum-list" v-if="stratumList.length > 0">
        <view 
          class="stratum-card"
          v-for="(item, index) in stratumList" 
          :key="index"
          @click="editStratum(item)"
        >
          <view class="stratum-card-header">
            <text class="stratum-name">{{ item.standardStratum }}</text>
            <text class="stratum-depth">{{ item.topDepth }}m - {{ item.bottomDepth || '?' }}m</text>
          </view>
          <view class="stratum-card-content">
            <view class="stratum-info-row">
              <view class="stratum-info-item">
                <text class="info-label">主层编号:</text>
                <text class="info-value">{{ item.mainLayerNo }}</text>
              </view>
              <view class="stratum-info-item">
                <text class="info-label">亚层编号:</text>
                <text class="info-value">{{ item.subLayerNo }}</text>
              </view>
            </view>
            <view class="stratum-info-row">
              <view class="stratum-info-item">
                <text class="info-label">岩土类别:</text>
                <text class="info-value">{{ item.rockSoilType }}</text>
              </view>
              <view class="stratum-info-item">
                <text class="info-label">岩土名称:</text>
                <text class="info-value">{{ item.rockSoilName }}</text>
              </view>
            </view>
            <view class="stratum-info-row">
              <view class="stratum-info-item">
                <text class="info-label">地质时代:</text>
                <text class="info-value">{{ item.geologicalAge }}</text>
              </view>
              <view class="stratum-info-item">
                <text class="info-label">地质成因:</text>
                <text class="info-value">{{ item.geologicalOrigin }}</text>
              </view>
            </view>
            <view class="stratum-info-row">
              <view class="stratum-info-item full-width">
                <text class="info-label">采取率:</text>
                <text class="info-value">{{ item.recoveryRate }}%</text>
              </view>
            </view>
            <view class="stratum-info-row">
              <view class="stratum-info-item full-width">
                <text class="info-label">岩土描述:</text>
                <text class="info-value description">{{ item.description }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <text class="empty-text">暂无地层数据，请点击右下角按钮添加</text>
      </view>
      
      <!-- 新增按钮 -->
      <view class="add-button" @click="addStratum">
        <text class="add-icon">+</text>
      </view>
    </view>
    
    <!-- 地层编辑/新增二级弹窗 -->
    <sub-popup :show="showStratumPopup" :title="isEdit ? '编辑地层' : '新增地层'" @close="closePopup">
      <view class="form-container">
        <view class="form-item">
          <text class="form-label">标准地层</text>
          <picker class="form-picker" :value="standardStratumIndex" :range="standardStratumOptions" @change="onStandardStratumChange">
            <view class="picker-value">{{ currentStratum.standardStratum || '请选择标准地层' }}</view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">主层编号</text>
          <input class="form-input" type="text" v-model="currentStratum.mainLayerNo" placeholder="请输入主层编号" />
        </view>
        
        <view class="form-item">
          <text class="form-label">亚层编号</text>
          <input class="form-input" type="text" v-model="currentStratum.subLayerNo" placeholder="请输入亚层编号" />
        </view>
        
        <view class="form-item">
          <text class="form-label">次亚层号</text>
          <input class="form-input" type="text" v-model="currentStratum.subSubLayerNo" placeholder="请输入次亚层编号" />
        </view>
        
        <view class="form-item">
          <text class="form-label">层顶深度</text>
          <input class="form-input" type="number" v-model="currentStratum.topDepth" placeholder="请输入层顶深度" />
        </view>
        
        <view class="form-item">
          <text class="form-label">层底深度</text>
          <input class="form-input" type="number" v-model="currentStratum.bottomDepth" placeholder="请输入层底深度" />
        </view>
        
        <view class="form-item">
          <text class="form-label">岩土类别</text>
          <picker class="form-picker" :value="rockSoilTypeIndex" :range="rockSoilTypeOptions" @change="onRockSoilTypeChange">
            <view class="picker-value">{{ currentStratum.rockSoilType || '请选择岩土类别' }}</view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">岩土名称</text>
          <picker class="form-picker" :value="rockSoilNameIndex" :range="rockSoilNameOptions" @change="onRockSoilNameChange">
            <view class="picker-value">{{ currentStratum.rockSoilName || '请选择岩土名称' }}</view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">地质时代</text>
          <picker class="form-picker" :value="geologicalAgeIndex" :range="geologicalAgeOptions" @change="onGeologicalAgeChange">
            <view class="picker-value">{{ currentStratum.geologicalAge || '请选择地质时代' }}</view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">地质成因</text>
          <picker class="form-picker" :value="geologicalOriginIndex" :range="geologicalOriginOptions" @change="onGeologicalOriginChange">
            <view class="picker-value">{{ currentStratum.geologicalOrigin || '请选择地质成因' }}</view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label required">采取率</text>
          <input class="form-input" type="number" v-model="currentStratum.recoveryRate" placeholder="请输入采取率" />
        </view>
        
        <view class="form-item">
          <text class="form-label">岩土描述</text>
          <textarea class="form-textarea" v-model="currentStratum.description" placeholder="请输入岩土描述"></textarea>
        </view>
        
        <view class="form-footer">
          <button class="btn btn-cancel" @click="closePopup">取消</button>
          <button class="btn btn-confirm" @click="saveStratum">确定</button>
        </view>
      </view>
    </sub-popup>
  </view>
</template>

<script>
import SubPopup from '../../sub-popup/sub-popup.vue';

export default {
  name: 'Stratum',
  components: {
    SubPopup
  },
  data() {
    return {
      showStratumPopup: false,
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
      currentStratum: {
        id: null,
        standardStratum: '',
        mainLayerNo: '',
        subLayerNo: '',
        subSubLayerNo: '',
        topDepth: '',
        bottomDepth: '',
        rockSoilType: '',
        rockSoilName: '',
        geologicalAge: '',
        geologicalOrigin: '',
        recoveryRate: '',
        description: ''
      },
      isEdit: false,
      editIndex: -1,
      
      // 选项数据
      standardStratumOptions: ['1-1-0 杂填土', '2-1-0 粉质黏土', '3-1-0 砂质粉土', '4-1-0 中砂', '5-1-0 强风化花岗岩'],
      standardStratumIndex: 0,
      
      rockSoilTypeOptions: ['填土', '黏性土', '砂土', '碎石土', '岩石'],
      rockSoilTypeIndex: 0,
      
      rockSoilNameOptions: ['杂填土', '粉质黏土', '砂质粉土', '中砂', '强风化花岗岩'],
      rockSoilNameIndex: 0,
      
      geologicalAgeOptions: ['Q4', 'Q3', 'Q2', 'Q1', 'N', 'E', 'K', 'J'],
      geologicalAgeIndex: 0,
      
      geologicalOriginOptions: ['ml', 'al', 'pl', 'dl', 'el'],
      geologicalOriginIndex: 0
    }
  },
  methods: {
    // 打开新增地层弹窗
    addStratum() {
      this.isEdit = false;
      this.currentStratum = {
        id: null,
        standardStratum: '',
        mainLayerNo: '',
        subLayerNo: '',
        subSubLayerNo: '',
        topDepth: '',
        bottomDepth: '',
        rockSoilType: '',
        rockSoilName: '',
        geologicalAge: '',
        geologicalOrigin: '',
        recoveryRate: '',
        description: ''
      };
      this.showStratumPopup = true;
    },
    
    // 打开编辑地层弹窗
    editStratum(item) {
      this.isEdit = true;
      this.editIndex = this.stratumList.findIndex(stratum => stratum.id === item.id);
      this.currentStratum = JSON.parse(JSON.stringify(item)); // 深拷贝
      
      // 设置选择器索引
      this.standardStratumIndex = this.standardStratumOptions.indexOf(item.standardStratum);
      this.rockSoilTypeIndex = this.rockSoilTypeOptions.indexOf(item.rockSoilType);
      this.rockSoilNameIndex = this.rockSoilNameOptions.indexOf(item.rockSoilName);
      this.geologicalAgeIndex = this.geologicalAgeOptions.indexOf(item.geologicalAge);
      this.geologicalOriginIndex = this.geologicalOriginOptions.indexOf(item.geologicalOrigin);
      
      this.showStratumPopup = true;
    },
    
    // 关闭弹窗
    closePopup() {
      this.showStratumPopup = false;
    },
    
    // 保存地层数据
    saveStratum() {
      // 表单验证
      if (!this.currentStratum.mainLayerNo) {
        uni.showToast({
          title: '请输入主层编号',
          icon: 'none'
        });
        return;
      }
      
      if (!this.currentStratum.topDepth && this.currentStratum.topDepth !== 0) {
        uni.showToast({
          title: '请输入层顶深度',
          icon: 'none'
        });
        return;
      }
      
      if (!this.currentStratum.recoveryRate) {
        uni.showToast({
          title: '请输入采取率',
          icon: 'none'
        });
        return;
      }
      
      if (this.isEdit) {
        // 编辑现有地层
        if (this.editIndex > -1) {
          this.stratumList.splice(this.editIndex, 1, this.currentStratum);
        }
      } else {
        // 添加新地层
        const newId = this.stratumList.length > 0 ? Math.max(...this.stratumList.map(item => item.id)) + 1 : 1;
        this.currentStratum.id = newId;
        this.stratumList.push(this.currentStratum);
      }
      
      // 按层顶深度排序
      this.stratumList.sort((a, b) => a.topDepth - b.topDepth);
      
      // 关闭弹窗
      this.closePopup();
      
      // 提示成功
      uni.showToast({
        title: this.isEdit ? '编辑成功' : '添加成功',
        icon: 'success'
      });
    },
    
    // 选择器事件处理
    onStandardStratumChange(e) {
      this.standardStratumIndex = e.detail.value;
      this.currentStratum.standardStratum = this.standardStratumOptions[this.standardStratumIndex];
    },
    
    onRockSoilTypeChange(e) {
      this.rockSoilTypeIndex = e.detail.value;
      this.currentStratum.rockSoilType = this.rockSoilTypeOptions[this.rockSoilTypeIndex];
    },
    
    onRockSoilNameChange(e) {
      this.rockSoilNameIndex = e.detail.value;
      this.currentStratum.rockSoilName = this.rockSoilNameOptions[this.rockSoilNameIndex];
    },
    
    onGeologicalAgeChange(e) {
      this.geologicalAgeIndex = e.detail.value;
      this.currentStratum.geologicalAge = this.geologicalAgeOptions[this.geologicalAgeIndex];
    },
    
    onGeologicalOriginChange(e) {
      this.geologicalOriginIndex = e.detail.value;
      this.currentStratum.geologicalOrigin = this.geologicalOriginOptions[this.geologicalOriginIndex];
    }
  }
}
</script>

<style scoped>
/* 页面根元素 */
page {
  background-color: #e8e8e8 !important;
}

/* 整体容器 - 强制灰色背景 */
.stratum-container {
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

/* 地层卡片列表 */
.stratum-list {
  width: 100%;
  background-color: #e8e8e8 !important;
  padding: 24rpx 20rpx 120rpx 20rpx;
  box-sizing: border-box;
  min-height: 100vh;
}

/* 地层卡片 */
.stratum-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-left: 6rpx solid #1890ff;
}

/* 卡片头部 */
.stratum-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 28rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid #f5f5f5;
}

/* 地层名称 - 统一蓝色 */
.stratum-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #1890ff;
}

/* 深度标签 */
.stratum-depth {
  font-size: 26rpx;
  color: #666666;
  background-color: #f8f9fa;
  padding: 6rpx 18rpx;
  border-radius: 24rpx;
}

/* 卡片内容 */
.stratum-card-content {
  padding: 24rpx 28rpx;
  background-color: #ffffff;
}

.stratum-info-row {
  display: flex;
  margin-bottom: 16rpx;
}

.stratum-info-item {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.stratum-info-item.full-width {
  flex: 2;
}

.info-label {
  font-size: 26rpx;
  color: #666666;
  margin-right: 12rpx;
  white-space: nowrap;
  min-width: 120rpx;
}

.info-value {
  font-size: 26rpx;
  color: #333333;
  flex: 1;
  line-height: 1.4;
}

.info-value.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
  background-color: #e8e8e8 !important;
}

.empty-text {
  font-size: 30rpx;
  color: #999999;
}

/* 新增按钮 */
.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 56rpx;
  background-color: #1890ff;
  box-shadow: 0 6rpx 20rpx rgba(24, 144, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.add-icon {
  font-size: 56rpx;
  color: #ffffff;
  font-weight: 300;
  line-height: 1;
}

/* 表单样式 */
.form-container {
  padding: 20rpx 30rpx;
}

.form-item {
  margin-bottom: 24rpx;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  display: block;
}

.form-label.required::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.form-textarea {
  width: 100%;
  height: 160rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.form-picker {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #d9d9d9;
  border-radius: 8rpx;
  padding: 0 20rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.picker-value {
  font-size: 28rpx;
  color: #333;
}

.form-footer {
  display: flex;
  margin-top: 40rpx;
  padding-bottom: 30rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  margin: 0 10rpx;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-confirm {
  background-color: #1890ff;
  color: #fff;
}
</style>