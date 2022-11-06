import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  const { createApp} = Vue
  const app = createApp(Toast)
  // 提供一个父元素
  const parent = document.createElement('div')
  //mount方法不再像vue2一样支持未挂载的实例，必须得挂载，即必须得给参数
  const instance = app.mount(parent)
  console.log(instance)
  console.log(instance.$el)
}

export default obj