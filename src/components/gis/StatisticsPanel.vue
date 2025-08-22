<template>
	<view class="statistics-panel" :style="panelStyle">
		<!-- 拖拽手柄 -->
		<view 
			class="drag-handle" 
			@touchstart="onDragStart"
			@touchmove="onDragMove"
			@touchend="onDragEnd"
		>
			<view class="drag-indicator"></view>
		</view>
		
		<!-- 窗口头部 - 仅在工点统计模式显示 -->
		<view v-if="currentMode === 'workSite'" class="panel-header">
			<view class="header-content">
				<view class="back-btn" @click="backToRoute">
					<text class="back-icon">←</text>
				</view>
				<text class="header-title">{{ currentRouteName }}</text>
			</view>
			
			<!-- 窗口控制按钮 -->
			<view class="window-controls">
				<view class="control-btn" @click="minimizePanel">
					<text class="control-icon">−</text>
				</view>
				<view class="control-btn" @click="maximizePanel">
					<text class="control-icon">□</text>
				</view>
			</view>
		</view>
		
		<!-- 标签页导航 -->
		<view class="tab-nav">
			<view 
				v-for="tab in currentTabs" 
				:key="tab.key"
				class="tab-item" 
				:class="{ active: activeTab === tab.key }"
				@click="switchTab(tab.key)"
			>
				<text class="tab-text">{{ tab.name }}</text>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<view class="panel-content">
			<!-- 线路信息 TAB -->
			<view v-if="activeTab === 'routeInfo'" class="tab-content">
				<view class="content-placeholder">
					<text class="placeholder-text">线路信息内容</text>
				</view>
			</view>
			
			<!-- 工点信息 TAB -->
			<view v-if="activeTab === 'workSiteInfo'" class="tab-content">
				<view class="content-placeholder">
					<text class="placeholder-text">工点信息内容</text>
				</view>
			</view>
			
			<!-- 勘察概览 TAB -->
			<view v-if="activeTab === 'surveyOverview'" class="tab-content">
				<view class="content-placeholder">
					<text class="placeholder-text">勘察概览内容</text>
				</view>
			</view>
			
			<!-- 现场设备 TAB -->
			<view v-if="activeTab === 'equipment'" class="tab-content">
				<view class="content-placeholder">
					<text class="placeholder-text">现场设备内容</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'StatisticsPanel',
	props: {
		show: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			// 窗口状态
			panelHeight: 50, // 当前高度百分比
			isDragging: false,
			startY: 0,
			startHeight: 0,
			
			// 显示模式：route(线路统计) | workSite(工点统计)
			currentMode: 'route',
			currentRouteName: '',
			
			// 当前激活的标签页
			activeTab: 'routeInfo',
			
			// 线路统计标签页
			routeTabs: [
				{ key: 'routeInfo', name: '线路信息' },
				{ key: 'surveyOverview', name: '勘察概览' },
				{ key: 'equipment', name: '现场设备' }
			],
			
			// 工点统计标签页
			workSiteTabs: [
				{ key: 'workSiteInfo', name: '工点信息' },
				{ key: 'surveyOverview', name: '勘察概览' },
				{ key: 'equipment', name: '现场设备' }
			]
		}
	},
	computed: {
		panelStyle() {
			return {
				height: `${this.panelHeight}%`,
				display: this.show ? 'flex' : 'none'
			}
		},
		currentTabs() {
			return this.currentMode === 'route' ? this.routeTabs : this.workSiteTabs
		}
	},
	methods: {
		// 拖拽相关方法
		onDragStart(e) {
			this.isDragging = true
			this.startY = e.touches[0].clientY
			this.startHeight = this.panelHeight
		},
		
		onDragMove(e) {
			if (!this.isDragging) return
			
			e.preventDefault()
			const currentY = e.touches[0].clientY
			const deltaY = this.startY - currentY
			const windowHeight = uni.getSystemInfoSync().windowHeight
			const deltaPercent = (deltaY / windowHeight) * 100
			
			let newHeight = this.startHeight + deltaPercent
			
			// 限制高度范围
			if (newHeight < 20) newHeight = 20
			if (newHeight > 90) newHeight = 90
			
			this.panelHeight = newHeight
		},
		
		onDragEnd() {
			this.isDragging = false
			
			// 自动吸附到预设高度
			if (this.panelHeight < 35) {
				this.panelHeight = 20 // 最小化
			} else if (this.panelHeight > 70) {
				this.panelHeight = 90 // 全屏
			} else {
				this.panelHeight = 50 // 默认
			}
		},
		
		// 窗口控制方法
		minimizePanel() {
			this.panelHeight = 20
		},
		
		maximizePanel() {
			this.panelHeight = this.panelHeight === 90 ? 50 : 90
		},
		
		// 标签页切换
		switchTab(tabKey) {
			this.activeTab = tabKey
		},
		
		// 模式切换
		switchToWorkSite(routeName) {
			this.currentMode = 'workSite'
			this.currentRouteName = routeName
			this.activeTab = 'workSiteInfo'
			this.$emit('modeChange', { mode: 'workSite', routeName })
		},
		
		backToRoute() {
			this.currentMode = 'route'
			this.currentRouteName = ''
			this.activeTab = 'routeInfo'
			this.$emit('modeChange', { mode: 'route' })
		}
	}
}
</script>

