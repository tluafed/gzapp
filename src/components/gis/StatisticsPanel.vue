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
				<text 
					class="header-title" 
					@click="showRouteNameTip"
				>{{ displayRouteName }}</text>
			</view>
			
			<!-- 关闭按钮 -->
			<view class="close-btn" @click="backToRoute">
				<text class="close-icon">×</text>
			</view>
		</view>
		
		<!-- 线路名提示框 -->
		<view v-if="showTip" class="route-tip" @click="hideTip">
			<text class="tip-text">{{ currentRouteName }}</text>
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
			<scroll-view 
				v-if="activeTab === 'routeInfo'" 
				class="tab-content"
				scroll-y="true"
				@scrolltolower="loadMoreRoutes"
			>
				<InfoCard
					v-for="route in displayedRoutes"
					:key="route.id"
					:title="route.name"
					:progress="route.progress"
					:drill-data="route.drillData"
					:depth-data="route.depthData"
				/>
				
				<!-- 加载更多提示 -->
				<view v-if="routeLoading" class="loading-tip">
					<text class="loading-text">加载中...</text>
				</view>
				
				<view v-if="routeNoMore" class="no-more-tip">
					<text class="no-more-text">没有更多数据了</text>
				</view>
			</scroll-view>
			
			<!-- 工点信息 TAB -->
			<scroll-view 
				v-if="activeTab === 'workSiteInfo'" 
				class="tab-content"
				scroll-y="true"
				@scrolltolower="loadMoreWorkSites"
			>
				<InfoCard
					v-for="workSite in displayedWorkSites"
					:key="workSite.id"
					:title="workSite.name"
					:progress="workSite.progress"
					:drill-data="workSite.drillData"
					:depth-data="workSite.depthData"
				/>
				
				<!-- 加载更多提示 -->
				<view v-if="workSiteLoading" class="loading-tip">
					<text class="loading-text">加载中...</text>
				</view>
				
				<view v-if="workSiteNoMore" class="no-more-tip">
					<text class="no-more-text">没有更多数据了</text>
				</view>
			</scroll-view>
			
			<!-- 勘察概览 TAB -->
			<scroll-view 
				v-if="activeTab === 'surveyOverview'" 
				class="tab-content"
				scroll-y="true"
			>
				<SurveyOverview 
					:data="currentMode === 'route' ? routeSurveyData : workSiteSurveyData"
				/>
			</scroll-view>
			
			<!-- 现场设备 TAB -->
			<scroll-view 
				v-if="activeTab === 'equipment'" 
				class="tab-content"
				scroll-y="true"
			>
				<FieldEquipment 
					:isRouteLevel="currentMode === 'route'"
					:equipmentData="currentMode === 'route' ? routeEquipmentData : workSiteEquipmentData"
					:last7DaysData="currentMode === 'route' ? routeLast7DaysData : workSiteLast7DaysData"
				/>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import InfoCard from './InfoCard.vue'
import SurveyOverview from './SurveyOverview.vue'
import FieldEquipment from './FieldEquipment.vue'

