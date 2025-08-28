<template>
	<view class="survey-overview">
		<!-- 标题 -->
		<view class="section-title">
			<view class="title-bar"></view>
			<text class="title-text">勘察概览</text>
		</view>
		
<!-- 四个统计卡片 -->
<view class="stats-cards">
	<view class="stats-row">
		<!-- 勘察线路数量 -->
		<view class="stat-card">
			<view class="icon-container blue">
				<text class="icon iconfont icon-subway"></text>
			</view>
			<view class="stat-content">
				<text class="stat-value">{{ data.routeCount }}条</text>
				<text class="stat-label">勘察线路数量</text>
			</view>
		</view>
		
		<!-- 标段数量 -->
		<view class="stat-card">
			<view class="icon-container green">
				<text class="icon iconfont icon-grid"></text>
			</view>
			<view class="stat-content">
				<text class="stat-value">{{ data.sectionCount }}个</text>
				<text class="stat-label">标段数量</text>
			</view>
		</view>
	</view>
	
	<view class="stats-row">
		<!-- 勘察工点数量 -->
		<view class="stat-card">
			<view class="icon-container orange">
				<text class="icon iconfont icon-location"></text>
			</view>
			<view class="stat-content">
				<text class="stat-value">{{ data.workSiteCount }}个</text>
				<text class="stat-label">勘察工点数量</text>
			</view>
		</view>
		
		<!-- 施工中工点数量 -->
		<view class="stat-card">
			<view class="icon-container purple">
				<text class="icon iconfont icon-wrench"></text>
			</view>
			<view class="stat-content">
				<text class="stat-value">{{ data.constructionSiteCount }}个</text>
				<text class="stat-label">施工中工点数量</text>
			</view>
		</view>
	</view>
</view>
		
		<!-- 累计完成工作量 -->
		<view class="section-title">
			<view class="title-bar"></view>
			<text class="title-text">累计完成工作量</text>
		</view>
		
		<view class="work-table">
			<view class="table-header">
				<text class="header-cell empty"></text>
				<text class="header-cell">本周</text>
				<text class="header-cell">本月</text>
				<text class="header-cell">本年</text>
				<text class="header-cell">累计</text>
			</view>
			
			<!-- 钻孔行 -->
			<view class="table-row">
				<text class="row-label">钻孔</text>
				<text class="data-cell">{{ data.drillHoles.week }}个</text>
				<text class="data-cell">{{ data.drillHoles.month }}个</text>
				<text class="data-cell">{{ data.drillHoles.year }}个</text>
				<text class="data-cell">{{ data.drillHoles.total }}个</text>
			</view>
			
			<!-- 进尺行 -->
			<view class="table-row">
				<text class="row-label">进尺</text>
				<text class="data-cell">{{ data.footage.week }}米</text>
				<text class="data-cell">{{ data.footage.month }}米</text>
				<text class="data-cell">{{ data.footage.year }}米</text>
				<text class="data-cell">{{ data.footage.total }}米</text>
			</view>
		</view>
		
		<!-- 钻孔分类 -->
		<view class="section-title">
			<view class="title-bar"></view>
			<text class="title-text">钻孔分类</text>
		</view>
		
<view class="drill-categories">
	<view class="categories-row">
		<!-- 布置钻孔数 -->
		<view class="category-card blue">
			<view class="category-icon">
				<text class="icon iconfont icon-flag"></text>
			</view>
			<view class="category-content">
				<text class="category-value">{{ data.drillCategories.planned }}个</text>
				<text class="category-label">布置钻孔数</text>
			</view>
		</view>
		
		<!-- 完成钻孔数 -->
		<view class="category-card green">
			<view class="category-icon">
				<text class="icon iconfont icon-check-circle"></text>
			</view>
			<view class="category-content">
				<text class="category-value">{{ data.drillCategories.completed }}个</text>
				<text class="category-label">完成钻孔数</text>
			</view>
		</view>
	</view>
	
	<view class="categories-row">
		<!-- 未施工钻孔数 -->
		<view class="category-card orange">
			<view class="category-icon">
				<text class="icon iconfont icon-clock"></text>
			</view>
			<view class="category-content">
				<text class="category-value">{{ data.drillCategories.pending }}个</text>
				<text class="category-label">未施工钻孔数</text>
			</view>
		</view>
		
		<!-- 施工中钻孔数 -->
		<view class="category-card purple">
			<view class="category-icon">
				<text class="icon iconfont icon-wrench"></text>
			</view>
			<view class="category-content">
				<text class="category-value">{{ data.drillCategories.inProgress }}个</text>
				<text class="category-label">施工中钻孔数</text>
			</view>
		</view>
	</view>
