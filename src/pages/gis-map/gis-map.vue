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
			<!-- 暂时空白，后续完善 -->
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
		padding: 20rpx;
		background-color: #f5f5f5;
	}
</style>