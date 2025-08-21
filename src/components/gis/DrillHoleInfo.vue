<template>
	<view v-if="show" class="popup-overlay" @click="handleOverlayClick">
		<view class="popup-container" @click.stop>
			<!-- 标题栏 -->
			<view class="popup-header">
				<text class="header-title">{{ drillHoleData.holeName || 'MNZ3-XM-14' }}</text>
				<view class="close-btn" @click="closePopup">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 标签页导航 -->
			<view class="tab-nav">
				<view 
					class="tab-item" 
					:class="{ active: activeTab === 'column' }"
					@click="switchTab('column')"
				>
					<text class="tab-text">柱状图</text>
				</view>
				<view 
					class="tab-item" 
					:class="{ active: activeTab === 'photos' }"
					@click="switchTab('photos')"
				>
					<text class="tab-text">图片</text>
				</view>
				<view 
					class="tab-item" 
					:class="{ active: activeTab === 'videos' }"
					@click="switchTab('videos')"
				>
					<text class="tab-text">视频</text>
				</view>
			</view>
			
			<!-- 内容区域 -->
			<view class="popup-content">
				<!-- 柱状图标签页 -->
				<view v-if="activeTab === 'column'" class="tab-content">
					<view class="column-chart-container">
						<view class="chart-wrapper" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
							<view class="chart-content" :style="chartStyle">
								<!-- 钻孔柱状图内容 -->
								<view class="drill-chart">
									<!-- 表头信息 -->
									<view class="chart-header">
										<view class="header-row">
											<view class="header-cell">工程名称</view>
											<view class="header-cell wide">{{ drillHoleData.projectName || '14号线一期工程地质勘察' }}</view>
										</view>
										<view class="header-row">
											<view class="header-cell">钻孔编号</view>
											<view class="header-cell">{{ drillHoleData.holeName || 'MNZ3-XM-14' }}</view>
											<view class="header-cell">勘察单位</view>
											<view class="header-cell wide">{{ drillHoleData.surveyUnit || '广州地铁设计研究院股份有限公司' }}</view>
										</view>
										<view class="header-row">
											<view class="header-cell">钻孔深度</view>
											<view class="header-cell">{{ drillHoleData.depth || '80.10m' }}</view>
											<view class="header-cell">孔口标高</view>
											<view class="header-cell">{{ drillHoleData.elevation || '+13.25' }}</view>
											<view class="header-cell">开孔日期</view>
											<view class="header-cell">{{ drillHoleData.startDate || '2023-6-13' }}</view>
											<view class="header-cell">初见水位</view>
											<view class="header-cell">{{ drillHoleData.waterLevel || '2.30m' }}</view>
										</view>
										<view class="header-row">
											<view class="header-cell">孔口直径</view>
											<view class="header-cell">{{ drillHoleData.diameter || '0.00m' }}</view>
											<view class="header-cell">终孔</view>
											<view class="header-cell">{{ drillHoleData.endElevation || '+28.19' }}</view>
											<view class="header-cell">终孔日期</view>
											<view class="header-cell">{{ drillHoleData.endDate || '2023-6-13' }}</view>
											<view class="header-cell">稳定水位</view>
											<view class="header-cell">{{ drillHoleData.stableWaterLevel || '5.40m' }}</view>
										</view>
									</view>
									
									<!-- 柱状图主体 -->
									<view class="chart-main">
										<!-- 表格标题行 -->
										<view class="table-header">
											<view class="col col-depth">深度(m)</view>
											<view class="col col-layer">地层代号</view>
											<view class="col col-thickness">厚度(m)</view>
											<view class="col col-elevation">标高(m)</view>
											<view class="col col-description">地层名称及描述</view>
											<view class="col col-column">柱状图(1:200)</view>
											<view class="col col-sample">取样及原位测试</view>
											<view class="col col-water">地下水位</view>
											<view class="col col-blow">标贯击数(击/30cm)</view>
										</view>
										
										<!-- 地层数据行 -->
										<view class="table-row" v-for="(layer, index) in layerData" :key="index">
											<view class="col col-depth">{{ layer.depth }}</view>
											<view class="col col-layer">{{ layer.code }}</view>
											<view class="col col-thickness">{{ layer.thickness }}</view>
											<view class="col col-elevation">{{ layer.elevation }}</view>
											<view class="col col-description">{{ layer.description }}</view>
											<view class="col col-column">
												<view class="layer-visual" :style="{ backgroundColor: layer.color, height: layer.visualHeight }"></view>
											</view>
											<view class="col col-sample">{{ layer.sample }}</view>
											<view class="col col-water">{{ layer.water }}</view>
											<view class="col col-blow">{{ layer.blow }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 图片标签页 -->
				<view v-if="activeTab === 'photos'" class="tab-content">
					<view class="photos-container">
						<!-- 单箱图片 -->
						<view class="photo-category">
							<view class="category-title">
								<text class="title-text">单箱图片</text>
								<text class="count-text">({{ singleBoxPhotos.length }}张)</text>
							</view>
							<view class="photo-grid">
								<view 
									class="photo-item" 
									v-for="(photo, index) in singleBoxPhotos" 
									:key="'single-' + index"
									@click="previewPhoto(photo, 'single', index)"
								>
									<image :src="photo.url" class="photo-image" mode="aspectFill"></image>
									<view class="photo-overlay">
										<text class="photo-name">{{ photo.name }}</text>
									</view>
								</view>
							</view>
						</view>

						<!-- 整体图片 -->
						<view class="photo-category">
							<view class="category-title">
								<text class="title-text">整体图片</text>
								<text class="count-text">({{ overallPhotos.length }}张)</text>
							</view>
							<view class="photo-grid">
								<view 
									class="photo-item" 
									v-for="(photo, index) in overallPhotos" 
									:key="'overall-' + index"
									@click="previewPhoto(photo, 'overall', index)"
								>
									<image :src="photo.url" class="photo-image" mode="aspectFill"></image>
									<view class="photo-overlay">
										<text class="photo-name">{{ photo.name }}</text>
									</view>
								</view>
							</view>
						</view>

						<!-- 地面图片 -->
						<view class="photo-category">
							<view class="category-title">
								<text class="title-text">地面图片</text>
								<text class="count-text">({{ groundPhotos.length }}张)</text>
							</view>
							<view class="photo-grid">
								<view 
									class="photo-item" 
									v-for="(photo, index) in groundPhotos" 
									:key="'ground-' + index"
									@click="previewPhoto(photo, 'ground', index)"
								>
									<image :src="photo.url" class="photo-image" mode="aspectFill"></image>
									<view class="photo-overlay">
										<text class="photo-name">{{ photo.name }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 视频标签页 -->
				<view v-if="activeTab === 'videos'" class="tab-content">
					<view class="videos-container">
						<view v-for="monitor in videoMonitors" :key="monitor.id" class="video-monitor-item">
							<view class="monitor-header">
								<text class="monitor-title">{{ monitor.name }}</text>
							</view>
							<view class="video-container">
								<view class="video-placeholder" @click="playVideo(monitor)">
									<view class="play-button">
										<text class="play-icon">▶</text>
									</view>
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
		name: 'DrillHoleInfo',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			drillHoleData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				activeTab: 'column',
				scale: 1,
				translateX: 0,
				translateY: 0,
				startX: 0,
				startY: 0,
				lastX: 0,
				lastY: 0,
				showPhotoPreview: false,
				currentPhoto: {},
				currentPhotoIndex: 0,
				currentPhotoList: [],
				currentPhotoType: '',
				layerData: [
					{
						depth: '0',
						code: 'Q4',
						thickness: '',
						elevation: '',
						description: '',
						color: '#f5f5f5',
						visualHeight: '60rpx',
						sample: '',
						water: '',
						blow: ''
					},
					{
						depth: '0',
						code: 'Pd',
						thickness: '',
						elevation: '',
						description: '',
						color: '#e8e8e8',
						visualHeight: '80rpx',
						sample: 'MNZ3-XM-14-01 3.00-3.50',
						water: '',
						blow: ''
					},
					{
						depth: '',
						code: 'Pd',
						thickness: '',
						elevation: '',
						description: '',
						color: '#e8e8e8',
						visualHeight: '80rpx',
						sample: 'MNZ3-XM-14-02 8.00-8.50',
						water: '',
						blow: ''
					},
					{
						depth: '',
						code: '',
						thickness: '',
						elevation: '',
						description: '',
						color: '#d8d8d8',
						visualHeight: '100rpx',
						sample: 'MNZ3-XM-14-03 13.00-13.50',
						water: '',
						blow: ''
					}
				],
				// 单箱图片数据
				singleBoxPhotos: [
					{
						name: '单箱施工图1',
						url: 'https://picsum.photos/400/300?random=1'
					},
					{
						name: '单箱施工图2',
						url: 'https://picsum.photos/400/300?random=2'
					},
					{
						name: '单箱施工图3',
						url: 'https://picsum.photos/400/300?random=3'
					}
				],
				// 整体图片数据
				overallPhotos: [
					{
						name: '整体施工图1',
						url: 'https://picsum.photos/400/300?random=4'
					},
					{
						name: '整体施工图2',
						url: 'https://picsum.photos/400/300?random=5'
					}
				],
				// 地面图片数据
				groundPhotos: [
					{
						name: '地面施工图1',
						url: 'https://picsum.photos/400/300?random=6'
					},
					{
						name: '地面施工图2',
						url: 'https://picsum.photos/400/300?random=7'
					},
					{
						name: '地面施工图3',
						url: 'https://picsum.photos/400/300?random=8'
					},
					{
						name: '地面施工图4',
						url: 'https://picsum.photos/400/300?random=9'
					}
				],
				// 视频监控数据
				videoMonitors: [
					{
						id: 1,
						name: '监控A'
					},
					{
						id: 2,
						name: '监控B'
					},
					{
						id: 3,
						name: '监控C'
					}
				]
			}
		},
		computed: {
			chartStyle() {
				return {
					transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
					transformOrigin: 'center center'
				}
			}
		},
		methods: {
			closePopup() {
				this.$emit('close');
			},
			handleOverlayClick() {
				this.closePopup();
			},
			switchTab(tab) {
				this.activeTab = tab;
			},
			// 触摸事件处理
			onTouchStart(e) {
				if (e.touches.length === 1) {
					this.startX = e.touches[0].clientX;
					this.startY = e.touches[0].clientY;
					this.lastX = this.translateX;
					this.lastY = this.translateY;
				}
			},
			onTouchMove(e) {
				if (e.touches.length === 1) {
					e.preventDefault();
					const deltaX = e.touches[0].clientX - this.startX;
					const deltaY = e.touches[0].clientY - this.startY;
					this.translateX = this.lastX + deltaX;
					this.translateY = this.lastY + deltaY;
				}
			},
			onTouchEnd(e) {
				// 触摸结束
			},
			// 图片预览相关方法
			previewPhoto(photo, type, index) {
				this.currentPhoto = photo;
				this.currentPhotoIndex = index;
				this.currentPhotoType = type;
				
				// 根据类型设置当前图片列表
				switch(type) {
					case 'single':
						this.currentPhotoList = this.singleBoxPhotos;
						break;
					case 'overall':
						this.currentPhotoList = this.overallPhotos;
						break;
					case 'ground':
						this.currentPhotoList = this.groundPhotos;
						break;
				}
				
				this.showPhotoPreview = true;
			},
			closePhotoPreview() {
				this.showPhotoPreview = false;
			},
			prevPhoto() {
				if (this.currentPhotoIndex > 0) {
					this.currentPhotoIndex--;
					this.currentPhoto = this.currentPhotoList[this.currentPhotoIndex];
				}
			},
			nextPhoto() {
				if (this.currentPhotoIndex < this.currentPhotoList.length - 1) {
					this.currentPhotoIndex++;
					this.currentPhoto = this.currentPhotoList[this.currentPhotoIndex];
				}
			},
			// 视频播放方法
			playVideo(monitor) {
				uni.showToast({
					title: `正在播放${monitor.name}`,
					icon: 'none'
				});
			}
		}
	}
