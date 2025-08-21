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
						<text class="chart-title">钻孔柱状图</text>
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
						
						<!-- 缩放控制按钮 -->
						<view class="zoom-controls">
							<view class="zoom-btn" @click="zoomIn">
								<text class="zoom-icon">+</text>
							</view>
							<view class="zoom-btn" @click="zoomOut">
								<text class="zoom-icon">-</text>
							</view>
							<view class="zoom-btn" @click="resetZoom">
								<text class="zoom-text">重置</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 图片标签页 -->
				<view v-if="activeTab === 'photos'" class="tab-content">
					<view class="empty-content">
						<text class="empty-text">图片功能开发中...</text>
					</view>
				</view>
				
				<!-- 视频标签页 -->
				<view v-if="activeTab === 'videos'" class="tab-content">
					<view class="empty-content">
						<text class="empty-text">视频功能开发中...</text>
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
			// 缩放控制
			zoomIn() {
				this.scale = Math.min(this.scale * 1.2, 3);
			},
			zoomOut() {
				this.scale = Math.max(this.scale / 1.2, 0.5);
			},
			resetZoom() {
				this.scale = 1;
				this.translateX = 0;
				this.translateY = 0;
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
				// 触摸结束，可以在这里添加惯性滑动等效果
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
		max-width: 900rpx;
		max-height: 90vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
		border: 1rpx solid rgba(255, 255, 255, 0.8);
		display: flex;
		flex-direction: column;
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
		flex-shrink: 0;
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
		flex-shrink: 0;
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

	/* 内容区域 */
	.popup-content {
		flex: 1;
		overflow: hidden;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.tab-content {
		height: 100%;
		padding: 24rpx;
	}

	/* 柱状图容器 */
	.column-chart-container {
		height: 100%;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.chart-title {
		text-align: center;
		font-size: 32rpx;
		font-weight: 600;
		color: #1e293b;
		padding: 24rpx;
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-bottom: 1rpx solid #e2e8f0;
	}

	.chart-wrapper {
		flex: 1;
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

	/* 缩放控制 */
	.zoom-controls {
		position: absolute;
		top: 80rpx;
		right: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		z-index: 10;
	}

	.zoom-btn {
		width: 60rpx;
		height: 60rpx;
		background: rgba(255, 255, 255, 0.9);
		border: 1rpx solid #d1d5db;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	.zoom-btn:hover {
		background-color: #f3f4f6;
		transform: scale(1.05);
	}

	.zoom-icon {
		font-size: 32rpx;
		font-weight: bold;
		color: #374151;
	}

	.zoom-text {
		font-size: 20rpx;
		color: #374151;
		font-weight: 500;
	}

	/* 空内容 */
	.empty-content {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12rpx;
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
</style>