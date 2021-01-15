<template>
  <div class="custom-triangle-bar">
    <span></span>
    <div :id="id"></div>
    <p>
      <span></span>
      <span></span>
      <span></span>
    </p>
  </div>
</template>

<script>

import * as d3 from 'd3'

export default {
  name: 'CstTriangleBar',
  components: {},
  props: {
    id: {
      type: String,
      default: 'customTriangleBar'
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
    maxValueY() {
      const array = []
      // 5
      this.options.series[0].data.map((item, index) => {
        array[index] = []
        // 3
        this.options.series.map((v) => {
          array[index].push(v.data[index])
        })
        array[index] = d3.sum(array[index])
      })
      return d3.max(array)
    }
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
      .domain(this.options.xAxis[0].data)
      .padding(0.2)

    const xAxis = svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
    xAxis.selectAll('text')
      .attr('fill', '#88919C')
    xAxis.selectAll('path')
      .attr('stroke', '#959595')
    xAxis.selectAll('line')
      .attr('stroke', '#959595')

    var y = d3.scaleLinear()
      .domain([0, this.maxValueY * 1.2]) // 保证20%的富余量
      .range([height, 0]);
    var yAxis = svg.append('g')
      .call(d3.axisLeft(y))
    yAxis.selectAll('text')
      .attr('fill', '#88919C')
    yAxis.selectAll('path')
      .attr('stroke', '#959595')
    yAxis.selectAll('line')
      .attr('stroke', '#959595')

    const toolTipDiv = d3.select('#app').append('div')
      .attr('class', 'chart-tooltip')
      .attr('width', '120px')

    const toolTipHtml = (i) => {
      let contentStr = `<h2>${this.options.xAxis[0].data[i]}</h2>`
      this.options.series.map((v, index) => {
        contentStr += `
          <p>
            <span style="background: ${this.color[index]}"></span>
            <span>${v.name}</span>
            <span>${v.data[i]}</span>
          </p>
        `
      })
      return `<div class="chart-tooltip-content"> ${contentStr} </div>`
    }

    // 采用倒序循环，先绘制最大的图型，
    for (let index = this.options.series.length - 1; index >= 0; index--) {
      for (let i = this.options.series[index].data.length - 1; i >= 0; i--) {

        // 计算顶点叠加后的坐标（left, top）
        let left = x(this.options.xAxis[0].data[i])
        let v = this.options.series[index].data[i]

        // 当数据多于一组时，获取当前x轴之前的累计高度
        if (index > 0) {
          for (let j = 0; j < index; j++) {
            v += this.options.series[j].data[i]
          }
        }
        let top = y(v)

        // 定义不同类型的轨迹
        let path = ''
        if (this.options.series[index].type === 'triangle') {
          // 三角形
          path = `
              M${left + x.bandwidth() / 2} ${top} 
              L${left} ${height} 
              L${left + x.bandwidth()} ${height}`
        } else if (this.options.series[index].type === 'outer-triangle') {
          // 外拱形
          path = `
              M${left} ${height} 
              Q${left + x.bandwidth() / 4} ${top} ${left + x.bandwidth() / 2} ${top} 
              Q${left + 3 * x.bandwidth() / 4} ${top} ${left + x.bandwidth()} ${height}`
        } else if (this.options.series[index].type === 'inner-triangle') {
          // 内拱形
          path = `
              M${left} ${height} 
              Q${left + x.bandwidth() / 4} ${height} ${left + x.bandwidth() / 2} ${top} 
              Q${left + 3 * x.bandwidth() / 4} ${height} ${left + x.bandwidth()} ${height}`
        }

        svg.selectAll()
          .data([this.options.xAxis[0].data[i]])
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', this.color[index])
          .attr('cursor', 'pointer')
          .on('mouseover', (d) => {
            d3.select(this)
              .transition()
              .duration(200)
            toolTipDiv.transition()
              .duration(200)
              .style('opacity', 0.8)
            let curLeft = d.pageX + 10
            // 溢出屏幕处理
            if (curLeft + 120 >= document.body.offsetWidth) {
              toolTipDiv.html(toolTipHtml(i))
                .style('left', document.body.offsetWidth - 120 + 'px')
            } else {
              toolTipDiv.html(toolTipHtml(i))
                .style('left', curLeft + 'px')
            }
            toolTipDiv.html(toolTipHtml(i))
              .style('top', d.pageY + 'px')
          })
          .on('mouseout', () => {
            d3.select(this)
              .transition()
              .duration(200)
            toolTipDiv.transition()
              .duration(200)
              .style('opacity', 0)
          })
          .transition()
          .delay(() => {
            return i * 200
          })

        svg.selectAll()
          .data([this.options.xAxis[0].data[i]])
          .enter()
          .append('text')
          .attr('x', left + x.bandwidth() / 2)
          .attr('y', top - 14)
          .attr('fill', '#ffffff')
          .attr('text-anchor', 'middle')
          .text(v)
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
svg {
  background: #202020;
}
.chart-tooltip {
  position: absolute;
  text-align: left;
  padding: 10px 20px;
  font: 12px sans-serif;
  background: rgba(255, 255, 255, 0.1);
  border: 0px;
  border-radius: 4px;
  pointer-events: none;
  color: #ffffff;
  opacity: 0;
  .chart-tooltip-content {
    h2 {
      font-size: 14px;
    }
    p {
      margin: 5px 0;
      span:first-child {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      span:nth-child(2) {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
</style>
