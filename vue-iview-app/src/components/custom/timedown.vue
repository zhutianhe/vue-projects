<template>
  <div class="custom-time-down">
    <div class="time_item" style="border-right: 0">
      <span class="num">{{ startTimeDown.hour }}</span>
      <span class="unit">小时</span> <span class="num">{{ startTimeDown.minute }}</span>
      <span class="unit">分</span> <span class="num">{{ startTimeDown.second }}</span>
      <span class="unit">秒</span>
      <div class="time_item_top">
        <div class="time_item_top_title">开始时间</div>
        <div v-if="!timeRange.startTime">&nbsp;&nbsp;&nbsp;无时限</div>
        <el-date-picker
          v-model="timeRange.startTime"
          type="datetime"
          format="yyyy/MM/dd HH:mm:ss"
          :clearable="false"
          :disabled="abled"
          :picker-options="pickerOptions"
          prefix-icon="el-icons icon-calendar-lists-u"
        ></el-date-picker>
      </div>
    </div>
    <div class="time_item" style="border-left: 0">
      <span class="num">{{ endTimeDown.hour }}</span>
      <span class="unit">小时</span> <span class="num">{{ endTimeDown.minute }}</span>
      <span class="unit">分</span> <span class="num">{{ endTimeDown.second }}</span>
      <span class="unit">秒</span>
      <div class="time_item_top">
        <div class="time_item_top_title">结束时间</div>
        <div v-if="!timeRange.endTime">&nbsp;&nbsp;&nbsp;无时限</div>
        <el-date-picker
          v-model="timeRange.endTime"
          type="datetime"
          format="yyyy/MM/dd HH:mm:ss"
          :clearable="false"
          :disabled="abled"
          :picker-options="pickerOptions"
          prefix-icon="el-icons icon-calendar-lists-u"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return {}
      }
    },
    abled: { // 能否可用
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeRange: this.value ? { startTime: new Date(this.value.startTime), endTime: new Date(this.value.endTime) } : { startTime: moment().format('YYYY-MM-DD HH:mm:ss'), endTime: moment().format('YYYY-MM-DD HH:mm:ss') }, // 获取时间区间并添加默认值
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortels: [{
          text: '无时限',
          onClick(picker) {
            picker.$emit('pick', null)
          }
        }]
      },
      startTimeDown: { // 开始时间倒计时
        hour: '00',
        minute: '00',
        second: '00'
      },
      endTimeDown: { // 结束时间倒计时
        hour: '00',
        minute: '00',
        second: '00'
      }
    }
  },
  computed: {
    // timeRange() {
    //   // console.log(new Date(this.value.startTime))
    //   return { startTime: new Date(this.value.startTime), endTime: new Date(this.value.endTime) } // 获取时间区间并添加默认值
    // }
  },
  watch: {
    'timeRange.startTime': {
      handler(newVal) {
        this.getTime(newVal)
      },
      immediate: true
    },
    'timeRange.endTime': {
      handler(newVal) {
        this.getTime1(newVal)
      },
      immediate: true
    },
    timeRange: {
      handler(newVal) {
        this.$emit('input', { startTime: moment(newVal.startTime).format('YYYY-MM-DD HH:mm:ss'), endTime: moment(newVal.endTime).format('YYYY-MM-DD HH:mm:ss') })
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getTime(val) {
      this.timer && clearInterval(this.timer)
      let interval = new Date(val).getTime() - new Date().getTime()
      this.timer = setInterval(() => {
        if (interval > 1000) {
          this.startTimeDown = this.replyTime(interval -= 1000)
        } else {
          this.startTimeDown = {
            hour: '00',
            minute: '00',
            second: '00'
          }
          clearInterval(this.timer)
        }
      }, 1000)
    },

    getTime1(val) {
      this.timer1 && clearInterval(this.timer1)
      let interval = new Date(val).getTime() - new Date().getTime()
      this.timer1 = setInterval(() => {
        if (interval > 1000) {
          this.endTimeDown = this.replyTime(interval -= 1000)
        } else {
          this.endTimeDown = {
            hour: '00',
            minute: '00',
            second: '00'
          }
          clearInterval(this.timer1)
        }
      }, 1000)
    },

    replyTime(interval) {
      // const now = new Date().getTime()
      // if (now > val) {

      //   return {
      //     hour: '00',
      //     minute: '00',
      //     second: '00'
      //   }
      // } else {
      // const time = interval
      return {
        hour: Math.floor(interval / (3600 * 1000)),
        minute: Math.floor(interval % (3600 * 1000) / (60 * 1000)),
        second: Math.floor(interval % (3600 * 1000) % (60 * 1000) / (1000))
      }
      // }
    },
    initTime(obj) {
      this.timeRange = obj
      this.getTime(moment(obj.startTime))
      this.getTime1(moment(obj.endTime))
    }
  },
  destory() { }
}

</script>
<style lang='scss' scoped>
.custom-time-down {
  display: flex;
  margin-top: 20px;
  margin-bottom: 15px;
  .time_item {
    height: 100px;
    flex: 1;
    border: 1px solid #c6d1da;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .num {
      font-size: 40px;
      color: #f27b7b;
    }
    .unit {
      margin: 12px 20px 0 0;
    }
    .time_item_top {
      position: absolute;
      padding: 0px 0 0 10px;
      display: flex;
      align-items: center;
      top: -16px;
      background: #fff;
      .time_item_top_title {
        font-size: 14px;
        color: #576881;
      }
      .time_item_top_time {
        font-size: 14px;
        color: #272c33;
        margin: 0 10px 0 5px;
      }
    }
    .top1 {
      padding: 10px 20px;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
    .el-input ::v-deep {
      .el-input__inner {
        border: none;
      }
    }
  }
}
</style>
