import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { UniLanguageSwitcher } from './UniLanguageSwitcher';
import type { LanguageOption } from './UniLanguageSwitcherType';

const sampleLanguages: LanguageOption[] = [
  { code: 'en-US', label: 'English (US)', nativeName: 'English', flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es-ES', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', label: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ja-JP', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', label: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'ru-RU', label: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar-SA', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi-IN', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

const meta = {
  title: 'ANT/LanguageSwitcher',
  component: UniLanguageSwitcher,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    mode: { control: 'select', options: ['dropdown', 'autocomplete'] },
    displayStyle: { control: 'select', options: ['full', 'compact', 'flag-only', 'native-only', 'label-only'] },
    showFlags: { control: 'boolean' },
    showNativeNames: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    closeOnSelection: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    languages: sampleLanguages,
    currentLanguage: 'en-US',
    size: 'default',
    mode: 'dropdown',
    displayStyle: 'full',
    showFlags: true,
    showNativeNames: false,
    showSearch: true,
    allowClear: false,
    disabled: false,
    closeOnSelection: true,
    placeholder: 'Select Language',
  },
} satisfies Meta<typeof UniLanguageSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState(args.currentLanguage);
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Basic Language Switcher</h2>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            onCurrentLanguageChange={setSelectedLanguage}
          />
          <p style={{ marginTop: 8, color: 'var(--ut-color-text-muted)' }}>
            Selected: <strong>{selectedLanguage}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const WithNativeNames: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>With Native Names</h2>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            showFlags
            showNativeNames
            showSearch
            placeholder="Select Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
          <p style={{ marginTop: 8, color: 'var(--ut-color-text-muted)' }}>
            Selected: <strong>{selectedLanguage}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const WithoutFlags: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Without Flags</h2>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            showFlags={false}
            showNativeNames={false}
            showSearch
            placeholder="Select Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: args => {
    const [selectedSmall, setSelectedSmall] = useState('en-US');
    const [selectedDefault, setSelectedDefault] = useState('es-ES');
    const [selectedLarge, setSelectedLarge] = useState('fr-FR');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        <h2>Small</h2>
        <UniLanguageSwitcher
          {...args}
          size="small"
          currentLanguage={selectedSmall}
          showFlags
          showSearch
          placeholder="Select Language"
          onCurrentLanguageChange={setSelectedSmall}
        />
        <h2>Default</h2>
        <UniLanguageSwitcher
          {...args}
          size="default"
          currentLanguage={selectedDefault}
          showFlags
          showSearch
          placeholder="Select Language"
          onCurrentLanguageChange={setSelectedDefault}
        />
        <h2>Large</h2>
        <UniLanguageSwitcher
          {...args}
          size="large"
          currentLanguage={selectedLarge}
          showFlags
          showSearch
          placeholder="Select Language"
          onCurrentLanguageChange={setSelectedLarge}
        />
      </div>
    );
  },
};

export const WithClearButton: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>With Clear Button</h2>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            showFlags
            showSearch
            allowClear
            placeholder="Select Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
          <p style={{ marginTop: 8, color: 'var(--ut-color-text-muted)' }}>
            Selected: <strong>{selectedLanguage || 'None'}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Disabled State</h2>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            showFlags
            disabled
            placeholder="Select Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const LimitedLanguages: Story = {
  render: args => {
    const limitedLanguages: LanguageOption[] = [
      { code: 'en-US', label: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'es-ES', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
      { code: 'fr-FR', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
    ];
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');

    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Limited Language Options</h2>
          <UniLanguageSwitcher
            {...args}
            languages={limitedLanguages}
            currentLanguage={selectedLanguage}
            size="default"
            showFlags
            showNativeNames
            showSearch={false}
            placeholder="Select Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const SearchableWithFilter: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Searchable Language Switcher</h2>
          <p style={{ marginBottom: 12, color: 'var(--ut-color-text-muted)', fontSize: 14 }}>
            Try searching by language name, native name, or code (e.g., &quot;Spanish&quot;, &quot;Español&quot;,
            &quot;es-ES&quot;)
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            showFlags
            showNativeNames
            showSearch
            placeholder="Search languages..."
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const CompactStyle: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Compact Style (Flag + Native Name)</h2>
          <p style={{ marginBottom: 12, color: 'var(--ut-color-text-muted)', fontSize: 14 }}>
            Shows flag and native name only - ideal for narrow spaces
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            size="default"
            displayStyle="compact"
            placeholder="Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const FlagOnly: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Flag Only Style</h2>
          <p style={{ marginBottom: 12, color: 'var(--ut-color-text-muted)', fontSize: 14 }}>
            Shows only flag emoji - most compact option
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            size="default"
            displayStyle="flag-only"
            showSearch={false}
            placeholder="🌐"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const NativeNameOnly: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <h2>Native Name Only Style</h2>
          <p style={{ marginBottom: 12, color: 'var(--ut-color-text-muted)', fontSize: 14 }}>
            Shows only native language names
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLanguage}
            size="default"
            displayStyle="native-only"
            placeholder="Language"
            onCurrentLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
    );
  },
};

