function Installer () {
  // 自身初始化行为
}

Installer.install = function (Vue) {
  // 接收vue的构造函数，给原型挂载属性或注册全局组件或者过滤器
  console.log('这是组件！')
  // 1.注册全局组件
  Vue.component('test', {
    template: '<h1>哈哈</h1>'
  })

  // 2.挂载属性
  Vue.prototype.$log = function () {
    console.log('hhhhhh')
  }
  this.$log = 'lsllslls' // 子类对象可以修改父类的属性
  let log = function () {
    console.log('自定义插件的函数')
  }

  // 给原型定义属性的获取和设置
  Object.defineProperty(Vue.prototype, '$log', {
    set: function (newV) {
      console.log('lll')
    },
    get: function () {
      return log
    }
  })
}

export default Installer
