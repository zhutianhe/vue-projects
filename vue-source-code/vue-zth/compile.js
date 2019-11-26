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

  // 将宿主元素中的代码片段拿出来遍历，比较高效
  node2Fragment (el) {
    const frag = document.createDocumentFragment();
    // el中的元素搬家至frag
    let child
    while (child = el.firstChild) {
      frag.appendChild(child)
    }
    return frag
  }
  
  // 编译过程
  // 编译过程是怎么样的？
  // 1.vue写的模板语句HTML不识别
  // 2.通过编译的过程可以进行依赖收集
  // 3.将data中的数据模型和视图产生绑定关系 
  // 4.以后数据模型变化时，会根据依赖进行更新操作，模型驱动视图
  compile(el) {
    // 元素和文本区别对待
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 类型判断
      if (this.isElement(node)) {
        console.log('编译元素')
        // 获取元素的属性, 查找z-  @  :
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name
          const exp = attr.value
          // 指令处理
          if (this.isDirective(attrName)) {
            const dir = attrName.substring(2)
            this[dir] && this[dir](node, this.$vm, exp)
          }
          // 事件处理
          if (this.isEvent(attrName)) {
            const dir = attrName.substring(1)
            this.eventHandler(node, this.$vm, exp, dir)
          }
        })
      } else if(this.isInterpolation(node)) {
        console.log('编译文本')
        this.compileText(node)
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }

    })
  }

  // 编译文本
  compileText(node) {
    // console.log(RegExp.$1)
    // node.textContent = this.$vm.$data[RegExp.$1]
    this.update(node, this.$vm, RegExp.$1, 'text')
  }

  // 编译元素属性z-text
  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  // 双向绑定
  // 双向绑定的原理
  // 1.使用v-model指令放在input的输入元素上
  // 2.在编译时，会将v-model指定的属性挂载在vue实例上，
  // 3.并给输入元素添加一个oninput的监听事件
  // 4.通过input改变属性时，会把变化的值传给Vue的实例
  // 5.由于Vue实例的响应化，会触发setter函数
  // 6.setter会让所有和这个属性有依赖关系的视图发生变化
  model(node, vm, exp) {
    // 更新input的value值
    this.update(node, vm, exp, 'model')

    // 监听input方法，模型响应视图
    node.addEventListener('input', e => {
      vm[exp] = e.target.value
    })
  }

  modelUpdater(node, value) {
    node.value = value
  }

  // 编译元素属性z-text
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  /**
   * 更新函数
   * @param {*} node 更新的节点
   * @param {*} vm vue实例
   * @param {*} exp 更新节点处的属性值，比如{{name}}中的name
   * @param {*} dir 更新的类型，比如文本、html
   */
  update(node, vm, exp, dir) {
    const updateFn = this[dir + 'Updater']
    
    // 编译完成后的初始化
    // updateFn && updateFn(node, vm.$data[exp])
    // 代理后就可以使用vm直接访问属性了
    updateFn && updateFn(node, vm[exp])

    // 依赖搜集
    new Watcher(vm, exp, function(value) {
      updateFn && updateFn(node, value)
    })
  }

  /**
   * 事件处理器
   * @param {*} node 事件绑定的节点
   * @param {*} vm vue实例
   * @param {*} exp 事件名称
   * @param {*} dir 事件的类型，比如click
   */
  eventHandler(node, vm, exp, dir) {
    // 获取配置中的method方法，匹配到对应的事件名称，并添加监听
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm))
    }
  }

  // 更新文本
  textUpdater(node, value) {
    node.textContent = value
  }

  // 是否为指令
  isDirective(attr) {
    return attr.indexOf('z-') === 0
  }

  // 是否为事件
  isEvent(attr) {
    return attr.indexOf('@') === 0
  }

  // 是否为元素
  isElement(node) {
    return node.nodeType === 1
  }

  // 是否为插值表达式
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}
