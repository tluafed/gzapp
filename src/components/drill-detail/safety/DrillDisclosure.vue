<template>
  <view class="drill-disclosure-container">
    <view class="form-content">
      <!-- 项目信息 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">项目信息</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">项目名称</text>
            <view class="form-value">粤港澳大湾区城际线路广州东至花都天贵工程</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">勘察阶段</text>
            <view class="form-value">初步勘察</view>
          </view>
        </view>
      </view>

      <!-- 钻孔基本信息 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">钻孔基本信息</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">钻孔编号</text>
            <view class="form-value">MRNZ2-A256S</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">设计坐标X</text>
            <view class="form-value">248669.9375</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">设计坐标Y</text>
            <view class="form-value">389717.8516</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">结构层板深度</text>
            <view class="form-value">16.5</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">钻孔类型</text>
            <view class="form-value-tags">
              <view class="tag" :class="{ active: formData.drillType === '非取样' }">非取样</view>
              <view class="tag" :class="{ active: formData.drillType === '控制孔' }">控制孔</view>
              <view class="tag active" :class="{ active: formData.drillType === '一般孔' }">一般孔</view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">孔位管线</text>
            <view class="form-value">无地下管线</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">风险等级</text>
            <view class="form-value">中风险</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">批准人</text>
            <view class="form-value">李工</view>
          </view>
        </view>
      </view>

      <!-- 管线探测 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">管线探测</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">管线探测</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.pipelineDetection.includes('仪器') }">仪器</view>
              <view class="tag active" :class="{ active: formData.pipelineDetection.includes('坑探') }">坑探</view>
              <view class="tag" :class="{ active: formData.pipelineDetection.includes('洞探') }">洞探</view>
              <view class="tag" :class="{ active: formData.pipelineDetection.includes('无需') }">无需</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 围蔽要求 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">围蔽要求</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">围蔽要求</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.enclosure.includes('铁马') }">铁马</view>
              <view class="tag active" :class="{ active: formData.enclosure.includes('警示板') }">警示板</view>
              <view class="tag" :class="{ active: formData.enclosure.includes('条幅') }">条幅</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 交通安全 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">交通安全</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">交通安全</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.trafficSafety.includes('警示带') }">警示带</view>
              <view class="tag active" :class="{ active: formData.trafficSafety.includes('反光桩') }">反光桩</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('反光带') }">反光带</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('防撞桶') }">防撞桶</view>
              <view class="tag active" :class="{ active: formData.trafficSafety.includes('警示灯') }">警示灯</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('爆闪灯') }">爆闪灯</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('导向牌') }">导向牌</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('铁马') }">铁马</view>
              <view class="tag" :class="{ active: formData.trafficSafety.includes('警戒距离') }">警戒距离</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 水上作业 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">水上作业</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">水上作业</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.waterWork.includes('救生衣') }">救生衣</view>
              <view class="tag active" :class="{ active: formData.waterWork.includes('安全绳') }">安全绳</view>
              <view class="tag" :class="{ active: formData.waterWork.includes('其它') }">其它</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 文明措施 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">文明措施</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">文明措施</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.civilizedMeasures.includes('泥浆不许排放下水道') }">泥浆不许排放下水道</view>
              <view class="tag active" :class="{ active: formData.civilizedMeasures.includes('围蔽清洗') }">围蔽清洗</view>
              <view class="tag" :class="{ active: formData.civilizedMeasures.includes('绿化保护') }">绿化保护</view>
              <view class="tag" :class="{ active: formData.civilizedMeasures.includes('其它') }">其它</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 安全措施 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">安全措施</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">安全措施</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.safetyMeasures.includes('安全帽') }">安全帽</view>
              <view class="tag active" :class="{ active: formData.safetyMeasures.includes('不许穿拖鞋或光脚') }">不许穿拖鞋或光脚</view>
              <view class="tag" :class="{ active: formData.safetyMeasures.includes('安全用气、用电') }">安全用气、用电</view>
              <view class="tag" :class="{ active: formData.safetyMeasures.includes('防滑') }">防滑</view>
              <view class="tag" :class="{ active: formData.safetyMeasures.includes('其它') }">其它</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 开孔要求 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">开孔要求</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">开孔要求</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.holeOpening.includes('管线权属单位访问') }">管线权属单位访问</view>
              <view class="tag active" :class="{ active: formData.holeOpening.includes('开挖前完成管线仪探测') }">开挖前完成管线仪探测</view>
              <view class="tag" :class="{ active: formData.holeOpening.includes('定位开挖前发布委量管线的孔位平面图项目组内确认') }">定位开挖前发布委量管线的孔位平面图项目组内确认</view>
              <view class="tag" :class="{ active: formData.holeOpening.includes('0至3米深度挖探期间钻机不允许就位') }">0至3米深度挖探期间钻机不允许就位</view>
              <view class="tag" :class="{ active: formData.holeOpening.includes('挖三尺六') }">挖三尺六</view>
              <view class="tag" :class="{ active: formData.holeOpening.includes('遵城准情况执行钻孔安全分级处置原则') }">遵城准情况执行钻孔安全分级处置原则</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 渣土处理 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">渣土处理</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">渣土处理</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.waste.includes('集中收集后外运') }">集中收集后外运</view>
              <view class="tag" :class="{ active: formData.waste.includes('就地处理') }">就地处理</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 其它要求 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">其它要求</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">其它要求</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.otherRequirements.includes('地面清洗') }">地面清洗</view>
              <view class="tag active" :class="{ active: formData.otherRequirements.includes('孔洞修复') }">孔洞修复</view>
              <view class="tag" :class="{ active: formData.otherRequirements.includes('绿化恢复') }">绿化恢复</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 技术要点 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">技术要点</text>
        </view>
        <view class="form-list">
          <view class="form-item">
            <text class="form-label">预计孔深</text>
            <view class="form-value">16.5米</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">土层孔径</text>
            <view class="form-value">110mm</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">基岩孔径</text>
            <view class="form-value">91mm</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">取样计划_土样</text>
            <view class="form-value">每层取样不少于1个</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">取样计划_岩样</text>
            <view class="form-value">每层取样不少于2个</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">取样计划_水样</text>
            <view class="form-value">地下水位以下取样</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">水位观测</text>
            <view class="form-value">初见水位、稳定水位</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">标贯试验间距</text>
            <view class="form-value">1.5-2.0米/次</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">试验项</text>
            <view class="form-value-tags">
              <view class="tag active" :class="{ active: formData.testItems.includes('动探') }">动探</view>
              <view class="tag active" :class="{ active: formData.testItems.includes('旁压') }">旁压</view>
              <view class="tag active" :class="{ active: formData.testItems.includes('静探') }">静探</view>
              <view class="tag" :class="{ active: formData.testItems.includes('十字板') }">十字板</view>
              <view class="tag" :class="{ active: formData.testItems.includes('波速') }">波速</view>
              <view class="tag" :class="{ active: formData.testItems.includes('电阻率') }">电阻率</view>
              <view class="tag" :class="{ active: formData.testItems.includes('地温') }">地温</view>
              <view class="tag" :class="{ active: formData.testItems.includes('气') }">气</view>
              <view class="tag" :class="{ active: formData.testItems.includes('有害气体') }">有害气体</view>
              <view class="tag" :class="{ active: formData.testItems.includes('水文地质试验') }">水文地质试验</view>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">其它要求</text>
            <view class="form-value">按规范要求执行</view>
          </view>
        </view>
      </view>

      <!-- 参与交底人员签名 -->
      <view class="info-section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">参与交底人员签名</text>
        </view>
        <view class="form-list">
          <!-- 挖探人1 -->
          <view class="form-item">
            <text class="form-label">挖探人1姓名</text>
            <view class="form-value">张三</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">挖探人1签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">挖探人1身份证号</text>
            <view class="form-value">3****************1</view>
          </view>
          
          <!-- 挖探人2 -->
          <view class="form-item">
            <text class="form-label">挖探人2姓名</text>
            <view class="form-value">李四</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">挖探人2签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">挖探人2身份证号</text>
            <view class="form-value">4****************2</view>
          </view>
          
          <!-- 机长 -->
          <view class="form-item">
            <text class="form-label">机长姓名</text>
            <view class="form-value">王五</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机长签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机长身份证号</text>
            <view class="form-value">5****************3</view>
          </view>
          
          <!-- 机组工人1 -->
          <view class="form-item">
            <text class="form-label">机组工人1姓名</text>
            <view class="form-value">赵六</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人1签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人1身份证号</text>
            <view class="form-value">5****************3</view>
          </view>
          
          <!-- 机组工人2 -->
          <view class="form-item">
            <text class="form-label">机组工人2姓名</text>
            <view class="form-value">钱七</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人2签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人2身份证号</text>
            <view class="form-value">6****************4</view>
          </view>
          
          <!-- 机组工人3 -->
          <view class="form-item">
            <text class="form-label">机组工人3姓名</text>
            <view class="form-value">孙八</view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人3签名</text>
            <view class="signature-box">
              <image class="signature-image" src="/static/images/signature-placeholder.png" mode="aspectFit"></image>
            </view>
          </view>
          
          <view class="form-item">
            <text class="form-label">机组工人3身份证号</text>
            <view class="form-value">7****************5</view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 安全施工底栏 -->
    <!-- 底部功能栏 -->
    <safety-bottom-bar
      :statusConfig="statusConfig"
      :buttonConfig="buttonConfig"
      :visible="bottomBarVisible"
      @action="handleAction"
    />
  </view>
