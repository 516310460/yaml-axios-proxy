import Vue from 'vue'
import Wave from '~/components/Common/Loading/wave'
import Pagination from '~/components/Common/Pagination/Pagination'
import titleAndSearch from '~/components/Common/titleAndSearch/titleAndSearch'
import MyOrder from '~/components/Public/MyOrder/MyOrder'
import OTC from '~/components/OTC/AdList/OTC'
import ATMyOrder from '~/components/AggregatedTransaction/MyOrder/MyOrder'
import ATBiddingPool from '~/components/AggregatedTransaction/BiddingPool/BiddingPool'
import OTCMyOrder from '~/components/OTC/MyOrder/MyOrder'
import OTCFixedPrice from '~/components/OTC/FixedPrice/FixedPrice'
import Footer from '~/components/Public/Footer/Footer'
import Header from '~/components/Public/Header/Header'
import MessageCenter from '~/components/Public/MessageCenter/MessageCenter'
import AssetsDetail from '~/components/Public/AssetsDetail/AssetsDetail'
import FixedPriceMerchant from '~/components/Public/FixedPriceMerchant/FixedPriceMerchant'
import FranceCoinTransaction from '~/components/Public/FranceCoinTransaction/FranceCoinTransaction'
// 全局注册组件

// Common组件
Vue.component('bt-Wave', Wave)
Vue.component('bt-Pagination', Pagination)
Vue.component('bt-titleAndSearch', titleAndSearch)

// 集合竞价组件
Vue.component('bt-ATMyOrder', ATMyOrder)
Vue.component('bt-ATBiddingPool', ATBiddingPool)

// OTC组件
Vue.component('bt-OTC', OTC)
Vue.component('bt-OTCMyOrder', OTCMyOrder)
Vue.component('bt-OTCFixedPrice', OTCFixedPrice)

// Public组件
Vue.component('bt-Footer', Footer)
Vue.component('bt-Header', Header)
Vue.component('bt-MyOrder', MyOrder)
Vue.component('bt-MessageCenter', MessageCenter)
Vue.component('bt-AssetsDetail', AssetsDetail)
Vue.component('bt-FixedPriceMerchant', FixedPriceMerchant)
Vue.component('bt-FranceCoinTransaction', FranceCoinTransaction)
