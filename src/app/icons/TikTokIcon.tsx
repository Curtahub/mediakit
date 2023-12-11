import * as React from "react";
import { SVGProps } from "react";

export const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" viewBox={`0 0 16 16`} {...props}>
    <path
      fill={props.color ?? "#ED243A"}
      d="M11.382 0H8.685v10.899c0 1.298-1.037 2.365-2.327 2.365-1.291 0-2.328-1.067-2.328-2.365 0-1.276 1.014-2.32 2.258-2.366V5.797c-2.742.046-4.955 2.296-4.955 5.102C1.333 13.728 3.592 16 6.381 16c2.788 0 5.047-2.296 5.047-5.101V5.31A6.244 6.244 0 0 0 15 6.516V3.78c-2.028-.07-3.618-1.74-3.618-3.78Z"
    />
  </svg>
);
