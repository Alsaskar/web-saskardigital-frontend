import MenuItem from '../MenuItem';
import Submenu from '../SubMenu';

export default function SuperadminMenu() {
  return (
    <div className="menus">
      <MenuItem
        label="Dashboard"
        href="/superadmin/dashboard"
        icon={<i className="bi bi-speedometer2"></i>}
      />

      <div className="menu-section-title">
        BUSINESS
      </div>

      <MenuItem
        label="Leads"
        href="/superadmin/leads"
        icon={<i className="bi bi-funnel-fill"></i>}
      />

      <MenuItem
        label="Client"
        href="/superadmin/clients"
        icon={<i className="bi bi-person-vcard-fill"></i>}
      />

      <MenuItem
        label="Project"
        href="/superadmin/projects"
        icon={<i className="bi bi-kanban-fill"></i>}
      />

      <MenuItem
        label="Maintenance"
        href="/superadmin/maintenance"
        icon={<i className="bi bi-tools"></i>}
      />

      {/* <MenuItem
        label="Ticket"
        href="/superadmin/tickets"
        icon={<i className="bi bi-ticket-detailed-fill"></i>}
      /> */}

      <div className="menu-section-title">
        MARKETING
      </div>

      <MenuItem
        label="Portfolio"
        href="/superadmin/portfolio"
        icon={<i className="bi bi-grid-1x2-fill"></i>}
      />

      <MenuItem
        label="Testimoni"
        href="/superadmin/testimoni"
        icon={<i className="bi bi-chat-square-quote-fill"></i>}
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
          href="/superadmin/change-password"
          icon={<i className="bi bi-key-fill"></i>}
        />

        <MenuItem
          label="Users"
          href="/superadmin/users"
          icon={<i className="bi bi-people-fill"></i>}
        />
      </Submenu>
    </div>
  );
}