<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { get_network_info } from '@/api/admin_api'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'network_chart'
    },
    id: {
      type: String,
      default: 'network_chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      sent_data: [],
      recv_data: [],
      x_list: [],
      timer: null
    }
  },
  mounted() {
    this.initChart()
    this.get_info()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.clean_data()
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    get_info() {
      this.timer = setInterval(() =>{
        get_network_info().then(response => {
          this.x_list.push(response.data.time)
          this.recv_data.push(response.data.recv)
          this.sent_data.push(response.data.sent)
          this.initChart()
          if(this.x_list.length>50) {
            this.x_list.shift()
            this.sent_data.shift()
            this.recv_data.shift()
          }
        })
      },5000)
    },
    clean_data(){
      clearInterval(this.timer)
      this.sent_data = []
      this.recv_data = []
      this.x_list = []
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 10,
          text: '网络监控',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 30,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['入网', '出网'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.x_list
        }],
        yAxis: [{
          type: 'value',
          name: '(kbps)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        dataZoom : [
	    	{
            type: 'slider',
            show: false,
            start: 2,
            end: 100,
            handleSize: 8
        }
	    ],
        series: [{
          name: '入网',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12
            }
          },
          data: this.recv_data
        }, {
          name: '出网',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12
            }
          },
          data: this.sent_data
        }]
      })
    }
  }
}
</script>
