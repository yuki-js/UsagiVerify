// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type TrashSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function TrashSvgrepoComSvgIcon(props: TrashSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M22 5h-5V2a1 1 0 00-1-1H8a1 1 0 00-1 1v3H2a1 1 0 000 2h1.061L4 22.063A1 1 0 005 23h14a1 1 0 001-.937L20.939 7H22a1 1 0 000-2zM9 3h6v2H9zm9.061 18H5.939L5.064 7h13.872zM9 11v6a1 1 0 01-2 0v-6a1 1 0 012 0zm4 0v6a1 1 0 01-2 0v-6a1 1 0 012 0zm3-1a1 1 0 011 1v6a1 1 0 01-2 0v-6a1 1 0 011-1z"
        }
      ></path>
    </svg>
  );
}

export default TrashSvgrepoComSvgIcon;
/* prettier-ignore-end */
