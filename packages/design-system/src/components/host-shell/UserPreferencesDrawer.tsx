import { UniDrawer } from '../drawer/UniDrawer';
import { UniLanguageSwitcher } from '../language-switcher/UniLanguageSwitcher';
import type { LanguageOption } from '../language-switcher/UniLanguageSwitcherType';
import { UniSelect } from '../select/UniSelect';

export type HostShellPreferenceOption = {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type HostShellPreferenceOptionSet<T> = T[] | false;

export type HostShellUserPreferences = {
  title?: string;
  description?: string;
  drawerWidth?: number | string;
  personas?: HostShellPreferenceOptionSet<HostShellPreferenceOption>;
  datasets?: HostShellPreferenceOptionSet<HostShellPreferenceOption>;
  languages?: HostShellPreferenceOptionSet<LanguageOption>;
  selectedPersonaKey?: string;
  selectedDatasetKey?: string;
  selectedLanguageCode?: string;
  personaLabel?: string;
  personaDescription?: string;
  datasetLabel?: string;
  datasetDescription?: string;
  languageLabel?: string;
  languageDescription?: string;
};

export const HOST_SHELL_DEFAULT_PERSONAS: HostShellPreferenceOption[] = [
  { key: 'admin', label: 'Admin' },
  { key: 'builder', label: 'Builder' },
  { key: 'business-analysis', label: 'Business Analysis' },
  { key: 'agent', label: 'Agent' },
  { key: 'supervisor', label: 'Supervisor' },
];

export const HOST_SHELL_DEFAULT_DATASETS: HostShellPreferenceOption[] = [
  { key: 'first-time-user', label: 'First-time User' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'power-user', label: 'Power User' },
];

export const HOST_SHELL_DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: 'en-US', label: 'English' },
  { code: 'es-ES', label: 'Spanish' },
  { code: 'fr-FR', label: 'French' },
  { code: 'ar-SA', label: 'Arabic' },
];

const resolvePreferenceOptions = <T,>(options: T[] | false | undefined, fallback: T[]) => {
  if (options === false) {
    return [];
  }

  return options?.length ? options : fallback;
};

export const resolveHostShellUserPreferences = (preferences?: HostShellUserPreferences) => {
  const personas = resolvePreferenceOptions(preferences?.personas, HOST_SHELL_DEFAULT_PERSONAS);
  const datasets = resolvePreferenceOptions(preferences?.datasets, HOST_SHELL_DEFAULT_DATASETS);
  const languages = resolvePreferenceOptions(preferences?.languages, HOST_SHELL_DEFAULT_LANGUAGES);

  return {
    title: preferences?.title ?? 'User preferences',
    description:
      preferences?.description ?? 'Adjust the active persona, mock data set, and UX language for this workspace.',
    drawerWidth: preferences?.drawerWidth ?? 420,
    personas,
    datasets,
    languages,
    selectedPersonaKey: preferences?.selectedPersonaKey ?? personas[0]?.key,
    selectedDatasetKey: preferences?.selectedDatasetKey ?? datasets[0]?.key,
    selectedLanguageCode: preferences?.selectedLanguageCode ?? languages[0]?.code,
    personaLabel: preferences?.personaLabel ?? 'Persona',
    personaDescription: preferences?.personaDescription ?? 'Choose the role lens the shell should reflect.',
    datasetLabel: preferences?.datasetLabel ?? 'Data set',
    datasetDescription:
      preferences?.datasetDescription ?? 'Select which mock-data scenario should be active throughout the UI.',
    languageLabel: preferences?.languageLabel ?? 'Language',
    languageDescription: preferences?.languageDescription ?? 'Switch the language used by the current UX.',
  };
};

export type HostShellUserPreferencesDrawerProps = {
  open: boolean;
  preferences?: HostShellUserPreferences;
  onClose: () => void;
  onPersonaChange?: (personaKey: string, persona: HostShellPreferenceOption) => void;
  onDatasetChange?: (datasetKey: string, dataset: HostShellPreferenceOption) => void;
  onLanguageChange?: (languageCode: string, language: LanguageOption) => void;
};

