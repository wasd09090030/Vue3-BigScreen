<template>
  <div class="flight-lines-chart">
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
  name: 'FlightLinesChart',
  setup() {
    const chartOption = reactive({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      title: {
        text: '数据传输网络',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },      geo: {
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.2,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: 'rgba(20, 20, 40, 0.6)',
            borderColor: 'rgba(78, 121, 167, 0.5)',
            borderWidth: 1
          },
          emphasis: {
            areaColor: 'rgba(30, 30, 60, 0.8)'
          }
        }
      },
      series: [
        {
          name: '数据传输',
          type: 'lines',
          coordinateSystem: 'geo',
          data: [],
          effect: {
            show: true,
            period: 4,
            trailLength: 0.02,
            symbol: 'arrow',
            symbolSize: 8,
            color: '#4facfe'
          },
          lineStyle: {
            normal: {
              color: '#4facfe',
              width: 2,
              opacity: 0.8,
              curveness: 0.3
            }
          }
        },
        {
          name: '城市节点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [],
          symbolSize: function (val) {
            return Math.max(val[2] / 100, 8)
          },
          showEffectOn: 'emphasis',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: '#fff',
              fontSize: 12
            }
          },
          itemStyle: {
            normal: {
              color: '#00f2fe',
              shadowBlur: 10,
              shadowColor: '#00f2fe'
            }
          }
        }
      ]
    })

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/flight-lines')
        if (response.data.code === 200) {
          const data = response.data.data
          
          // 设置飞线数据
          chartOption.series[0].data = data.lines.map(line => ({
            coords: [line.fromCoord, line.toCoord],
            value: line.value
          }))
          
          // 设置城市节点数据
          chartOption.series[1].data = data.cities.map(city => ({
            name: city.name,
            value: [...city.coord, 500]
          }))
        }
      } catch (error) {
        console.error('获取飞线图数据失败:', error)
      }
    }    onMounted(() => {
      fetchData()
    })

    return {
      chartOption
    }
  }
}
</script>

<style scoped>
.flight-lines-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(30, 30, 60, 0.8), rgba(20, 20, 40, 0.9));
  border-radius: 10px;
  border: 1px solid rgba(78, 121, 167, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>
