<template>
	<view v-if="show" class="popup-overlay" @click="handleOverlayClick">
		<view class="popup-container" @click.stop>
			<!-- 标题栏 -->
			<view class="popup-header">
				<text class="header-title">{{ workSiteData.workName || '机场站' }}基本信息</text>
				<view class="close-btn" @click="closePopup">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 内容区域 -->
			<view class="popup-content">
				<!-- 基本信息卡片 -->
				<view class="info-card">
					<view class="card-title">基本信息</view>
					<view class="info-grid">
						<view class="info-item">
							<text class="info-label">工点号</text>
							<text class="info-value">{{ workSiteData.workNumber || 'L022A-S010' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">工点名</text>
							<text class="info-value">{{ workSiteData.workName || '机场站' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">布置钻孔</text>
							<text class="info-value primary">{{ workSiteData.布置钻孔 || '593个' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">完成钻孔</text>
							<text class="info-value primary">{{ workSiteData.完成钻孔 || '563个' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">完成进度</text>
							<text class="info-value success">{{ workSiteData.completionRate || '94.94%' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">完成进尺</text>
							<text class="info-value">{{ workSiteData.完成进尺 || '24515.6米' }}</text>
						</view>
					</view>
				</view>

				<!-- 人员信息卡片 -->
				<view class="info-card">
					<view class="card-title">人员配置</view>
					<view class="info-grid">
						<view class="info-item">
							<text class="info-label">机台数量</text>
							<text class="info-value">{{ workSiteData.机台数量 || '0个' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">勘察技术人员</text>
							<text class="info-value primary">{{ workSiteData.勘察技术人员 || '13个' }}</text>
						</view>
						<view class="info-item">
							<text class="info-label">监理技术人员</text>
							<text class="info-value">{{ workSiteData.监理技术人员 || '0个' }}</text>
						</view>
					</view>
				</view>
				
				<!-- 相关单位信息 -->
				<view class="info-card">
					<view class="card-title">相关单位</view>
					<view class="units-list">
						<!-- 建设单位 -->
						<view class="unit-item">
							<view class="unit-header">
								<text class="unit-type">建设单位</text>
							</view>
							<view class="unit-details">
								<text class="unit-name">{{ (workSiteData.建设单位 && workSiteData.建设单位.name) || '广州地铁集团有限公司' }}</text>
								<view class="contact-row" v-if="(workSiteData.建设单位 && workSiteData.建设单位.representative) || '陈树亮'">
									<text class="contact-label">业主代表：</text>
									<text class="contact-value">{{ (workSiteData.建设单位 && workSiteData.建设单位.representative) || '陈树亮' }}</text>
								</view>
								<view class="contact-row" v-if="(workSiteData.建设单位 && workSiteData.建设单位.phone) || '13380019775'">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ (workSiteData.建设单位 && workSiteData.建设单位.phone) || '13380019775' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 总体单位 -->
						<view class="unit-item">
							<view class="unit-header">
								<text class="unit-type">总体单位</text>
							</view>
							<view class="unit-details">
								<text class="unit-name">{{ (workSiteData.总体单位 && workSiteData.总体单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
								<view class="contact-row" v-if="(workSiteData.总体单位 && workSiteData.总体单位.representative) || '潘勇'">
									<text class="contact-label">项目负责人：</text>
									<text class="contact-value">{{ (workSiteData.总体单位 && workSiteData.总体单位.representative) || '潘勇' }}</text>
								</view>
								<view class="contact-row" v-if="(workSiteData.总体单位 && workSiteData.总体单位.phone) || '13822152531'">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ (workSiteData.总体单位 && workSiteData.总体单位.phone) || '13822152531' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 勘察单位 -->
						<view class="unit-item">
							<view class="unit-header">
								<text class="unit-type">勘察单位</text>
							</view>
							<view class="unit-details">
								<text class="unit-name">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
								<view class="contact-row" v-if="(workSiteData.勘察单位 && workSiteData.勘察单位.representative) || '赵广辉'">
									<text class="contact-label">项目负责人：</text>
									<text class="contact-value">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.representative) || '赵广辉' }}</text>
								</view>
								<view class="contact-row" v-if="(workSiteData.勘察单位 && workSiteData.勘察单位.phone) || '15920489690'">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.phone) || '15920489690' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 监理单位 -->
						<view class="unit-item" v-if="(workSiteData.监理单位 && (workSiteData.监理单位.representative || workSiteData.监理单位.phone))">
							<view class="unit-header">
								<text class="unit-type">监理单位</text>
							</view>
							<view class="unit-details">
								<view class="contact-row" v-if="workSiteData.监理单位 && workSiteData.监理单位.representative">
									<text class="contact-label">项目负责人：</text>
									<text class="contact-value">{{ workSiteData.监理单位.representative }}</text>
								</view>
								<view class="contact-row" v-if="workSiteData.监理单位 && workSiteData.监理单位.phone">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ workSiteData.监理单位.phone }}</text>
								</view>
							</view>
						</view>
						
						<!-- 设计单位 -->
						<view class="unit-item" v-if="(workSiteData.设计单位 && (workSiteData.设计单位.representative || workSiteData.设计单位.phone))">
							<view class="unit-header">
								<text class="unit-type">设计单位</text>
							</view>
							<view class="unit-details">
								<view class="contact-row" v-if="workSiteData.设计单位 && workSiteData.设计单位.representative">
									<text class="contact-label">工点设计负责人：</text>
									<text class="contact-value">{{ workSiteData.设计单位.representative }}</text>
								</view>
								<view class="contact-row" v-if="workSiteData.设计单位 && workSiteData.设计单位.phone">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ workSiteData.设计单位.phone }}</text>
								</view>
							</view>
						</view>
						
						<!-- 施工单位 -->
						<view class="unit-item" v-if="(workSiteData.施工单位 && (workSiteData.施工单位.representative || workSiteData.施工单位.phone))">
							<view class="unit-header">
								<text class="unit-type">施工单位</text>
							</view>
							<view class="unit-details">
								<view class="contact-row" v-if="workSiteData.施工单位 && workSiteData.施工单位.representative">
									<text class="contact-label">项目负责人：</text>
									<text class="contact-value">{{ workSiteData.施工单位.representative }}</text>
								</view>
								<view class="contact-row" v-if="workSiteData.施工单位 && workSiteData.施工单位.phone">
									<text class="contact-label">联系电话：</text>
									<text class="contact-value phone">{{ workSiteData.施工单位.phone }}</text>
								</view>
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
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
	}

	.popup-container {
		width: 100%;
		max-width: 700rpx;
		max-height: 90vh;
		background-color: #ffffff;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
	}

	.popup-header {
		height: 100rpx;
		background-color: #f8f9fa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		border-bottom: 1rpx solid #e9ecef;
	}

	.header-title {
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
	}

	.close-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #f1f3f4;
	}

	.close-icon {
		color: #666666;
		font-size: 36rpx;
		font-weight: normal;
	}

	.popup-content {
		padding: 24rpx;
		max-height: calc(90vh - 100rpx);
		overflow-y: auto;
		background-color: #f8f9fa;
	}

	.info-card {
		background-color: #ffffff;
		border-radius: 8rpx;
		margin-bottom: 24rpx;
		overflow: hidden;
		box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.1);
	}

	.card-title {
		padding: 24rpx 24rpx 16rpx 24rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		border-bottom: 1rpx solid #f1f3f4;
	}

	.info-grid {
		padding: 16rpx 24rpx 24rpx 24rpx;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24rpx 16rpx;
	}

	.info-item {
		display: flex;
		flex-direction: column;
	}

	.info-label {
		font-size: 24rpx;
		color: #666666;
		margin-bottom: 8rpx;
		line-height: 1.4;
	}

	.info-value {
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
		line-height: 1.4;
	}

	.info-value.primary {
		color: #1890ff;
	}

	.info-value.success {
		color: #52c41a;
	}

	.units-list {
		padding: 16rpx 24rpx 24rpx 24rpx;
	}

	.unit-item {
		margin-bottom: 32rpx;
	}

	.unit-item:last-child {
		margin-bottom: 0;
	}

	.unit-header {
		margin-bottom: 12rpx;
	}

	.unit-type {
		font-size: 26rpx;
		font-weight: 600;
		color: #1890ff;
		padding: 6rpx 12rpx;
		background-color: #e6f7ff;
		border-radius: 4rpx;
		border: 1rpx solid #91d5ff;
	}

	.unit-details {
		padding-left: 16rpx;
	}

	.unit-name {
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
		margin-bottom: 8rpx;
		display: block;
		line-height: 1.5;
	}

	.contact-row {
		display: flex;
		align-items: flex-start;
		margin-bottom: 6rpx;
		line-height: 1.5;
	}

	.contact-row:last-child {
		margin-bottom: 0;
	}

	.contact-label {
		font-size: 24rpx;
		color: #666666;
		flex-shrink: 0;
		min-width: 140rpx;
	}

	.contact-value {
		font-size: 24rpx;
		color: #333333;
		flex: 1;
	}

	.contact-value.phone {
		color: #1890ff;
		font-weight: 500;
	}

	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.popup-overlay {
			padding: 20rpx 10rpx;
		}
		
		.info-grid {
			grid-template-columns: 1fr;
			gap: 16rpx;
		}
		
		.contact-label {
			min-width: 120rpx;
		}
	}

	/* 滚动条样式 */
	.popup-content::-webkit-scrollbar {
		width: 6rpx;
	}

	.popup-content::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3rpx;
	}

	.popup-content::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3rpx;
	}

	.popup-content::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>