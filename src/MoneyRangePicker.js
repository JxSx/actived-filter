import React, { useCallback, useEffect, useState } from "react";
import { InputNumber } from "antd";

export default function MoneyRangePicker(props) {
  const [arr, setV] = useState(() => {
    return props.value || [];
  });
  console.log(props.value);
  const _onChange = useCallback((index, value) => {
    setV((arr) => {
      arr[index] = value;
      const $arr = [...arr];
      props.onChange($arr);
      return $arr;
    });
  }, []);

  useEffect(() => {
    setV(props.value);
  }, [props.value]);

  return (
    <div>
      <InputNumber
        onChange={(v) => {
          _onChange(0, v);
        }}
        value={arr[0]}
        style={{ width: "45%", minWidth: 80 }}
      />
      <span
        style={{ width: "10%", display: "inline-block", textAlign: "center" }}
      >
        ~
      </span>
      <InputNumber
        value={arr[1]}
        onChange={(v) => {
          _onChange(1, v);
        }}
        style={{ width: "45%", minWidth: 80 }}
      />
    </div>
  );
}
