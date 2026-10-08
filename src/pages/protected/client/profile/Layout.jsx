import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import './profile.css'

const Profile = () => {
    const { user, client } = useContext(AuthContext)

    const companyName = client?.nama_company || 'Nama Perusahaan'
    const companyInitial = companyName.charAt(0).toUpperCase()

    const fullName = `${user?.firstname || ''} ${user?.lastname || ''}`.trim()

    const getClientLogoUrl = (logo) => {
        if (!logo) {
            return '/saskardigital.ico'
        }

        return `${import.meta.env.VITE_BACKEND_BASE_URL}/assets/images/client/${logo}`
    }

    return (
        <div className="client-profile-page">

            {/* =========================
                PAGE HEADER
            ========================== */}
            <div className="profile-page-header">

                <div>
                    <span className="profile-eyebrow">
                        ACCOUNT
                    </span>

                    <h1>
                        Profile
                    </h1>

                    <p>
                        Informasi akun dan profil perusahaan Anda.
                    </p>
                </div>

                <div className="profile-account-badge">
                    <span className="profile-account-dot"></span>

                    <span>
                        Client Account
                    </span>
                </div>

            </div>


            {/* =========================
                COMPANY HERO
            ========================== */}
            <div className="profile-company-card">

                <div className="company-card-background"></div>

                <div className="company-card-content">

                    <div className="company-logo-wrapper">

                        {client?.logo_company ? (
                            <img
                                src={getClientLogoUrl(client.logo_company)}
                                alt={companyName}
                                className="company-logo"
                            />
                        ) : (
                            <div className="company-logo-placeholder">
                                {companyInitial}
                            </div>
                        )}

                    </div>

                    <div className="company-main-info">

                        <span className="company-label">
                            COMPANY
                        </span>

                        <h2>
                            {companyName}
                        </h2>

                        <div className="company-meta">

                            {client?.industry && (
                                <span>
                                    <i className="bi bi-building"></i>
                                    {client.industry}
                                </span>
                            )}

                            {client?.city && (
                                <span>
                                    <i className="bi bi-geo-alt"></i>
                                    {client.city}
                                    {client?.province
                                        ? `, ${client.province}`
                                        : ''
                                    }
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="company-status">

                        <span className="status-indicator"></span>

                        <div>
                            <span className="status-label">
                                ACCOUNT STATUS
                            </span>

                            <strong>
                                {client?.status === 'active'
                                    ? 'Active'
                                    : 'Inactive'
                                }
                            </strong>
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                CONTENT GRID
            ========================== */}
            <div className="profile-content-grid">


                {/* =========================
                    COMPANY INFORMATION
                ========================== */}
                <div className="profile-section-card">

                    <div className="section-card-header">

                        <div className="section-icon">
                            <i className="bi bi-building"></i>
                        </div>

                        <div>
                            <h3>
                                Company Information
                            </h3>

                            <p>
                                Informasi dasar perusahaan Anda.
                            </p>
                        </div>

                    </div>


                    <div className="profile-info-list">

                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-building"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Company Name
                                </span>

                                <strong>
                                    {client?.nama_company || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-diagram-3"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Industry
                                </span>

                                <strong>
                                    {client?.industry || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-globe2"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Website
                                </span>

                                {client?.website ? (
                                    <a
                                        href={
                                            client.website.startsWith('http')
                                                ? client.website
                                                : `https://${client.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {client.website}
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                ) : (
                                    <strong>-</strong>
                                )}
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    ACCOUNT INFORMATION
                ========================== */}
                <div className="profile-section-card">

                    <div className="section-card-header">

                        <div className="section-icon">
                            <i className="bi bi-person"></i>
                        </div>

                        <div>
                            <h3>
                                Account Information
                            </h3>

                            <p>
                                Informasi akun yang sedang digunakan.
                            </p>
                        </div>

                    </div>


                    <div className="profile-info-list">

                        <div className="profile-info-item">

                            <div className="info-avatar">
                                {fullName
                                    ? fullName.charAt(0).toUpperCase()
                                    : 'U'
                                }
                            </div>

                            <div className="info-content">
                                <span>
                                    Account Name
                                </span>

                                <strong>
                                    {fullName || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-envelope"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Email
                                </span>

                                <strong>
                                    {user?.email || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Account Type
                                </span>

                                <strong>
                                    Client
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    CONTACT INFORMATION
                ========================== */}
                <div className="profile-section-card">

                    <div className="section-card-header">

                        <div className="section-icon">
                            <i className="bi bi-telephone"></i>
                        </div>

                        <div>
                            <h3>
                                Contact Information
                            </h3>

                            <p>
                                Kontak utama perusahaan.
                            </p>
                        </div>

                    </div>


                    <div className="profile-info-list">

                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-envelope"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Company Email
                                </span>

                                <strong>
                                    {client?.email || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-telephone"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Phone Number
                                </span>

                                <strong>
                                    {client?.phone || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-geo-alt"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    Address
                                </span>

                                <strong>
                                    {client?.address || '-'}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    PIC INFORMATION
                ========================== */}
                <div className="profile-section-card">

                    <div className="section-card-header">

                        <div className="section-icon">
                            <i className="bi bi-person-badge"></i>
                        </div>

                        <div>
                            <h3>
                                Person in Charge
                            </h3>

                            <p>
                                Kontak utama perusahaan Anda.
                            </p>
                        </div>

                    </div>


                    <div className="profile-info-list">

                        <div className="profile-info-item">

                            <div className="info-avatar pic-avatar">
                                {client?.pic_name
                                    ? client.pic_name.charAt(0).toUpperCase()
                                    : 'P'
                                }
                            </div>

                            <div className="info-content">
                                <span>
                                    PIC Name
                                </span>

                                <strong>
                                    {client?.pic_name || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon">
                                <i className="bi bi-envelope"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    PIC Email
                                </span>

                                <strong>
                                    {client?.pic_email || '-'}
                                </strong>
                            </div>

                        </div>


                        <div className="profile-info-item">

                            <div className="info-icon whatsapp-icon">
                                <i className="bi bi-whatsapp"></i>
                            </div>

                            <div className="info-content">
                                <span>
                                    WhatsApp
                                </span>

                                <strong>
                                    {client?.pic_whatsapp || '-'}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    ADDRESS
                ========================== */}
                <div className="profile-section-card profile-address-card">

                    <div className="section-card-header">

                        <div className="section-icon">
                            <i className="bi bi-geo-alt"></i>
                        </div>

                        <div>
                            <h3>
                                Company Address
                            </h3>

                            <p>
                                Lokasi dan alamat perusahaan.
                            </p>
                        </div>

                    </div>


                    <div className="address-content">

                        <div className="address-icon">
                            <i className="bi bi-pin-map"></i>
                        </div>

                        <div>

                            <strong>
                                {client?.city || '-'}
                                {client?.province
                                    ? `, ${client.province}`
                                    : ''
                                }
                            </strong>

                            <p>
                                {client?.address || 'Alamat belum tersedia.'}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                FOOTER NOTE
            ========================== */}
            <div className="profile-footer-note">

                <i className="bi bi-info-circle"></i>

                <span>
                    Informasi profile ini digunakan untuk kebutuhan
                    administrasi dan layanan project Anda bersama
                    Saskardigital.
                </span>

            </div>

        </div>
    )
}

export default Profile