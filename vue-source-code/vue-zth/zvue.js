// new ZVue({data: {}})

class ZVue {
  constructor(options) {
    this.$options = options

    this.$data = options.data
    this.observe(this.$data)

    // 数据模拟
    new Watcher()
    this.$data.user.name
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
    })
  }

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
  constructor() {
    // 将当前watcher实例指定到Dep静态属性target
    Dep.target = this
  }

  update() {
    console.log('属性更新了', '属性更新了')
  }
}
