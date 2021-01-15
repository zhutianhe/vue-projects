<template>
  <div id="echart-map-box">
    sssssssssssssssss
    <chart :options="options" style="width: 100%; height: 100%;" @mouseover="onMouseover"></chart>
  </div>
</template>
<script>
import 'echarts'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import china from '@/assets/world.json'
ECharts.registerMap('china', china)

export default {
  name: 'echartMain',
  components: {
    chart: ECharts,
  },
  props: {
    mapcfg: {
      type: Object,
      default: () => {
        return {
          time: null
        }
      }
    },
    data: {
      type: Object,
      default: () => {
        return {
          api: ''
        }
      }
    }
  },
  data() {
    return {
      isloading: {
        text: 'loading',
        show: false
      },
      mulPlaceholder: '请选择',
      mulModel: '',
      mulOptions: [],
      showIcon: 'more-detail',
      // railwayApi: '/railway/railway_list',
      getAreaApi: '/home/railway/map_data',
      getDetailApi: '/home/railway/map_data_detail',
      dataList: [],
      mouseoverFlag: false,
      detailList: {},
      unitName: null,
      maxValue: 0,
      range: 30,
      options: {
        geo: {
          map: 'china',
          roam: true,
          // aspectScale: 1,
          // top: '0%',
          // left: '0%',
          width: '100%',
          height: '100%',
          // center: [],
          itemStyle: {
            show: true,
            areaColor: 'rgb(5,101,123)',
            borderColor: '#2bffff',
            opacity: 0.5
          },
          emphasis: {
            label: {
              show: true,
              textStyle: {
                fontSize: 16,
                color: '#fff'
              }
            },
            itemStyle: {
              show: true,
              areaColor: 'rgba(8,249,249,0.8)'
            }
          }
        },
        series: [
          {
            name: '数据',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zLevel: 2,
            symbolSize: function (val) {
              let maxSize
              if (val && val[2]) {
                maxSize = val[2]
              } else {
                maxSize = 10
              }
              return maxSize
            },
            itemStyle: {
              normal: {
                show: true,
                color: 'yellow'
              }
            },
            label: {
              show: false,
              textStyle: {
                color: '#12b0bd',
                backgroundColor: '#000',
                fontSize: 18,
                padding: [6, 15]
              },
              formatter: function (p) {
                return p.data.obj.unitName
              }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    dataFilter: function () {
      return this.$store.getters.getFilter
    },
    homePageMap() {
      return this.$store.state.homePageMap
    }
  },
  watch: {
  },
  mounted() {
    // this.getData()
    // this.getRaliway(JSON.parse(this.dataFilter))
  },
  methods: {
    getData(params) {
      this.isloading.show = true
      let _params = Object.assign({}, JSON.parse(this.dataFilter), params, this.data.params)
      if (this.homePageMap && this.homePageMap.detailList) {
        _params.unitId = this.homePageMap.detailList.unitId
      }
      this.$http({
        methods: 'get',
        url: this.getAreaApi,
        params: _params
      }).then((res) => {
        this.isloading.show = false
        const data = res.data.data.list
        if (data && data.length > 0) {
          // this.maxValue = Math.max.apply(null, data.map(function(o) { return o.value }))
          data.forEach((v, i) => {
            this.dataList[i] = {
              name: v.unitName,
              value: v.cp.concat(this.range),
              obj: v
            }
          })
        }
        this.options.series[0].data = this.dataList
        // if (this.homePageMap && this.homePageMap.detailList && this.homePageMap.detailList.cp) {
        //   this.options.geo.center = this.homePageMap.detailList.cp
        // }
      }).catch(() => {
        this.isloading.show = false
      })
    },
    onMouseover(params) {
      if (params && params.data) {
        this.mouseoverFlag = true
        this.unitName = params.data.obj.name || params.data.obj.unitName
        this.getDetail(params)
      }
    },
    // 地图打点详情
    getDetail(params) {
      let _params = Object.assign({}, JSON.parse(this.dataFilter), { unitId: params.data.obj.unitId })
      this.isloading.show = true
      this.$http({
        methods: 'get',
        url: this.getDetailApi,
        params: _params
      }).then((res) => {
        this.isloading.show = false
        this.detailList = res.data.data
      }).catch((e) => {
        console.log(e)
        this.isloading.show = false
      })
    },
    // 获取直属站数据
    // getRaliway(params) {
    //   this.$http({
    //     methods: 'get',
    //     url: this.railwayApi,
    //     params: Object.assign({}, params, this.data.params)
    //   }).then((res) => {
    //     this.mulOptions = res.data.data.list
    //     if (res.data.data.list && res.data.data.list.length > 0) {
    //       this.mulModel = res.data.data.list[0]
    //     }
    //   })
    // },
    mulInput(val) {
      if (val) {
        let _params = Object.assign({}, JSON.parse(this.dataFilter))
        _params.railwayId = val.unitId
        this.getData(_params)
      }
    },
    closeMask() {
      this.mouseoverFlag = false
    },
    onClick(params) {
      this.mouseoverFlag = false
      let data = {
        show: true,
        class: 'file-source-center-wrap-detail-map',
        size: {
          width: '800px',
          height: '900px'
        },
        component: {
          name: 'detailMap',
          style: {
            height: '100%'
          },
          data: {
            title: '',
            unitName: this.unitName,
            params: {
              cp: params.cp,
              unitId: params.unitId
            }
          }
        }
      }
      this.$store.dispatch('updateCenterWrap', data)
    }
  }
}

</script>
<style lang="scss" scoped>
#echart-map-box {
  width: 100%;
  height: 100%;
  .railway-list {
    position: absolute;
    top: 20%;
    left: 27.2%;
    width: 190px;
    height: 40px;
  }
}
</style>
