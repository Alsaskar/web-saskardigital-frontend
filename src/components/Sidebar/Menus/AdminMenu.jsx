import MenuItem from '../MenuItem';
import Submenu from '../SubMenu';

export default function AdminMenu() {
  return (
    <div className="menus">
      <MenuItem
        label="Dashboard"
        href="/admin/dashboard"
        icon={<i className="bi bi-speedometer2"></i>}
      />

      <MenuItem
        label="Project Request"
        href="/admin/project-request"
        icon={<i className="bi bi-clipboard-data"></i>}
      />

      <MenuItem
        label="Clients"
        href="/admin/clients"
        icon={<i className="bi bi-people"></i>}
      />

      <Submenu
        label="Operations Gallery"
        id="operations-gallery"
        icon={<i className="bi bi-images"></i>}
        submenuName={[`admin/gallery`, `admin/category-gallery`]}
      >
        <MenuItem
          label="Data Gallery"
          href={`/admin/gallery`}
          icon={<i className="bi bi-image-fill"></i>}
        />

        <MenuItem
          label="Category Gallery"
          href={`/admin/category-gallery`}
          icon={<i className="bi bi-tags-fill"></i>}
        />
      </Submenu>

      <Submenu
        label="Articles"
        id="operations-gallery"
        icon={<i className="bi bi-newspaper"></i>}
        submenuName={[`admin/articles`, `admin/category-articles`]}
      >
        <MenuItem
          label="Data Articles"
          href={`/admin/articles`}
          icon={<i className="bi bi-file-earmark-post-fill"></i>}
        />

        <MenuItem
          label="Category Articles"
          href={`/admin/category-articles`}
          icon={<i className="bi bi-folder-fill"></i>}
        />
      </Submenu>

      <MenuItem
        label="Testimoni"
        href="/admin/testimoni"
        icon={<i className="bi bi-chat-quote"></i>}
      />

      <MenuItem
        label="Teams"
        href="/admin/teams"
        icon={<i className="bi bi-people-fill"></i>}
      />

      <Submenu
        label="Careers"
        id="careers"
        icon={<i className="bi bi-briefcase-fill"></i>}
        submenuName={[
          `admin/careers`,
          `admin/candidates`,
        ]}
      >
        <MenuItem
          label="Lowongan Kerja"
          href={`/admin/careers`}
          icon={<i className="bi bi-briefcase"></i>}
        />

        <MenuItem
          label="Kandidat"
          href={`/admin/candidates`}
          icon={<i className="bi bi-person-lines-fill"></i>}
        />
      </Submenu><hr />

      <Submenu
        label="Settings"
        id="settings"
        icon={<i className="bi bi-gear-fill"></i>}
        submenuName={[
          `admin/setting`,
          `admin/users`,
        ]}
      >
        <MenuItem
          label="Change Password"
          href={`/admin/change-password`}
          icon={<i className="bi bi-key-fill"></i>}
        />

        <MenuItem
          label="Users"
          href={`/admin/users`}
          icon={<i className="bi bi-people-fill"></i>}
        />
      </Submenu>

      {/* <Submenu
        label="Leads"
        id="data-leads"
        icon={<i className="bi bi-funnel-fill"></i>}
        submenuName={[`admin/leads`, `admin/lead-source`]} // wajib tambahkan nama menu disini jika menambahkan submenu baru
      >
        <MenuItem
          label="Data Lead"
          href={`/admin/leads`}
          icon={<i className="bi bi-people-fill"></i>}
        />
        <MenuItem
          label="Lead Source"
          href={`/admin/lead-source`}
          icon={<i className="bi bi-megaphone-fill"></i>}
        />
      </Submenu> */}
    </div>
  );
}
