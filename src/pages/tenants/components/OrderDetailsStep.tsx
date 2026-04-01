import { useState } from 'react';
import { UniInput, UniSelect } from '@uniphore/ut-design-system';
import { Form, Upload } from 'antd';
import { InboxOutlined, FileTextOutlined, CloseOutlined } from '@ant-design/icons';
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

function SowPreview({ fileName, onRemove }: { fileName: string; onRemove: () => void }) {
  return (
    <div style={{ border: '1px solid #e2e5ea', borderRadius: 10, overflow: 'hidden', background: '#ffffff' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: '#f7f8fa', borderBottom: '1px solid #e2e5ea',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileTextOutlined style={{ fontSize: 14, color: '#8b919e' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            SOW PREVIEW — READ ONLY
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#15803d', background: '#dcfce7', padding: '2px 10px', borderRadius: 12 }}>
            {fileName}
          </span>
          <button onClick={onRemove} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 2 }}>
            <CloseOutlined style={{ fontSize: 12 }} />
          </button>
        </div>
      </div>
      <div style={{ padding: '20px 24px', maxHeight: 300, overflowY: 'auto', fontSize: 13, lineHeight: 1.7, color: '#1a1d23', userSelect: 'none' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>STATEMENT OF WORK — BAIC Platform Services</h3>
        <p style={{ marginBottom: 10 }}>
          <strong>Client:</strong> Acme Corporation &nbsp;|&nbsp;
          <strong>Effective Date:</strong> April 1, 2026 &nbsp;|&nbsp;
          <strong>Term:</strong> 12 months
        </p>
        <p style={{ marginBottom: 14 }}>
          <strong>Account Executive:</strong> Sarah Johnson &nbsp;|&nbsp; <strong>Opp ID:</strong> acme-001
        </p>
        <hr style={{ border: 'none', borderTop: '1px solid #eef0f3', marginBottom: 14 }} />
        <p style={{ fontWeight: 600, marginBottom: 6 }}>1. Scope of Services</p>
        <p style={{ marginBottom: 14, color: '#374151' }}>
          Uniphore will provision and operate the BAIC Platform for Acme Corporation including Self Serve Agent (SSA),
          Real-Time Guidance Agent (RTGA), and Conversation Intelligence Agent (CIA) modules across US East (us-east-1) infrastructure.
        </p>
        <p style={{ fontWeight: 600, marginBottom: 6 }}>2. Contracted SKUs</p>
        <p style={{ marginBottom: 14, color: '#374151' }}>
          SSA-PRO: 50 max concurrent sessions @ $0.08/session · RTGA-ENT: 1,000 max concurrent sessions @ $0.004/session · CIA-STD: 100,000 min/mo @ $0.012/min
        </p>
        <p style={{ fontWeight: 600, marginBottom: 6 }}>3. Term &amp; Renewal</p>
        <p style={{ color: '#374151' }}>
          12-month initial term commencing April 1, 2026. Auto-renews annually unless either party provides 60-day written notice of non-renewal.
        </p>
      </div>
    </div>
  );
}

export function OrderDetailsStep({ data, onChange }: Props) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

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

      <Form.Item label="Upload Order Document (SOW)">
        {uploadedFile ? (
          <SowPreview fileName={uploadedFile} onRemove={() => setUploadedFile(null)} />
        ) : (
          <Dragger
            name="file"
            multiple={false}
            maxCount={1}
            beforeUpload={(file) => { setUploadedFile(file.name); return false; }}
            showUploadList={false}
            style={{ border: '2px dashed #d1d5db', borderRadius: 10, background: '#fafbfc', padding: '16px 0' }}
          >
            <p style={{ margin: 0 }}>
              <InboxOutlined style={{ fontSize: 36, color: '#15808C' }} />
            </p>
            <p style={{ margin: '8px 0 4px', fontWeight: 500, fontSize: 14, color: '#1a1d23' }}>Click or drag SOW to upload</p>
            <p style={{ margin: 0, fontSize: 13, color: '#8b919e' }}>Supports PDF, DOCX (max 10MB)</p>
          </Dragger>
        )}
      </Form.Item>
    </Form>
  );
}
