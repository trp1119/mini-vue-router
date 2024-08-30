export default {
  props: { // 属性校验，和下方取值无关
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
    }
  },
  render () {
    const tag = this.tag || 'a'

    const handler = () => {
      this.$router.push(this.to)
    }

    return <tag onClick={handler}>{this.$slots.default}</tag>
  }
}