</script>

<style scoped>
	/* 浅色系主题 - 完全使用工点弹窗的样式框架 */
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

	/* 标签页导航 */
	.tab-nav {
		display: flex;
		background: rgba(255, 255, 255, 0.9);
		border-bottom: 1rpx solid #e2e8f0;
	}

	.tab-item {
		flex: 1;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}

	.tab-item.active {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
	}

	.tab-item.active .tab-text {
		color: #ffffff;
		font-weight: 600;
	}

	.tab-text {
		font-size: 28rpx;
		color: #64748b;
		transition: all 0.2s ease;
	}

	.tab-item:not(.active):hover {
		background-color: #f8fafc;
	}

	.popup-content {
		padding: 24rpx;
		max-height: calc(90vh - 100rpx);
		overflow-y: auto;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.tab-content {
		height: 100%;
	}

	/* 柱状图容器 */
	.column-chart-container {
		height: 100%;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.chart-wrapper {
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.chart-content {
		min-width: 100%;
		min-height: 100%;
		transition: transform 0.1s ease-out;
	}

	/* 钻孔柱状图 */
	.drill-chart {
		padding: 20rpx;
		min-width: 1200rpx;
	}

	/* 表头信息 */
	.chart-header {
		margin-bottom: 20rpx;
		border: 1rpx solid #d1d5db;
		border-radius: 8rpx;
		overflow: hidden;
		background-color: #ffffff;
	}

	.header-row {
		display: flex;
		border-bottom: 1rpx solid #d1d5db;
	}

	.header-row:last-child {
		border-bottom: none;
	}

	.header-cell {
		padding: 12rpx 16rpx;
		border-right: 1rpx solid #d1d5db;
		font-size: 24rpx;
		color: #374151;
		background-color: #f9fafb;
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.header-cell:last-child {
		border-right: none;
	}

	.header-cell.wide {
		flex: 1;
		background-color: #ffffff;
	}

	/* 柱状图主体 */
	.chart-main {
		border: 1rpx solid #d1d5db;
		border-radius: 8rpx;
		overflow: hidden;
		background-color: #ffffff;
	}

	.table-header {
		display: flex;
		background-color: #f3f4f6;
		border-bottom: 2rpx solid #d1d5db;
	}

	.table-row {
		display: flex;
		border-bottom: 1rpx solid #e5e7eb;
		min-height: 80rpx;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.col {
		padding: 12rpx 8rpx;
		border-right: 1rpx solid #e5e7eb;
		font-size: 22rpx;
		color: #374151;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		line-height: 1.4;
	}

	.col:last-child {
		border-right: none;
	}

	.col-depth { min-width: 80rpx; }
	.col-layer { min-width: 80rpx; }
	.col-thickness { min-width: 80rpx; }
	.col-elevation { min-width: 80rpx; }
	.col-description { min-width: 200rpx; flex: 1; }
	.col-column { min-width: 120rpx; }
	.col-sample { min-width: 180rpx; }
	.col-water { min-width: 80rpx; }
	.col-blow { min-width: 120rpx; }

	/* 地层可视化 */
	.layer-visual {
		width: 80rpx;
		border: 1rpx solid #d1d5db;
		border-radius: 4rpx;
	}

	/* 空内容 */
	.empty-content {
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.empty-text {
		font-size: 28rpx;
		color: #9ca3af;
	}

	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.popup-overlay {
			padding: 10rpx;
		}
		
		.drill-chart {
			min-width: 1000rpx;
		}
		
		.header-cell {
			min-width: 100rpx;
			font-size: 22rpx;
			padding: 10rpx 12rpx;
		}
		
		.col {
			font-size: 20rpx;
			padding: 10rpx 6rpx;
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

	/* 图片标签页样式 */
	.photos-container {
		height: 100%;
	}

	.photo-category {
		margin-bottom: 32rpx;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.photo-category:last-child {
		margin-bottom: 0;
	}

	.category-title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #e2e8f0;
	}

	.title-text {
		font-size: 28rpx;
		font-weight: 600;
		color: #1e293b;
		margin-right: 12rpx;
	}

	.count-text {
		font-size: 24rpx;
		color: #64748b;
		background: #f1f5f9;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200rpx, 1fr));
		gap: 16rpx;
	}

	.photo-item {
		position: relative;
		aspect-ratio: 4/3;
		border-radius: 8rpx;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.photo-item:hover {
		transform: translateY(-4rpx);
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
	}

	.photo-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.photo-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
		padding: 16rpx 12rpx 12rpx;
		color: white;
	}

	.photo-name {
		font-size: 22rpx;
		font-weight: 500;
		line-height: 1.2;
	}

	/* 全屏预览样式 */
	.photo-preview-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
	}

	.photo-preview-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #000000;
	}

	.preview-header {
		height: 100rpx;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
	}

	.preview-title {
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
	}

	.preview-close {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.preview-close:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.preview-content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}

	.preview-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.preview-footer {
		height: 120rpx;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1rpx solid rgba(255, 255, 255, 0.1);
	}

	.photo-nav {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}

	.nav-btn {
		padding: 16rpx 32rpx;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8rpx;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.nav-btn:hover:not(.disabled) {
		background: rgba(255, 255, 255, 0.2);
	}

	.nav-btn.disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.nav-text {
		color: #ffffff;
		font-size: 28rpx;
	}

	.photo-counter {
		color: #ffffff;
		font-size: 28rpx;
		font-weight: 500;
	}

	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.photo-grid {
			grid-template-columns: repeat(auto-fill, minmax(150rpx, 1fr));
			gap: 12rpx;
		}
		
		.photo-name {
			font-size: 20rpx;
		}
		
		.preview-header {
			height: 80rpx;
			padding: 0 20rpx;
		}
		
		.preview-title {
			font-size: 28rpx;
		}
		
		.preview-footer {
			height: 100rpx;
		}
		
		.photo-nav {
			gap: 20rpx;
		}
		
		.nav-btn {
			padding: 12rpx 24rpx;
		}
		
		.nav-text, .photo-counter {
			font-size: 24rpx;
		}
	}

	/* 视频标签页样式 */
	.videos-container {
		height: 100%;
	}

	.video-monitor-item {
		margin-bottom: 32rpx;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.video-monitor-item:last-child {
		margin-bottom: 0;
	}

	.monitor-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #e2e8f0;
	}

	.monitor-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #1e293b;
	}


	.video-container {
		width: 100%;
		height: 420rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.video-container:hover {
		transform: translateY(-2rpx);
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
	}

	.video-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.play-button {
		width: 120rpx;
		height: 120rpx;
		background-color: rgba(255, 255, 255, 0.15);
		border: 4rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10rpx);
		transition: all 0.3s ease;
		z-index: 2;
	}

	.play-button:active {
		transform: scale(0.95);
		background-color: rgba(255, 255, 255, 0.25);
	}

	.play-icon {
		color: #fff;
		font-size: 52rpx;
		margin-left: 8rpx;
	}

	.video-info {
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1;
	}

	.video-resolution {
		color: rgba(255, 255, 255, 0.9);
		font-size: 24rpx;
		font-weight: 500;
		background: rgba(0, 0, 0, 0.3);
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		backdrop-filter: blur(10rpx);
	}

	.video-time {
		color: rgba(255, 255, 255, 0.7);
		font-size: 22rpx;
		background: rgba(0, 0, 0, 0.3);
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		backdrop-filter: blur(10rpx);
	}

	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.video-container {
			height: 350rpx;
		}
		
		.play-button {
			width: 100rpx;
			height: 100rpx;
		}
		
		.play-icon {
			font-size: 44rpx;
		}
		
	}
</style>
