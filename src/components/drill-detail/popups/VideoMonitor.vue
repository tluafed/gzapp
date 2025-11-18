<template>
  <view class="video-monitors">
    <view class="video-toolbar">
      <text class="toolbar-title">视频监控列表</text>
      <view class="toolbar-actions">
        <button
          class="toolbar-btn ghost"
          :disabled="!hasBoundDevices"
          @click="openExportModal"
        >
          导出视频
        </button>
        <button
          class="toolbar-btn primary"
          :disabled="!hasBindableSlot"
          @click="openBindModal()"
        >
          绑定设备
        </button>
      </view>
    </view>

    <view v-if="loading" class="empty-state">监控数据加载中...</view>
    <view v-else>
      <view
        v-for="monitor in visibleMonitors"
        :key="monitor.id"
        class="video-monitor-item"
      >
        <view class="monitor-header">
          <text class="monitor-title">{{ monitor.name }}</text>
          <view class="monitor-actions">
            <button
              v-if="monitor.deviceId"
              class="action-btn danger"
              @click="confirmUnbind(monitor)"
            >
              解绑
            </button>
          </view>
        </view>

        <view class="monitor-meta">
          <text v-if="monitor.deviceId">
            {{ monitor.deviceName || '未命名设备' }} · {{ monitor.statusText }}
          </text>
          <text v-else class="meta-placeholder">未绑定设备</text>
        </view>

        <view class="video-container" :class="{ idle: !monitor.deviceId }">
          <view class="video-placeholder">
            <view
              class="play-button"
              :class="{ disabled: !monitor.deviceId }"
              @click="handlePlay(monitor)"
            >
              <text class="play-icon">▶</text>
            </view>
          </view>
        </view>
      </view>

      <view
        v-if="!localMonitors.length"
        class="empty-state"
      >
        暂无监控位，请联系管理员创建
      </view>
    </view>

    <!-- 绑定设备弹窗 -->
    <view v-if="showBindModal" class="modal-overlay">
      <view class="modal-panel">
        <view class="modal-header">
          <text>绑定监控设备</text>
          <text class="close-icon" @click="closeBindModal">✕</text>
        </view>
        <view class="modal-body">
          <view class="form-field">
            <text class="field-label">搜索设备</text>
            <input
              class="search-input"
              v-model="deviceSearch"
              placeholder="输入名称或位置"
            />
          </view>
          <scroll-view class="device-list" scroll-y="true">
            <view
              v-for="device in filteredDevices"
              :key="device.id"
              class="device-row"
              :class="{ active: selectedDeviceId === device.id }"
              @click="selectBindDevice(device)"
            >
              <view class="device-info">
                <text class="device-name">{{ device.name }}</text>
                <text class="device-meta">{{ device.location }}</text>
              </view>
              <view class="radio-indicator">
                <view class="dot" />
              </view>
            </view>
            <view v-if="!filteredDevices.length" class="empty-state small">
              暂无匹配设备
            </view>
          </scroll-view>
        </view>
        <view class="modal-footer">
          <button class="action-btn light" @click="closeBindModal">
            取消
          </button>
          <button class="action-btn primary" @click="confirmBindDevice">
            确认绑定
          </button>
        </view>
      </view>
    </view>

    <!-- 导出视频弹窗 -->
    <view v-if="exportModalVisible" class="modal-overlay">
      <view class="modal-panel">
        <view class="modal-header">
          <text>导出监控视频</text>
          <text class="close-icon" @click="closeExportModal">✕</text>
        </view>
        <view class="modal-body">
          <view class="form-field">
            <text class="field-label">绑定设备</text>
            <picker
              mode="selector"
              :range="boundDeviceOptions"
              range-key="label"
              @change="onSelectExportDevice"
            >
              <view class="picker-value">
                {{ exportForm.deviceName || '请选择设备' }}
              </view>
            </picker>
          </view>
          <view class="form-field">
            <text class="field-label">开始时间</text>
            <input
              class="export-input"
              placeholder="YYYY-MM-DD HH:mm"
              v-model="exportForm.startTime"
            />
          </view>
          <view class="form-field">
            <text class="field-label">结束时间</text>
            <input
              class="export-input"
              placeholder="YYYY-MM-DD HH:mm"
              v-model="exportForm.endTime"
            />
          </view>
        </view>
        <view class="modal-footer">
          <button class="action-btn light" @click="closeExportModal">
            取消
          </button>
          <button class="action-btn primary" @click="handleExportVideo">
            确定导出
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  fetchAvailableDevices,
  bindMonitorDevice,
  unbindMonitorDevice,
  exportMonitorVideo
} from '@/api/videoMonitor'

