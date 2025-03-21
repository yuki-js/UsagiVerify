// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type InboxIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function InboxIcon(props: InboxIconProps) {
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

      <g clipPath={"url(#qppubrLfgva_a)"}>
        <path
          d={
            "M2 4v16h20V4H2zm18.4 1.5L12 11.9 3.6 5.5h16.8zm-16.9 13V7.3l8.5 6.5 8.5-6.5v11.2h-17z"
          }
          fill={"#1A1A1C"}
        ></path>
      </g>

      <defs>
        <clipPath id={"qppubrLfgva_a"}>
          <path fill={"#fff"} d={"M0 0h24v24H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default InboxIcon;
/* prettier-ignore-end */
