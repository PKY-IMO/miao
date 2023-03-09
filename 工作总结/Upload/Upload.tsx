import { IControllerProps, IMeta } from "@seurat/core";

import { useApp } from "@seurat/runtime";
import { message } from "antd";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import RcUpload from "rc-upload";
import type { RcFile } from "rc-upload/lib/interface";

import { ControllerWidget } from "../../../base";
import { RenderContext } from "../../../context";
import { useFormControlWithValue } from "../../../hooks";
import { IWidgetProps } from "../../../types";

import "./Upload.less";

interface IUploadProps extends IControllerProps {
  value: string;
  /**
   * @description 支持的文件后缀
   */
  accept?: string;
  /**
   * @description 文件大小限制(MB)
   */
  maxSize?: number;
  /**
   * @description 存储的变量
   */
  fileName?: string;
}

const Upload = observer(({ instance, ctx }: IWidgetProps<UploadWidget>) => {
  const [props] = useFormControlWithValue(instance, ctx);
  const {
    enable,
    maxSize = 250,
    accept = ".xls,.xlsx,.xlsb,.xlsm,.xlst",
    showClassName,
    showStyle,
    fileName,
    value,
  } = props;

  const app = useApp();

  const handleBeforeUpload = async (file: RcFile) => {
    if (fileName) {
      // 大小校验
      if (file.size > maxSize * 1024 * 1024) {
        message.error(`文件不能超过${maxSize}M!`);
        return false;
      }
      await save(file);
      handleChange(fileName);
    }

    // 不需要向后台发请求
    return false;
  };

  // 值改变事件
  const handleChange = (v: string) => {
    instance.updateValue(v, ctx);
  };

  // 存储于前端指定变量
  const save = async (file: RcFile) => {
    if (fileName) {
      await file.arrayBuffer().then((data) => {
        app.saveFile(file.name, data, fileName);
      });
    } else {
      message.error(`请输入文件名!`);
      return;
    }
    message.success(`文件保存成功!`);
  };

  const config = {
    disabled: !enable,
    accept,
    multiple: false,
    className: showClassName,
    beforeUpload: handleBeforeUpload,
  };

  return (
    <div className={classNames("s-upload", showClassName)}>
      <div className="s-upload-input" style={showStyle}>
        <RcUpload {...config}>
          <div className="s-upload-default-inner">
            <span>{value ? value : "上传组件"}</span>
          </div>
        </RcUpload>
      </div>
    </div>
  );
});

export class UploadWidget extends ControllerWidget<IUploadProps> {
  public static meta: IMeta = {
    type: "s-upload",
    category: "基础",
    displayName: "上传组件",
    version: "0.0.1",
  };

  public render(ctx: RenderContext) {
    return <Upload key={this.id} instance={this} ctx={ctx} />;
  }
}
