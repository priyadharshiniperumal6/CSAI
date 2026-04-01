import type { UniIconType } from '../../types/icon';

export interface UniTagType {
  value: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  type: string;
  maxItems?: number;
  startIcon?: UniIconType;
  endIcon?: UniIconType;
}

export interface UniTagTypeProps {
  params: UniTagType;
}
