# GZZK - 广州地铁勘察项目

基于 uni-app 框架开发的地铁勘察管理系统，包含GIS地图展示和钻孔详情管理等功能模块。

## 项目概述

本项目是一个地铁工程勘察数据管理系统，主要用于：
- 地铁线路和工点的GIS地图可视化
- 钻孔勘察数据的录入和管理
- 工程进度和设备统计分析
- 安全作业和质量检查记录

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── gis/             # GIS地图模块组件
│   ├── drill-detail/    # 钻孔详情模块组件
│   └── sub-popup/       # 通用弹窗组件
├── pages/               # 页面目录
│   ├── index/           # 首页
│   ├── gis-map/         # GIS地图页面
│   └── drill-detail/    # 钻孔详情页面
├── static/              # 静态资源
└── main.js              # 应用入口文件
```

## GIS模块架构

### 核心页面
- **`pages/gis-map/gis-map.vue`** - GIS地图主页面，整合所有GIS组件

### 核心组件

#### 地图相关组件
- **`components/gis/MapControls.vue`** - 地图控制器
  - 图层控制面板（线路图例、工点图例、钻孔图例）
  - 地图操作按钮（复位、定位）
  - 图层显示/隐藏切换

#### 信息展示组件
- **`components/gis/WorkSiteInfo.vue`** - 工点信息弹窗
  - 显示工点基本信息、进度统计
  - 展示建设单位、勘察单位等相关方信息
  
- **`components/gis/DrillHoleInfo.vue`** - 钻孔信息弹窗
  - 显示钻孔详细参数（深度、高程、水位等）
  - 提供钻孔编辑和管理功能

#### 统计分析组件
- **`components/gis/StatisticsPanel.vue`** - 统计面板（核心组件）
  - **双模式支持**：线路级统计 / 工点级统计
  - **可拖拽界面**：支持高度调节
  - **TAB页导航**：
    - 线路信息 / 工点信息
    - 勘察概览
    - 现场设备
  
- **`components/gis/InfoCard.vue`** - 信息卡片
  - 显示线路/工点的进度条
  - 钻孔(个)和进尺(米)统计表格
  - 本周/本月/本年/累计数据展示

- **`components/gis/SurveyOverview.vue`** - 勘察概览
  - 四类统计卡片：勘察线路数量、标段数量、勘察工点数量、施工中工点数量
  - 累计完成工作量表格
  - 钻孔分类统计（布置/完成/未施工/施工中）

- **`components/gis/FieldEquipment.vue`** - 现场设备
  - 机台数量统计表格
  - 近7天工作量双柱状图（完成钻孔 vs 投入机台）
  - 支持线路级和工点级数据切换

### 组件导出
- **`components/gis/index.js`** - 统一导出GIS模块所有组件

## 钻孔详情模块

### 页面结构
- **`pages/drill-detail/drill-detail.vue`** - 钻孔详情主页面

### 功能模块

#### 影像管理 (`components/drill-detail/imaging/`)
- **`Ground.vue`** - 地面影像管理
- **`Overall.vue`** - 整体影像管理  
- **`SingleBox.vue`** - 单个岩芯盒影像

#### 记录管理 (`components/drill-detail/recording/`)
- **`Stratum.vue`** / **`StratumNew.vue`** - 地层记录
- **`WaterLevel.vue`** - 水位记录
- **`Sampling.vue`** - 取样记录
- **`InSituTest.vue`** - 原位测试
- **`DynamicProbe.vue`** - 动力触探
- **`StandardPenetration.vue`** - 标准贯入试验

#### 安全管理 (`components/drill-detail/safety/`)
- **`DrillDisclosure.vue`** - 钻孔开孔
- **`HolePositioning.vue`** - 孔位定位
- **`QualityCheck.vue`** - 质量检查
- **`SafetyCheck.vue`** - 安全检查
- **`SealRecord.vue`** - 封孔记录
- **`DrillingWork.vue`** - 钻探作业
- **`StrikeWork.vue`** - 冲击作业
- **`ProtectionWork.vue`** - 防护作业
- **`ExcavationWork.vue`** - 开挖作业
- **`PipelineDetection.vue`** - 管线探测

#### 弹窗组件 (`components/drill-detail/popups/`)
- **`VideoMonitor.vue`** - 视频监控
- **`SealCheck.vue`** - 封孔检查
- **`StartCheck.vue`** - 开工检查
- **`SingleCheck.vue`** - 单项检查
- **`ColumnChart.vue`** - 柱状图
- **`DrillOverview.vue`** - 钻孔概览

#### 报告管理 (`components/drill-detail/report/`)
- **`ShiftReport.vue`** - 班报管理

## 技术栈

- **框架**: uni-app (Vue 2.x)
- **UI**: 原生 uni-app 组件
- **图标**: iconfont 字体图标
- **样式**: SCSS/CSS3
- **数据**: 本地模拟数据

## 主要特性

### GIS地图功能
- 🗺️ 地铁线路可视化展示
- 📍 工点和钻孔位置标注
- 📊 实时统计数据展示
- 🎛️ 图层控制和地图操作
- 📱 移动端适配

### 数据统计功能
- 📈 双柱状图数据可视化
- 📋 多维度数据表格
- 🔄 线路/工点级别切换
- 📊 进度条和完成率展示

### 交互体验
- 🎯 可拖拽统计面板
- 🔄 TAB页导航切换
- 📱 触摸友好的移动端操作
- 🎨 现代化UI设计

## 项目设置

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run serve          # H5开发
npm run dev:mp-weixin  # 微信小程序开发
npm run dev:app-plus   # App开发
```

### 生产环境构建
```bash
npm run build:h5          # H5构建
npm run build:mp-weixin   # 微信小程序构建
npm run build:app-plus    # App构建
```

## 开发说明

1. **组件设计原则**: 采用模块化设计，每个功能模块独立开发和维护
2. **数据流管理**: 使用Props/Events进行父子组件通信
3. **样式规范**: 使用rpx响应式单位，支持多端适配
4. **代码结构**: 按功能模块划分目录，便于维护和扩展

## 配置参考
更多配置信息请参考 [uni-app官方文档](https://uniapp.dcloud.io/)