import { UniDrawer, UniStepper, UniButton } from '@uniphore/ut-design-system';
import { useTenantWizard } from '../../../hooks/useTenantWizard';
import { TenantIdentityStep } from './TenantIdentityStep';
import { OrderDetailsStep } from './OrderDetailsStep';
import { FeatureConfigStep } from './FeatureConfigStep';
import { ProvisioningStep } from './ProvisioningStep';

interface TenantCreationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = [
  { title: 'Tenant Identity' },
  { title: 'Order Details' },
  { title: 'Feature Config' },
  { title: 'Provisioning' },
];

export function TenantCreationDrawer({ open, onClose }: TenantCreationDrawerProps) {
  const { currentStep, formData, next, prev, updateFormData, toggleApp, reset } =
    useTenantWizard();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    // In production this would call an API
    console.log('Creating tenant:', formData);
    handleClose();
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
      styles={{ wrapper: { width: 640 } }}
      placement="right"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <UniButton onClick={handleClose}>Cancel</UniButton>
          <div style={{ display: 'flex', gap: 8 }}>
            {currentStep > 0 && (
              <UniButton onClick={prev}>Back</UniButton>
            )}
            {currentStep < 3 ? (
              <UniButton type="primary" onClick={next}>
                Next
              </UniButton>
            ) : (
              <UniButton type="primary" onClick={handleCreate}>
                Provision Tenant
              </UniButton>
            )}
          </div>
        </div>
      }
    >
      <UniStepper
        current={currentStep}
        items={STEPS}
        size="small"
        style={{ marginBottom: 32 }}
      />
      {stepContent[currentStep]}
    </UniDrawer>
  );
}
