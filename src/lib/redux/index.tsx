/**
 * @author: hukun
 * @Date: 2019-05-15
 * @Time: 16:29
 * @function
 * TODO 类型还是有些问题
 */
import * as React from 'react'

interface objectAction<T> {
  type: string,
  reducer: ((lastState: T) => T) | { [key: string]: any }
}

type functionAction<T> = (dispatch: (value) => void, state: T) => void;

type combinationAction<T> = objectAction<T> | functionAction<T>;

type dispatch<T> = (action: combinationAction<T>) => Promise<any>;


interface IStore<T> {
  isDev: boolean,
  initState: T,
  _state: T;
  useContext: () => T,
  dispatch: dispatch<T>,
  getState: () => T,
}

interface options<T> {
  initState?: T;
  isDev?: boolean;
  reducer?: (state: T, action: { type: string, reducer: (lastState: T) => any }) => T;
  middleware?: ((store: IStore<T>, lastState: T, nextState: T, action: { type: string, reducer: (lastState: T) => any }) => T)[]
}


/**
 * 打印更改日志的中间件
 * @param store
 * @param lastState
 * @param nextState
 * @param action
 */
function middleware_printStateChange(store, lastState, nextState, action) {
  if (store.isDev) {
    console.group(
      `%c|------- redux: ${action.type} -------|`,
      `background: rgb(70, 70, 70); color: rgb(240, 235, 200); width:100%;`,
    );
    console.log('|--last:', lastState);
    console.log('|--next:', nextState);
    console.groupEnd();
  }
}


/**
 * store 的数据更新
 * @param state
 * @param action
 */
function reducerInAction<T>(state: T, action: { type: string, reducer: (lastState: T) => T }): T {
  if (typeof action.reducer === 'function') {
    return Object.assign({}, state, action.reducer(state));
  }
  if (typeof action.reducer === 'object') {
    return Object.assign({}, state, action.reducer);
  }
  return state;
}

/**
 * 导出对象, 创建一个 store
 * @param option
 */
export function createStore<T>(option: options<T>): { Provider: React.FC, store: IStore<T> } {
  ///// 数据初始化
  const { initState, isDev, reducer, middleware } = Object.assign({}, {
    reducer: reducerInAction,
    isDev: true,
    initState: {},
    middleware: []
  }, option);

  ///// 默认添加打印日志
  if (isDev) {
    middleware.unshift(middleware_printStateChange);
  }

  ///// 创建 context
  const AppContext = React.createContext({});


  ///// 初始化 store
  const store: IStore<T> = {
    isDev,
    _state: initState,
    useContext: function () {
      return React.useContext(AppContext) as T;
    },
    dispatch: undefined,
    getState: function () {
      return store._state;
    },
    initState
  };

  ///// 用于首次运行时检查中间件格式
  let isCheckedMiddleware = false;

  /**
   * 数据更新方法
   * @param lastState
   * @param action
   * @constructor
   */
  function Reducer(lastState: T, action: objectAction<T>) {
    ///// 获取信息state
    let nextState = reducer(lastState, action);
    ///// 检查中间件格式
    if (!isCheckedMiddleware) {
      if (Object.prototype.toString.call(middleware) !== '[object Array]') {
        throw new Error("react-hooks-redux: middleware isn't Array");
      }
      isCheckedMiddleware = true;
    }
    ///// 运行中间件
    for (let mid of middleware) {
      const newState = mid(store, lastState, nextState, action);
      if (newState) {
        nextState = newState;
      }
    }
    ///// 更新到store上
    store._state = nextState;
    return nextState;
  }

  /**
   * 返回一个provider组件
   * @param props
   * @constructor
   */
  const Provider = props => {
    const [state, dispatch] = React.useReducer(Reducer, initState);
    ///// 初始化 dispatch方法
    if (!store.dispatch) {
      store.dispatch = async function (action: combinationAction<T>) {
        if (typeof action === 'function') {
          await action(dispatch, store._state);
        } else {
          dispatch(action);
        }
      };
    }
    return <AppContext.Provider {...props} value={state} />;
  };
  return { Provider, store };
}

