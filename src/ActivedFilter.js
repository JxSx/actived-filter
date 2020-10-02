import React from "react";
import { Tag } from "antd";
import { FormSpy, LifeCycleTypes } from "@formily/antd"; // 或者 @formily/next
import { isNull, isEmpty } from "./utils";

/**
 * 全局自定义回调，注册onReduser,onTagClose的回调
 */
const customCallbacks = {};

/**
 * 注册自定义回调方法
 * @param {*} xComponent 等用于x-component,字符串小写
 * @param {{
 *  onReducer,
 *  onTagClose
 * }} value 对象{onReducer, onTagClose}，包含两个回调函数 onReducer处理code到label的转换
 */
export const registeCustomeCallback = (xComponent, value) => {
  customCallbacks[xComponent] = value;
};

/**
 * 全局筛选项
 */
const activedFilters = {};

const remove = (key) => {
  delete activedFilters[key];
};

const handleReducer = (state, action, form) => {
  console.log("reducer:", state, action);
  let {
    value,
    props,
    props: { name, title }
  } = action.payload;
  if (isEmpty(value)) {
    remove(name);
    return { ...activedFilters };
  }
  // 处理内置组件
  const xComponent = props["x-component"];
  if (["switch"].includes(xComponent)) {
    value = value ? "是" : "否";
  } else if (["select", "radio", "checkbox", "transfer"].includes(xComponent)) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    value = value
      .map((v) => {
        const item = props.enum.find(
          (item) => item.value === v || item.key === v
        );
        return item.label || item.title;
      })
      .join(",");
  } else if (
    // ["daterangepicker", "timerangepicker"].includes(xComponent)
    xComponent.endsWith("rangepicker")
  ) {
    const [start, end] = value;
    if (isNull(start) && isNull(end)) {
      remove(name);
      return { ...activedFilters };
    }
    value = value.join("~");
  } else if (customCallbacks.hasOwnProperty(xComponent)) {
    value =
      customCallbacks[xComponent].onReducer &&
      customCallbacks[xComponent].onReducer(
        state,
        action,
        form,
        activedFilters
      );
  }
  activedFilters[name] = { title, value, xComponent };
  return { ...activedFilters };
};

const onTagClose = (xComponent, key, form) => {
  if (customCallbacks.hasOwnProperty(xComponent)) {
    customCallbacks[xComponent].onTagClose &&
      customCallbacks[xComponent].onTagClose(key, form);
  } else {
    form.setFieldValue(key, undefined);
  }
};

export default function ActivedFilter() {
  return (
    <FormSpy
      selector={[LifeCycleTypes.ON_FIELD_VALUE_CHANGE]}
      reducer={handleReducer}
    >
      {({ state, type, form }) => {
        return (
          <div>
            <div>{JSON.stringify(state)}</div>
            当前搜索：
            {Object.keys(activedFilters).map((key) => {
              const { xComponent, title, value } = activedFilters[key];
              return (
                <Tag
                  key={key}
                  closable
                  onClose={() => onTagClose(xComponent, key, form)}
                >
                  {title} : {value}
                </Tag>
              );
            })}
          </div>
        );
      }}
    </FormSpy>
  );
}
