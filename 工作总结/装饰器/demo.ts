import 'reflect-metadata';


// 在装饰类的装饰器上获得target(类)是类本身
// 在装饰属性、方法、入参上获得的target的是类的原型target(属性、方法、入参) === target(类).prototype
function modifyClass (name) {
  return (target) => {
    target.prototype.extra = name
  }
}

function modifyProp (target, propertyKey) {
  // 修改属性
  console.log(target)
  console.log(propertyKey)
  target[propertyKey] = 'modfiyed by decorator'
}

// 我们在 ts 版本的 vuex 装饰器中看到的 @state('key') key 等价于
// function state (key) {
//   return (target, propertyKey) => {
//     target[propertyKey] = target.$store.state[key]
//   }
// }

// 修饰方法
// descriptor对象原来的值如下
// {
//   value: specifiedFunction,
//   enumerable: false,
//   configurable: true,
//   writable: true
// };
function modifyMethod (target, propertyKey, descriptor) {
  Reflect.defineMetadata(key, 'Hello Reflect',target)
  const fun = descriptor.value
  descriptor.value = function () {
    console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
    return fun.apply(this, arguments)
  }
}

// 修饰入参
// index 是这个参数的顺序
function modifyParam (target, propertyKey, index) {
  console.log(target)
  console.log(propertyKey)
  console.log(index)
}

@modifyClass('new Prop')
class A {

  @modifyProp type: string
  name: string

  constructor (name) {
    this.name = name
  }

  @modifyMethod
  say (@modifyParam word) {
    let str = Reflect.getMetadata(key, this)
    console.log(str)
  }
}
