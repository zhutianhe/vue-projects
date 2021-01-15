<template>
  <div class="custom-cascader">
    <ul v-if="readonly && multiple" class="custom-cascader-menu">
      <li
        v-for="item in options"
        v-show="selectValue.includes(item.value) && readonly"
        :key="item.value"
        class="custom-cascader-menu__item"
        :class="selectValue.includes(item.value) ? 'is-active' : ''"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul v-else-if="readonly" class="custom-cascader-menu">
      <li
        v-for="item in options"
        v-show="item.value === selectValue && readonly"
        :key="item.value"
        class="custom-cascader-menu__item"
        :class="item.value === selectValue ? 'is-active' : ''"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul v-else-if="!readonly && multiple" class="custom-cascader-menu">
      <li
        v-for="item in options"
        :key="item.value"
        class="custom-cascader-menu__item"
        :class="selectValue.includes(item.value) ? 'is-active' : ''"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul v-else-if="!readonly" class="custom-cascader-menu">
      <li
        v-for="item in options"
        :key="item.value"
        class="custom-cascader-menu__item"
        :class="item.value === selectValue ? 'is-active' : ''"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>

/**
 * 要求：
 * 传入为选中的value值，如，’3‘， ['2', '3']
 * 传出为选中的Object值，如，[{label: '3', value: '3'}, ....]
 */
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: this.value
    }
  },
  // computed: {
  //   selectValue: {
  //     get() {
  //       return this.value
  //     },
  //     set(val) {
  //       return val
  //     }
  //   }
  // },
  watch: {
  },
  mounted() {
  },
  methods: {
    handleItemClick(e) {
      // 如果多选
      if (this.multiple) {
        // 如果包含,移出
        if (this.selectValue.includes(e.value)) {
          this.selectValue.splice(this.selectValue.indexOf(e.value), 1)
        } else {
          this.selectValue = [...this.selectValue, e.value]
        }
        console.log(this.selectValue)
        this.$emit('change', this.selectValue)
      } else {
        this.selectValue = e.value
        this.$emit('change', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-cascader {
  height: 100%;
  .custom-cascader-menu {
    display: inline-block;
    vertical-align: top;
    height: inherit;
    width: 100%;
    overflow: auto;
    background-color: #fff;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 0;
    min-width: 160px;
    .custom-cascader-menu__item {
      font-size: 14px;
      padding: 8px 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #4a6079;
      height: 34px;
      line-height: 1.5;
      box-sizing: border-box;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: rgba(68, 182, 174, 0.15);
      }
    }
    .is-active {
      color: #44b6ae;
      background-color: rgba(68, 182, 174, 0.15);
    }
    // &::-webkit-scrollbar {
    //   width: 10px;
    //   height: 10px;
    // }
    // &::-webkit-scrollbar-track {
    //   background: transparent;
    //   border-radius: 2px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background: transparent;
    //   border-radius: 10px;
    // }
    // &:hover::-webkit-scrollbar-thumb {
    //   background: rgba(255, 255, 255, 0.16);
    // }
  }
}
</style>