</template>

<script>
import { SafetyBottomBar } from './common';

export default {
  name: 'DrillDisclosure',
  components: {
    SafetyBottomBar
  },
  data() {
    return {
      drillTypes: ['非取样', '控制孔', '一般孔'],
      pipelineDetectionOptions: ['仪器', '坑探', '洞探', '无需'],
      enclosureOptions: ['铁马', '警示板', '条幅'],
      trafficSafetyOptions: ['警示带', '反光桩', '反光带', '防撞桶', '警示灯', '爆闪灯', '导向牌', '铁马', '警戒距离'],
      waterWorkOptions: ['救生衣', '安全绳', '其它'],
      civilizedMeasuresOptions: ['泥浆不许排放下水道', '围蔽清洗', '绿化保护', '其它'],
      safetyMeasuresOptions: ['安全帽', '不许穿拖鞋或光脚', '安全用气、用电', '防滑', '其它'],
      holeOpeningOptions: ['管线权属单位访问', '开挖前完成管线仪探测', '定位开挖前发布委量管线的孔位平面图项目组内确认', '0至3米深度挖探期间钻机不允许就位', '挖三尺六', '遵城准情况执行钻孔安全分级处置原则'],
      wasteOptions: ['集中收集后外运', '就地处理'],
      otherRequirementsOptions: ['地面清洗', '孔洞修复', '绿化恢复'],
      testItemsOptions: ['动探', '旁压', '静探', '十字板', '波速', '电阻率', '地温', '气', '有害气体', '水文地质试验'],
      formData: {
        drillType: '一般孔',
        pipelineDetection: ['仪器', '坑探'],
        enclosure: ['铁马', '警示板'],
        trafficSafety: ['警示带', '反光桩', '警示灯'],
        waterWork: ['救生衣', '安全绳'],
        civilizedMeasures: ['泥浆不许排放下水道', '围蔽清洗'],
        safetyMeasures: ['安全帽', '不许穿拖鞋或光脚'],
        holeOpening: ['管线权属单位访问', '开挖前完成管线仪探测'],
        waste: ['集中收集后外运'],
        otherRequirements: ['地面清洗', '孔洞修复'],
        testItems: ['动探', '旁压', '静探']
      },
      
      // 当前用户角色和状态（示例：技术员+未提交状态）
      currentUser: {
        role: 'technician', // technician(技术员), reviewer(审核员)
        status: 'unsubmitted' // unsubmitted(未提交), submitted(已提交), reviewed(已审核)
      },
      
      // 提交时间（示例）
      submitTime: '',
      reviewTime: ''
    }
  },
  computed: {
    // 底栏是否可见
    bottomBarVisible() {
      const { role } = this.currentUser;
      // 只有技术员和审核员才显示底栏，其他角色不显示
      return role === 'technician' || role === 'reviewer';
    },
    
    // 状态配置
    statusConfig() {
      const { role, status } = this.currentUser;
      
      if (status === 'unsubmitted') {
        return {
          type: 'unsubmitted',
          text: '未提交'
        };
      } else if (status === 'submitted') {
        return {
          type: 'submitted',
          text: '已提交',
          time: this.submitTime
        };
      } else if (status === 'reviewed') {
        return {
          type: 'reviewed',
          text: '已审核',
          time: this.reviewTime
        };
      }
      
      return {
        type: 'unsubmitted',
        text: '未提交'
      };
    },
    
    // 按钮配置
    buttonConfig() {
      const { role, status } = this.currentUser;
      
      // 状态1：技术员+未提交
      if (role === 'technician' && status === 'unsubmitted') {
        return {
          buttons: [
            { text: '保存', action: 'save' },
            { text: '提交', action: 'submit', primary: true }
          ]
        };
      }
      
      // 状态2：技术员+已提交
      if (role === 'technician' && status === 'submitted') {
        return {
          buttons: [
            { text: '撤回', action: 'withdraw' }
          ]
        };
      }
      
      // 状态3：审核员+未提交
      if (role === 'reviewer' && status === 'unsubmitted') {
        return {
          buttons: []
        };
      }
      
      // 状态4：审核员+已提交
      if (role === 'reviewer' && status === 'submitted') {
        return {
          buttons: [
            { text: '审核不通过', action: 'reject', danger: true },
            { text: '审核通过', action: 'approve', primary: true }
          ]
        };
      }
      
      // 状态5：已审核
      if (status === 'reviewed') {
        return {
          buttons: []
        };
      }
      
      return {
        buttons: []
      };
    }
  },
  methods: {
    // 处理底栏按钮操作
    handleAction(action, reviewOpinion = '') {
      switch (action) {
        case 'save':
          this.handleSave();
          break;
        case 'submit':
          this.handleSubmit();
          break;
        case 'withdraw':
          this.handleWithdraw();
          break;
        case 'reject':
          this.handleReject(reviewOpinion);
          break;
        case 'approve':
          this.handleApprove(reviewOpinion);
          break;
      }
    },
    
    // 保存
    handleSave() {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
    },
    
    // 提交
    handleSubmit() {
      this.currentUser.status = 'submitted';
      this.submitTime = this.getCurrentTime();
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      });
    },
    
    // 撤回
    handleWithdraw() {
      uni.showModal({
        title: '确认撤回',
        content: '确定要撤回此钻孔交底吗？',
        success: (res) => {
          if (res.confirm) {
            this.currentUser.status = 'unsubmitted';
            this.submitTime = '';
            uni.showToast({
              title: '撤回成功',
              icon: 'success'
            });
          }
        }
      });
    },
    
    // 审核不通过
    handleReject(reviewOpinion) {
      console.log('审核不通过，审核意见：', reviewOpinion);
      this.currentUser.status = 'unsubmitted';
      this.submitTime = '';
      uni.showToast({
        title: '审核不通过',
        icon: 'success'
      });
    },
    
    // 审核通过
    handleApprove(reviewOpinion) {
      console.log('审核通过，审核意见：', reviewOpinion);
      this.currentUser.status = 'reviewed';
      this.reviewTime = this.getCurrentTime();
      uni.showToast({
        title: '审核通过',
        icon: 'success'
      });
    },
    
    // 获取当前时间
    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }
}
</script>

<style scoped>
.drill-disclosure-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-content {
  flex: 1;
  padding: 20rpx;
  background-color: #fff;
  overflow-y: auto;
}

.info-section {
  margin-bottom: 24rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  position: relative;
}

.info-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #e8e8e8, transparent);
}

.info-section:last-child {
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.section-indicator {
  width: 8rpx;
  height: 32rpx;
  background-color: #1890ff;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.form-list {
  padding: 0;
}

.form-item {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.form-item:last-child {
  border-bottom: none;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
}

.form-value {
  font-size: 28rpx;
  color: #666;
  background-color: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e8e8e8;
  min-height: 24rpx;
  line-height: 1.4;
}

/* 标签样式 */
.form-value-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 16rpx 0;
}

.tag {
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  border: 1rpx solid #e8e8e8;
}

.tag.active {
  color: #1890ff;
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

/* 签名样式 */
.signature-box {
  width: 100%;
  height: 120rpx;
  background-color: #f8f9fa;
  border: 1rpx solid #e8e8e8;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.signature-image {
  max-width: 80%;
  max-height: 80%;
}
</style>