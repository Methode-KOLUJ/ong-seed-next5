declare module 'react-pageflip' {
  import * as React from 'react';

  export interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    size?: string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    showCover?: boolean;
    startPage?: number;
    orientation?: string;
    animationDuration?: number;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}
