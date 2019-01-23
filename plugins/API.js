import qs from 'qs'

export default (context, inject) => {
    // inject('API', () => {
    //     index: {
    //         return context.app.$axios.$post('/api/v1/bitbuy/fixprice/common/firstLoadFixPirce')
    //     }
    // })
    const API = {
        
        User: {
            // 获取防止重复提交reToken
            index(params) {
                const postData = qs.stringify(params)
                return context.app.$axios.post('/api/v1/bitbuy/otc/notice/listByState', postData)
            },
        }

    }

    context.$API = API
    inject('API', API)
}