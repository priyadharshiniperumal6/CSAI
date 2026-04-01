export type LanguageOption = {
  code: string;
  label: string;
  nativeName?: string;
  direction?: 'ltr' | 'rtl';
  flag?: string;
  disabled?: boolean;
};

export type UniLanguageSwitcherDisplayStyle = 'full' | 'compact' | 'flag-only' | 'native-only' | 'label-only';

export type UniLanguageSwitcherSize = 'small' | 'default' | 'large';

export type UniLanguageSwitcherMode = 'dropdown' | 'autocomplete';

export type UniLanguageSwitcherProps = {
  languages: LanguageOption[];
  currentLanguage?: string;
  id?: string;
  ariaLabel?: string;
  size?: UniLanguageSwitcherSize;
  mode?: UniLanguageSwitcherMode;
  displayStyle?: UniLanguageSwitcherDisplayStyle;
  showFlags?: boolean;
  showNativeNames?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  closeOnSelection?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  filterOption?: (input: string, option: LanguageOption) => boolean;
  onChange?: (languageCode: string, language: LanguageOption) => void;
  onCurrentLanguageChange?: (languageCode: string) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
};
