// IOC: 控制反转 -> 解偶
//     把对象创建和对象之间的调，用交给第三方(spring)管理。
// IOC 底层原理
//     xml解析、工厂模式、反射

// IOC容器
export class Injector {
  private readonly providerMap: Map<any, any> = new Map();
  private readonly instanceMap: Map<any, any> = new Map();
  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) this.providerMap.set(key, value);
  }
  public getProvider(key: any): any {
    return this.providerMap.get(key);
  }
  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
  public getInstance(key: any): any {
    if (this.instanceMap.has(key)) return this.instanceMap.get(key);
    return null;
  }
  public setValue(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
}


export const rootInjector = new Injector();
 
// 借个ng的装饰器
export function Injectable(): (_constructor: any) => any {
  return function (_constructor: any): any {
      rootInjector.setProvider(_constructor, _constructor);
      return _constructor;
  };
}
 
// 使用Reflect的元数据 Reflect.getMetadata('design:type') 获取属性的类型，并作为token去 injector.getInstance
export function Inject(): (_constructor: any, propertyName: string) => any {
  return function (_constructor: any, propertyName: string): any {
    const  propertyType: any = Reflect.getMetadata('design:type', _constructor, propertyName);
    const injector: Injector = rootInjector;
 
    let providerInsntance = injector.getInstance(propertyType);
    if (!providerInsntance) {
        injector.getProvider(propertyType);
        providerInsntance = new providerClass();
        injector.setInstance(key, providerInsntance);
    }
    _constructor[propertyName] = providerInsntance;
 
    return (_constructor as any)[propertyName];
  };
}
 
@Injectable()
class Cloth {
    public name: string = '涤纶';
}
 
@Injectable()
class Clothes {
  @Inject() public cloth: Cloth;
}
 
class Man {
  @Inject() public clothes: Clothes;
}
 
new Man().clothes.cloth.name // ‘涤纶’