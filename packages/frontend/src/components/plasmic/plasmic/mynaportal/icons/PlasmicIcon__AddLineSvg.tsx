// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AddLineSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function AddLineSvgIcon(props: AddLineSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g clipPath={"url(#hkz_hUvcWgkMa)"}>
        <path
          d={"M21 11.2h-8.3V3h-1.5v8.2H3v1.5h8.2V21h1.5v-8.3H21v-1.5z"}
          fill={"#1A1A1C"}
        ></path>
      </g>

      <defs>
        <clipPath id={"hkz_hUvcWgkMa"}>
          <path fill={"#fff"} d={"M0 0h24v24H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default AddLineSvgIcon;
/* prettier-ignore-end */
