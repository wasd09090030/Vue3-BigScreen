<template>
  <div class="network-chart">
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
  name: 'NetworkChart',
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
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#4e79a7',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '网络节点',
          type: 'graph',
          layout: 'force',
          data: [],
          links: [],
          categories: [
            { name: '主节点', itemStyle: { color: '#ff6b6b' } },
            { name: '分支节点', itemStyle: { color: '#4facfe' } }
          ],
          roam: false,
          force: {
            repulsion: 200,
            gravity: 0.1,
            edgeLength: [10, 50]
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10
            }
          },
          lineStyle: {
            color: 'source',
            curveness: 0.1,
            width: 2
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          },          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut'
        }
      ]
    })

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/flight-lines')
        if (response.data.code === 200) {
          const data = response.data.data
          
          // 创建更多节点数据 - 增加到20个节点
          const allCities = [
            ...data.cities,
            { name: '天津', coord: [117.2008, 39.0842] },
            { name: '南京', coord: [118.7969, 32.0603] },
            { name: '武汉', coord: [114.2985, 30.5844] },
            { name: '长沙', coord: [112.9388, 28.2282] },
            { name: '郑州', coord: [113.6254, 34.7466] },
            { name: '济南', coord: [117.1209, 36.6514] },

          ]
          
          const nodes = allCities.map((city, index) => ({
            id: city.name,
            name: city.name,
            category: index < 3 ? 0 : 1, // 前3个为主节点
            value: Math.random() * 100 + 50,
            symbolSize: index < 3 ? Math.random() * 15 + 15 : Math.random() * 12 + 8
          }))
          
          // 创建更多连接数据 - 增加连接密度
          const links = []
          for (let i = 0; i < 35; i++) {
            const source = allCities[Math.floor(Math.random() * allCities.length)]
            const target = allCities[Math.floor(Math.random() * allCities.length)]
            if (source !== target) {
              links.push({
                source: source.name,
                target: target.name,
                value: Math.random() * 100 + 20
              })
            }
          }
          
          chartOption.series[0].data = nodes
          chartOption.series[0].links = links
        }
      } catch (error) {
        console.error('获取网络数据失败:', error)
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

<style lang="scss" scoped>
.network-chart {
  width: 100%;
  height: 100%;
}
</style>
