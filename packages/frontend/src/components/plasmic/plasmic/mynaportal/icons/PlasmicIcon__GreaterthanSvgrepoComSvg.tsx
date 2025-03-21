// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type GreaterthanSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function GreaterthanSvgrepoComSvgIcon(
  props: GreaterthanSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 56 56"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M13.832 43.563c.656 0 1.102-.211 1.594-.446l26.343-11.836c1.337-.633 2.391-1.664 2.391-3.164 0-1.476-1.031-2.555-2.414-3.164l-26.32-12.117c-.469-.234-.89-.399-1.5-.399-1.219 0-2.086.844-2.086 2.087 0 1.078.562 1.687 1.547 2.156l25.218 11.133v.257L13.387 39.297c-.985.469-1.547 1.078-1.547 2.156 0 1.29.844 2.11 1.992 2.11z"
        }
      ></path>
    </svg>
  );
}

export default GreaterthanSvgrepoComSvgIcon;
/* prettier-ignore-end */
