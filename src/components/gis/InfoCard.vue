<template>
	<view class="info-card">
		<!-- 卡片头部 -->
		<view class="card-header">
			<text class="card-title">{{ title }}</text>
			<view class="progress-container">
				<view class="progress-bar">
					<view 
						class="progress-fill" 
						:style="{ width: progress + '%' }"
					></view>
				</view>
				<text class="progress-text">{{ progress }}%</text>
			</view>
		</view>
		
		<!-- 统计数据表格 -->
		<view class="stats-table">
			<!-- 表头 -->
			<view class="table-header">
				<text class="header-cell empty"></text>
				<text class="header-cell">本周</text>
				<text class="header-cell">本月</text>
				<text class="header-cell">本年</text>
				<text class="header-cell">累计</text>
			</view>
			
			<!-- 钻孔行 -->
			<view class="table-row">
				<text class="row-label">钻孔(个)</text>
				<text class="data-cell">{{ drillData.week }}</text>
				<text class="data-cell">{{ drillData.month }}</text>
				<text class="data-cell">{{ drillData.year }}</text>
				<text class="data-cell">{{ drillData.total }}</text>
			</view>
			
			<!-- 进尺行 -->
			<view class="table-row">
				<text class="row-label">进尺(米)</text>
				<text class="data-cell">{{ depthData.week }}</text>
				<text class="data-cell">{{ depthData.month }}</text>
				<text class="data-cell">{{ depthData.year }}</text>
				<text class="data-cell">{{ depthData.total }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'InfoCard',
	props: {
		// 卡片标题（线路名或工点名）
		title: {
			type: String,
			required: true
		},
		// 总体进度
		progress: {
			type: Number,
			default: 0
		},
		// 钻孔数据
		drillData: {
			type: Object,
			default: () => ({
				week: 0,
				month: 0,
				year: 0,
				total: 0
			})
		},
		// 进尺数据
		depthData: {
			type: Object,
			default: () => ({
				week: 0,
				month: 0,
				year: 0,
				total: 0
			})
		}
	}
}
</script>

<style scoped>
.info-card {
	background: #ffffff;
	border-radius: 8rpx;
	padding: 16rpx;
	margin-bottom: 12rpx;
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
	border: 1rpx solid #e5e7eb;
}

/* 卡片头部 */
.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12rpx;
	padding-bottom: 8rpx;
	border-bottom: 1rpx solid #f3f4f6;
}

.card-title {
	font-size: 28rpx;
	font-weight: 500;
	color: #1f2937;
}

.progress-container {
	display: flex;
	align-items: center;
	gap: 8rpx;
	width: 120rpx;
	margin-left: 16rpx;
}

.progress-bar {
	width: 80rpx;
	height: 6rpx;
	background-color: #e5e7eb;
	border-radius: 3rpx;
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: #3b82f6;
	border-radius: 3rpx;
	transition: width 0.3s ease;
}

.progress-text {
	font-size: 22rpx;
	color: #6b7280;
	font-weight: 500;
	min-width: 50rpx;
	text-align: right;
}

/* 统计数据表格 */
.stats-table {
	width: 100%;
}

.table-header {
	display: flex;
	background-color: #f9fafb;
	border-radius: 4rpx;
	padding: 8rpx 0;
	margin-bottom: 4rpx;
}

.header-cell {
	flex: 1;
	text-align: center;
	font-size: 22rpx;
	color: #6b7280;
	font-weight: 500;
}

.header-cell.empty {
	flex: 1;
}

.table-row {
	display: flex;
	align-items: center;
	padding: 6rpx 0;
	border-bottom: 1rpx solid #f3f4f6;
}

.table-row:last-child {
	border-bottom: none;
}

.row-label {
	flex: 1;
	font-size: 24rpx;
	color: #374151;
	font-weight: 500;
	text-align: center;
}

.data-cell {
	flex: 1;
	text-align: center;
	font-size: 24rpx;
	color: #1f2937;
	font-weight: 400;
}
</style>
