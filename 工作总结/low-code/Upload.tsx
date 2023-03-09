import { IControllerProps, IMeta, WIDGET_EVENT } from "@seurat/core";

import { useApp } from "@seurat/runtime";
import { message } from "antd";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import RcUpload from "rc-upload";
import type { RcFile, BeforeUploadFileType } from "rc-upload/lib/interface";
import React, { useRef } from "react";

import { BaseWidget } from "../../../base";
import { RenderContext } from "../../../context";
import { useWidgetProps } from "../../../hooks";
import { IWidgetProps } from "../../../types";

import "./Upload.less";

export const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;

interface IUploadProps extends IControllerProps {
  /**
   * @description 支持的文件后缀
   */
  accept?: string;
  /**
   * @description 支持多个文件同时上传
   */
  multiple?: boolean;
  /**
   * @description 文件大小限制(MB)
   */
  maxSize?: number;
  /**
   * @description 上传前的校验
   */
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[]
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
  /**
   * @description 值改变的函数
   */
  afterUpload?: (file: RcFile) => void;
  /**
   * @description 目标文件名
   */
  fileName?: string;
  /**
   * @description 目标文件内容
   */
  fileContent?: string;
}

const Upload = observer(({ instance, ctx }: IWidgetProps<UploadWidget>) => {
  const props = useWidgetProps(instance, ctx.variables);
  const {
    enable,
    beforeUpload,
    afterUpload,
    targetVariable,
    maxSize = 250,
    accept = ".xls,.xlsx,.xlsb,.xlsm,.xlst",
    multiple = false,
    showClassName,
    showStyle,
  } = props;

  // 获取隐藏的rc-upload
  const fileInput = useRef<any>(null);
  const app = useApp();

  const handleBeforeUpload = async (file: RcFile, fileList: RcFile[]) => {
    let parsedFile: File | Blob | string = file;
    // 大小校验
    if (file.size > maxSize * 1024 * 1024) {
      message.error(`文件不能超过${maxSize}M!`);
      return false;
    }
    // 自定义校验
    if (!beforeUpload) {
      await save(file, targetVariable);
    } else {
      const result = await beforeUpload(file, fileList);
      if (result && result instanceof Promise) {
        result.then(async (resolvedFile) => {
          await save(resolvedFile, targetVariable);
        });
      } else if (result !== false) {
        await save(file, targetVariable);
      }
      message.error(`文件未通过校验!`);
      delete (file as any)[LIST_IGNORE];
      if ((result as any) === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true,
        });
        return false;
      }

      if (typeof result === "object" && result) {
        parsedFile = result as File;
      }
    }

    return false;
  };

  // 存储于前端内存,同时处理值改变后的校验逻辑
  const save = async (file: RcFile, targetVariable?: string) => {
    await file.arrayBuffer().then((data) => {
      app.saveFile(file.name, data);
    });
    afterUpload && afterUpload(file);
    message.success(`文件保存成功!`);
  };

  const config = {
    enable,
    accept,
    multiple,
    className: showClassName,
    beforeUpload: handleBeforeUpload,
  };

  return (
    <div className={classNames("bi-upload", showClassName)}>
      <div className="bi-upload-input" style={showStyle}>
        <RcUpload ref={fileInput} {...config}>
          <div className="bi-upload-default-inner">
            <span>{"上传组件"}</span>
          </div>
        </RcUpload>
      </div>
    </div>
  );
});

export class UploadWidget extends BaseWidget<IUploadProps> {
  public static meta: IMeta = {
    type: "s-upload",
    category: "基础",
    displayName: "上传组件",
    version: "0.0.1",
    configure: {
      supports: {
        events: [WIDGET_EVENT.CLICK],
      },
    },
  };

  public render(ctx: RenderContext) {
    return <Upload key={this.id} instance={this} ctx={ctx} />;
  }
}
