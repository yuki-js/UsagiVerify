// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PencilSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PencilSvgrepoComSvgIcon(props: PencilSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M9.657 17H7v-3m-.898.897L17.411 3.59a2 2 0 012.828 2.828L8.764 17.893c-.536.536-.804.804-1.1 1.034a5.999 5.999 0 01-.838.545c-.331.178-.685.315-1.392.588L3 21l.783-2.35c.267-.802.401-1.203.587-1.577a5.92 5.92 0 01.584-.945c.252-.334.55-.633 1.148-1.23z"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default PencilSvgrepoComSvgIcon;
/* prettier-ignore-end */
