// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type OpenExternalSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function OpenExternalSvgrepoComSvgIcon(
  props: OpenExternalSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 512 512"}
      version={"1.1"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M213.333 128v42.666H128V384h213.333v-85.334H384l.001 128H85.333V128h128zM448 64v170.667h-42.667v-97.832L228.418 313.752l-30.17-30.17 176.915-176.916h-97.83V64H448z"
        }
        fill={"currentColor"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default OpenExternalSvgrepoComSvgIcon;
/* prettier-ignore-end */
