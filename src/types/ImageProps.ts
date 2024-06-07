// src/types/ImageProps.ts
import type { HTMLAttributes } from 'react';

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  'client:load'?: boolean;
}