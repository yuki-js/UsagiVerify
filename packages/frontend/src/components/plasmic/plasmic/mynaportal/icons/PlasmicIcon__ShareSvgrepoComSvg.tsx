// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ShareSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ShareSvgrepoComSvgIcon(props: ShareSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 32 32"}
      version={"1.1"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M27 22c-1.646 0-3.103.8-4.013 2.028l-13.168-6.71A5.02 5.02 0 0010 16.001c0-.572-.101-1.119-.277-1.63l13.242-6.426A4.987 4.987 0 0027 10.001a5 5 0 10-5-5c0 .388.049.764.133 1.127L8.701 12.646A4.98 4.98 0 005.001 11a5 5 0 000 10c1.59 0 3.004-.744 3.92-1.902l13.222 6.739c-.09.374-.142.762-.142 1.163a5 5 0 105-5zm0-20a3 3 0 110 6 3 3 0 010-6zM5 19a3 3 0 110-6 3 3 0 010 6zm22 11a3 3 0 110-6 3 3 0 010 6z"
        }
      ></path>
    </svg>
  );
}

export default ShareSvgrepoComSvgIcon;
/* prettier-ignore-end */
