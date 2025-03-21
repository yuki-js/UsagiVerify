// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type DownLgSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function DownLgSvgrepoComSvgIcon(props: DownLgSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M3.293 14.707a1 1 0 011.414-1.414L11 19.586V2a1 1 0 012 0v17.586l6.293-6.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-.325.216.986.986 0 01-.764 0 1 1 0 01-.325-.216z"
        }
      ></path>
    </svg>
  );
}

export default DownLgSvgrepoComSvgIcon;
/* prettier-ignore-end */
