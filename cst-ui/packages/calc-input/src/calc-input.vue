<template>
  <div class="calc-input" :style="{ width: width }">
    <el-input v-model="count" @blur="handleBlur">
      <div slot="prepend" @click="minus()" :class="count === 0 ? 'disabled' : ''">-</div>
      <div slot="append" @click="plus()" :class="count === 100 ? 'disabled' : ''">+</div>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'CstCalcInput',
  components: {},
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: String,
      default: '80px'
    }
  },
  // model: {
  //   prop: 'weight',
  //   event: 'changeQwe'
  // },
  data() {
    return {
      count: this.value || 0
    };
  },
  computed: {

  },
  watch: {
    value(newVal) {
      this.count = newVal
    },

    count(value) {
      const newVal = value === undefined ? value : Number(value)
      if (Number(newVal) > 100) {
        setTimeout(() => {
          this.count = 100
        })
      } else if (Number(newVal) < 0 || isNaN(newVal)) {
        setTimeout(() => {
          this.count = 0
        })
      } else {
        this.count = parseFloat(newVal || 0)
        this.$emit('input', newVal)
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    plus() {
      if (this.count > 99) {
        this.count = 100
      } else {
        const number = (this.count * 100 + 100) / 100
        this.count = (number | 0) === number ? number : number.toFixed(2)
      }
    },

    minus() {
      if (this.count < 1) {
        this.count = 0
      } else {
        const number = (this.count * 100 - 100) / 100
        this.count = (number | 0) === number ? number : number.toFixed(2)
      }
    },

    handleBlur() {
      if (!this.count) {
        // this.minus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
//   -webkit-appearance: none;
// }
// input[type="number"] {
//   -moz-appearance: textfield;
// }
.calc-input {
  text-align: center;
  .el-input ::v-deep {
    .el-input-group__prepend,
    .el-input-group__append {
      padding: 0px;
      div {
        padding: 0 5px;
        cursor: pointer;
      }
      .disabled {
        cursor: not-allowed;
        // pointer-events: none;
      }
    }
    .el-input__inner {
      text-align: center;
      width: 100%;
      height: 20px;
      padding: 0px;
    }
  }
}
</style>