</view>
	</view>
</template>

<script>
export default {
	name: 'SurveyOverview',
	props: {
		// 传入的数据，可以是线路级别或工点级别的数据
		data: {
			type: Object,
			default: () => ({
				// 勘察概览数据
				routeCount: 0,
				sectionCount: 0,
				workSiteCount: 0,
				constructionSiteCount: 0,
				
				// 累计完成工作量
				drillHoles: {
					week: 0,
					month: 0,
					year: 0,
					total: 0
				},
				footage: {
					week: 0,
					month: 0,
					year: 0,
					total: 0
				},
				
				// 钻孔分类
				drillCategories: {
					planned: 0,
					completed: 0,
					pending: 0,
					inProgress: 0
				}
			})
		}
	}
}
</script>

<style scoped>
.survey-overview {
	padding: 0 8rpx;
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

/* 统计卡片样式 */
.stats-cards {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	margin-bottom: 24rpx;
}

.stats-row {
	display: flex;
	gap: 16rpx;
	width: 100%;
}

.stat-card {
	flex: 1;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 16rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.05);
	border: 1rpx solid #f1f5f9;
	box-sizing: border-box;
}

.icon-container {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16rpx;
}

.icon-container.blue {
	background-color: #2563eb;
}

.icon-container.green {
	background-color: #16a34a;
}

.icon-container.orange {
	background-color: #f97316;
}

.icon-container.purple {
	background-color: #9333ea;
}

.icon {
	color: #ffffff;
	font-size: 40rpx;
}

.stat-content {
	display: flex;
	flex-direction: column;
}

.stat-value {
	font-size: 36rpx;
	font-weight: 600;
	color: #1e293b;
	line-height: 1.2;
}

.stat-label {
	font-size: 24rpx;
	color: #64748b;
	margin-top: 4rpx;
}

/* 工作量表格样式 */
.work-table {
	background-color: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;
	margin-bottom: 24rpx;
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.05);
	border: 1rpx solid #f1f5f9;
}

.table-header {
	display: flex;
	background-color: #f8fafc;
	padding: 12rpx 0;
}

.header-cell {
	flex: 1;
	text-align: center;
	font-size: 24rpx;
	color: #64748b;
	font-weight: 500;
}

.header-cell.empty {
	flex: 0.8;
}

.table-row {
	display: flex;
	align-items: center;
	padding: 16rpx 0;
	border-top: 1rpx solid #f1f5f9;
}

.row-label {
	flex: 0.8;
	font-size: 26rpx;
	color: #334155;
	font-weight: 500;
	text-align: center;
}

.data-cell {
	flex: 1;
	text-align: center;
	font-size: 26rpx;
	color: #1e293b;
}

/* 钻孔分类样式 */
.drill-categories {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	margin-bottom: 24rpx;
}

.categories-row {
	display: flex;
	gap: 16rpx;
	width: 100%;
}

.category-card {
	flex: 1;
	border-radius: 8rpx;
	padding: 24rpx 16rpx;
	display: flex;
	align-items: center;
	position: relative;
}

.category-icon {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16rpx;
}

.category-content {
	display: flex;
	flex-direction: column;
}


.category-card.blue {
	background-color: #3b82f6;
}

.category-card.green {
	background-color: #22c55e;
}

.category-card.orange {
	background-color: #f97316;
}

.category-card.purple {
	background-color: #9333ea;
}

.category-value {
	font-size: 40rpx;
	font-weight: 600;
	color: #ffffff;
	line-height: 1.2;
}

.category-label {
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.9);
	margin-top: 4rpx;
}

.category-card .icon {
	color: #ffffff;
	font-size: 40rpx;
}
</style>