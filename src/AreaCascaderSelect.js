import React from "react";
import { Cascader } from "antd";

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    isLeaf: false
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    isLeaf: false
  }
];

export default class AreaCascaderSelect extends React.Component {
  state = {
    options
  };

  onChange = (value, selectedOptions, extra) => {
    console.log(value, selectedOptions, extra);
    this.props.onChange(value, selectedOptions, extra);
  };

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1"
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2"
        }
      ];
      this.setState({
        options: [...this.state.options]
      });
    }, 1000);
  };

  render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}
