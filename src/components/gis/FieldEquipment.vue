<template>
	<view class="field-equipment">
		<!-- 机台数量统计 -->
		<view class="section-title">
			<view class="title-bar"></view>
			<text class="title-text">机台数量统计</text>
		</view>
		
		<!-- 机台数量表格 -->
		<view class="equipment-table">
			<view class="table-header">
				<text class="header-name">{{ isRouteLevel ? '线路名称' : '工点名称' }}</text>
				<text class="header-count">机台数量</text>
			</view>
			
			<scroll-view scroll-y class="table-body" :style="{ height: '300rpx' }">
				<view 
					v-for="(item, index) in sortedEquipmentData" 
					:key="index" 
					class="table-row"
				>
					<text class="row-name">{{ item.name }}</text>
					<text class="row-count" :style="{ color: getCountColor(index) }">{{ item.count }}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 近7天工作量 -->
		<view class="section-title">
			<view class="title-bar"></view>
			<text class="title-text">近7天工作量</text>
		</view>
		
		<!-- 双柱状图 -->
		<view class="chart-container">
			<view class="chart">
				<!-- 图表Y轴 -->
				<view class="y-axis">
					<text v-for="(value, index) in yAxisValues" :key="index" class="y-axis-label">{{ value }}</text>
				</view>
				
				<!-- 图表内容 -->
				<view class="chart-content">
					<view 
						v-for="(day, index) in last7DaysData" 
						:key="index" 
						class="chart-column"
					>
						<!-- 双柱状图容器 -->
						<view class="bars-container">
							<!-- 完成钻孔柱 -->
							<view 
								class="bar completed-bar" 
								:style="{ height: getBarHeight(day.completedDrills) }"
							></view>
							
							<!-- 投入机台柱 -->
							<view 
								class="bar equipment-bar" 
								:style="{ height: getBarHeight(day.equipmentCount) }"
							></view>
						</view>
						
						<!-- X轴标签 -->
						<text class="x-axis-label">{{ day.date }}</text>
					</view>
				</view>
			</view>
			
			<!-- 图例 -->
			<view class="chart-legend">
				<view class="legend-item">
					<view class="legend-color completed-color"></view>
					<text class="legend-text">完成钻孔</text>
				</view>
				<view class="legend-item">
					<view class="legend-color equipment-color"></view>
					<text class="legend-text">投入机台</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FieldEquipment',
	props: {
		// 是否为线路级别（true为线路级别，false为工点级别）
		isRouteLevel: {
			type: Boolean,
			default: true
		},
		// 机台数量数据
		equipmentData: {
			type: Array,
			default: () => []
		},
		// 近7天工作量数据
		last7DaysData: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		// 按机台数量倒序排列
		sortedEquipmentData() {
			return [...this.equipmentData].sort((a, b) => b.count - a.count);
		},
		// Y轴刻度值
		yAxisValues() {
			// 找出最大值
			const maxValue = Math.max(
				...this.last7DaysData.map(day => Math.max(day.completedDrills, day.equipmentCount))
			);
			// 向上取整到5的倍数
			const maxYValue = Math.ceil(maxValue / 5) * 5;
			// 生成Y轴刻度值
			const step = maxYValue / 5;
			return [maxYValue, maxYValue - step, maxYValue - 2 * step, maxYValue - 3 * step, maxYValue - 4 * step, 0];
		}
	},
	methods: {
		// 获取机台数量的颜色
		getCountColor(index) {
			const colors = ['#f59e0b', '#f59e0b', '#f59e0b', '#10b981', '#10b981', '#10b981', '#6366f1', '#6366f1'];
			return colors[index] || '#6366f1';
		},
		// 计算柱状图高度
		getBarHeight(value) {
			const maxValue = Math.max(
				...this.last7DaysData.map(day => Math.max(day.completedDrills, day.equipmentCount))
			);
			// 向上取整到5的倍数
			const maxYValue = Math.ceil(maxValue / 5) * 5;
			// 计算高度百分比
			const heightPercent = (value / maxYValue) * 100;
			return `${heightPercent}%`;
		}
	}
}
</script>

<style scoped>
.field-equipment {
	padding: 0 8rpx;
	background-color: transparent;
}

/* 标题样式 */
.section-title {
	display: flex;
	align-items: center;
	margin: 24rpx 0 16rpx;
}

.title-bar {
	width: 4rpx;
	height: 32rpx;
	background-color: #1d4ed8;
	margin-right: 12rpx;
	border-radius: 2rpx;
}

.title-text {
	font-size: 30rpx;
	font-weight: 600;
	color: #1e293b;
}

/* 机台数量表格样式 */
.equipment-table {
	background-color: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;
	margin-bottom: 24rpx;
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.05);
	border: 1rpx solid #f1f5f9;
}

.table-header {
	display: flex;
	background-color: #2563eb;
	padding: 16rpx 24rpx;
	color: #ffffff;
}

.header-name {
	flex: 1;
	font-size: 28rpx;
	font-weight: 500;
}

.header-count {
	width: 120rpx;
	text-align: center;
	font-size: 28rpx;
	font-weight: 500;
}

.table-body {
	max-height: 400rpx;
}

.table-row {
	display: flex;
	padding: 16rpx 24rpx;
	border-bottom: 1rpx solid #f1f5f9;
}

.row-name {
	flex: 1;
	font-size: 26rpx;
	color: #334155;
}

.row-count {
	width: 120rpx;
	text-align: center;
	font-size: 28rpx;
	font-weight: 600;
	color: #f59e0b;
}

/* 图表样式 */
.chart-container {
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 24rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.05);
	border: 1rpx solid #f1f5f9;
}

.chart {
	display: flex;
	height: 400rpx;
	margin-bottom: 16rpx;
}

.y-axis {
	width: 60rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: 8rpx;
}

.y-axis-label {
	font-size: 22rpx;
	color: #64748b;
	text-align: right;
}

.chart-content {
	flex: 1;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 100%;
	border-bottom: 1rpx solid #e2e8f0;
	border-left: 1rpx solid #e2e8f0;
	position: relative;
}

.chart-content::before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-image: linear-gradient(to bottom, transparent 19.9%, #f1f5f9 20%, transparent 20.1%, transparent 39.9%, #f1f5f9 40%, transparent 40.1%, transparent 59.9%, #f1f5f9 60%, transparent 60.1%, transparent 79.9%, #f1f5f9 80%, transparent 80.1%);
	pointer-events: none;
}

.chart-column {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100rpx;
	height: 100%;
	position: relative;
}

.bars-container {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	height: 100%;
	gap: 8rpx;
}

.bar {
	width: 24rpx;
	border-radius: 4rpx 4rpx 0 0;
}

.completed-bar {
	background-color: #3b82f6;
}

.equipment-bar {
	background-color: #4ade80;
}

.x-axis-label {
	position: absolute;
	bottom: -40rpx;
	font-size: 22rpx;
	color: #64748b;
	text-align: center;
	width: 100%;
}

.chart-legend {
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
}

.legend-item {
	display: flex;
	align-items: center;
	margin: 0 16rpx;
}

.legend-color {
	width: 24rpx;
	height: 24rpx;
	border-radius: 4rpx;
	margin-right: 8rpx;
}

.completed-color {
	background-color: #3b82f6;
}

.equipment-color {
	background-color: #4ade80;
}

.legend-text {
	font-size: 24rpx;
	color: #64748b;
}
</style>