import React, {Component} from "react";
import {usePiniadux} from "../../../hooks/usePiniadux";
import {Button} from "antd";
import {defineStore} from "../../../core/defineStore";
import withPiniadux from "../withPiniadux";

const STORE = Symbol("withPiniadux");

const store = defineStore(STORE, {
  state() {
    return {
      a: "aaaaa",
      b: {
        c: 1000,
      },
    };
  },
});

function FunctionChild() {
  const {store} = usePiniadux(STORE) as any;
  return (
    <div>
      函数子组件 2<Button onClick={() => store.b.c++}> {store.b.c}</Button>
    </div>
  );
}

class ClassChild_helper extends Component {
  private piniadux: any;
  private store: any;
  private b: any;

  constructor(props) {
    super(props);
    this.piniadux = (this.props as any).piniadux;
    this.store = this.piniadux!.store
    this.b = this.store.b
  }

  render() {
    console.log("render")
    return (
      <div>
        类子组件 2
        <Button onClick={() => {
          this.piniadux.store.b.c++
          this.piniadux.store.b.c++
          this.store.b.c++
          this.b.c++;

        }}>
          {/* //@ts-ignore */}
          {(this.props as any).piniadux.store.b.c}
        </Button>
      </div>
    );
  }
}

//@ts-ignore
const ClassChild = withPiniadux(STORE, ClassChild_helper);

function TestWithPiniadux() {
  return (
    <>
      <FunctionChild/>
      <ClassChild/>
    </>
  );
}

export default TestWithPiniadux;
