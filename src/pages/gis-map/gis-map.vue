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
			<!-- GIS地图 -->
			<map 
				id="gisMap"
				class="gis-map"
				longitude="113.264434"
				latitude="23.129162"
				scale="13"
				:markers="markers"
				:show-location="true"
				:enable-zoom="true"
				:enable-scroll="true"
				:enable-rotate="false"
				:enable-3D="false"
				:enable-overlooking="false"
				:layer-style="1"
				@markertap="onMarkerTap"
				@tap="onMapTap"
				@error="onMapError"
			>
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'GIS地图',
				// 地图标记点
				markers: [
					{
						id: 1,
						longitude: 113.264434,
						latitude: 23.129162,
						title: '广州市',
						iconPath: '',
						width: 30,
						height: 30,
						callout: {
							content: '广州市中心',
							color: '#333',
							fontSize: 14,
							borderRadius: 5,
							bgColor: '#fff',
							padding: 5,
							display: 'ALWAYS'
						}
					}
				]
			}
		},
		onLoad() {
			console.log('GIS地图页面加载');
			// 延迟初始化地图
			setTimeout(() => {
				this.initMap();
			}, 500);
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			// 初始化地图
			initMap() {
				this.mapContext = uni.createMapContext('gisMap', this);
				console.log('地图初始化完成');
			},
			// 标记点击事件
			onMarkerTap(e) {
				console.log('标记点击:', e);
				uni.showToast({
					title: '点击了标记点',
					icon: 'none'
				});
			},
			// 地图点击事件
			onMapTap(e) {
				console.log('地图点击:', e);
			},
			// 地图错误事件
			onMapError(e) {
				console.error('地图加载错误:', e);
				uni.showToast({
					title: '地图加载失败',
					icon: 'none'
				});
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

	.gis-map {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>