export default {
	name: 'StatisticsPanel',
	components: {
		InfoCard,
		SurveyOverview,
		FieldEquipment
	},
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
			showTip: false, // 控制线路名提示框显示
			
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
			],
			
			// 线路数据
			allRoutes: [], // 所有线路数据
			displayedRoutes: [], // 当前显示的线路
			routePage: 1, // 当前页码
			routePageSize: 10, // 每页数量
			routeLoading: false, // 加载状态
			routeNoMore: false, // 是否没有更多数据
			
			// 工点数据
			allWorkSites: [], // 所有工点数据
			displayedWorkSites: [], // 当前显示的工点
			workSitePage: 1, // 当前页码
			workSitePageSize: 10, // 每页数量
			workSiteLoading: false, // 加载状态
			workSiteNoMore: false, // 是否没有更多数据
			
			// 勘察概览数据 - 线路级别
			routeSurveyData: {
				routeCount: 7,
				sectionCount: 18,
				workSiteCount: 127,
				constructionSiteCount: 41,
				drillHoles: {
					week: 48,
					month: 186,
					year: 3394,
					total: 30232
				},
				footage: {
					week: 1286,
					month: 5124,
					year: 96022,
					total: 845326
				},
				drillCategories: {
					planned: 40418,
					completed: 30232,
					pending: 8506,
					inProgress: 1840
				}
			},
			
			// 勘察概览数据 - 工点级别
			workSiteSurveyData: {
				routeCount: 1,
				sectionCount: 3,
				workSiteCount: 24,
				constructionSiteCount: 8,
				drillHoles: {
					week: 12,
					month: 48,
					year: 586,
					total: 4218
				},
				footage: {
					week: 320,
					month: 1280,
					year: 15420,
					total: 124680
				},
				drillCategories: {
					planned: 5200,
					completed: 4218,
					pending: 782,
					inProgress: 200
				}
			},
			
			// 现场设备数据 - 线路级别
			routeEquipmentData: [
				{ name: '十四号线', count: 8 },
				{ name: '广花城际线', count: 6 },
				{ name: '十八号线', count: 5 },
				{ name: '二十二号线', count: 4 },
				{ name: '十一号线', count: 3 },
				{ name: '十三号线', count: 2 },
				{ name: '二十一号线', count: 1 },
				{ name: '八号线', count: 1 }
			],
			
			// 现场设备数据 - 工点级别
			workSiteEquipmentData: [
				{ name: '马务站', count: 3 },
				{ name: '新市墟站-马务区间', count: 2 },
				{ name: '机场站', count: 2 },
				{ name: '白云机场北站', count: 1 },
				{ name: '高增站', count: 1 },
				{ name: '人和站', count: 1 }
			],
			
			// 近7天工作量数据 - 线路级别
			routeLast7DaysData: [
				{ date: '12-01', completedDrills: 12, equipmentCount: 8 },
				{ date: '12-02', completedDrills: 15, equipmentCount: 8 },
				{ date: '12-03', completedDrills: 8, equipmentCount: 7 },
				{ date: '12-04', completedDrills: 18, equipmentCount: 8 },
				{ date: '12-05', completedDrills: 14, equipmentCount: 8 },
				{ date: '12-06', completedDrills: 16, equipmentCount: 8 },
				{ date: '12-07', completedDrills: 13, equipmentCount: 8 }
			],
			
			// 近7天工作量数据 - 工点级别
			workSiteLast7DaysData: [
				{ date: '12-01', completedDrills: 3, equipmentCount: 3 },
				{ date: '12-02', completedDrills: 4, equipmentCount: 3 },
				{ date: '12-03', completedDrills: 2, equipmentCount: 2 },
				{ date: '12-04', completedDrills: 5, equipmentCount: 3 },
				{ date: '12-05', completedDrills: 3, equipmentCount: 3 },
				{ date: '12-06', completedDrills: 4, equipmentCount: 3 },
				{ date: '12-07', completedDrills: 3, equipmentCount: 3 }
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
		},
		// 显示的线路名称（超过10个字符时截断）
		displayRouteName() {
			if (this.currentRouteName.length > 10) {
				return this.currentRouteName.substring(0, 10) + '...'
			}
			return this.currentRouteName
		}
	},
	mounted() {
		this.initMockData()
		this.loadInitialData()
	},
	methods: {
		// 初始化模拟数据
		initMockData() {
			// 生成模拟线路数据
			this.allRoutes = Array.from({ length: 35 }, (_, index) => ({
				id: `route_${index + 1}`,
				name: `线路${index + 1}号`,
				progress: Math.floor(Math.random() * 100),
				drillData: {
					week: Math.floor(Math.random() * 20),
					month: Math.floor(Math.random() * 80),
					year: Math.floor(Math.random() * 300),
					total: Math.floor(Math.random() * 1000)
				},
				depthData: {
					week: Math.floor(Math.random() * 500),
					month: Math.floor(Math.random() * 2000),
					year: Math.floor(Math.random() * 8000),
					total: Math.floor(Math.random() * 30000)
				}
			}))
			
			// 生成模拟工点数据
			this.allWorkSites = Array.from({ length: 28 }, (_, index) => ({
				id: `worksite_${index + 1}`,
				name: `工点${index + 1}`,
				progress: Math.floor(Math.random() * 100),
				drillData: {
					week: Math.floor(Math.random() * 15),
					month: Math.floor(Math.random() * 60),
					year: Math.floor(Math.random() * 250),
					total: Math.floor(Math.random() * 800)
				},
				depthData: {
					week: Math.floor(Math.random() * 300),
					month: Math.floor(Math.random() * 1200),
					year: Math.floor(Math.random() * 5000),
					total: Math.floor(Math.random() * 20000)
				}
			}))
		},
		
		// 加载初始数据
		loadInitialData() {
			this.loadRoutes()
			this.loadWorkSites()
		},
		
		// 加载线路数据
		loadRoutes() {
			const start = (this.routePage - 1) * this.routePageSize
			const end = start + this.routePageSize
			const newRoutes = this.allRoutes.slice(start, end)
			
			if (this.routePage === 1) {
				this.displayedRoutes = newRoutes
			} else {
				this.displayedRoutes.push(...newRoutes)
			}
			
			this.routeNoMore = end >= this.allRoutes.length
		},
		
		// 加载工点数据
		loadWorkSites() {
			const start = (this.workSitePage - 1) * this.workSitePageSize
			const end = start + this.workSitePageSize
			const newWorkSites = this.allWorkSites.slice(start, end)
			
			if (this.workSitePage === 1) {
				this.displayedWorkSites = newWorkSites
			} else {
				this.displayedWorkSites.push(...newWorkSites)
			}
			
			this.workSiteNoMore = end >= this.allWorkSites.length
		},
		
		// 加载更多线路
		loadMoreRoutes() {
			if (this.routeLoading || this.routeNoMore) return
			
			this.routeLoading = true
			
			// 模拟网络延迟
			setTimeout(() => {
				this.routePage++
				this.loadRoutes()
				this.routeLoading = false
			}, 500)
		},
		
		// 加载更多工点
		loadMoreWorkSites() {
			if (this.workSiteLoading || this.workSiteNoMore) return
			
			this.workSiteLoading = true
			
			// 模拟网络延迟
			setTimeout(() => {
				this.workSitePage++
				this.loadWorkSites()
				this.workSiteLoading = false
			}, 500)
		},
		
		// 显示线路名提示框
		showRouteNameTip() {
			if (this.currentRouteName.length > 10) {
				this.showTip = true
				// 3秒后自动隐藏
				setTimeout(() => {
					this.showTip = false
				}, 3000)
			}
		},
		
		// 隐藏提示框
		hideTip() {
			this.showTip = false
		},
		
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
		
		// 切换到工点统计模式（父组件调用的方法名）
		switchToWorkSiteMode(routeName) {
			this.switchToWorkSite(routeName)
			console.log('切换到工点统计模式:', routeName)
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

.header-title {
	color: #1e293b;
	font-size: 32rpx;
	font-weight: 600;
	cursor: pointer;
	max-width: 500rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.close-btn {
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

.close-btn:active {
	background-color: #e2e8f0;
	transform: scale(0.95);
}

.close-icon {
	color: #64748b;
	font-size: 36rpx;
	font-weight: normal;
}

/* 线路名提示框 */
.route-tip {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.8);
	color: #ffffff;
	padding: 16rpx 24rpx;
	border-radius: 8rpx;
	font-size: 28rpx;
	z-index: 10000;
	max-width: 80%;
	text-align: center;
	backdrop-filter: blur(10rpx);
	animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.9);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
}

.tip-text {
	color: #ffffff;
	font-size: 28rpx;
	line-height: 1.4;
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
	overflow: hidden;
}

.tab-content {
	height: 100%;
	padding-bottom: 20rpx;
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

/* 加载提示 */
.loading-tip {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx;
}

.loading-text {
	font-size: 26rpx;
	color: #64748b;
}

.no-more-tip {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24rpx;
}

.no-more-text {
	font-size: 24rpx;
	color: #9ca3af;
}

/* 滚动视图样式 */
scroll-view {
	height: 100%;
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