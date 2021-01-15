<template>
  <div class="custom-bar">
    <span></span>
    <div :id="id"></div>
  </div>
</template>

<script>

import * as d3 from 'd3'

export default {
  name: 'CstSquareBar',
  components: {},
  props: {
    id: {
      type: String,
      default: 'customBarChart'
    },
    options: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      color: [
        '#1890ff',
        '#52d6c6',
        '#40bf64',
        '#fac946',
        '#e29665',
        '#233770',
        '#756ac5',
        '#8350d9',
        '#6192df',
        '#33c2c0'
      ],
      borderColor: '#404040'
    }
  },
  computed: {
  },
  watch: {

  },
  created() {

  },
  mounted() {
    var margin = { top: 30, right: 30, bottom: 70, left: 60 }
    var width = 460 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom
    const svg = d3.select('#' + this.id)
      .append('svg')
      .attr('width', width + margin.left + margin.right + 'px')
      .attr('height', height + margin.top + margin.bottom + 'px')
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')

    var x = d3.scaleBand()
      .range([0, width])
      .domain(this.options.xAxis[0].data.map((v) => v))
      .padding(0.2)

    var xAxis = svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
    xAxis.selectAll('text')
      .attr('fill', '#88919C')
    xAxis.selectAll('path')
      .attr('stroke', '#959595')
    xAxis.selectAll('line')
      .attr('stroke', '#959595')

    svg.selectAll('.x')
      .data(this.options.xAxis[0].data)
      .enter()
      .append('line')
      .attr('class', 'x')
      .attr('stroke', this.borderColor)
      .attr('x1', (d) => {
        return x(d) + x.bandwidth() / 2
      })
      .attr('x2', (d) => {
        return x(d) + x.bandwidth() / 2
      })
      .attr('y2', height)

    this.options.series.map((item, index) => {
      item.data.map((v, i) => {
        // 在绘图之前，需要计算每个方块的x、y
        // 1.计算每一个数字对应的方块的宽和高
        //   获取每组数字的最小值，最小值的占比为x轴一个刻度的10分之一
        let perWidth = x.bandwidth() / (3 * d3.min(item.data))

        // 2. 计算每个方块的旋转中心 centerX centerY
        //    centerX = x轴轴线的x = x轴的刻度初始x + 一个刻度的一半
        let centerX = x(this.options.xAxis[0].data[i]) + x.bandwidth() / 2
        //    centerY满足的条件： 数组长度为1，居中显示；长度为2，上下居中（1/3,2/3）；长度为3，上下居中（1/4,2/4,3/4）
        let centerY = height / (this.options.series.length + 1) * (index + 1)

        // 正方形
        if (item.type === 'square') {
          // 3. 计算每个方块的左顶点的x、y
          //    x = x轴轴线的x - 方块宽度的一半
          let left = centerX - (v * perWidth) / 2
          //    y = 方块排列中心线y - 方块高度的一半
          let top = centerY - (v * perWidth) / 2
          svg.selectAll()
            .data([this.options.xAxis[0].data[i]])
            .enter()
            .append('rect')
            .attr('x', left)
            .attr('y', top)
            .attr('height', () => v * perWidth)
            .attr('width', () => v * perWidth)
            .attr('transform', () => `rotate(45, ${centerX}, ${centerY})`)
            .attr('fill', this.color[index])
          // 圆形
        } else {
          svg.selectAll()
            .data([this.options.xAxis[0].data[i]])
            .enter()
            .append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', () => v * perWidth / 2)
            .attr('fill', this.color[index])
        }

        svg.selectAll()
          .data([this.options.xAxis[0].data[i]])
          .enter()
          .append('text')
          .attr('x', centerX)
          .attr('y', centerY)
          .attr('dy', 5)
          .attr('fill', '#FFFFFF')
          .attr('text-anchor', 'middle')
          .text(v)
      })
    })
  },
  methods: {

  }
}
</script>

<style scoped>
svg {
  background: #202022;
}
</style>
