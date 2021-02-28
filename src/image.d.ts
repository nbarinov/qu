import { HTMLAttributes } from 'react';

declare global {
  interface HTMLImageElement {
    importance?: 'high' | 'low' | 'auto';
  }
}

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    importance?: 'high' | 'low' | 'auto';
  }
}

export { };
