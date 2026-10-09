import { useParams } from "react-router-dom";
import { useTicket } from "../../../../modules/ticket/hooks/useTicket";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "./ticket-view.css";

const BACKEND_URL = (
    import.meta.env.VITE_BACKEND_BASE_URL || ""
).replace(/\/$/, "");

const statusConfig = {
    open: { label: "Open", className: "tv-status-open" },
    "in progress": { label: "In Progress", className: "tv-status-progress" },
    "waiting client": { label: "Waiting for Client", className: "tv-status-waiting" },
    resolved: { label: "Resolved", className: "tv-status-resolved" },
    closed: { label: "Closed", className: "tv-status-closed" },
    cancelled: { label: "Cancelled", className: "tv-status-cancelled" },
};

const priorityConfig = {
    low: { label: "Low", className: "tv-priority-low" },
    medium: { label: "Medium", className: "tv-priority-medium" },
    high: { label: "High", className: "tv-priority-high" },
    urgent: { label: "Urgent", className: "tv-priority-urgent" },
};

const categoryLabels = {
    bug: "Bug Report",
    "feature request": "Feature Request",
    "technical support": "Technical Support",
    account: "Account",
    billing: "Billing",
    other: "Other",
};

const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(parsedDate);
};

const getInitials = (name) => {
    if (!name) return "CL";

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};

