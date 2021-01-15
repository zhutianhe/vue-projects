<template>
  <ul class="tag-checkbox">
    <li
      class="tag-checkbox-item"
      :class="tagNames.includes(item.label) ? 'active' : ''"
      v-for="item in options"
      :key="item.value"
      @click="handleSelectTags(item)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CstTagCheckbox',
  components: {},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tagNames: this.value || []
    }
  },
  computed: {

  },
  watch: {
    tagNames: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    handleSelectTags(item) {
      let index = -1
      this.tagNames.map((v, i) => {
        if (v === item.label) {
          index = i
        }
      })
      if (index > -1) {
        this.tagNames.splice(index, 1)
      } else {
        this.tagNames.push(item.label)
      }
    },

    // 重置
    handleTagsReset() {
      this.tagNames = []
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-checkbox {
  width: calc(100% - 150px);
  height: 100%;
  overflow: auto;
  .tag-checkbox-item {
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
    list-style-type: none;
  }
  .active {
    background: #4cb2a2;
    border: 1px solid #4cb2a2;
    color: #ffffff;
  }
}
</style>
