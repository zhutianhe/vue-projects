// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  // 0:off 关闭规则； 1:warn 打开规则，显示警告; 2:error 打开规则，显示错误
  rules: {
    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": [2, "never"],
    // 语句强制分号结尾
    "semi": [2, "never"],
    // 强制在function的左括号之前使用一致的空格
    "space-before-function-paren": [2, {
      "anonymous": "always", // 匿名函数
      "named": "never", // 具名函数
      "asyncArrow": "always" // 箭头函数
    }],
    // 引号类型 `` "" ''
    // "quotes": [1, "single"],
    // 对象字面量中的属性名是否强制双引号
    "quote-props": [2, "consistent"],


    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
