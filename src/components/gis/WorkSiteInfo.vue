<template>
	<view v-if="show" class="popup-overlay" @click="handleOverlayClick">
		<view class="popup-container" @click.stop>
			<!-- 标题栏 -->
			<view class="popup-header">
				<text class="header-title">{{ workSiteData.workName || '机场北站' }}基本信息</text>
				<view class="close-btn" @click="closePopup">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 内容区域 -->
			<view class="popup-content">
				<!-- 第1组：基本信息 -->
				<view class="info-section section-1">
					<!-- 标题信息区域 -->
					<view class="title-info">
						<view class="title-item">
							<text class="title-label">工点编号</text>
							<text class="title-value">{{ workSiteData.workNumber || 'L022A-S010' }}</text>
						</view>
						<view class="title-item">
							<text class="title-label">工点名称</text>
							<text class="title-value">{{ workSiteData.workName || '机场北站' }}</text>
						</view>
					</view>
					
					<!-- 进度展示区域 -->
					<view class="progress-container">
						<view class="progress-header">
							<text class="progress-label">完成进度</text>
							<text class="progress-percent">{{ workSiteData.completionRate || '94.94%' }}</text>
						</view>
						<view class="progress-bar">
							<view class="progress-fill" :style="{ width: workSiteData.completionRate || '94.94%' }"></view>
						</view>
					</view>
				</view>

				<!-- 第2组：钻孔信息 -->
				<view class="info-section section-2">
					<view class="section-item">
						<text class="item-label">布置钻孔</text>
						<text class="item-value highlight">{{ workSiteData.布置钻孔 || '593个' }}</text>
					</view>
					<view class="section-item">
						<text class="item-label">完成钻孔</text>
						<text class="item-value highlight">{{ workSiteData.完成钻孔 || '563个' }}</text>
					</view>
					<view class="section-item">
						<text class="item-label">完成进尺</text>
						<text class="item-value highlight">{{ workSiteData.完成进尺 || '24515.6米' }}</text>
					</view>
				</view>

				<!-- 第3组：人员配置 -->
				<view class="info-section section-3">
					<view class="section-item">
						<text class="item-label">机台数量</text>
						<text class="item-value">{{ workSiteData.机台数量 || '0个' }}</text>
					</view>
					<view class="section-item">
						<text class="item-label">勘察技术人员</text>
						<text class="item-value highlight">{{ workSiteData.勘察技术人员 || '13个' }}</text>
					</view>
					<view class="section-item">
						<text class="item-label">监理技术人员</text>
						<text class="item-value">{{ workSiteData.监理技术人员 || '0个' }}</text>
					</view>
				</view>
				
				<!-- 第4组：相关单位 -->
				<view class="info-section section-4">
					<text class="section-title">相关单位</text>
					<view class="units-grid">
						<!-- 建设单位 -->
						<view class="unit-card unit-construction">
							<view class="unit-header">
								<text class="unit-type">建设单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.建设单位 && workSiteData.建设单位.name) || '广州地铁集团有限公司' }}</text>
								<view class="contact-info">
									<text class="contact-label">业主代表</text>
									<text class="contact-value">{{ (workSiteData.建设单位 && workSiteData.建设单位.representative) || '陈树亮' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.建设单位 && workSiteData.建设单位.phone) || '13380019775' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 总体单位 -->
						<view class="unit-card unit-general">
							<view class="unit-header">
								<text class="unit-type">总体单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.总体单位 && workSiteData.总体单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
								<view class="contact-info">
									<text class="contact-label">项目负责人</text>
									<text class="contact-value">{{ (workSiteData.总体单位 && workSiteData.总体单位.representative) || '潘勇' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.总体单位 && workSiteData.总体单位.phone) || '13822152531' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 勘察单位 -->
						<view class="unit-card unit-survey">
							<view class="unit-header">
								<text class="unit-type">勘察单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.name) || '广州地铁设计研究院股份有限公司' }}</text>
								<view class="contact-info">
									<text class="contact-label">项目负责人</text>
									<text class="contact-value">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.representative) || '赵广辉' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.勘察单位 && workSiteData.勘察单位.phone) || '15920489690' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 监理单位 -->
						<view class="unit-card unit-supervision">
							<view class="unit-header">
								<text class="unit-type">监理单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.监理单位 && workSiteData.监理单位.name) || '广州地铁监理有限公司' }}</text>
								<view class="contact-info">
									<text class="contact-label">项目负责人</text>
									<text class="contact-value">{{ (workSiteData.监理单位 && workSiteData.监理单位.representative) || '李明华' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.监理单位 && workSiteData.监理单位.phone) || '13912345678' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 设计单位 -->
						<view class="unit-card unit-design">
							<view class="unit-header">
								<text class="unit-type">设计单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.设计单位 && workSiteData.设计单位.name) || '广州地铁设计院' }}</text>
								<view class="contact-info">
									<text class="contact-label">工点设计负责人</text>
									<text class="contact-value">{{ (workSiteData.设计单位 && workSiteData.设计单位.representative) || '王建国' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.设计单位 && workSiteData.设计单位.phone) || '13987654321' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 施工单位 -->
						<view class="unit-card unit-construction-work">
							<view class="unit-header">
								<text class="unit-type">施工单位</text>
							</view>
							<view class="unit-content">
								<text class="unit-name">{{ (workSiteData.施工单位 && workSiteData.施工单位.name) || '中铁建设集团' }}</text>
								<view class="contact-info">
									<text class="contact-label">项目负责人</text>
									<text class="contact-value">{{ (workSiteData.施工单位 && workSiteData.施工单位.representative) || '张伟强' }}</text>
								</view>
								<view class="contact-info">
									<text class="contact-label">联系电话</text>
									<text class="contact-value phone">{{ (workSiteData.施工单位 && workSiteData.施工单位.phone) || '13765432109' }}</text>
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
			},
			getProgressStatus(percent) {
				const num = parseFloat(percent);
				if (num >= 95) return '即将完工';
				if (num >= 80) return '进展顺利';
				if (num >= 60) return '稳步推进';
				if (num >= 40) return '正在进行';
				if (num >= 20) return '刚刚起步';
				return '准备阶段';
			}
		}
	}
