<template>
  <div class="system-usage-chart">
    <v-chart 
      :option="chartOption" 
      :style="{ width: '100%', height: '100%' }"
      autoresize
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  name: 'SystemUsageChart',
  setup() {
    const chartOption = reactive({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '系统资源使用率',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      legend: {
        data: ['CPU', 'GPU', '内存'],
        top: '10%',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#4e79a7',
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '25%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: '#4e79a7'
          }
        },
        axisLabel: {
          color: '#fff'
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLine: {
          lineStyle: {
            color: '#4e79a7'
          }
        },
        axisLabel: {
          color: '#fff',
          formatter: '{value}%'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(78, 121, 167, 0.3)'
          }
        }
      },
      series: [
        {
          name: 'CPU',
          type: 'line',
          smooth: true,
          data: [],
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#ff6b6b' },
                { offset: 1, color: '#ff8e8e' }
              ]
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 107, 107, 0.4)' },
                { offset: 1, color: 'rgba(255, 107, 107, 0.1)' }
              ]
            }
          }
        },
        {
          name: 'GPU',
          type: 'line',
          smooth: true,
          data: [],
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#4ecdc4' },
                { offset: 1, color: '#44a08d' }
              ]
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(78, 205, 196, 0.4)' },
                { offset: 1, color: 'rgba(78, 205, 196, 0.1)' }
              ]
            }
          }
        },
        {
          name: '内存',
          type: 'line',
          smooth: true,
          data: [],
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#45b7d1' },
                { offset: 1, color: '#96c93d' }
              ]
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(69, 183, 209, 0.4)' },
                { offset: 1, color: 'rgba(69, 183, 209, 0.1)' }
              ]
            }
          }
        }
      ]
    })

    let timer = null

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/system-usage')
        if (response.data.code === 200) {
          const data = response.data.data
          chartOption.xAxis.data = data.map(item => item.time)
          chartOption.series[0].data = data.map(item => item.cpu)
          chartOption.series[1].data = data.map(item => item.gpu)
          chartOption.series[2].data = data.map(item => item.memory)
        }
      } catch (error) {
        console.error('获取系统使用率数据失败:', error)
      }
    }

    onMounted(() => {
      fetchData()
      timer = setInterval(fetchData, 5000) // 每5秒更新一次
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

<style scoped>
.system-usage-chart {
  width: 100%;
  height: 100%;
}
</style>
