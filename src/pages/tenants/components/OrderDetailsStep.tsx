import { UniInput, UniSelect } from '@uniphore/ut-design-system';
import { Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { TenantFormData } from '../../../types/tenant';

const { Dragger } = Upload;

interface Props {
  data: TenantFormData;
  onChange: (data: Partial<TenantFormData>) => void;
}

const licenseOptions = [
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'professional', label: 'Professional' },
  { value: 'starter', label: 'Starter' },
  { value: 'trial', label: 'Trial' },
];

export function OrderDetailsStep({ data, onChange }: Props) {
  return (
    <Form layout="vertical">
      <Form.Item label="Order ID" required>
        <UniInput
          placeholder="e.g., ORD-2026-001"
          value={data.orderId}
          onChange={(e) => onChange({ orderId: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="License Type" required>
        <UniSelect
          placeholder="Select license type"
          options={licenseOptions}
          value={data.licenseType || undefined}
          onChange={(val) => onChange({ licenseType: val })}
        />
      </Form.Item>
      <Form.Item label="Salesforce Opportunity Link">
        <UniInput
          placeholder="https://salesforce.com/..."
          value={data.salesforceLink}
          onChange={(e) => onChange({ salesforceLink: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Upload Order Document">
        <Dragger
          name="file"
          multiple={false}
          maxCount={1}
          beforeUpload={() => false}
          onChange={(info) => {
            if (info.file.status === 'removed') return;
            message.success(`${info.file.name} selected for upload`);
          }}
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: 10,
            background: '#fafbfc',
            padding: '16px 0',
          }}
        >
          <p style={{ margin: 0 }}>
            <InboxOutlined style={{ fontSize: 36, color: '#15808C' }} />
          </p>
          <p style={{ margin: '8px 0 4px', fontWeight: 500, fontSize: 14, color: '#1a1d23' }}>
            Click or drag file to upload
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>
            Supports PDF, DOCX, or image files (max 10MB)
          </p>
        </Dragger>
      </Form.Item>
    </Form>
  );
}
