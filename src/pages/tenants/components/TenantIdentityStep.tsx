import { UniInput, UniSelect } from '@uniphore/ut-design-system';
import { Form } from 'antd';
import type { TenantFormData } from '../../../types/tenant';
import { regionOptions } from '../../../data/mock-tenants';

interface Props {
  data: TenantFormData;
  onChange: (data: Partial<TenantFormData>) => void;
}

export function TenantIdentityStep({ data, onChange }: Props) {
  return (
    <Form layout="vertical">
      <Form.Item label="Tenant Name" required>
        <UniInput
          placeholder="Enter tenant name"
          value={data.name}
          onChange={(e) => {
            const name = e.target.value;
            onChange({
              name,
              slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="Slug">
        <UniInput
          placeholder="auto-generated-slug"
          value={data.slug}
          onChange={(e) => onChange({ slug: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Region" required>
        <UniSelect
          placeholder="Select region"
          options={regionOptions}
          value={data.region || undefined}
          onChange={(val) => onChange({ region: val })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <UniInput
          placeholder="Brief description of the tenant"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </Form.Item>
    </Form>
  );
}
