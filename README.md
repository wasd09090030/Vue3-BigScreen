# 服务器监控数据大屏

一个基于 Vue 3 + ECharts + Element Plus 的服务器监控数据可视化大屏项目。

## 功能特性

- 🖥️ **系统资源监控**: 实时显示CPU、GPU、内存使用率的动态渐变折线图
- 🌡️ **温度监控**: 仪表盘实时显示机房温度
- 📊 **销售数据**: 柱状图展示月度成交金额
- 🌐 **网络传输**: 动态网络节点图展示数据传输状态
- 📈 **用户统计**: 动态排序柱状图展示各省份用户数量变化

## 技术栈

- **Vue 3** - 使用 Composition API
- **Vite** - 快速构建工具
- **ECharts** - 数据可视化图表库
- **Element Plus** - UI 组件库
- **Mock.js** - 模拟数据
- **Axios** - HTTP 请求库

## 安装和运行

```bash
npm install
npm run dev
```

## 部署

### 自动部署 (GitHub Actions)

#### GitHub Pages 部署 (`deploy.yml`)
- 自动部署到 GitHub Pages
- 地址： https://wasd09090030.github.io/Vue3-BigScreen/


## 项目结构

```
src/
├── components/          # 图表组件
│   ├── SystemUsageChart.vue      # 系统使用率折线图
│   ├── TemperatureGauge.vue      # 温度仪表盘
│   ├── MonthlySalesChart.vue     # 月度销售柱状图
│   ├── NetworkChart.vue          # 网络传输图
│   ├── ProvinceUsersChart.vue    # 省份用户排序图
│   ├── DataBorder.vue            # 科技边框组件
│   ├── DigitalFlop.vue           # 数字翻牌器
│   └── AnimatedBackground.vue    # 动态背景
├── mock/               # Mock 数据
│   └── index.js
├── App.vue            # 主应用组件
├── main.js           # 应用入口
└── style.css         # 全局样式
```
