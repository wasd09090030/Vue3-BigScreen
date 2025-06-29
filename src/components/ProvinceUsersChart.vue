<template>
  <div class="province-users-chart">
    <v-chart 
      :option="chartOption" 
      :style="{ width: '100%', height: '100%' }"
      autoresize
    />
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ProvinceUsersChart',
  setup() {
    const chartOption = reactive({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '各省份用户数量',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#4e79a7',
        textStyle: {
          color: '#fff'
        },
        formatter: '{b}: {c}人'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#4e79a7'
          }
        },
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(78, 121, 167, 0.3)'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: '#4e79a7'
          }
        },
        axisLabel: {
          color: '#fff'
        },
        inverse: true,
        animationDuration: 1000,
        animationDurationUpdate: 1000
      },
      series: [
        {
          name: '用户数量',
          type: 'bar',
          data: [],
          itemStyle: {
            color: function(params) {
              const colors = [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#f7ca18',
                '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8',
                '#fdcb6e', '#e17055', '#00b894', '#00cec9', '#0984e3',
                '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e', '#55a3ff'
              ]
              return colors[params.dataIndex % colors.length]
            },
            borderRadius: [0, 4, 4, 0]
          },
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: 12,
            formatter: '{c}'
          },
          animationDuration: 1000,
          animationDurationUpdate: 1000
        }
      ],
      animationDuration: 1000,
      animationDurationUpdate: 1000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    })

    let timer = null
    let currentData = []

    const updateChart = () => {
      // 随机改变数据
      currentData = currentData.map(item => ({
        ...item,
        value: Math.max(100, item.value + Math.floor(Math.random() * 400 - 200))
      }))

      // 排序数据
      currentData.sort((a, b) => b.value - a.value)
      const top10 = currentData.slice(0, 10)

      chartOption.yAxis.data = top10.map(item => item.name)
      chartOption.series[0].data = top10.map(item => item.value)
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/province-users')
        if (response.data.code === 200) {
          currentData = response.data.data
          updateChart()
        }
      } catch (error) {
        console.error('获取省份用户数据失败:', error)
      }
    }

    onMounted(() => {
      fetchData()
      timer = setInterval(updateChart, 3000) // 每3秒更新一次排序
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      chartOption
    }
  }
}
</script>

<style lang="scss" scoped>
.province-users-chart {
  width: 100%;
  height: 100%;
}
</style>
