import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
export type OnGlobalStateChangeCallback = (state: Record<string, any>, prevState: Record<string, any>) => void;

export type MicroAppStateActions = {
  onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
  setGlobalState: (state: Record<string, any>) => boolean;
  offGlobalStateChange: () => boolean;
};

export declare function initGlobalState(state?: Record<string, any>): MicroAppStateActions;

/**
 * 微服务共享 bus 事件类型
 */
export enum EventBusType {
  /**
   * 默认
   */
  'VOID',
  /**
   * 同步共享状态，用于微服务 mount 同步共享状态
   */
  'SYNC',
  /**
   * 设置多语言
   */
  'SET_LANGUAGE',
  'SET_MENU',
}

export interface QianKunState {
  eventBusType?: EventBusType;
  lng?: any;
  menus?: string[]
}

export default class StoreShared<T, S extends Record<string, any>> {
  private microAppStateActions?: MicroAppStateActions
  private _toolkitStore!: ToolkitStore<T>

  /**
   *
   * @param toolkitStore redux 状态
   * @param initialize qiankun state 微应用可不传初始值
   */
  constructor(toolkitStore: ToolkitStore<T>, microAppStateActions?: MicroAppStateActions) {
    this._toolkitStore = toolkitStore
    if (microAppStateActions) {
      this.microAppStateActions = microAppStateActions
      this.listen()
    }

    this.listenerMap.forEach((callback, type) => {
      this.on(type, callback.bind(this))
    })
  }

  setMicroAppStateActions(actions: MicroAppStateActions) {
    this.microAppStateActions = actions
    return this
  }

  get toolkitStore() {
    return this._toolkitStore.getState()
  }

  public eventBus: Map<EventBusType, Array<(state: S, prevState: S) => void>> = new Map()

  public listen() {
    this.microAppStateActions?.onGlobalStateChange((state, prev) => {
      const event = state.eventBusType as EventBusType
      this.eventBus.get(event)?.forEach(event => event(state as S, prev as S))
    })
    return this
  }

  on(eventBusType: EventBusType, action: (state: S, prevState: S) => void) {
    if (this.eventBus.has(eventBusType)) {
      this.eventBus.get(eventBusType)?.push(action)
    } else {
      this.eventBus.set(eventBusType, [action])
    }
  }

  /**
   *
   * @param [string]event 指定事件名称
   * @returns [boolean] result
   */
  off(eventBusType?: EventBusType, action?: (state: S, prevState: S) => void): boolean {
    // 删除所有监听
    if (!eventBusType) {
      this.eventBus.clear()
      if (this.microAppStateActions) {
        return this.microAppStateActions.offGlobalStateChange()
      }
      return true
    }

    // 删除对应监听
    if (action) {
      const bus = this.eventBus.get(eventBusType)
      if (!bus) {
        return false
      }

      const index = bus.findIndex(act => act === action)

      if (index > 0) {
        bus.splice(index, 1)
        return true
      }

      return false
    }

    // 清空 key
    return this.eventBus.delete(eventBusType)
  }

  emit(eventBusType: EventBusType, data: S) {
    // 作为微服务使用
    if (this.microAppStateActions) {
      this.microAppStateActions.setGlobalState({ eventBusType, ...data })
    } else {
      // 单独使用
      this.eventBus.get(eventBusType)?.forEach(event => event(data, data))
    }
  }

  /**
   * 所有微服务共享的监听程序
   */
  private listenerMap = new Map<EventBusType, (state: S, prev: S) => void>([
    /**
     * 微服务 afterMount 后执行
     */
    [
      EventBusType.SYNC,
      (state, prev) => {
        console.info('share state synced', state)
      }
    ]
  ])
}