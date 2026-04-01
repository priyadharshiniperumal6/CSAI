import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

import type {
  LanguageOption,
  UniLanguageSwitcherDisplayStyle,
  UniLanguageSwitcherProps,
  UniLanguageSwitcherSize,
} from './UniLanguageSwitcherType';

import './UniLanguageSwitcher.scss';

const mapSize = (size?: UniLanguageSwitcherSize) => {
  if (!size || size === 'default') return 'middle';
  return size;
};

const buildOption = (lang: LanguageOption) => ({
  value: lang.code,
  label: lang.label,
  flag: lang.flag,
  nativeName: lang.nativeName,
  disabled: lang.disabled ?? false,
});

const renderOption = (displayStyle: UniLanguageSwitcherDisplayStyle, showFlags: boolean, showNativeNames: boolean) =>
  function RenderOption(option: any) {
    const { label, flag, nativeName } = option;
    const nativeLabel = nativeName || label;

    return (
      <div className={classNames('uni-language-option', `uni-language-option--${displayStyle}`)}>
        {displayStyle === 'full' && (
          <>
            {showFlags && flag ? <span className="uni-language-flag">{flag}</span> : null}
            <span className="uni-language-label">
              {label}
              {showNativeNames && nativeName && nativeName !== label ? (
                <span className="uni-language-native">({nativeName})</span>
              ) : null}
            </span>
          </>
        )}
        {displayStyle === 'compact' && (
          <>
            {flag ? <span className="uni-language-flag">{flag}</span> : null}
            <span className="uni-language-label">{nativeLabel}</span>
          </>
        )}
        {displayStyle === 'flag-only' && (
          <span className="uni-language-flag uni-language-flag--only">{flag || label?.charAt(0)?.toUpperCase()}</span>
        )}
        {displayStyle === 'native-only' && <span className="uni-language-label">{nativeLabel}</span>}
        {displayStyle === 'label-only' && <span className="uni-language-label">{label}</span>}
      </div>
    );
  };

export const UniLanguageSwitcher = function UniLanguageSwitcher({
  languages,
  currentLanguage,
  id,
  ariaLabel,
  size = 'default',
  mode = 'dropdown',
  displayStyle = 'full',
  showFlags = true,
  showNativeNames = false,
  showSearch = true,
  allowClear = false,
  disabled = false,
  closeOnSelection = true,
  placeholder = 'Select Language',
  className,
  style,
  filterOption,
  onChange,
  onCurrentLanguageChange,
  onDropdownVisibleChange,
  onSearch,
}: UniLanguageSwitcherProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(currentLanguage);

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const options = useMemo(() => languages.map(buildOption), [languages]);

  const handleChange: SelectProps['onChange'] = value => {
    const code = value ? String(value) : '';
    const language = languages.find(lang => lang.code === code);
    if (!language) return;
    setSelectedLanguage(code);
    onChange?.(code, language);
    onCurrentLanguageChange?.(code);
  };

  const handleDropdownVisibleChange = (open: boolean) => {
    onDropdownVisibleChange?.(open);
  };

  const handleSearch = (value: string) => {
    onSearch?.(value);
  };

  const filterLanguageOption = (input: string, option?: any) => {
    if (!option) return false;
    const language = languages.find(lang => lang.code === option.value);
    if (!language) return false;
    if (filterOption) return filterOption(input, language);
    const search = input.toLowerCase();
    return (
      language.label.toLowerCase().includes(search) ||
      language.code.toLowerCase().includes(search) ||
      (language.nativeName ? language.nativeName.toLowerCase().includes(search) : false)
    );
  };

  const computedClass = classNames('uni-language-switcher', className);

  return (
    <Select
      id={id}
      value={selectedLanguage}
      placeholder={placeholder}
      size={mapSize(size)}
      disabled={disabled}
      aria-label={ariaLabel}
      allowClear={allowClear}
      showSearch={mode === 'autocomplete' ? true : showSearch}
      filterOption={filterLanguageOption}
      options={options}
      className={computedClass}
      style={style}
      optionRender={renderOption(displayStyle, showFlags, showNativeNames)}
      suffixIcon={<span className="uni-language-arrow" />}
      onChange={handleChange}
      onOpenChange={handleDropdownVisibleChange}
      onSearch={handleSearch}
      onSelect={() => {
        if (closeOnSelection) {
          // Antd closes automatically on selection, but we keep parity for future overrides.
        }
      }}
    />
  );
};
