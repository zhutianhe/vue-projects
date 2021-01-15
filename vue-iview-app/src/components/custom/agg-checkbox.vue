<template>
  <div class="aggregation">
    <label>请选择：</label>
    <ul class="agg-checkbox">
      <li
        class="agg-checkbox-item"
        :class="aggNames.includes(item.wordName) ? 'active' : ''"
        v-for="item in options"
        :key="item.wordName"
        @click="handleSelectTags(item)"
      >
        {{ item.wordChName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getAggFields } from '@/api/resource'
export default {
  components: {},
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categorys: new Map([['enum', 'select'], ['string', 'input'], ['boolean', 'select']]),
      options: [],
      aggNames: this.value || []
    }
  },
  computed: {

  },
  watch: {
    aggNames: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  created() {
    getAggFields().then(({ data }) => {
      this.options = data
    })
  },
  mounted() {

  },
  methods: {
    handleSelectTags(item) {
      let index = -1
      this.aggNames.map((v, i) => {
        if (v === item.wordName) {
          index = i
        }
      })
      if (index > -1) {
        this.aggNames.splice(index, 1)
      } else {
        this.aggNames.push(item.wordName)
      }
    },

    // 重置
    handleTagsReset() {
      this.aggNames = []
    }
  }
}
</script>

<style lang="scss" scoped>
.aggregation {
  padding-left: 10px;
  overflow: auto;
  label {
    display: block;
    float: left;
    line-height: 25px;
    font-size: 12px;
    margin: 10px 20px 10px 0;
  }
}
.agg-checkbox {
  width: calc(100% - 150px);
  float: right;
  height: 100%;
  overflow: scroll;
  .agg-checkbox-item {
    position: relative;
    float: left;
    font-size: 12px;
    color: #8c9bb0;
    min-width: 80px;
    border-radius: 3px;
    border: 1px solid rgba(198, 209, 218, 0.5);
    text-align: center;
    margin: 10px 20px 10px 0;
    padding: 3px 15px;
    cursor: pointer;
  }
  .active {
    background: #4cb2a2;
    border: 1px solid #4cb2a2;
    color: #ffffff;
  }
}
</style>
