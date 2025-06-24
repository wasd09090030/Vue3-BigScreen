import Mock from 'mockjs'

// 模拟CPU、GPU、内存使用率数据
Mock.mock('/api/system-usage', 'get', () => {
  const now = new Date()
  const data = []
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000)
    data.push({
      time: time.toLocaleTimeString(),
      cpu: Mock.Random.integer(20, 85),
      gpu: Mock.Random.integer(15, 90),
      memory: Mock.Random.integer(30, 75)
    })
  }
  return {
    code: 200,
    data: data
  }
})

// 模拟温度数据
Mock.mock('/api/temperature', 'get', () => {
  return {
    code: 200,
    data: {
      current: Mock.Random.integer(18, 35),
      min: 18,
      max: 40
    }
  }
})

// 模拟月度成交金额数据
Mock.mock('/api/monthly-sales', 'get', () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const data = months.map(month => ({
    month,
    amount: Mock.Random.integer(1000, 5000)
  }))
  return {
    code: 200,
    data: data
  }
})

// 模拟飞线图数据
Mock.mock('/api/flight-lines', 'get', () => {
  const cities = [
    { name: '北京', coord: [116.4074, 39.9042] },
    { name: '上海', coord: [121.4737, 31.2304] },
    { name: '广州', coord: [113.2644, 23.1291] },
    { name: '深圳', coord: [114.0579, 22.5431] },
    { name: '杭州', coord: [120.1551, 30.2741] },
    { name: '成都', coord: [104.0668, 30.5728] },
    { name: '重庆', coord: [106.5478, 29.5647] },
    { name: '西安', coord: [108.9398, 34.3416] }
  ]
  
  const lines = []
  for (let i = 0; i < 20; i++) {
    const from = cities[Mock.Random.integer(0, cities.length - 1)]
    const to = cities[Mock.Random.integer(0, cities.length - 1)]
    if (from !== to) {
      lines.push({
        from: from.name,
        to: to.name,
        fromCoord: from.coord,
        toCoord: to.coord,
        value: Mock.Random.integer(100, 1000)
      })
    }
  }
  
  return {
    code: 200,
    data: {
      cities: cities,
      lines: lines
    }
  }
})

// 模拟省份用户数量数据
Mock.mock('/api/province-users', 'get', () => {
  const provinces = [
    '广东', '江苏', '山东', '浙江', '河南', '四川', '湖北', '福建', '湖南', '安徽',
    '北京', '河北', '陕西', '山西', '辽宁', '上海', '江西', '重庆', '广西', '云南'
  ]
  
  const data = provinces.map(province => ({
    name: province,
    value: Mock.Random.integer(1000, 8000)
  }))
  
  return {
    code: 200,
    data: data
  }
})

export default Mock