const prepareDescription = (html = "") => {
    const normalizedHtml = html.replace(
        /src=(["'])\/assets\//g,
        `src=$1${BACKEND_URL}/assets/`
    );

    return DOMPurify.sanitize(normalizedHtml, {
        USE_PROFILES: { html: true },
    });
};

const Layout = () => {
    const { ticket_number } = useParams();
    const { viewTicket } = useTicket();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await viewTicket(ticket_number);

                if (!active) return;

                if (res?.success === false || !res?.data) {
                    setError(res?.message || "Ticket tidak ditemukan.");
                    return;
                }

                setTicket(res.data);
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.message ||
                        "Terjadi kesalahan saat mengambil data ticket."
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchData();

        return () => {
            active = false;
        };
    }, [ticket_number]);

    if (loading) {
        return (
            <main className="tv-page">
                <div className="tv-container">
                    <div className="tv-state-card">
                        <div className="tv-loader" />
                        <h5>Memuat detail ticket</h5>
                        <p>Mohon tunggu, kami sedang mengambil informasi ticket kamu.</p>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !ticket) {
        return (
            <main className="tv-page">
                <div className="tv-container">
                    <div className="tv-state-card">
                        <div className="tv-state-icon tv-state-icon-error">
                            <i className="bi bi-ticket-perforated" />
                        </div>
                        <h4>Ticket tidak ditemukan</h4>
                        <p>{error || "Informasi ticket tidak tersedia."}</p>
                        <span className="tv-error-number">{ticket_number}</span>
                    </div>
                </div>
            </main>
        );
    }

    const status = statusConfig[ticket.status] || {
        label: ticket.status || "Unknown",
        className: "",
    };

    const priority = priorityConfig[ticket.priority] || {
        label: ticket.priority || "Unknown",
        className: "",
    };

    const projectName = ticket.project?.nama
    const clientName = ticket.client?.nama_company

    return (
        <main className="tv-page">
            <div className="tv-container">
                <header className="tv-header">
                    <a href="/" className="tv-brand">
                        <span className="tv-brand-icon">
                            <i className="bi bi-headset" />
                        </span>
                        <span>
                            <strong>Support Center</strong>
                            <small>Customer Support Portal</small>
                        </span>
                    </a>

                    <div className="tv-header-label">
                        <i className="bi bi-shield-check" />
                        Ticket Tracking
                    </div>
                </header>

                <section className="tv-welcome">
                    <div>
                        <div className="tv-eyebrow">
                            <span className="tv-eyebrow-dot" />
                            SUPPORT REQUEST
                        </div>
                        <h1>Detail Ticket</h1>
                        <p>
                            Pantau status dan informasi terbaru dari permintaan
                            support kamu di satu tempat.
                        </p>
                    </div>

                    <div className="tv-ticket-number-card">
                        <span>YOUR TICKET NUMBER</span>
                        <strong>{ticket.ticket_number}</strong>
                        <button
                            type="button"
                            className="tv-copy-button"
                            onClick={() =>
                                navigator.clipboard.writeText(ticket.ticket_number)
                            }
                        >
                            <i className="bi bi-copy" /> Salin nomor
                        </button>
                    </div>
                </section>

                <section className="tv-status-banner">
                    <div className="tv-status-banner-icon">
                        <i className="bi bi-info-circle" />
                    </div>
                    <div className="tv-status-banner-content">
                        <span>STATUS SAAT INI</span>
                        <strong>{status.label}</strong>
                        <p>
                            {ticket.status === "resolved"
                                ? "Permintaan kamu telah diselesaikan."
                                : ticket.status === "closed"
                                    ? "Ticket ini telah ditutup."
                                    : ticket.status === "waiting client"
                                        ? "Tim support sedang menunggu tanggapan dari kamu."
                                        : "Ticket kamu tercatat dalam sistem support."}
                        </p>
                    </div>
                    <span className={`tv-status-badge ${status.className}`}>
                        <span />
                        {status.label}
                    </span>
                </section>

                <div className="tv-content-grid">
                    <div className="tv-main-column">
                        <section className="tv-card">
                            <div className="tv-card-header">
                                <div>
                                    <span className="tv-section-kicker">TICKET INFORMATION</span>
                                    <h2>Informasi Permintaan</h2>
                                </div>
                                <span className="tv-card-header-icon">
                                    <i className="bi bi-file-earmark-text" />
                                </span>
                            </div>

                            <div className="tv-subject">
                                <span className="tv-subject-label">SUBJECT</span>
                                <h3>{ticket.subject || "Tanpa subject"}</h3>
                            </div>

                            <div className="tv-info-grid">
                                <div className="tv-info-item">
                                    <span className="tv-info-icon tv-icon-purple">
                                        <i className="bi bi-tag" />
                                    </span>
                                    <div>
                                        <span className="tv-info-label">Kategori</span>
                                        <strong>
                                            {categoryLabels[ticket.category] ||
                                                ticket.category ||
                                                "-"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="tv-info-item">
                                    <span className="tv-info-icon tv-icon-orange">
                                        <i className="bi bi-flag" />
                                    </span>
                                    <div>
                                        <span className="tv-info-label">Prioritas</span>
                                        <strong className={`tv-priority-text ${priority.className}`}>
                                            <span />
                                            {priority.label}
                                        </strong>
                                    </div>
                                </div>

                                <div className="tv-info-item">
                                    <span className="tv-info-icon tv-icon-blue">
                                        <i className="bi bi-calendar3" />
                                    </span>
                                    <div>
                                        <span className="tv-info-label">Dibuat pada</span>
                                        <strong>{formatDate(ticket.created_at)}</strong>
                                    </div>
                                </div>

                                <div className="tv-info-item">
                                    <span className="tv-info-icon tv-icon-green">
                                        <i className="bi bi-arrow-clockwise" />
                                    </span>
                                    <div>
                                        <span className="tv-info-label">Terakhir diperbarui</span>
                                        <strong>{formatDate(ticket.updated_at)}</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="tv-card">
                            <div className="tv-card-header">
                                <div>
                                    <span className="tv-section-kicker">REQUEST DETAILS</span>
                                    <h2>Deskripsi Ticket</h2>
                                </div>
                                <span className="tv-card-header-icon">
                                    <i className="bi bi-chat-left-text" />
                                </span>
                            </div>

                            <article
                                className="tv-description"
                                dangerouslySetInnerHTML={{
                                    __html: prepareDescription(ticket.description),
                                }}
                            />
                        </section>

                        <section className="tv-help-card">
                            <div className="tv-help-icon">
                                <i className="bi bi-headset" />
                            </div>
                            <div>
                                <h3>Butuh bantuan lebih lanjut?</h3>
                                <p>
                                    Simpan nomor ticket ini agar mudah digunakan
                                    saat menghubungi tim support.
                                </p>
                            </div>
                        </section>
                    </div>

                    <aside className="tv-sidebar">
                        <section className="tv-card">
                            <div className="tv-card-header">
                                <div>
                                    <span className="tv-section-kicker">OVERVIEW</span>
                                    <h2>Ringkasan</h2>
                                </div>
                            </div>

                            <div className="tv-summary-list">
                                <div className="tv-summary-item">
                                    <span className="tv-summary-icon">
                                        <i className="bi bi-hash" />
                                    </span>
                                    <div>
                                        <span>Ticket Number</span>
                                        <strong>{ticket.ticket_number}</strong>
                                    </div>
                                </div>

                                <div className="tv-summary-item">
                                    <span className="tv-summary-icon">
                                        <i className="bi bi-kanban" />
                                    </span>
                                    <div>
                                        <span>Project</span>
                                        <strong>{projectName || "-"}</strong>
                                    </div>
                                </div>

                                <div className="tv-summary-item">
                                    <span className="tv-summary-icon">
                                        <i className="bi bi-building" />
                                    </span>
                                    <div>
                                        <span>Client</span>
                                        <strong>{clientName || "-"}</strong>
                                    </div>
                                </div>

                                {ticket.resolve_at && (
                                    <div className="tv-summary-item">
                                        <span className="tv-summary-icon">
                                            <i className="bi bi-check2-circle" />
                                        </span>
                                        <div>
                                            <span>Resolved At</span>
                                            <strong>{formatDate(ticket.resolve_at)}</strong>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="tv-card tv-status-guide">
                            <div className="tv-card-header">
                                <div>
                                    <span className="tv-section-kicker">STATUS GUIDE</span>
                                    <h2>Arti Status</h2>
                                </div>
                            </div>

                            <div className="tv-guide-item">
                                <span className="tv-guide-dot tv-dot-open" />
                                <div>
                                    <strong>Open</strong>
                                    <p>Ticket telah diterima oleh sistem.</p>
                                </div>
                            </div>

                            <div className="tv-guide-item">
                                <span className="tv-guide-dot tv-dot-progress" />
                                <div>
                                    <strong>In Progress</strong>
                                    <p>Tim support sedang mengerjakan ticket.</p>
                                </div>
                            </div>

                            <div className="tv-guide-item">
                                <span className="tv-guide-dot tv-dot-waiting" />
                                <div>
                                    <strong>Waiting for Client</strong>
                                    <p>Tim support menunggu informasi dari kamu.</p>
                                </div>
                            </div>

                            <div className="tv-guide-item">
                                <span className="tv-guide-dot tv-dot-resolved" />
                                <div>
                                    <strong>Resolved / Closed</strong>
                                    <p>Penanganan ticket telah selesai.</p>
                                </div>
                            </div>
                        </section>

                        <div className="tv-privacy-note">
                            <i className="bi bi-shield-lock" />
                            <p>
                                Jaga kerahasiaan nomor ticket kamu dan hindari
                                membagikannya secara publik.
                            </p>
                        </div>
                    </aside>
                </div>

                <footer className="tv-footer">
                    <span>Support Center</span>
                    <span>
                        <i className="bi bi-heart" /> Here to help you
                    </span>
                </footer>
            </div>
        </main>
    );
};

export default Layout;