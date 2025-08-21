<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">钻孔管理系统</text>
		</view>
		<button class="drill-btn" @click="goToDrillDetail">查看钻孔详情</button>
		<button class="gis-btn" @click="goToGisMap">GIS地图</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goToDrillDetail() {
				uni.navigateTo({
					url: '/pages/drill-detail/drill-detail'
				});
			},
			goToGisMap() {
				uni.navigateTo({
					url: '/pages/gis-map/gis-map'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.drill-btn {
		margin-top: 50rpx;
		width: 300rpx;
		height: 80rpx;
		background-color: #007aff;
		color: white;
		border-radius: 40rpx;
		font-size: 32rpx;
		border: none;
	}

	.gis-btn {
		margin-top: 30rpx;
		width: 300rpx;
		height: 80rpx;
		background-color: #28a745;
		color: white;
		border-radius: 40rpx;
		font-size: 32rpx;
		border: none;
	}
</style>