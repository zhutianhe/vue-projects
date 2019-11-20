// 用法 new Compile(el, vm)

class Compile {
  constructor(el, vm) {
    // 根据传入的选择器获取到需要挂载的根节点
    this.$el = document.querySelector(el)
    this.$vm = vm

    if (this.$el) {
      // 转换内部内容为片段fragment
      this.$fragment = this.node2Fragment(this.$el)

      // 执行编译
      this.compile(this.$fragment)

      // 将编译完的html结果追加至$el
      this.$el.appendChild(this.$fragment)
    }
  }
}
