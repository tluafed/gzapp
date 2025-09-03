<template>
	<view class="map-controls">
		<!-- 图层按钮 - 右上角 -->
		<view class="layer-btn" @click="toggleLayer">
			<text class="layer-icon">☰</text>
		</view>
		
		<!-- 复位和定位按钮 - 右侧中部 -->
		<view class="control-buttons">
			<view class="control-btn reset-btn" @click="resetMap">
				<text class="control-icon">⟲</text>
			</view>
			<view class="control-btn location-btn" @click="locateMap">
				<text class="control-icon">⊙</text>
			</view>
		</view>
		
		<!-- 图层侧边栏 -->
		<view 
			v-show="showLayerSidebar" 
			class="layer-mask" 
			@click="closeLayer"
		></view>
		<view 
			class="layer-sidebar" 
			:class="{ 'layer-sidebar-show': showLayerSidebar }"
			:style="{ right: showLayerSidebar ? '0rpx' : '-600rpx' }"
		>
			<view class="layer-header">
				<text class="layer-title">图层控制</text>
				<view class="layer-close" @click="closeLayer">
					<text class="close-icon">×</text>
				</view>
			</view>
			<view class="layer-content">
				<!-- 线路图例 -->
				<view class="layer-section">
					<view class="section-header">
						<text class="section-title">线路图例</text>
						<switch 
							:checked="layerSettings.routes.enabled" 
							@change="toggleLayerSetting('routes')"
							color="#007AFF"
						/>
					</view>
					<view class="legend-list">
						<view class="legend-item">
							<view class="legend-line route-line"></view>
							<text class="legend-text">在建</text>
						</view>
					</view>
				</view>

				<!-- 工点图例 -->
				<view class="layer-section">
					<view class="section-header">
						<text class="section-title">工点图例</text>
						<switch 
							:checked="layerSettings.workSites.enabled" 
							@change="toggleLayerSetting('workSites')"
							color="#007AFF"
						/>
					</view>
					<view class="legend-list">
						<view class="legend-item">
							<view class="legend-icon worksite-icon"></view>
							<text class="legend-text">工点</text>
						</view>
					</view>
				</view>

				<!-- 钻孔图例 -->
				<view class="layer-section">
					<view class="section-header">
						<text class="section-title">钻孔图例</text>
						<switch 
							:checked="layerSettings.drillHoles.enabled" 
							@change="toggleLayerSetting('drillHoles')"
							color="#007AFF"
						/>
					</view>
					<view class="legend-list">
						<view class="legend-item">
							<view class="legend-dot drill-unfinished"></view>
							<text class="legend-text">未开孔</text>
						</view>
						<view class="legend-item">
							<view class="legend-dot drill-progress"></view>
							<text class="legend-text">施工中</text>
						</view>
						<view class="legend-item">
							<view class="legend-dot drill-finished"></view>
							<text class="legend-text">已完成</text>
						</view>
					</view>
				</view>

				<!-- 机台图例 -->
				<view class="layer-section">
					<view class="section-header">
						<text class="section-title">机台图例</text>
						<switch 
							:checked="layerSettings.machines.enabled" 
							@change="toggleLayerSetting('machines')"
							color="#007AFF"
						/>
					</view>
					<view class="legend-list">
						<view class="legend-item">
							<view class="legend-machine machine-idle"></view>
							<text class="legend-text">已进场</text>
						</view>
						<view class="legend-item">
							<view class="legend-machine machine-working"></view>
							<text class="legend-text">施工中</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'MapControls',
	data() {
		return {
			showLayerSidebar: false,
			layerSettings: {
				routes: {
					enabled: true
				},
				workSites: {
					enabled: true
				},
				drillHoles: {
					enabled: true
				},
				machines: {
					enabled: true
				}
			}
		}
	},
	methods: {
		// 图层控制方法
		toggleLayer() {
			this.showLayerSidebar = !this.showLayerSidebar;
			console.log('图层侧边栏状态:', this.showLayerSidebar);
			this.$emit('layerToggle', this.showLayerSidebar);
		},
		closeLayer() {
			this.showLayerSidebar = false;
			this.$emit('layerToggle', false);
		},
		toggleLayerSetting(layerType) {
			this.layerSettings[layerType].enabled = !this.layerSettings[layerType].enabled;
			this.$emit('layerSettingChange', {
				type: layerType,
				enabled: this.layerSettings[layerType].enabled
			});
			console.log(`${layerType} 图层状态: ${this.layerSettings[layerType].enabled}`);
		},
		// 地图控制方法
		resetMap() {
			uni.showToast({
				title: '地图已复位',
				icon: 'success'
			});
			this.$emit('mapReset');
		},
		locateMap() {
			uni.showToast({
				title: '正在定位...',
				icon: 'loading'
			});
			// 模拟定位延迟
			setTimeout(() => {
				uni.showToast({
					title: '定位成功',
					icon: 'success'
				});
			}, 1500);
			this.$emit('mapLocate');
		}
	}
}
</script>

