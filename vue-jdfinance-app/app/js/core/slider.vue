<!-- slider组件 -->
<template>
  <section :class="cname">
    <swiper :options="options" :notNextTick="options.notNextTick">
      <swiper-silde v-for="item in items" :key="item.href">
        <router-link :to="{name: item.href}">
          <img :src="item.src" alt="">
        </router-link>
      </swiper-silde>
      <div class="swiper-pagination" v-if="options.pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    cname: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {
          autoplay: true,
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          },
          notNextTick: false
        }
      }
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
@import "~swiper/dist/css/swiper.css";
</style>
