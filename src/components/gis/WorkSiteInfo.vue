<template>
	<view v-if="show" class="popup-overlay" @click="handleOverlayClick">
		<view class="popup-container" @click.stop>
			<!-- 标题栏 -->
			<view class="popup-header">
				<view class="header-icon">◆</view>
				<text class="header-title">机场北站基本信息</text>
				<view class="close-btn" @click="closePopup">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 内容区域 -->
			<view class="popup-content">
				<!-- 基本信息 -->
				<view class="info-row">
					<view class="info-item">
						<text class="info-label">工点号</text>
						<text class="info-value">{{ workSiteData.workNumber || 'L022A-S010' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">布置钻孔</text>
						<text class="info-value highlight">{{ workSiteData.布置钻孔 || '593个' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">机台数量</text>
						<text class="info-value">{{ workSiteData.机台数量 || '0个' }}</text>
					</view>
				</view>
				
				<view class="info-row">
					<view class="info-item">
						<text class="info-label">工点名</text>
						<text class="info-value">{{ workSiteData.workName || '机场站' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">完成钻孔</text>
						<text class="info-value highlight">{{ workSiteData.完成钻孔 || '563个' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">勘察技术人员</text>
						<text class="info-value highlight">{{ workSiteData.勘察技术人员 || '13个' }}</text>
					</view>
				</view>
				
				<view class="info-row">
					<view class="info-item">
						<text class="info-label">完成进度</text>
						<text class="info-value">{{ workSiteData.completionRate || '94.94%' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">完成进尺</text>
						<text class="info-value highlight">{{ workSiteData.完成进尺 || '24515.6米' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">监理技术人员</text>
						<text class="info-value">{{ workSiteData.监理技术人员 || '0个' }}</text>
					</view>
				</view>
				
				<!-- 相关单位标题 -->
				<view class="section-title">
					<view class="title-icon">▶</view>
					<text class="title-text">相关单位</text>
				</view>
				
				<!-- 相关单位信息 -->
				<view class="units-container">
					<!-- 建设单位 -->
					<view class="unit-card blue">
						<view class="unit-header">
							<text class="unit-title">建设单位</text>
						</view>
						<view class="unit-content">
							<text class="unit-name">{{ (workSiteData.建设单位 && workSiteData.建设单位.name) || '广州地铁集团有限公司' }}</text>
							<view class="contact-info">
								<text class="contact-label">业主代表</text>
								<text class="contact-value">{{ (workSiteData.建设单位 && workSiteData.建设单位.representative) || '陈树亮' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.建设单位 && workSiteData.建设单位.phone) || '13380019775' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 总体单位 -->
					<view class="unit-card yellow">
						<view class="unit-header">
							<text class="unit-title">总体单位</text>
						</view>
						<view class="unit-content">
							<text class="unit-name">{{ (workSiteData.总体单位 && workSiteData.总体单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
							<view class="contact-info">
								<text class="contact-label">项目负责人</text>
								<text class="contact-value">{{ (workSiteData.总体单位 && workSiteData.总体单位.representative) || '潘勇' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.总体单位 && workSiteData.总体单位.phone) || '13822152531' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 勘察单位 -->
					<view class="unit-card orange">
						<view class="unit-header">
							<text class="unit-title">勘察单位</text>
						</view>
						<view class="unit-content">
							<text class="unit-name">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
							<view class="contact-info">
								<text class="contact-label">项目负责人</text>
								<text class="contact-value">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.representative) || '赵广辉' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.phone) || '15920489690' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 监理单位 -->
					<view class="unit-card green">
						<view class="unit-header">
							<text class="unit-title">监理单位</text>
						</view>
						<view class="unit-content">
							<view class="contact-info">
								<text class="contact-label">项目负责人</text>
								<text class="contact-value">{{ (workSiteData.监理单位 && workSiteData.监理单位.representative) || '' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.监理单位 && workSiteData.监理单位.phone) || '' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 设计单位 -->
					<view class="unit-card cyan">
						<view class="unit-header">
							<text class="unit-title">设计单位</text>
						</view>
						<view class="unit-content">
							<view class="contact-info">
								<text class="contact-label">工点设计负责人</text>
								<text class="contact-value">{{ (workSiteData.设计单位 && workSiteData.设计单位.representative) || '' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.设计单位 && workSiteData.设计单位.phone) || '' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 施工单位 -->
					<view class="unit-card purple">
						<view class="unit-header">
							<text class="unit-title">施工单位</text>
						</view>
						<view class="unit-content">
							<view class="contact-info">
								<text class="contact-label">项目负责人</text>
								<text class="contact-value">{{ (workSiteData.施工单位 && workSiteData.施工单位.representative) || '' }}</text>
							</view>
							<view class="contact-info">
								<text class="contact-label">联系电话</text>
								<text class="contact-value">{{ (workSiteData.施工单位 && workSiteData.施工单位.phone) || '' }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'WorkSiteInfo',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			workSiteData: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			closePopup() {
				this.$emit('close');
			},
			handleOverlayClick() {
				this.closePopup();
			}
		}
	}
</script>

<style scoped>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.popup-container {
		width: 90%;
		max-width: 800rpx;
		max-height: 80%;
		background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
	}

	.popup-header {
		height: 88rpx;
		background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.2);
	}

	.header-icon {
		color: #ffffff;
		font-size: 32rpx;
		margin-right: 16rpx;
	}

	.header-title {
		flex: 1;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
	}

	.close-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.close-icon {
		color: #ffffff;
		font-size: 40rpx;
		font-weight: bold;
	}

	.popup-content {
		padding: 32rpx;
		background-color: rgba(255, 255, 255, 0.95);
		max-height: 1000rpx;
		overflow-y: auto;
	}

	.info-row {
		display: flex;
		margin-bottom: 24rpx;
		gap: 16rpx;
	}

	.info-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.info-label {
		font-size: 24rpx;
		color: #666666;
		margin-bottom: 8rpx;
	}

	.info-value {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
	}

	.info-value.highlight {
		color: #2a5298;
	}

	.section-title {
		display: flex;
		align-items: center;
		margin: 32rpx 0 24rpx 0;
		padding-bottom: 16rpx;
		border-bottom: 2rpx solid #e5e5e5;
	}

	.title-icon {
		color: #2a5298;
		font-size: 24rpx;
		margin-right: 12rpx;
	}

	.title-text {
		font-size: 32rpx;
		color: #333333;
		font-weight: bold;
	}

	.units-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16rpx;
	}

	.unit-card {
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.unit-header {
		padding: 16rpx;
		color: #ffffff;
		font-weight: bold;
	}

	.unit-title {
		font-size: 28rpx;
	}

	.unit-content {
		padding: 16rpx;
		background-color: #ffffff;
	}

	.unit-name {
		font-size: 24rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 12rpx;
		display: block;
	}

	.contact-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}

	.contact-label {
		font-size: 22rpx;
		color: #666666;
	}

	.contact-value {
		font-size: 22rpx;
		color: #333333;
		font-weight: bold;
	}

	/* 不同单位的颜色 */
	.unit-card.blue .unit-header {
		background-color: #4a90e2;
	}

	.unit-card.yellow .unit-header {
		background-color: #f5a623;
	}

	.unit-card.orange .unit-header {
		background-color: #d0743c;
	}

	.unit-card.green .unit-header {
		background-color: #7ed321;
	}

	.unit-card.cyan .unit-header {
		background-color: #50e3c2;
	}

	.unit-card.purple .unit-header {
		background-color: #9013fe;
	}
</style>