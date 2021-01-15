<template>
  <div v-if="this.options.type === 'outline'" class="outline-bar">
    <div class="bar-container">
      <div class="label-name" style="color: #35b2e8"><span>主机</span></div>
      <div style="width: 70%; position: relative; color: #35b2e8"><span>存储容量</span></div>
    </div>
    <div class="bar-container" v-for="item in this.options.data" :key="item.value">
      <div class="label-name">{{ item.label }}</div>
      <div style="width: 70%; position: relative">
        <div class="progress-bar-wrapper">
          <div class="progress-progress" style="width: 80%">
            <div class="Top-items-progress" style="border: 1px solid rgb(119, 209, 250)">
              <div class="Top-items-middle">
                <span class="Top-items-bar" :style="{ width: (item.value / maxValue) * 100 + '%' }">
                </span>
              </div>
            </div>
          </div>
          <div class="label-value" style="width: 20%; color: rgb(119, 209, 250)">
            {{ Number((item.value / maxValue) * 100).toFixed(0) + "%" }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="default-bar">
    <div class="hBarContainer" v-for="item in this.options.data" :key="item.value">
      <div class="labelContainer">
        <span class="labelName">{{ item.label }}</span>
        <span class="labelValue">{{ item.value }}</span>
      </div>
      <div class="singleHBarWrapper">
        <div class="singleHBar" :style="{ width: (item.value / maxValue) * 100 + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CstProgressTable',
  components: {},
  props: {
    options: {
      type: Object,
      defualt: () => { }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    maxValue() {
      return Math.max.apply(Math, this.options.data.map(item => { return item.value }))
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.outline-bar {
  background: #202022;
  .bar-container {
    display: flex;
    padding-bottom: 10px;
    .label-name {
      margin-left: 10%;
      width: 20%;
      color: #78d1fa;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // line-height: 100%;
      text-align: left;
      padding-right: 5%;
      box-sizing: border-box;
    }
    .progress-bar-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      .progress-progress {
        position: relative;
        height: 100%;
        width: 65%;
        .Top-items-progress {
          position: relative;
          width: 100%;
          background-color: #122952;
          border-radius: 1rem;
          height: 100%;
          .Top-items-middle {
            position: relative;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            .Top-items-bar {
              position: absolute;
              width: 0;
              height: 100%;
              text-align: left;
              border-radius: 1rem;
              background: rgb(119, 209, 250);
            }
          }
        }
      }
    }
    .label-value {
      padding-left: 5%;
    }
  }
}
.default-bar {
  .hBarContainer {
    max-width: 500px;
    .labelContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      span:first-child {
        font-size: 14px;
        font-family: yahei;
        font-style: normal;
        color: white;
      }
      span:last-child {
        font-size: 16px;
        font-family: LED;
        font-style: italic;
        color: white;
      }
    }
    .singleHBarWrapper {
      background-color: rgba(128, 128, 128, 0.4);
      border-radius: 10px;
      .singleHBar {
        height: 8px;
        border-radius: 10px;
        background-image: repeating-linear-gradient(
          -30deg,
          rgba(89, 134, 171, 0.8),
          rgba(89, 134, 171, 0.8) 10px,
          rgb(49, 91, 125) 0px,
          rgb(49, 91, 125) 20px
        );
      }
    }
  }
}
</style>
