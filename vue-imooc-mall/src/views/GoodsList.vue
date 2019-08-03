<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a
            href="javascript:void(0)"
            class="price"
            v-bind:class="{'sort-up':sortFlag}"
            @click="sortGoods()"
          >
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a
            href="javascript:void(0)"
            class="filterby stopPop"
            @click.stop="showFilterPop"
          >Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter('all')"
                  v-bind:class="{'cur':priceChecked=='all'}"
                >All</a>
              </dd>
              <dd v-for="(item,index) in priceFilter" :key="index">
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter(index)"
                  v-bind:class="{'cur':priceChecked==index}"
                >{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :key="item.id">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'static/'+item.productImage" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice | currency('$')}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="view-more-normal"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="20"
            >
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading" />
            </div>
          </div>
        </div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">请先登录,否则无法加入到购物车中!</p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
        </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
          <p slot="message">
            <svg class="icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok" />
            </svg>
            <span>加入购物车成!</span>
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
          </div>
        </modal>
        <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader';
import NavBread from '@/components/NavBread';
import NavFooter from '@/components/NavFooter';
import Modal from '@/components/Modal';
export default {
  name: 'GoodsList',
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal
  },
  data () {
    return {
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  created () {},
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.$axios
        .get('/goods/list', { param: param })
        .then(res => {
          if (res.data.status === '0') {
            this.goodsList = this.goodsList.concat(res.data.result.list)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList()
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.page = 1
      this.getGoodsList()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500)
    },
    addCart (productId) {
      this.$axios
        .post('/goods/addCart', {
          productId: productId
        })
        .then(res => {
          if (res.data.status === 0) {
            this.mdShowCart = true
            this.$store.commit('updateCartCount', 1)
          } else {
            this.mdShow = true
          }
        })
    },
    closeModal () {
      this.mdShow = false
      this.mdShowCart = false
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
      this.mdShowCart = false
    }
  }
}
</script>
<style scoped>
</style>
