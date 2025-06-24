<template>
  <AnimatedBackground>
    <div id="app" class="dashboard">
      <div class="dashboard-header">
        <h1>服务器监控数据大屏</h1>
        <div class="header-stats">
          <DigitalFlop title="在线用户" :number="onlineUsers" unit="人" />
          <DigitalFlop title="今日访问" :number="todayVisits" unit="次" />
          <DigitalFlop title="系统运行" :number="systemRunTime" unit="天" />
        </div>
        <div class="current-time">{{ currentTime }}</div>
      </div>
      
      <div class="dashboard-content">
        <!-- 第一行 -->
        <div class="row row-1">
          <DataBorder border-type="border-1" class="chart-container system-usage">
            <SystemUsageChart />
          </DataBorder>
        </div>
        
        <!-- 第二行 -->
        <div class="row row-2">
          <DataBorder border-type="border-2" class="chart-container temperature">
            <TemperatureGauge />
          </DataBorder>
          <DataBorder border-type="border-1" class="chart-container network">
            <NetworkChart />
          </DataBorder>
          <DataBorder border-type="border-3" class="chart-container monthly-sales">
            <MonthlySalesChart />
          </DataBorder>
        </div>
        
        <!-- 第三行 -->
        <div class="row row-3">
          <DataBorder border-type="border-1" class="chart-container province-users">
            <ProvinceUsersChart />
          </DataBorder>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import SystemUsageChart from './components/SystemUsageChart.vue'
import TemperatureGauge from './components/TemperatureGauge.vue'
import MonthlySalesChart from './components/MonthlySalesChart.vue'
import NetworkChart from './components/NetworkChart.vue'
import ProvinceUsersChart from './components/ProvinceUsersChart.vue'
import DataBorder from './components/DataBorder.vue'
import DigitalFlop from './components/DigitalFlop.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import './mock/index.js'

export default {
  name: 'App',
  components: {
    SystemUsageChart,
    TemperatureGauge,
    MonthlySalesChart,
    NetworkChart,
    ProvinceUsersChart,
    DataBorder,
    DigitalFlop,
    AnimatedBackground
  },
  setup() {
    const currentTime = ref('')
    const onlineUsers = ref(1247)
    const todayVisits = ref(8932)
    const systemRunTime = ref(127)
    let timer = null

    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    const updateStats = () => {
      // 模拟数据变化
      onlineUsers.value += Math.floor(Math.random() * 20 - 10)
      todayVisits.value += Math.floor(Math.random() * 50)
      if (onlineUsers.value < 1000) onlineUsers.value = 1000
    }

    onMounted(() => {
      updateTime()
      timer = setInterval(() => {
        updateTime()
        if (Math.random() < 0.3) { // 30% 概率更新统计数据
          updateStats()
        }
      }, 1000)
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      currentTime,
      onlineUsers,
      todayVisits,
      systemRunTime
    }
  }
}
</script>

<style scoped>
.dashboard {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Microsoft YaHei', sans-serif;
  position: relative;
}

.dashboard-header {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid rgba(78, 121, 167, 0.3);
  backdrop-filter: blur(10px);
}

.dashboard-header h1 {
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0 20px rgba(79, 172, 254, 0.8);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 20px rgba(79, 172, 254, 0.8);
  }
  100% {
    text-shadow: 0 0 30px rgba(79, 172, 254, 1), 0 0 40px rgba(79, 172, 254, 0.8);
  }
}

.header-stats {
  display: flex;
  gap: 18px;
  transform: scale(0.6);
}

.current-time {
  color: #4facfe;
  font-size: 20px;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(79, 172, 254, 0.6);
}

.dashboard-content {
  height: calc(100vh - 100px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  gap: 20px;
}

.row-1 {
  height: 35%;
}

.row-2 {
  height: 40%;
}

.row-3 {
  height: 25%;
}

.chart-container {
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  padding: 0 !important;
}

.system-usage {
  flex: 1;
}

.temperature {
  flex: 0 0 300px;
}

.network {
  flex: 1;
}

.monthly-sales {
  flex: 0 0 350px;
}

.province-users {
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .dashboard-header h1 {
    font-size: 28px;
  }
  
  .header-stats {
    gap: 20px;
  }
  
  .current-time {
    font-size: 16px;
  }
}
</style>
