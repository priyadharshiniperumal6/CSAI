import { TableUsers } from '../../../views/Users/TableUsers';
import { ViewRouteShell } from '../shared/ViewRouteShell';

export const UsersViewDemoRoute = () => (
  <ViewRouteShell title="Users" description="User roster with role assignments and account access controls.">
    <TableUsers />
  </ViewRouteShell>
);
