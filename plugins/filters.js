/*
*定义所有的全局的过滤器..
*/
import Vue from 'vue'

const globalFilter = {}

globalFilter.formatDate = now => { 
  now = new Date(now);
  let year = now.getFullYear();
  let month = now.getMonth()+1<10?'0'+(now.getMonth()+1):(now.getMonth()+1); 
  let date = now.getDate()<10?'0'+now.getDate():now.getDate(); 
  let hour = now.getHours()<10?'0'+now.getHours():now.getHours(); 
  let minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(); 
  let second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds(); 
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}

// 截取商家名字..
globalFilter.sliceMerchantName = merchantName => {
  // merchantName: 商家名字..

  // 如果商家名字超过8位字符, 截取前8位字符..
  if (merchantName) {
    return merchantName.length > 8
      ? merchantName.slice(0, 8) + '...'
      : merchantName
  } else {
    return merchantName
  }
}
// 截取一口价商家名字..
globalFilter.sliceFixedMerchantName = merchantName => {
  // merchantName: 商家名字..

  // 如果商家名字超过8位字符, 截取前8位字符..
  if (merchantName) {
    return merchantName.length > 9
      ? merchantName.slice(0, 9) + '...'
      : merchantName
  } else {
    return merchantName
  }
}
// 截取价钱名字..
globalFilter.slicePriceName = merchantName => {
  // merchantName: 商家名字..

  // 如果商家名字超过8位字符, 截取前8位字符..
  if (merchantName) {
    return merchantName.length > 9
      ? merchantName.slice(0, 6) + '...'
      : merchantName
  } else {
    return merchantName
  }
}
export default globalFilter

Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})
