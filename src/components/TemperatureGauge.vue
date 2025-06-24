<template>
  <div class="temperature-gauge">
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
  name: 'TemperatureGauge',
  setup() {
    const chartOption = reactive({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '机房温度监控',
        left: 'center',
        top: '10%',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      series: [
        {
          name: '温度',
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '80%',
          min: 0,
          max: 50,
          splitNumber: 10,
          data: [{ value: 25, name: '当前温度' }],
          pointer: {
            itemStyle: {
              color: '#ff6b6b'
            }
          },
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },          axisLabel: {
            show: false
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}°C',
            color: '#fff',
            fontSize: 20,
            offsetCenter: [0, '40%']
          }
        }
      ]
    })

    let timer = null

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/temperature')
        if (response.data.code === 200) {
          const data = response.data.data
          chartOption.series[0].data[0].value = data.current
        }
      } catch (error) {
        console.error('获取温度数据失败:', error)
      }
    }

    onMounted(() => {
      fetchData()
      timer = setInterval(fetchData, 3000) // 每3秒更新一次
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
.temperature-gauge {
  width: 100%;
  height: 100%;
}
</style>
