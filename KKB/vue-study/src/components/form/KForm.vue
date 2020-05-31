<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";

export default {
  name: "KForm",
  componentName: "KForm",
  mixins: [emitter],
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },

  created() {
    this.fields = []
    this.$on("kForm.addField", field => {
      this.fields.push(field);
    });
    
    this.$on("kForm.removeField", field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    })
  },

  methods: {
    validate(cb) {
      // 全局校验：
      // 获取掉所有Formitem
      // 获得[Promise,...]
      const tasks = this.fields.map(item => item.validate());

      // 执行他们的校验方法，如果大家的Promise全部都resolve，校验通过
      // 如果其中有reject，catch()中可以处理错误提示信息
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>