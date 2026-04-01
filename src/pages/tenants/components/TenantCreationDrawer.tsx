import { UniDrawer, UniButton } from '@uniphore/ut-design-system';
import { useTenantWizard } from '../../../hooks/useTenantWizard';
import { TenantIdentityStep } from './TenantIdentityStep';
import { OrderDetailsStep } from './OrderDetailsStep';
import { FeatureConfigStep } from './FeatureConfigStep';
import { ProvisioningStep } from './ProvisioningStep';

interface TenantCreationDrawerProps {
  open: boolean;
  onClose: () => void;
  onProvision?: () => void;
}

const STEPS = ['Tenant Details', 'Order Details', 'Applications', 'Preview'];

// ── Inline wizard stepper ──────────────────────────────────────────────────
function WizardStepper({ current }: { current: number }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '20px 32px 24px',
      borderBottom: '1px solid #eef0f3',
      background: '#fafbfc',
      gap: 0,
    }}>
      {STEPS.map((label, idx) => {
        const done    = idx < current;
        const active  = idx === current;
        const pending = idx > current;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: idx < STEPS.length - 1 ? 1 : 0 }}>
            {/* Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, flexShrink: 0,
                background: done ? '#15808C' : active ? '#15808C' : '#e5e7eb',
                color: done || active ? '#ffffff' : '#9ca3af',
                border: active ? '2.5px solid #0e6570' : done ? 'none' : 'none',
                transition: 'all 0.2s',
              }}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : idx + 1}
              </div>
              <span style={{
                fontSize: 11, fontWeight: active ? 600 : 400,
                color: active ? '#15808C' : done ? '#374151' : '#9ca3af',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginBottom: 20,
                background: done ? '#15808C' : '#e5e7eb',
                transition: 'background 0.2s',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function TenantCreationDrawer({ open, onClose, onProvision }: TenantCreationDrawerProps) {
  const { currentStep, formData, next, prev, updateFormData, toggleApp, reset } =
    useTenantWizard();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    console.log('Creating tenant:', formData);
    handleClose();
    onProvision?.();
  };

  const stepContent = [
    <TenantIdentityStep key="identity" data={formData} onChange={updateFormData} />,
    <OrderDetailsStep key="order" data={formData} onChange={updateFormData} />,
    <FeatureConfigStep key="features" data={formData} onToggle={toggleApp} />,
    <ProvisioningStep key="provision" data={formData} />,
  ];

  return (
    <UniDrawer
      open={open}
      onClose={handleClose}
      title="Create New Tenant"
      styles={{ wrapper: { width: 680 } }}
      placement="right"
      bodyStyle={{ padding: 0 }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
          <UniButton onClick={handleClose} style={{ color: '#6b7280' }}>Cancel</UniButton>
          <div style={{ display: 'flex', gap: 8 }}>
            {currentStep > 0 && (
              <UniButton onClick={prev}>Prev</UniButton>
            )}
            {currentStep < 3 ? (
              <UniButton type="primary" onClick={next}>Next</UniButton>
            ) : (
              <UniButton type="primary" onClick={handleCreate}>Provision Tenant</UniButton>
            )}
          </div>
        </div>
      }
    >
      <WizardStepper current={currentStep} />
      <div style={{ padding: '24px 32px' }}>
        {stepContent[currentStep]}
      </div>
    </UniDrawer>
  );
}
