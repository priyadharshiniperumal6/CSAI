import { UniCard, UniButton, UniTag } from '@uniphore/ut-design-system';
import { mockResourceGroups } from '../../../data/mock-users';

export function ResourceGroupsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Resource Groups</h3>
        <UniButton type="primary" size="small">Create Resource Group</UniButton>
      </div>
      {mockResourceGroups.map((group) => (
        <UniCard key={group.id} title={group.name} extra={<UniButton size="small">Edit</UniButton>}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--ut-color-text-subtle)', marginBottom: 4 }}>Description</div>
            <div>{group.description}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ut-color-text-subtle)', marginBottom: 8 }}>Resources</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {group.resources.map((resource) => (
                <UniTag key={resource} color="blue">{resource}</UniTag>
              ))}
            </div>
          </div>
        </UniCard>
      ))}
    </div>
  );
}
