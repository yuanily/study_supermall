import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    cartList: []
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList;
    }
  },
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成比较单一点
    addCounter(state, payload) {
      payload.count++; //用于数量加一
    },
    addToCart(state, payload) {
      // payload.checked = true;
      state.cartList.push(payload) //用于商品加一
    },
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 方法二
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)

        // 方法一
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item;
        //   }
        // }
        // 2.判断oldProduct 
        if (oldProduct) {
          context.commit('addCounter', oldProduct)
          // oldProduct.count += 1
        } else {
          payload.count = 1;
          context.commit('addToCart', payload)
          resolve('添加新的商品')
          console.log(reject);
        }
      })
    }
  },
  modules: {}
})