<template>
  <div>
    <!-- 自定义组件双向绑定：@input,:value -->
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
  import emitter from '@/mixins/emitter'

  export default {
    inheritAttrs: false,
    mixins: [emitter],
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)

        // 数据变化，需要执行校验
        // this.$parent.$emit('validate')
        this.dispatch('KFormItem', 'validate')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>