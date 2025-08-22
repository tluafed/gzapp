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
			v-if="showLayerSidebar" 
			class="layer-mask" 
			@click="closeLayer"
		></view>
		<view 
			class="layer-sidebar" 
			:class="{ 'layer-sidebar-show': showLayerSidebar }"
		>
			<view class="layer-header">
				<text class="layer-title">图层管理</text>
				<view class="layer-close" @click="closeLayer">
					<text class="close-icon">×</text>
				</view>
			</view>
			<view class="layer-content">
				<text class="empty-text">图层内容待完善...</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'MapControls',
	data() {
		return {
			showLayerSidebar: false
		}
	},
	methods: {
		// 图层控制方法
		toggleLayer() {
			this.showLayerSidebar = !this.showLayerSidebar;
			this.$emit('layerToggle', this.showLayerSidebar);
		},
		closeLayer() {
			this.showLayerSidebar = false;
			this.$emit('layerToggle', false);
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
	z-index: 200;
}

/* 图层按钮 - 右上角 */
.layer-btn {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 80rpx;
	height: 80rpx;
	background: rgba(255, 255, 255, 0.95);
	border: 2rpx solid #007AFF;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.3);
	transition: all 0.2s ease;
}

.layer-btn:active {
	transform: scale(0.95);
	background: rgba(0, 122, 255, 0.1);
}

.layer-icon {
	font-size: 36rpx;
	line-height: 1;
}

/* 复位和定位按钮 - 右侧靠上位置 */
.control-buttons {
	position: absolute;
	top: 120rpx;
	right: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.control-btn {
	width: 80rpx;
	height: 80rpx;
	background: rgba(255, 255, 255, 0.95);
	border: 2rpx solid #007AFF;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.3);
	transition: all 0.2s ease;
}

.control-btn:active {
	transform: scale(0.95);
	background: rgba(0, 122, 255, 0.1);
}

.control-icon {
	font-size: 36rpx;
	line-height: 1;
	color: #007AFF;
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
	z-index: 1000;
	transition: right 0.3s ease;
	display: flex;
	flex-direction: column;
}

.layer-sidebar-show {
	right: 0;
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
	padding: 40rpx 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.empty-text {
	font-size: 28rpx;
	color: #9ca3af;
	text-align: center;
}

/* 图层遮罩 */
.layer-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.layer-sidebar {
		width: 500rpx;
		right: -500rpx;
	}
	
	.control-buttons {
		top: 110rpx;
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