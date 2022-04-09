type ValueOf<T> = T[keyof T];
type EffectFunc = () => (() => void) | void;
type PropertyKey = string | symbol;

class Observer<T extends { [key: PropertyKey]: any }> {
    private primaryObj: T;
    public proxyObj: T;

    private effectFuncQueue = new Set<() => unknown>();
    public reset: Function | undefined;


    constructor(obj: T) {
        const proxyObj = this.createProxy(obj);
        this.primaryObj = obj;
        this.proxyObj = proxyObj;
    }

    createProxy(obj: T): T {
        const that = this;
        const proxyObj = new Proxy(obj, {
            get(target: T, p: keyof T): ValueOf<T> {
                return target[p];
            },
            set(target: T, p: keyof T, value: unknown): boolean {
                if (!Object.is(target[p], value)) {
                    Reflect.set(target, p, typeof value === "object" ? that.createProxy(value as any) : value);
                    that.runTaskQueue(); //TODO:目前是无差别渲染，即所有使用该store的组件都渲染
                }
                return true;
            },
        });
        let key: keyof typeof obj
        for (key in obj) {
            if (typeof obj[key] === "object") {
                obj[key] = this.createProxy(obj[key]) as any;
            }
        }
        return proxyObj
    }


    initialize(obj: T) {
        const proxyObj = this.createProxy(obj);
        this.primaryObj = obj;
        this.proxyObj = proxyObj;
        this.runTaskQueue();
    }

    addTask(Task: EffectFunc) {
        this.effectFuncQueue.add(Task);
    }

    removeTask(Task: EffectFunc) {
        this.effectFuncQueue.delete(Task);
    }

    runTaskQueue() {
        this.effectFuncQueue.forEach(F => F())
    }
}


export default Observer;
