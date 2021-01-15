<template>
  <div class="time-line">
    <aside>
      <!-- 时间线 -->
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="index === currentIndex ? 'active' : ''"
          @click="handleItemActived(index)"
        >
          <div>
            <span>第{{ total - offset - index }}次发起</span>
            <span>{{ item.startTime }}</span>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <div class="pager-style">
        <el-pagination
          small
          :current-page="currentPage"
          :page-size="limit"
          :pager-count="5"
          layout="prev, pager, next, total"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'CstTimeLine',
  components: {
  },
  props: {
    result: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 时间轴列表
      total: this.result.total,
      limit: 20,
      offset: this.result.offset,
      currentPage: 1,
      currentIndex: 0
    }
  },
  computed: {
    list() {
      return this.result.data
    },
    options() {
      return [
        {
          label: 'A、事态发起方',
          value: [
            {
              label: '源IP地址',
              value: 'srcGeoAddress',
              inline: true
            },
            {
              label: '源IP安全域',
              value: 'srcSecurityZone',
              inline: true
            },
            {
              label: '源端口',
              value: 'srcPort',
              inline: true
            },
            {
              label: '源IP所属区域',
              value: ['srcGeoCountry', 'srcGeoCity'],
              inline: true
            },
            {
              label: '源MAC地址',
              value: 'srcMacAddress',
              inline: true
            },
            {
              label: '源IP经纬度',
              value: ['srcGeoLongitude', 'srcGeoLatitude'],
              inline: true
            }
          ]
        },
        {
          label: 'B、事态遭受方',
          value: [
            {
              label: '目的IP地址',
              value: 'destGeoAddress',
              inline: true
            },
            {
              label: '目的IP安全域',
              value: 'destSecurityZone',
              inline: true
            },
            {
              label: '目的端口',
              value: 'destPort',
              inline: true
            },
            {
              label: '目的IP所属区域',
              value: ['destGeoCountry', 'destGeoCity'],
              inline: true
            },
            {
              label: '目的MAC地址',
              value: 'destMacAddress',
              inline: true
            },
            {
              label: '目的IP经纬度',
              value: ['destGeoLongitude', 'destGeoLatitude'],
              inline: true
            },
            {
              label: '目的域名',
              value: 'destHostName',
              inline: true
            }
          ]
        },
        {
          label: 'C、事态基础信息',
          value: [
            {
              label: '攻击信息',
              value: [
                {
                  label: '事态类型',
                  value: 'ruleType',
                  inline: true
                },
                {
                  label: '风险等级',
                  value: 'ruleLevel',
                  isKey: true,
                  keyValues: (() => {
                    const object = {}
                    this.alarmLevelOptions.map((v) => {
                      object[v.value] = v.label
                    })
                    return object
                  })(),
                  inline: true
                },
                {
                  label: '杀伤阶段',
                  value: 'attackStage',
                  isKey: true,
                  keyValues: (() => {
                    const object = {}
                    this.alarmChainOptions.map((v) => {
                      object[v.value] = v.label
                    })
                    return object
                  })(),
                  inline: true
                },
                {
                  label: '攻击状态',
                  value: 'attackStatus',
                  inline: true
                },
                {
                  label: '攻击方向',
                  value: 'direction',
                  isKey: true,
                  keyValues: (() => {
                    const object = {}
                    this.alarmDirectionOptions.map((v) => {
                      object[v.value] = v.label
                    })
                    return object
                  })(),
                  inline: true
                }
              ]
            },
            {
              label: '基础信息',
              value: [
                {
                  label: '事态编号',
                  value: 'eventId',
                  inline: true
                },
                {
                  label: '事态内容',
                  value: '',
                  inline: true
                },
                {
                  label: '事态信息',
                  value: '',
                  inline: true
                }
              ]
            },
            {
              label: '时间',
              value: [
                {
                  label: '发生时间',
                  value: '',
                  inline: true
                }
              ]
            }
          ]
        },
        {
          label: 'D、事态报文',
          value: [
            {
              label: '通信协议',
              value: [
                {
                  label: '应用层协议',
                  value: 'protocolType',
                  inline: true
                },
                {
                  label: '传输层协议',
                  value: 'transProtocol',
                  inline: true
                },
                {
                  label: '通话回话编号',
                  value: 'logSessionId',
                  inline: true
                },
                {
                  label: 'VLAN标识',
                  value: 'vlanID',
                  inline: true
                }
              ]
            },
            {
              label: '请求信息',
              value: [
                {
                  label: '请求方式',
                  value: 'requestMethod',
                  inline: true
                },
                {
                  label: '请求URL',
                  value: 'requestUrlQuery',
                  inline: true
                },
                {
                  label: '请求域名',
                  value: 'requestDomain',
                  inline: true
                },
                {
                  label: '请求HOST',
                  value: 'vlanID',
                  inline: true
                },
                {
                  label: '请求头',
                  value: 'requestHeader',
                  inline: true
                },
                {
                  label: '请求体',
                  value: 'requestBody',
                  inline: true
                }
              ]
            },
            {
              label: '响应信息',
              value: [
                {
                  label: '响应码',
                  value: 'responseCode',
                  inline: true
                },
                {
                  label: '响应头',
                  value: 'responseHeader',
                  inline: true
                },
                {
                  label: '响应内容',
                  value: 'responseMsg',
                  inline: true
                }
              ]
            },
            {
              label: '登录信息',
              value: [
                {
                  label: '登录用户名',
                  value: 'srcUserName',
                  inline: true
                },
                {
                  label: '登录密码',
                  value: 'passwd',
                  inline: true
                }
              ]
            },
            {
              label: '文件信息',
              value: [
                {
                  label: '恶意文件名',
                  value: 'fileName',
                  inline: true
                },
                {
                  label: '文件MD5',
                  value: 'fileMd5',
                  inline: true
                },
                {
                  label: '恶意文件类型',
                  value: 'attackFileType',
                  inline: true
                },
                {
                  label: '恶意文件标记',
                  value: '',
                  inline: true
                }
              ]
            }
          ]
        },
        {
          label: 'E、事态来源',
          value: [
            {
              label: '发现设备',
              value: [
                {
                  label: '设备名称',
                  value: 'deviceName',
                  inline: true
                },
                {
                  label: '设备厂商',
                  value: '',
                  inline: true
                },
                {
                  label: '发现规则ID',
                  value: 'ruleId',
                  inline: true
                },
                {
                  label: '规则名称',
                  value: 'ruleName',
                  inline: true
                }
              ]
            },
            {
              label: '原始数据',
              value: [
                {
                  label: '相关连接',
                  value: 'ruleLink',
                  inline: true
                }
              ]
            }
          ]
        }
      ]
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleItemActived(index) {
      this.currentIndex = index
    },

    // 当前页
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit
      this.currentPage = val
      this.currentIndex = 0
      this.$emit('current-change', { limit: this.limit, offset: this.offset })
      console.log(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  font-family: PingFangSC;
  display: grid;
  grid-template-columns: 340px 70%;
  grid-template-rows: auto auto;
  ul {
    position: relative;
    li {
      width: 230px;
      height: 30px;
      position: relative;
      margin: 5px 0px;
      list-style-type: none;
      div {
        background: #ffffff;
        border-radius: 2px;
        height: 100%;
        margin-left: 5px;
        padding-right: 10px;
        cursor: pointer;
        span {
          line-height: 30px;
          background: #ffffff;
          &:first-child {
            float: left;
          }
          &:last-child {
            float: right;
            // padding-right: 80px;
            &::after {
              content: "";
              background: #5a93fb;
              border: 4px solid #eef4f9;
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
        }
      }
    }
    .active {
      background: #44b6ae;
      border-radius: 2px;
      div {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
      }
      span:last-child {
        &::after {
          background-image: linear-gradient(42deg, #264bd0 0%, #9f88ef 100%);
          border: 4px solid #d4e7f8;
          width: 24px;
          height: 24px;
          right: -28px;
          top: 4px;
        }
      }
      &::after {
        position: absolute;
        content: "";
        width: 50px;
        height: 1px;
        line-height: 30px;
        background: #c6d1da;
        float: left;
        right: calc(-21px - 50px);
        top: 50%;
      }
    }
    &::after {
      content: "";
      height: calc(100% + 5px);
      border-right: 1px dashed #c6d1da;
      position: absolute;
      top: -21px;
      right: 94px;
    }
  }
  .pager-style {
    text-align: right;
    padding-right: 50px;
  }
}
</style>
