import MenuItem from '../MenuItem';
import Submenu from '../SubMenu';

export default function ClientMenu() {
  return (
    <div className="menus">
      <MenuItem
        label="Dashboard"
        href="/client/dashboard"
        icon={<i className="bi bi-speedometer2"></i>}
      />

      <MenuItem
        label="Project"
        href="/client/projects"
        icon={<i className="bi bi-kanban-fill"></i>}
      />

      <MenuItem
        label="Ticket"
        href="/client/ticket"
        icon={<i className="bi bi-ticket-detailed-fill"></i>}
      />

      <div className="menu-section-title">
        SYSTEM
      </div>

      <Submenu
        label="Settings"
        id="settings"
        icon={<i className="bi bi-gear-fill"></i>}
        submenuName={[
          `superadmin/users`,
          `superadmin/change-password`,
        ]}
      >
        <MenuItem
          label="Change Password"
          href="/client/change-password"
          icon={<i className="bi bi-key-fill"></i>}
        />

        <MenuItem
          label="Profile"
          href="/client/profile"
          icon={<i className="bi bi-people-fill"></i>}
        />
      </Submenu>
    </div>
  );
}