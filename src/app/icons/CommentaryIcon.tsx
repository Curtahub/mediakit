import * as React from "react";
import { SVGProps } from "react";

export const CommentaryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path
      fill={props.color ?? "#101010"}
      d="M8.262 1.667h-5V2.5h5v-.833ZM8.262 3.333h-5v.834h5v-.834ZM3.262 5h3.333v.833H3.262V5Z"
    />
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="M2.428 0C1.508 0 .762.746.762 1.667v4.166c0 .92.746 1.667 1.666 1.667V10l2.87-2.5h3.797c.92 0 1.666-.746 1.666-1.667V1.667C10.761.747 10.015 0 9.095 0H2.428Zm-.833 1.667c0-.46.373-.834.833-.834h6.667c.46 0 .833.373.833.834v4.166c0 .46-.373.834-.833.834h-4.12l-1.713 1.45v-1.45h-.834a.833.833 0 0 1-.833-.834V1.667Z"
      clipRule="evenodd"
    />
  </svg>
);
