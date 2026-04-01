import { UniCard } from '@uniphore/ut-design-system';
import { Progress } from 'antd';
import { mockCredits } from '../../../data/mock-billing';

export function BasicCreditsTab() {
  return (
    <div style={{ paddingTop: 16 }}>
      <h3 style={{ margin: '0 0 16px' }}>Credit Allocation</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {mockCredits.map((credit) => {
          const usagePercent = Math.round((credit.used / credit.allocated) * 100);
          return (
            <UniCard key={credit.id} title={credit.type}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Progress
                  percent={usagePercent}
                  strokeColor={usagePercent > 80 ? '#ff4d4f' : usagePercent > 60 ? '#faad14' : '#52c41a'}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ut-color-text-subtle)' }}>Allocated</div>
                    <div style={{ fontWeight: 600 }}>{credit.allocated.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ut-color-text-subtle)' }}>Used</div>
                    <div style={{ fontWeight: 600 }}>{credit.used.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ut-color-text-subtle)' }}>Remaining</div>
                    <div style={{ fontWeight: 600 }}>{credit.remaining.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ut-color-text-subtle)' }}>
                  Expires: {credit.expiresAt}
                </div>
              </div>
            </UniCard>
          );
        })}
      </div>
    </div>
  );
}