<style scoped>
.map-controls {
	position: relative;
	z-index: 1000;
}

/* 图层按钮 - 右上角 */
.layer-btn {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 80rpx;
	height: 80rpx;
	background: #ffffff;
	border: 1rpx solid #d1d5db;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;
}

.layer-btn:active {
	transform: scale(0.95);
	background: #f9fafb;
}

.layer-icon {
	font-size: 32rpx;
	line-height: 1;
	color: #4b5563;
}

/* 复位和定位按钮 - 右侧中部位置 */
.control-buttons {
	position: absolute;
	top: 300rpx;
	right: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.control-btn {
	width: 80rpx;
	height: 80rpx;
	background: #ffffff;
	border: 1rpx solid #d1d5db;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;
}

.control-btn:active {
	transform: scale(0.95);
	background: #f9fafb;
}

.control-icon {
	font-size: 32rpx;
	line-height: 1;
	color: #4b5563;
}

/* 定位按钮图标特殊样式 */
.location-btn .control-icon {
	font-size: 40rpx;
}

/* 图层侧边栏样式 */
.layer-sidebar {
	position: fixed;
	top: 0;
	right: -600rpx;
	width: 600rpx;
	height: 100vh;
	background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	box-shadow: -4rpx 0 20rpx rgba(0, 0, 0, 0.15);
	z-index: 2000;
	transition: right 0.3s ease;
	display: flex;
	flex-direction: column;
}

.layer-sidebar.layer-sidebar-show {
	right: 0 !important;
}

.layer-header {
	height: 120rpx;
	background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	border-bottom: 1rpx solid #e2e8f0;
	position: relative;
}

.layer-header::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 2rpx;
	background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
}

.layer-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #1e293b;
}

.layer-close {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: #f1f5f9;
	cursor: pointer;
	transition: all 0.2s ease;
}

.layer-close:hover {
	background-color: #e2e8f0;
	transform: scale(1.05);
}

.layer-close .close-icon {
	color: #64748b;
	font-size: 36rpx;
	font-weight: normal;
}

.layer-content {
	flex: 1;
	padding: 24rpx 32rpx;
	overflow-y: auto;
}

/* 图层控制面板样式 */
.layer-section {
	margin-bottom: 32rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 12rpx;
	padding: 24rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
	border: 1rpx solid rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(10rpx);
}

.layer-section:last-child {
	margin-bottom: 0;
}

.section-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20rpx;
	padding-bottom: 16rpx;
	border-bottom: 1rpx solid #e2e8f0;
}

.section-title {
	font-size: 28rpx;
	font-weight: 600;
	color: #1e293b;
}

.legend-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 12rpx 16rpx;
	background: #f8fafc;
	border-radius: 8rpx;
	border: 1rpx solid #e2e8f0;
}

.legend-text {
	font-size: 26rpx;
	color: #475569;
	font-weight: 500;
}

/* 线路图例样式 */
.legend-line {
	width: 60rpx;
	height: 8rpx;
	border-radius: 4rpx;
}

.route-line {
	background: linear-gradient(90deg, #00CCFF 0%, #0099CC 100%);
	box-shadow: 0 0 8rpx rgba(0, 204, 255, 0.4);
}

/* 工点图例样式 */
.legend-icon {
	width: 32rpx;
	height: 32rpx;
	border-radius: 6rpx;
	position: relative;
}

.worksite-icon {
	background-color: #ffffff;
	border: 3rpx solid #ff0000;
}

.worksite-icon::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 16rpx;
	height: 16rpx;
	background-color: #ff0000;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}

/* 钻孔图例样式 */
.legend-dot {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	border: 2rpx solid #ffffff;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
}

.drill-unfinished {
	background-color: #94a3b8;
}

.drill-progress {
	background-color: #ff8800;
}

.drill-finished {
	background-color: #22c55e;
}

/* 机台图例样式 */
.legend-machine {
	width: 28rpx;
	height: 28rpx;
	border-radius: 4rpx;
	border: 2rpx solid #ffffff;
	position: relative;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
}

.machine-idle {
	background-color: #3b82f6;
}

.machine-working {
	background-color: #f59e0b;
}

.legend-machine::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 8rpx;
	height: 8rpx;
	background-color: #ffffff;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}

/* 图层遮罩 */
.layer-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 1500;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.layer-sidebar {
		width: 500rpx;
	}
	
	.control-buttons {
		top: 600rpx;
	}
	
	.layer-btn,
	.control-btn {
		width: 70rpx;
		height: 70rpx;
	}
	
	.layer-icon,
	.control-icon {
		font-size: 32rpx;
	}
}
</style>