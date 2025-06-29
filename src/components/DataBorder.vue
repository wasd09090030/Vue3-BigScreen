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

<style lang="scss" scoped>
.data-border {
  position: relative;
  padding: $gap-large;

  .border-content {
    position: relative;
    z-index: $z-index-overlay;
    width: 100%;
    height: 100%;
  }

  // 边框样式1 - 科技蓝
  &.border-1 {
    background: linear-gradient(135deg, rgba(30, 30, 60, 0.8), rgba(20, 20, 40, 0.9));
    border: 2px solid;
    border-image: linear-gradient(45deg, $primary-blue, $secondary-blue, $primary-blue) 1;
    border-radius: 10px;
    box-shadow: 
      0 0 20px rgba($primary-blue, 0.3),
      inset 0 0 20px rgba($primary-blue, 0.1);

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, $primary-blue, $secondary-blue, $primary-blue, $secondary-blue);
      border-radius: 10px;
      z-index: -1;
      animation: borderFlow $animation-duration linear infinite;
    }

    &:hover {
      animation: breathe 2s $animation-easing infinite;
    }
  }

  // 边框样式2 - 霓虹紫
  &.border-2 {
    background: linear-gradient(135deg, rgba(60, 30, 60, 0.8), rgba(40, 20, 40, 0.9));
    border: 2px solid;
    border-image: linear-gradient(45deg, $primary-red, $primary-green, $primary-red) 1;
    border-radius: 10px;
    box-shadow: 
      0 0 20px rgba($primary-red, 0.3),
      inset 0 0 20px rgba($primary-red, 0.1);
  }

  // 边框样式3 - 绿色科技
  &.border-3 {
    background: linear-gradient(135deg, rgba(30, 60, 30, 0.8), rgba(20, 40, 20, 0.9));
    border: 2px solid;
    border-image: linear-gradient(45deg, $secondary-blue, $primary-blue, $secondary-blue) 1;
    border-radius: 10px;
    box-shadow: 
      0 0 20px rgba($secondary-blue, 0.3),
      inset 0 0 20px rgba($secondary-blue, 0.1);
  }
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

@keyframes breathe {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba($primary-blue, 0.3),
      inset 0 0 20px rgba($primary-blue, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba($primary-blue, 0.6),
      inset 0 0 30px rgba($primary-blue, 0.2);
  }
}
</style>
