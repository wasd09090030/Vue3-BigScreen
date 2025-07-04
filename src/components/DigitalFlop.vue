<template>
  <div class="digital-flop">
    <div class="flop-title">{{ title }}</div>
    <div class="flop-number">
      <span 
        v-for="(digit, index) in displayNumber" 
        :key="index" 
        class="digit"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        {{ digit }}
      </span>
      <span class="unit">{{ unit }}</span>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'DigitalFlop',
  props: {
    title: {
      type: String,
      default: '数据标题'
    },
    number: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    decimals: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const currentNumber = ref(0)
    
    const displayNumber = computed(() => {
      return currentNumber.value.toFixed(props.decimals).split('')
    })
    
    // 数字动画效果
    const animateNumber = (target) => {
      const start = currentNumber.value
      const end = target
      const duration = 2000 // 2秒动画
      const startTime = Date.now()
      
      const update = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        currentNumber.value = start + (end - start) * easeOutQuart
        
        if (progress < 1) {
          requestAnimationFrame(update)
        } else {
          currentNumber.value = end
        }
      }
      
      requestAnimationFrame(update)
    }
    
    watch(() => props.number, (newValue) => {
      animateNumber(newValue)
    }, { immediate: true })
    
    return {
      displayNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-flop {
  text-align: center;
  padding: $gap-large;
  background: linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(20, 20, 40, 0.8));
  border-radius: 10px;
  border: 1px solid $light-blue;
  box-shadow: 0 4px 15px rgba($black, 0.3);

  &:hover {
    .digit {
      transform: rotateY(360deg);
    }
  }
}

.flop-title {
  color: $primary-blue;
  font-size: $font-size-small;
  margin-bottom: 10px;
  font-weight: 500;
}

.flop-number {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 2px;
}

.digit {
  display: inline-block;
  color: $white;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 10px $accent-blue;
  animation: digitGlow 2s $animation-easing infinite alternate;
  transition: transform 0.3s ease;
}

.unit {
  color: $primary-blue;
  font-size: 18px;
  margin-left: 5px;
}

@keyframes digitGlow {
  0% {
    text-shadow: 0 0 10px $accent-blue;
  }
  100% {
    text-shadow: 0 0 20px $primary-blue;
  }
}
</style>
