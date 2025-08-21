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
				<view class="metro-station station-1" @click="showWorkSiteInfo('马务站')">
					<view class="work-icon"></view>
					<text class="work-label">马务站</text>
				</view>
				
				<!-- 工点位置 -->
				<view class="work-site site-1" @click="showWorkSiteInfo('新市墟站-马务区间')">
					<view class="work-icon"></view>
					<text class="work-label">新市墟站-马务区间</text>
				</view>
				
				<!-- 钻孔位置 -->
				<view class="drill-hole hole-1" @click="showDrillHoleInfo('MNZ3-XM-14')">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-14</text>
				</view>
				<view class="drill-hole hole-2" @click="showDrillHoleInfo('MNZ3-XM-15')">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-15</text>
				</view>
				<view class="drill-hole hole-3" @click="showDrillHoleInfo('MNZ3-XM-16')">
					<view class="drill-dot"></view>
					<text class="drill-label">MNZ3-XM-16</text>
				</view>
			</view>
		</view>
		
		<!-- 工点信息弹窗 -->
		<WorkSiteInfo 
			:show="showWorkSitePopup" 
			:workSiteData="currentWorkSite"
			@close="closeWorkSitePopup"
		/>
		
		<!-- 钻孔信息弹窗 -->
		<DrillHoleInfo 
			:show="showDrillHolePopup" 
			:drillHoleData="currentDrillHole"
			@close="closeDrillHolePopup"
		/>
	</view>
</template>

<script>
	import WorkSiteInfo from '@/components/gis/WorkSiteInfo.vue'
	import DrillHoleInfo from '@/components/gis/DrillHoleInfo.vue'
	
	export default {
		components: {
			WorkSiteInfo,
			DrillHoleInfo
		},
		data() {
			return {
				title: 'GIS地图',
				showWorkSitePopup: false,
				showDrillHolePopup: false,
				currentWorkSite: {},
				currentDrillHole: {}
			}
		},
		onLoad() {
			console.log('GIS地图页面加载');
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			showWorkSiteInfo(siteName) {
				console.log('点击工点:', siteName);
				// 根据工点名称获取对应的数据
				this.currentWorkSite = this.getWorkSiteData(siteName);
				this.showWorkSitePopup = true;
				console.log('工点弹窗状态:', this.showWorkSitePopup);
				console.log('工点数据:', this.currentWorkSite);
			},
			closeWorkSitePopup() {
				this.showWorkSitePopup = false;
			},
			showDrillHoleInfo(holeName) {
				console.log('点击钻孔:', holeName);
				// 根据钻孔名称获取对应的数据
				this.currentDrillHole = this.getDrillHoleData(holeName);
				this.showDrillHolePopup = true;
				console.log('钻孔弹窗状态:', this.showDrillHolePopup);
				console.log('钻孔数据:', this.currentDrillHole);
			},
			closeDrillHolePopup() {
				this.showDrillHolePopup = false;
			},
			getWorkSiteData(siteName) {
				// 模拟工点数据
				const workSiteData = {
					'马务站': {
						workNumber: 'L022A-S010',
						workName: '机场站',
						completionRate: '94.94%',
						布置钻孔: '593个',
						完成钻孔: '563个',
						完成进尺: '24515.6米',
						机台数量: '0个',
						勘察技术人员: '13个',
						监理技术人员: '0个',
						建设单位: {
							name: '广州地铁集团有限公司',
							representative: '陈树亮',
							phone: '13380019775'
						},
						总体单位: {
							name: '广州地铁设计研究院股份有限公司',
							representative: '潘勇',
							phone: '13822152531'
						},
						勘察单位: {
							name: '广州地铁设计研究院股份有限公司',
							representative: '赵广辉',
							phone: '15920489690'
						},
						设计单位: {
							representative: '',
							phone: ''
						},
						监理单位: {
							representative: '',
							phone: ''
						},
						施工单位: {
							representative: '',
							phone: ''
						}
					},
					'新市墟站-马务区间': {
						workNumber: 'L022A-S011',
						workName: '新市墟站-马务区间',
						completionRate: '87.32%',
						布置钻孔: '425个',
						完成钻孔: '371个',
						完成进尺: '18650.3米',
						机台数量: '2个',
						勘察技术人员: '8个',
						监理技术人员: '2个',
						建设单位: {
							name: '广州地铁集团有限公司',
							representative: '李明华',
							phone: '13800138000'
						},
						总体单位: {
							name: '广州地铁设计研究院股份有限公司',
							representative: '王建国',
							phone: '13900139000'
						},
						勘察单位: {
							name: '广州地铁设计研究院股份有限公司',
							representative: '张伟民',
							phone: '13700137000'
						},
						设计单位: {
							representative: '刘德华',
							phone: '13600136000'
						},
						监理单位: {
							representative: '陈小明',
							phone: '13500135000'
						},
						施工单位: {
							representative: '黄志强',
							phone: '13400134000'
						}
					}
				};
				
				return workSiteData[siteName] || {};
			},
			getDrillHoleData(holeName) {
				// 模拟钻孔数据
				const drillHoleData = {
					'MNZ3-XM-14': {
						holeName: 'MNZ3-XM-14',
						projectName: '14号线一期工程地质勘察',
						surveyUnit: '广州地铁设计研究院股份有限公司',
						depth: '80.10m',
						elevation: '+13.25',
						startDate: '2023-6-13',
						waterLevel: '2.30m',
						diameter: '0.00m',
						endElevation: '+28.19',
						endDate: '2023-6-13',
						stableWaterLevel: '5.40m'
					},
					'MNZ3-XM-15': {
						holeName: 'MNZ3-XM-15',
						projectName: '14号线一期工程地质勘察',
						surveyUnit: '广州地铁设计研究院股份有限公司',
						depth: '75.50m',
						elevation: '+12.80',
						startDate: '2023-6-14',
						waterLevel: '2.10m',
						diameter: '0.00m',
						endElevation: '+26.70',
						endDate: '2023-6-14',
						stableWaterLevel: '5.20m'
					},
					'MNZ3-XM-16': {
						holeName: 'MNZ3-XM-16',
						projectName: '14号线一期工程地质勘察',
						surveyUnit: '广州地铁设计研究院股份有限公司',
						depth: '82.30m',
						elevation: '+14.15',
						startDate: '2023-6-15',
						waterLevel: '2.50m',
						diameter: '0.00m',
						endElevation: '+29.85',
						endDate: '2023-6-15',
						stableWaterLevel: '5.60m'
					}
				};
				
				return drillHoleData[holeName] || {};
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
		cursor: pointer;
		z-index: 100;
		padding: 10rpx;
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
		cursor: pointer;
		z-index: 100;
		padding: 10rpx;
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

	/* 增加点击效果 */
	.metro-station:active,
	.work-site:active,
	.drill-hole:active {
		transform: scale(0.95);
		opacity: 0.8;
	}

	/* 钻孔位置 */
	.drill-hole {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		z-index: 100;
		padding: 10rpx;
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