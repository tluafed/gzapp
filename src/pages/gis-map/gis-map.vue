<template>
	<view class="gis-container">
		<view class="header">
			<text class="header-title">GIS地图</text>
		</view>
		
		<view class="map-container">
			<!-- 地图容器，后续可以集成地图组件 -->
			<view class="map-placeholder">
				<text class="placeholder-text">地图加载中...</text>
				<text class="placeholder-desc">此处将显示GIS地图内容</text>
			</view>
		</view>
		
		<view class="toolbar">
			<button class="tool-btn" @click="onLocationClick">定位</button>
			<button class="tool-btn" @click="onLayerClick">图层</button>
			<button class="tool-btn" @click="onMeasureClick">测量</button>
			<button class="tool-btn" @click="onSearchClick">搜索</button>
		</view>
		
		<view class="back-btn" @click="goBack">
			<text class="back-text">返回</text>
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
			},
			onLocationClick() {
				uni.showToast({
					title: '定位功能待开发',
					icon: 'none'
				});
			},
			onLayerClick() {
				uni.showToast({
					title: '图层功能待开发',
					icon: 'none'
				});
			},
			onMeasureClick() {
				uni.showToast({
					title: '测量功能待开发',
					icon: 'none'
				});
			},
			onSearchClick() {
				uni.showToast({
					title: '搜索功能待开发',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>
	.gis-container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
	}

	.header {
		height: 100rpx;
		background-color: #28a745;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.header-title {
		color: white;
		font-size: 36rpx;
		font-weight: bold;
	}

	.map-container {
		flex: 1;
		position: relative;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	}

	.map-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.placeholder-text {
		font-size: 32rpx;
		color: #1976d2;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.placeholder-desc {
		font-size: 28rpx;
		color: #666;
	}

	.toolbar {
		height: 120rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 20rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	}

	.tool-btn {
		width: 140rpx;
		height: 70rpx;
		background-color: #28a745;
		color: white;
		border-radius: 35rpx;
		font-size: 28rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tool-btn:active {
		background-color: #218838;
	}

	.back-btn {
		position: absolute;
		top: 120rpx;
		left: 20rpx;
		width: 120rpx;
		height: 60rpx;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.2);
		z-index: 100;
	}

	.back-text {
		color: #28a745;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>