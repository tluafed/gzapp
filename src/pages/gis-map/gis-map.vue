<template>
	<view class="drill-detail">
		<!-- 顶部标题栏 -->
		<view class="header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">&lt;</text>
			</view>
			<view class="title">
				<text class="title-text">GIS地图</text>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<view class="content">
			<!-- 地图背景 -->
			<view class="map-background">
				<!-- 地铁线路1 -->
				<view class="metro-line line-1"></view>
				<text class="line-name name-1">十四号线</text>
				
				<!-- 地铁线路2 -->
				<view class="metro-line line-2"></view>
				<text class="line-name name-2">广花城际线</text>
				
				<!-- 地铁站点 -->
				<view class="metro-station station-1">
					<view class="work-icon"></view>
					<text class="work-label">马务站</text>
				</view>
				
				<!-- 工点位置 -->
				<view class="work-site site-1">
					<view class="work-icon"></view>
					<text class="work-label">新市墟站-马务区间</text>
				</view>
				
				<!-- 钻孔位置 -->
				<view class="drill-hole hole-1">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-14</text>
				</view>
				<view class="drill-hole hole-2">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-15</text>
				</view>
				<view class="drill-hole hole-3">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-16</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'GIS地图'
			}
		},
		onLoad() {
			console.log('GIS地图页面加载');
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.drill-detail {
		width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 88rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1rpx solid #e5e5e5;
		z-index: 999;
	}

	.back-btn {
		position: absolute;
		left: 0;
		top: 0;
		width: 88rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.back-icon {
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;
	}

	.title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title-text {
		font-size: 32rpx;
		color: #333333;
		font-weight: 500;
	}

	.content {
		flex: 1;
		position: relative;
	}

	.map-background {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #4a7c59 0%, #6b8e23 50%, #8fbc8f 100%);
		position: relative;
		overflow: hidden;
	}

	/* 地铁线路 */
	.metro-line {
		position: absolute;
		height: 12rpx;
		border-radius: 6rpx;
		box-shadow: 0 0 10rpx rgba(0, 204, 255, 0.5);
	}
	
	.line-1 {
		top: 15%;
		left: 5%;
		width: 90%;
		background: linear-gradient(90deg, #ffffff 0%, #00CCFF 10%, #00CCFF 90%, #ffffff 100%);
		transform: rotate(15deg);
	}
	
	.line-2 {
		top: 35%;
		left: 0%;
		width: 85%;
		background: linear-gradient(90deg, #ffffff 0%, #00CCFF 10%, #00CCFF 90%, #ffffff 100%);
		transform: rotate(-20deg);
	}
	
	/* 线路名称标注 */
	.line-name {
		position: absolute;
		padding: 8rpx 16rpx;
		background-color: #ffffff;
		border: 2rpx solid #00CCFF;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #00CCFF;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
		white-space: nowrap;
	}
	
	.name-1 {
		top: 12%;
		right: 25%;
		transform: rotate(15deg);
	}
	
	.name-2 {
		top: 32%;
		left: 15%;
		transform: rotate(-20deg);
	}

	/* 地铁站点 */
	.metro-station {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.station-1 {
		top: 25%;
		left: 25%;
	}

	.station-dot {
		width: 16rpx;
		height: 16rpx;
		background-color: #ff4444;
		border: 2rpx solid #ffffff;
		border-radius: 50%;
		box-shadow: 0 2rpx 8rpx rgba(255, 68, 68, 0.4);
	}

	.station-label {
		margin-top: 8rpx;
		padding: 3rpx 6rpx;
		background-color: #ff4444;
		color: #ffffff;
		font-size: 11rpx;
		border-radius: 3rpx;
		white-space: nowrap;
	}

	/* 工点位置 */
	.work-site {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.site-1 {
		top: 45%;
		left: 45%;
	}

	.work-icon {
		width: 48rpx;
		height: 48rpx;
		background-color: #ffffff;
		border: 4rpx solid #ff0000;
		border-radius: 8rpx;
		box-shadow: 0 2rpx 8rpx rgba(255, 0, 0, 0.3);
		position: relative;
	}
	
	.work-icon::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 24rpx;
		height: 24rpx;
		background-color: #ff0000;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}

	.work-label {
		margin-top: 8rpx;
		padding: 8rpx 16rpx;
		background-color: #ffffff;
		color: #333333;
		font-size: 24rpx;
		border: 2rpx solid #ff0000;
		border-radius: 8rpx;
		white-space: nowrap;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	/* 钻孔位置 */
	.drill-hole {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hole-1 {
		top: 55%;
		left: 30%;
	}

	.hole-2 {
		top: 60%;
		left: 50%;
	}

	.hole-3 {
		top: 65%;
		left: 70%;
	}

	.drill-dot {
		width: 24rpx;
		height: 24rpx;
		background-color: #ff8800;
		border: 2rpx solid #ffffff;
		border-radius: 50%;
		box-shadow: 0 2rpx 6rpx rgba(255, 136, 0, 0.4);
	}

	.drill-label {
		margin-top: 6rpx;
		padding: 4rpx 8rpx;
		background-color: #ffffff;
		color: #333333;
		font-size: 20rpx;
		border: 1rpx solid #ff0000;
		border-radius: 4rpx;
		white-space: nowrap;
		box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
	}
</style>