export default {
  name: 'VideoMonitor',
  props: {
    boreholeId: {
      type: String,
      default: ''
    },
    monitors: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localMonitors: [],
      showBindModal: false,
      availableDevices: [],
      deviceSearch: '',
      selectedDeviceId: '',
      pendingMonitorId: '',
      exportModalVisible: false,
      exportForm: {
        deviceId: '',
        deviceName: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    hasBoundDevices() {
      return this.localMonitors.some((item) => !!item.deviceId)
    },
    hasBindableSlot() {
      return this.localMonitors.some((item) => !item.deviceId)
    },
    boundDeviceOptions() {
      return this.localMonitors
        .filter((item) => !!item.deviceId)
        .map((item) => ({
          label: `${item.deviceName || '设备'} (${item.name})`,
          value: item.deviceId
        }))
    },
    // 只展示已绑定设备的卡片
    visibleMonitors() {
      return this.localMonitors.filter((item) => !!item.deviceId)
    },
    filteredDevices() {
      const keyword = this.deviceSearch.trim().toLowerCase()
      if (!keyword) {
        return this.availableDevices
      }
      return this.availableDevices.filter((device) => {
        const combo = `${device.name}${device.location || ''}`.toLowerCase()
        return combo.includes(keyword)
      })
    }
  },
  watch: {
    monitors: {
      handler(val) {
        this.localMonitors = (val || []).map((item) => ({
          ...item,
          statusText: item.status === 'online' ? '在线' : item.status === 'idle' ? '未绑定' : '离线'
        }))
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handlePlay(monitor) {
      if (!monitor.deviceId) {
        this.openBindModal(monitor)
        return
      }
      uni.showToast({
        title: `正在播放: ${monitor.deviceName || monitor.name}`,
        icon: 'none'
      })
      this.$emit('play-video', monitor)
    },
    async openBindModal(targetMonitor = null) {
      const monitor =
        targetMonitor ||
        this.localMonitors.find((item) => !item.deviceId)
      if (!monitor) {
        uni.showToast({ title: '暂无空闲监控位', icon: 'none' })
        return
      }
      this.pendingMonitorId = monitor.id
      this.deviceSearch = ''
      this.selectedDeviceId = ''
      if (!this.availableDevices.length) {
        uni.showLoading({ title: '加载设备...' })
        try {
          this.availableDevices = await fetchAvailableDevices()
        } finally {
          uni.hideLoading()
        }
      }
      this.showBindModal = true
    },
    closeBindModal() {
      this.showBindModal = false
      this.deviceSearch = ''
      this.selectedDeviceId = ''
      this.pendingMonitorId = ''
    },
    selectBindDevice(device) {
      this.selectedDeviceId = device.id
    },
    async confirmBindDevice() {
      if (!this.selectedDeviceId) {
        uni.showToast({ title: '请选择设备', icon: 'none' })
        return
      }
      const targetMonitor = this.localMonitors.find(
        (item) => item.id === this.pendingMonitorId
      )
      if (!targetMonitor) {
        uni.showToast({ title: '未找到可绑定监控位', icon: 'none' })
        this.closeBindModal()
        return
      }
      const device = this.availableDevices.find(
        (item) => item.id === this.selectedDeviceId
      )
      if (!device) {
        uni.showToast({ title: '设备不存在', icon: 'none' })
        return
      }
      uni.showLoading({ title: '绑定中...' })
      try {
        const result = await bindMonitorDevice({
          boreholeId: this.boreholeId,
          deviceId: device.id
        })
        if (result.success) {
          this.localMonitors = this.localMonitors.map((item) =>
            item.id === targetMonitor.id
              ? {
                  ...item,
                  deviceId: device.id,
                  deviceName: device.name,
                  status: 'online',
                  statusText: '在线'
                }
              : item
          )
          this.$emit('refresh-request')
          uni.showToast({ title: '绑定成功', icon: 'success' })
          this.availableDevices = this.availableDevices.filter(
            (item) => item.id !== device.id
          )
        }
      } finally {
        uni.hideLoading()
        this.closeBindModal()
      }
    },
    confirmUnbind(monitor) {
      uni.showModal({
        title: '解绑确认',
        content: `是否解除 ${monitor.deviceName || '该设备'} 的绑定？`,
        success: async (res) => {
          if (res.confirm) {
            await this.unbindDevice(monitor)
          }
        }
      })
    },
    async unbindDevice(monitor) {
      uni.showLoading({ title: '解绑中...' })
      try {
        await unbindMonitorDevice({ monitorId: monitor.id })
        this.localMonitors = this.localMonitors.map((item) =>
          item.id === monitor.id
            ? {
                ...item,
                deviceId: '',
                deviceName: '',
                status: 'idle',
                statusText: '未绑定'
              }
            : item
        )
        this.$emit('refresh-request')
        uni.showToast({ title: '解绑成功', icon: 'success' })
      } finally {
        uni.hideLoading()
      }
    },
    openExportModal() {
      if (!this.hasBoundDevices) {
        uni.showToast({ title: '暂无可导出的视频', icon: 'none' })
        return
      }
      this.exportModalVisible = true
    },
    closeExportModal() {
      this.exportModalVisible = false
      this.exportForm = {
        deviceId: '',
        deviceName: '',
        startTime: '',
        endTime: ''
      }
    },
    onSelectExportDevice(e) {
      const option = this.boundDeviceOptions[e.detail.value]
      if (option) {
        this.exportForm.deviceId = option.value
        this.exportForm.deviceName = option.label
      }
    },
    async handleExportVideo() {
      const { deviceId, startTime, endTime } = this.exportForm
      if (!deviceId || !startTime || !endTime) {
        uni.showToast({ title: '请完善导出信息', icon: 'none' })
        return
      }
      uni.showLoading({ title: '导出中...' })
      try {
        const result = await exportMonitorVideo({
          deviceId,
          startTime,
          endTime
        })
        if (result.success) {
          uni.showToast({ title: '导出任务已创建', icon: 'success' })
          this.$emit('export-video', {
            ...result,
            deviceId,
            startTime,
            endTime
          })
        }
      } finally {
        uni.hideLoading()
        this.closeExportModal()
      }
    }
  }
}
</script>

<style scoped>
.video-monitors {
  padding: 20rpx;
}

.video-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.toolbar-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2933;
}

.toolbar-actions {
  display: flex;
  gap: 16rpx;
}

.toolbar-btn {
  padding: 10rpx 26rpx;
  border-radius: 12rpx;
  border: 1rpx solid transparent;
  background-color: #e2e8f0;
  color: #1f2933;
  font-size: 24rpx;
}

.toolbar-btn.ghost {
  background-color: #fff;
  border-color: #d2d6dc;
}

.toolbar-btn.primary {
  background-color: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.toolbar-btn:disabled {
  background-color: #e5e7eb;
  border-color: #e5e7eb;
  color: #a1a1aa;
}

.video-monitor-item {
  background: #fff;
  border-radius: 18rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.06);
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monitor-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #111827;
}

.monitor-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  padding: 8rpx 20rpx;
  border-radius: 12rpx;
  border: 1rpx solid #d0d5dd;
  background-color: #fff;
  font-size: 24rpx;
  color: #4b5563;
}

.action-btn.primary {
  background-color: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.action-btn.light {
  background-color: #f3f4f6;
  border: none;
}

.action-btn.danger {
  color: #d14343;
  border-color: #fab2b2;
  background-color: #fff5f5;
}

.monitor-meta {
  margin: 12rpx 0 20rpx;
  color: #6b7280;
  font-size: 24rpx;
}

.meta-placeholder {
  color: #a1a1aa;
}

.video-container {
  width: 100%;
  height: 400rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: inset 0 0 0 1rpx rgba(255, 255, 255, 0.05);
}

.video-container.idle {
  opacity: 0.5;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 120rpx;
  height: 120rpx;
  background-color: rgba(255, 255, 255, 0.15);
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-button.disabled {
  opacity: 0.5;
}

.play-button:active {
  transform: scale(0.95);
}

.play-icon {
  color: #fff;
  font-size: 52rpx;
  margin-left: 8rpx;
}

.empty-state {
  text-align: center;
  color: #94a3b8;
  font-size: 26rpx;
  padding: 60rpx 0;
}

.empty-state.small {
  padding: 20rpx 0;
}

.sheet-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
}

.sheet-panel {
  width: 100%;
  background: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 20rpx 30rpx 40rpx;
  max-height: 70vh;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.close-icon {
  font-size: 32rpx;
  color: #9ca3af;
}

.device-list {
  max-height: 60vh;
}

.device-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f3f4f6;
}

.device-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.device-name {
  font-size: 28rpx;
  color: #111827;
}

.device-meta {
  font-size: 24rpx;
  color: #6b7280;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-panel {
  width: 90%;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.device-list {
  max-height: 50vh;
}

.device-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f1f5f9;
}

.device-row.active {
  background: #eef2ff;
}

.radio-indicator {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #c7d2fe;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-row.active .radio-indicator {
  border-color: #4c6ef5;
}

.radio-indicator .dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #4c6ef5;
  opacity: 0;
}

.device-row.active .radio-indicator .dot {
  opacity: 1;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.field-label {
  font-size: 26rpx;
  color: #4b5563;
}

.search-input {
  border: 1rpx solid #e5e7eb;
  border-radius: 12rpx;
  padding: 16rpx;
  font-size: 26rpx;
  color: #1f2937;
}

.picker-value,
.export-input {
  border: 1rpx solid #e5e7eb;
  border-radius: 12rpx;
  padding: 16rpx;
  font-size: 26rpx;
  color: #1f2937;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  margin-top: 20rpx;
}
</style>
