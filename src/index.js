import React from "react";
import ReactDOM from "react-dom";
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  registerFormField,
  connect
} from "@formily/antd"; // 或者 @formily/next
import Printer from "@formily/printer";
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  FormMegaLayout
} from "@formily/antd-components"; // 或者@formily/next-components
import "antd/dist/antd.css";
import ActivedFilter, { registeCustomeCallback } from "./ActivedFilter";
import MoneyRangePicker from "./MoneyRangePicker";
import AreaCascaderSelect from "./AreaCascaderSelect";

registerFormField("moneyrangepicker", connect()(MoneyRangePicker));
registerFormField("areacascaderselect", connect()(AreaCascaderSelect));

registeCustomeCallback("areacascaderselect", {
  onReducer: (state, action, form, values) => {
    return "哈哈";
  },
  onTagClose: (key, form) => {
    console.log("onTagClose", key);
  }
});

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  TimeRangePicker: TimePicker.RangePicker,
  Upload,
  Range,
  Rating,
  Transfer
};

const App = () => (
  <Printer>
    <SchemaForm components={components}>
      <FormMegaLayout grid autoRow full labelAlign="top">
        <Field type="string" title="姓名" name="string" x-component="Input" />
        <Field
          type="string"
          enum={[
            { value: 1, label: "篮球" },
            { value: 2, label: "足球" }
          ]}
          title="单选"
          name="radio"
          x-component="Radio"
        />
        <Field
          type="array"
          title="爱好(多选)"
          name="hobby1"
          x-component="select"
          x-component-props={{ mode: "multiple" }}
          enum={[
            { value: 1, label: "篮球" },
            { value: 2, label: "足球" }
          ]}
        />
        <Field
          type="string"
          enum={[
            { value: 1, label: "篮球" },
            { value: 2, label: "足球" }
          ]}
          title="Checkbox"
          name="checkbox"
          x-component="Checkbox"
        />
        <Field
          type="number"
          title="数字选择"
          name="number"
          x-component="NumberPicker"
        />
        <Field
          type="string"
          title="日期选择"
          name="date"
          x-component="DatePicker"
        />
        <Field
          type="array<date>"
          title="日期范围"
          default={["2018-12-19", "2018-12-19"]}
          name="daterange"
          x-component="DateRangePicker"
        />
        <Field
          type="array"
          title="金额范围"
          name="moneyrange"
          x-component="MoneyRangePicker"
        />
        <Field
          type="string"
          title="年份"
          name="year"
          x-component="YearPicker"
        />
        <Field
          type="number"
          title="范围选择"
          name="range"
          x-component-props={{ min: 0, max: 1024, marks: [0, 1024] }}
          x-component="Range"
        />
        <Field type="number" title="等级" name="rating" x-component="Rating" />
        <Field
          type="string"
          title="地区级联"
          name="hobby2"
          x-component="AreaCascaderSelect"
        />
      </FormMegaLayout>
      <ActivedFilter />
      <FormButtonGroup offset={5}>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);

ReactDOM.render(<App />, document.getElementById("root"));
