<template>
  <div class="data-border" :class="borderType">
    <div class="border-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataBorder',
  props: {
    borderType: {
      type: String,
      default: 'border-1'
    }
  }
}
</script>

<style scoped>
.data-border {
  position: relative;
  padding: 20px;
}

.border-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

/* 边框样式1 - 科技蓝 */
.border-1 {
  background: linear-gradient(135deg, rgba(30, 30, 60, 0.8), rgba(20, 20, 40, 0.9));
  border: 2px solid;
  border-image: linear-gradient(45deg, #4facfe, #00f2fe, #4facfe) 1;
  border-radius: 10px;
  box-shadow: 
    0 0 20px rgba(79, 172, 254, 0.3),
    inset 0 0 20px rgba(79, 172, 254, 0.1);
}

.border-1::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #4facfe, #00f2fe, #4facfe, #00f2fe);
  border-radius: 10px;
  z-index: -1;
  animation: borderFlow 3s linear infinite;
}

/* 边框样式2 - 霓虹紫 */
.border-2 {
  background: linear-gradient(135deg, rgba(60, 30, 60, 0.8), rgba(40, 20, 40, 0.9));
  border: 2px solid;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ff6b6b) 1;
  border-radius: 10px;
  box-shadow: 
    0 0 20px rgba(255, 107, 107, 0.3),
    inset 0 0 20px rgba(255, 107, 107, 0.1);
}

/* 边框样式3 - 绿色科技 */
.border-3 {
  background: linear-gradient(135deg, rgba(30, 60, 30, 0.8), rgba(20, 40, 20, 0.9));
  border: 2px solid;
  border-image: linear-gradient(45deg, #00f2fe, #4facfe, #00f2fe) 1;
  border-radius: 10px;
  box-shadow: 
    0 0 20px rgba(0, 242, 254, 0.3),
    inset 0 0 20px rgba(0, 242, 254, 0.1);
}

@keyframes borderFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 添加呼吸效果 */
.data-border:hover {
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(79, 172, 254, 0.3),
      inset 0 0 20px rgba(79, 172, 254, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(79, 172, 254, 0.6),
      inset 0 0 30px rgba(79, 172, 254, 0.2);
  }
}
</style>
