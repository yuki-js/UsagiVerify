// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

import * as React from "react";
import { createUseScreenVariants } from "@plasmicapp/react-web";

export type ModeValue = "demo";
export const ModeContext = React.createContext<ModeValue | undefined>(
  "PLEASE_RENDER_INSIDE_PROVIDER" as any
);

export function useMode() {
  return React.useContext(ModeContext);
}

export default ModeContext;
/* prettier-ignore-end */
