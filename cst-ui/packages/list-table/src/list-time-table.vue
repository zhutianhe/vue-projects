<template>
  <div class="list-time-line">
    <!-- 时间线 -->
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="index === currentIndex ? 'active' : ''"
      >
        <div>
          <span>{{ item.startTime }}</span>
          <span>{{ item.type }}</span>
          <span>{{ item.desc }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CstListTimeTable',
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    list() {
      return this.options.data;
    }
  },
  data() {
    return {
      // 时间轴列表
      total: this.options.total,
      limit: 20,
      offset: this.options.offset,
      currentPage: 1,
      currentIndex: 0
    }
  },
  mounted() { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.list-time-line {
  font-family: PingFangSC;
  display: flex;
  background: #202022;
  color: #fff;
  ul {
    position: relative;
    width: 100%;
    li {
      width: 100%;
      height: 30px;
      position: relative;
      margin: 5px 0px;
      list-style-type: none;
      padding: 0 40px;
      div {
        border-radius: 2px;
        height: 100%;
        margin-left: 5px;
        padding-right: 10px;
        cursor: pointer;
        span {
          display: inline-block;
          line-height: 30px;
          &:first-child {
            width: 150px;
            position: relative;
            margin-right: 40px;
            &::after {
              content: "";
              background: #19abc4;
              border: 4px solid #1d424a;
              border-radius: 50%;
              width: 18px;
              height: 18px;
              display: inline-block;
              right: -25px;
              top: 6px;
              position: absolute;
              z-index: 2;
            }
          }
          &:nth-child(2) {
            margin-right: 40px;
            text-align: center;
            height: 22px;
            width: 102px;
            line-height: 22px;
            background: #c87706;
            border-radius: 11px;
          }
          &:last-child {
            // padding-right: 80px;
          }
        }
      }
    }
    &::after {
      content: "";
      height: calc(100% - 30px);
      border-right: 1px solid #19abc4;
      position: absolute;
      top: 15px;
      left: 210px;
    }
  }
  .pager-style {
    text-align: right;
    padding-right: 50px;
  }
}
</style>
