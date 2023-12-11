import * as React from "react";
import { SVGProps } from "react";

export const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="M9.095 3.333a1.667 1.667 0 1 0-1.63-1.317l-3.78 1.89a1.667 1.667 0 1 0 0 2.189l3.78 1.89a1.667 1.667 0 1 0 .373-.745l-3.78-1.89a1.674 1.674 0 0 0 0-.7l3.78-1.889c.305.35.755.572 1.257.572Zm.833 5a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0ZM3.262 5a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0Zm6.666-3.333a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0Z"
      clipRule="evenodd"
    />
  </svg>
);