export const HeaderBarExample: Story = {
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    return (
      <div style={{ padding: 16, background: 'var(--ut-color-bg-surface-subtle)', borderRadius: 8 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            background: '#fff',
            border: '1px solid var(--ut-color-border-muted)',
            borderRadius: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: 'var(--ut-color-bg-brand-emphasis)', borderRadius: 6 }} />
            <span style={{ fontWeight: 600, color: 'var(--ut-color-text-primary)' }}>Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UniLanguageSwitcher
              {...args}
              currentLanguage={selectedLanguage}
              size="small"
              displayStyle="flag-only"
              showSearch={false}
              placeholder="🌐"
              className="uni-language-switcher--compact"
              style={{ width: 50 }}
              onCurrentLanguageChange={setSelectedLanguage}
            />
            <button
              style={{
                background: 'var(--ut-color-bg-brand)',
                color: '#fff',
                border: 'none',
                padding: '6px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const AllDisplayStyles: Story = {
  render: args => {
    const [selectedFull, setSelectedFull] = useState('en-US');
    const [selectedCompact, setSelectedCompact] = useState('es-ES');
    const [selectedFlagOnly, setSelectedFlagOnly] = useState('fr-FR');
    const [selectedNativeOnly, setSelectedNativeOnly] = useState('de-DE');
    const [selectedLabelOnly, setSelectedLabelOnly] = useState('ja-JP');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <h2>All Display Styles Comparison</h2>
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid var(--ut-color-border-default)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Full (Default)</h3>
          <p style={{ marginBottom: 8, color: 'var(--ut-color-text-muted)', fontSize: 13 }}>
            Flag + Label (+ Native Name if enabled)
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedFull}
            displayStyle="full"
            showFlags
            showNativeNames={false}
            onCurrentLanguageChange={setSelectedFull}
          />
        </div>
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid var(--ut-color-border-default)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Compact</h3>
          <p style={{ marginBottom: 8, color: 'var(--ut-color-text-muted)', fontSize: 13 }}>
            Flag + Native Name (ideal for narrow widths)
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedCompact}
            displayStyle="compact"
            onCurrentLanguageChange={setSelectedCompact}
          />
        </div>
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid var(--ut-color-border-default)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Flag Only</h3>
          <p style={{ marginBottom: 8, color: 'var(--ut-color-text-muted)', fontSize: 13 }}>
            Only flag emoji (most compact)
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedFlagOnly}
            displayStyle="flag-only"
            showSearch={false}
            placeholder="🌐"
            style={{ width: 80 }}
            onCurrentLanguageChange={setSelectedFlagOnly}
          />
        </div>
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid var(--ut-color-border-default)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Native Name Only</h3>
          <p style={{ marginBottom: 8, color: 'var(--ut-color-text-muted)', fontSize: 13 }}>
            Only native language name
          </p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedNativeOnly}
            displayStyle="native-only"
            onCurrentLanguageChange={setSelectedNativeOnly}
          />
        </div>
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid var(--ut-color-border-default)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Label Only</h3>
          <p style={{ marginBottom: 8, color: 'var(--ut-color-text-muted)', fontSize: 13 }}>Only English label</p>
          <UniLanguageSwitcher
            {...args}
            currentLanguage={selectedLabelOnly}
            displayStyle="label-only"
            onCurrentLanguageChange={setSelectedLabelOnly}
          />
        </div>
      </div>
    );
  },
};
