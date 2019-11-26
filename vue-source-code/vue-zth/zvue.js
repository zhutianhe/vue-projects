// new ZVue({data: {}})

class ZVue {
  constructor(options) {
    this.$options = options

    this.$data = options.data
    this.observe(this.$data)

    // // 数据模拟
    // new Watcher()
    // this.$data.user.name
    new Compile(options.el, this)


    // 执行created函数
    if (options.created) {
      // call(this)是为了在created使用this或vue实例
      options.created.call(this)
    }
  }

  observe(obj) {
    // 如果不存在或者不是object,则返回
    if (!obj || typeof obj !== 'object') {
      return
    }

    // 如果存在，遍历该对象
    Object.keys(obj).forEach(key => {
      // 进行属性监听
      this.defineReactive(obj, key, obj[key])
      // 代理data中的属性到vue的实例上
      this.proxyData(key)
    })
  }

  // 数据响应化
  defineReactive(obj, key, val) {
    // 递归解决数据嵌套
    this.observe(val)
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        // console.log(`${key}的属性更新为${val}`)
        dep.notify()
      }
    })
  }

  // 数据代理
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// Dep: 用来管理Wactcher
class Dep {
  constructor() {
    // 这是监听依赖的集合，watcher集合
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  // 通知，进行依赖更新
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前watcher实例指定到Dep静态属性target
    Dep.target = this
    // 获取属性，出发getter方法，添加依赖
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    console.log('属性更新了', '属性更新了')
    // 调用watcher的回调函数 
    this.cb.call(this.vm, this.vm[this.key])
  }
}
