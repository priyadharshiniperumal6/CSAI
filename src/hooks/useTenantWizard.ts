import { useState, useCallback } from 'react';
import type { TenantFormData, DeployedApp } from '../types/tenant';

const INITIAL_FORM_DATA: TenantFormData = {
  name: '',
  slug: '',
  region: '',
  description: '',
  orderId: '',
  licenseType: '',
  salesforceLink: '',
  enabledApps: [],
};

export function useTenantWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TenantFormData>(INITIAL_FORM_DATA);

  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 3)), []);
  const prev = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), []);

  const updateFormData = useCallback((data: Partial<TenantFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const toggleApp = useCallback((app: DeployedApp) => {
    setFormData((prev) => ({
      ...prev,
      enabledApps: prev.enabledApps.includes(app)
        ? prev.enabledApps.filter((a) => a !== app)
        : [...prev.enabledApps, app],
    }));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  return { currentStep, formData, next, prev, updateFormData, toggleApp, reset };
}
