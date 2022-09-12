import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList:[]
  },
  getters: {
    cartLength(state){
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  },
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成比较单一点
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      payload.checked = true;
      state.cartList.push(payload)
    },
  },
  actions: {
    addCart(context, payload) {
      // 方法二
      let oldProduct = context.state.cartList.find(item => item.idd == payload.idd)

      // 方法一
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.idd === payload.idd) {
      //     oldProduct = item;
      //   }
      // }
      // 2.判断oldProduct 
      if (oldProduct) {
        context.commit('addCounter',oldProduct)
        // oldProduct.count += 1
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
       }
    }
  },
  modules: {
  }
})