export const HostShellUserPreferencesDrawer = ({
  open,
  preferences,
  onClose,
  onPersonaChange,
  onDatasetChange,
  onLanguageChange,
}: HostShellUserPreferencesDrawerProps) => {
  const resolvedPreferences = resolveHostShellUserPreferences(preferences);
  const selectedPersona =
    resolvedPreferences.personas.find(persona => persona.key === resolvedPreferences.selectedPersonaKey) ??
    resolvedPreferences.personas[0];
  const selectedDataset =
    resolvedPreferences.datasets.find(dataset => dataset.key === resolvedPreferences.selectedDatasetKey) ??
    resolvedPreferences.datasets[0];
  const selectedLanguage =
    resolvedPreferences.languages.find(language => language.code === resolvedPreferences.selectedLanguageCode) ??
    resolvedPreferences.languages[0];

  const selectionSummary = [
    { label: resolvedPreferences.personaLabel, value: selectedPersona?.label },
    { label: resolvedPreferences.datasetLabel, value: selectedDataset?.label },
    { label: resolvedPreferences.languageLabel, value: selectedLanguage?.label },
  ].filter(selection => Boolean(selection.value));

  return (
    <UniDrawer
      rootClassName="right-drawer host-shell-preferences-drawer"
      placement="right"
      size={resolvedPreferences.drawerWidth}
      title={resolvedPreferences.title}
      open={open}
      onClose={onClose}
    >
      <div className="host-shell-preferences" data-testid="host-shell-user-preferences">
        <div className="host-shell-preferences__intro">
          <p className="host-shell-preferences__description">{resolvedPreferences.description}</p>
          {selectionSummary.length ? (
            <div className="host-shell-preferences__summary" aria-label="Current user preference selections">
              {selectionSummary.map(selection => (
                <div key={selection.label} className="host-shell-preferences__summary-item">
                  <span className="host-shell-preferences__summary-label">{selection.label}</span>
                  <span className="host-shell-preferences__summary-value">{selection.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {resolvedPreferences.personas.length ? (
          <section className="host-shell-preferences__section">
            <div className="host-shell-preferences__section-header">
              <h3 className="host-shell-preferences__section-title">{resolvedPreferences.personaLabel}</h3>
              <p className="host-shell-preferences__section-copy">{resolvedPreferences.personaDescription}</p>
            </div>
            <div className="host-shell-preferences__control" data-testid="host-shell-persona-control">
              <UniSelect
                value={selectedPersona?.key}
                options={resolvedPreferences.personas.map(persona => ({
                  value: persona.key,
                  label: persona.label,
                  disabled: persona.disabled,
                }))}
                aria-label={resolvedPreferences.personaLabel}
                placeholder={`Select ${resolvedPreferences.personaLabel.toLowerCase()}`}
                onChange={value => {
                  const nextPersona = resolvedPreferences.personas.find(persona => persona.key === String(value));
                  if (!nextPersona) {
                    return;
                  }

                  onPersonaChange?.(nextPersona.key, nextPersona);
                }}
              />
            </div>
          </section>
        ) : null}

        {resolvedPreferences.datasets.length ? (
          <section className="host-shell-preferences__section">
            <div className="host-shell-preferences__section-header">
              <h3 className="host-shell-preferences__section-title">{resolvedPreferences.datasetLabel}</h3>
              <p className="host-shell-preferences__section-copy">{resolvedPreferences.datasetDescription}</p>
            </div>
            <div className="host-shell-preferences__control" data-testid="host-shell-dataset-control">
              <UniSelect
                value={selectedDataset?.key}
                options={resolvedPreferences.datasets.map(dataset => ({
                  value: dataset.key,
                  label: dataset.label,
                  disabled: dataset.disabled,
                }))}
                aria-label={resolvedPreferences.datasetLabel}
                placeholder={`Select ${resolvedPreferences.datasetLabel.toLowerCase()}`}
                onChange={value => {
                  const nextDataset = resolvedPreferences.datasets.find(dataset => dataset.key === String(value));
                  if (!nextDataset) {
                    return;
                  }

                  onDatasetChange?.(nextDataset.key, nextDataset);
                }}
              />
            </div>
          </section>
        ) : null}

        {resolvedPreferences.languages.length ? (
          <section className="host-shell-preferences__section">
            <div className="host-shell-preferences__section-header">
              <h3 className="host-shell-preferences__section-title">{resolvedPreferences.languageLabel}</h3>
              <p className="host-shell-preferences__section-copy">{resolvedPreferences.languageDescription}</p>
            </div>
            <div className="host-shell-preferences__control" data-testid="host-shell-language-control">
              <UniLanguageSwitcher
                ariaLabel={resolvedPreferences.languageLabel}
                languages={resolvedPreferences.languages}
                currentLanguage={selectedLanguage?.code}
                displayStyle="label-only"
                showFlags={false}
                placeholder={`Select ${resolvedPreferences.languageLabel.toLowerCase()}`}
                onChange={onLanguageChange}
              />
            </div>
          </section>
        ) : null}
      </div>
    </UniDrawer>
  );
};
