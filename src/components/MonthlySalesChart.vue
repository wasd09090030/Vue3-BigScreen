<template>
  <div class="monthly-sales-chart">
    <v-chart 
      :option="chartOption" 
      :style="{ width: '100%', height: '100%' }"
      autoresize
    />
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'MonthlySalesChart',
  setup() {
    const chartOption = reactive({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '月度成交金额',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#4e79a7',
        textStyle: {
          color: '#fff'
        },
        formatter: '{b}: {c}万元'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '20%',
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
        axisLine: {
          lineStyle: {
            color: '#4e79a7'
          }
        },
        axisLabel: {
          color: '#fff',
          formatter: '{value}万'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(78, 121, 167, 0.3)'
          }
        }
      },
      series: [
        {
          name: '成交金额',
          type: 'bar',
          data: [],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#4facfe' },
                { offset: 1, color: '#00f2fe' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#667eea' },
                  { offset: 1, color: '#764ba2' }
                ]
              }
            }
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 12
          }
        }
      ]
    })

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/monthly-sales')
        if (response.data.code === 200) {
          const data = response.data.data
          chartOption.xAxis.data = data.map(item => item.month)
          chartOption.series[0].data = data.map(item => item.amount)
        }
      } catch (error) {
        console.error('获取月度销售数据失败:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      chartOption
    }
  }
}
</script>

<style scoped>
.monthly-sales-chart {
  width: 100%;
  height: 100%;
}
</style>