<style scoped>
.statistics-panel {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	border-radius: 16rpx 16rpx 0 0;
	box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.15);
	z-index: 500;
	flex-direction: column;
	transition: height 0.3s ease;
}

/* 拖拽手柄 */
.drag-handle {
	height: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;
}

.drag-handle:active {
	cursor: grabbing;
}

.drag-indicator {
	width: 60rpx;
	height: 6rpx;
	background-color: #cbd5e1;
	border-radius: 3rpx;
}

/* 窗口头部 */
.panel-header {
	height: 100rpx;
	background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	border-bottom: 1rpx solid #e2e8f0;
}

.header-content {
	display: flex;
	align-items: center;
	flex: 1;
}

.back-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: #f1f5f9;
	margin-right: 16rpx;
	cursor: pointer;
	transition: all 0.2s ease;
}

.back-btn:active {
	background-color: #e2e8f0;
	transform: scale(0.95);
}

.back-icon {
	color: #64748b;
	font-size: 32rpx;
	font-weight: bold;
}

.header-title {
	color: #1e293b;
	font-size: 32rpx;
	font-weight: 600;
}

.window-controls {
	display: flex;
	gap: 12rpx;
}

.control-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8rpx;
	background-color: #f1f5f9;
	cursor: pointer;
	transition: all 0.2s ease;
}

.control-btn:active {
	background-color: #e2e8f0;
	transform: scale(0.95);
}

.control-icon {
	color: #64748b;
	font-size: 24rpx;
	font-weight: bold;
}

/* 标签页导航 */
.tab-nav {
	display: flex;
	background: rgba(255, 255, 255, 0.9);
	border-bottom: 1rpx solid #e2e8f0;
}

.tab-item {
	flex: 1;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s ease;
	position: relative;
}

.tab-item.active {
	background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.tab-item.active .tab-text {
	color: #ffffff;
	font-weight: 600;
}

.tab-text {
	font-size: 28rpx;
	color: #64748b;
	transition: all 0.2s ease;
}

.tab-item:not(.active):active {
	background-color: #f8fafc;
}

/* 内容区域 */
.panel-content {
	flex: 1;
	padding: 24rpx;
	overflow-y: auto;
}

.tab-content {
	height: 100%;
}

.content-placeholder {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 12rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.8);
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.placeholder-text {
	font-size: 28rpx;
	color: #9ca3af;
}

/* 滚动条样式 */
.panel-content::-webkit-scrollbar {
	width: 6rpx;
}

.panel-content::-webkit-scrollbar-track {
	background: rgba(241, 245, 249, 0.5);
	border-radius: 3rpx;
}

.panel-content::-webkit-scrollbar-thumb {
	background: rgba(148, 163, 184, 0.6);
	border-radius: 3rpx;
}

.panel-content::-webkit-scrollbar-thumb:hover {
	background: rgba(100, 116, 139, 0.8);
}
</style>