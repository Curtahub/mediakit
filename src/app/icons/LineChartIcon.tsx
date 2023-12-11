import * as React from "react";
import { SVGProps } from "react";

export const LineChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="M9.512 3.333a1.25 1.25 0 1 0-.85-.332L7.095 6.669a1.263 1.263 0 0 0-.458.055L5.55 5.28a1.25 1.25 0 1 0-2 .101L2.262 7.525h-.005a1.25 1.25 0 1 0 .714.426l1.284-2.144a1.255 1.255 0 0 0 .625-.03L5.973 7.22a1.25 1.25 0 1 0 1.886-.222l1.57-3.667.083.002Zm-4.375 1.25a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Zm-2.5 4.167a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Zm5-.833a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Zm2.5-5.834a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z"
      clipRule="evenodd"
    />
  </svg>
);
