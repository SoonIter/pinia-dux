import Observer from "../core/Observer";

declare interface IStore<T extends Observer> {
    store: T["proxyObj"],
    reset: T["reset"]
}