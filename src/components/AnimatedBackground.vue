<template>
  <div class="animated-background">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="clouds"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBackground'
}
</script>

<style lang="scss" scoped>
.animated-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e);
  overflow: hidden;

  // 鼠标粒子效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      rgba($primary-blue, 0.1) 0%, 
      transparent 50%
    );
    pointer-events: none;
    transition: all 0.3s ease;
  }
}

// 星空背景基础样式
.stars, 
.twinkling, 
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.stars {
  background: $black url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><circle id="star" cx="2" cy="2" r="1" fill="white"/></defs><use href="%23star" x="10" y="20"/><use href="%23star" x="50" y="80"/><use href="%23star" x="90" y="30"/><use href="%23star" x="130" y="120"/><use href="%23star" x="170" y="60"/><use href="%23star" x="30" y="150"/><use href="%23star" x="70" y="170"/><use href="%23star" x="110" y="90"/><use href="%23star" x="150" y="40"/><use href="%23star" x="190" y="140"/></svg>') repeat;
  animation: move-twink-back 200s linear infinite;
}

.twinkling {
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><circle id="twinkle" cx="2" cy="2" r="1" fill="white" opacity="0.8"/></defs><use href="%23twinkle" x="25" y="45"/><use href="%23twinkle" x="75" y="15"/><use href="%23twinkle" x="125" y="95"/><use href="%23twinkle" x="175" y="155"/><use href="%23twinkle" x="15" y="125"/><use href="%23twinkle" x="65" y="185"/><use href="%23twinkle" x="115" y="55"/><use href="%23twinkle" x="165" y="85"/></svg>') repeat;
  animation: move-twink-back 100s linear infinite;
  opacity: 0.3;
}

// 移动的云朵效果
.clouds {
  background: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -100px;
    width: 100px;
    height: 40px;
    background: rgba($white, 0.1);
    border-radius: 50px;
    animation: float-clouds 30s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: -150px;
    width: 150px;
    height: 60px;
    background: rgba($primary-blue, 0.1);
    border-radius: 75px;
    animation: float-clouds-reverse 45s linear infinite;
  }
}

// 动画定义
@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

@keyframes float-clouds {
  0% {
    left: -100px;
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes float-clouds-reverse {
  0% {
    right: -150px;
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
  100% {
    right: 100%;
    opacity: 0;
  }
}
</style>
