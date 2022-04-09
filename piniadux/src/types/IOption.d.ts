declare interface IOption<IState extends Object> {
    state: () => IState;
}
export type {IOption}