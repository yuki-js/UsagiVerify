// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ArrowRightLineSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ArrowRightLineSvgIcon(props: ArrowRightLineSvgIconProps) {
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

      <g clipPath={"url(#hZjt9yItiJxia)"}>
        <path d={"M9 21l-1-1 8-8-8-8 1-1 9.1 9L9 21z"} fill={"#1A1A1C"}></path>
      </g>

      <defs>
        <clipPath id={"hZjt9yItiJxia"}>
          <path fill={"#fff"} d={"M0 0h24v24H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowRightLineSvgIcon;
/* prettier-ignore-end */
