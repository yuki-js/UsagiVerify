// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Add24DpFill0Wght400Grad0Opsz24SvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Add24DpFill0Wght400Grad0Opsz24SvgIcon(
  props: Add24DpFill0Wght400Grad0Opsz24SvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 -960 960 960"}
      fill={"currentColor"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240z"}
      ></path>
    </svg>
  );
}

export default Add24DpFill0Wght400Grad0Opsz24SvgIcon;
/* prettier-ignore-end */