</script>

<style scoped>
	/* 浅色系主题 */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.popup-container {
		width: 100%;
		max-width: 750rpx;
		max-height: 90vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
	}

	.popup-header {
		height: 100rpx;
		background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		border-bottom: 1rpx solid #e2e8f0;
		position: relative;
	}

	.popup-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2rpx;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
	}

	.header-title {
		color: #1e293b;
		font-size: 32rpx;
		font-weight: 600;
		flex: 1;
	}

	.close-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #f1f5f9;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background-color: #e2e8f0;
		transform: scale(1.05);
	}

	.close-icon {
		color: #64748b;
		font-size: 36rpx;
		font-weight: normal;
	}

	.popup-content {
		padding: 24rpx;
		max-height: calc(90vh - 100rpx);
		overflow-y: auto;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	/* 信息分组样式 */
	.info-section {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		margin-bottom: 24rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.info-section:last-child {
		margin-bottom: 0;
	}

	/* 第1组：特殊布局 */
	.section-1 {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	/* 标题信息区域 */
	.title-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32rpx;
		padding: 20rpx;
		background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
		border-radius: 8rpx;
		border: 1rpx solid #cbd5e1;
	}

	.title-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;
	}

	.title-label {
		font-size: 24rpx;
		color: #64748b;
		font-weight: 500;
	}

	.title-value {
		font-size: 28rpx;
		font-weight: 700;
		color: #1e293b;
		padding: 8rpx 16rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 20rpx;
		border: 1rpx solid rgba(30, 41, 59, 0.1);
	}

	/* 进度展示区域 */
	.progress-container {
		padding: 20rpx;
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 8rpx;
		border: 1rpx solid #e2e8f0;
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.progress-label {
		font-size: 26rpx;
		color: #64748b;
		font-weight: 500;
	}

	.progress-percent {
		font-size: 32rpx;
		font-weight: 700;
		color: #3b82f6;
	}

	.progress-bar {
		height: 12rpx;
		background-color: #e2e8f0;
		border-radius: 6rpx;
		overflow: hidden;
		margin-bottom: 12rpx;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
		border-radius: 6rpx;
		transition: width 0.3s ease;
	}

	.progress-status {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.status-text {
		font-size: 24rpx;
		color: #10b981;
		font-weight: 600;
	}

	/* 第2-3组：网格布局 */
	.section-2, .section-3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24rpx;
	}

	.section-item {
		text-align: center;
		padding: 16rpx;
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 8rpx;
		border: 1rpx solid #e2e8f0;
		transition: all 0.2s ease;
	}

	.section-item:hover {
		transform: translateY(-2rpx);
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.item-label {
		display: block;
		font-size: 24rpx;
		color: #64748b;
		margin-bottom: 8rpx;
		font-weight: 500;
	}

	.item-value {
		display: block;
		font-size: 28rpx;
		color: #1e293b;
		font-weight: 600;
	}

	.item-value.highlight {
		color: #3b82f6;
		font-weight: 700;
	}

	/* 第4组：相关单位 */
	.section-4 {
		padding: 32rpx 24rpx;
	}

	.section-title {
		display: block;
		font-size: 28rpx;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 24rpx;
		text-align: center;
		padding-bottom: 16rpx;
		border-bottom: 2rpx solid #e2e8f0;
	}

	.units-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}

	.unit-card {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease;
	}

	.unit-card:hover {
		transform: translateY(-2rpx);
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
	}

	.unit-header {
		padding: 16rpx 20rpx;
		text-align: center;
	}

	.unit-type {
		font-size: 24rpx;
		font-weight: 600;
		color: #ffffff;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		display: inline-block;
	}

	/* 不同单位的颜色主题 */
	.unit-construction .unit-type {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
	}

	.unit-general .unit-type {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
	}

	.unit-survey .unit-type {
		background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
	}

	.unit-supervision .unit-type {
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
	}

	.unit-design .unit-type {
		background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
	}

	.unit-construction-work .unit-type {
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
	}

	.unit-content {
		padding: 20rpx;
	}

	.unit-name {
		font-size: 26rpx;
		color: #1e293b;
		font-weight: 600;
		margin-bottom: 16rpx;
		display: block;
		line-height: 1.4;
	}

	.contact-info {
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
		line-height: 1.4;
	}

	.contact-info:last-child {
		margin-bottom: 0;
	}

	.contact-label {
		font-size: 22rpx;
		color: #64748b;
		flex-shrink: 0;
		width: 120rpx;
		font-weight: 500;
	}

	.contact-value {
		font-size: 22rpx;
		color: #1e293b;
		flex: 1;
		font-weight: 500;
	}

	.contact-value.phone {
		color: #3b82f6;
		font-weight: 600;
	}

	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.popup-overlay {
			padding: 10rpx;
		}
		
		.section-2, .section-3 {
			grid-template-columns: 1fr;
			gap: 16rpx;
		}
		
		.units-grid {
			grid-template-columns: 1fr;
			gap: 16rpx;
		}
		
		.contact-label {
			width: 100rpx;
		}
		
		.title-info {
			flex-direction: column;
			gap: 16rpx;
		}
	}

	/* 滚动条样式 */
	.popup-content::-webkit-scrollbar {
		width: 6rpx;
	}

	.popup-content::-webkit-scrollbar-track {
		background: rgba(241, 245, 249, 0.5);
		border-radius: 3rpx;
	}

	.popup-content::-webkit-scrollbar-thumb {
		background: rgba(148, 163, 184, 0.6);
		border-radius: 3rpx;
	}

	.popup-content::-webkit-scrollbar-thumb:hover {
		background: rgba(100, 116, 139, 0.8);
	}
</style>