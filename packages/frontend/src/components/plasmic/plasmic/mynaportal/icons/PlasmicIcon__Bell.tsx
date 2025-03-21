// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BellIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BellIcon(props: BellIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 16 16"}
      fill={"none"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M3 5a5 5 0 0110 0v3l2 2v2H1v-2l2-2V5zm5 11a3.001 3.001 0 01-2.83-2h5.66A3.001 3.001 0 018 16z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BellIcon;
/* prettier-ignore-end */
