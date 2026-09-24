import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./leads-detail.css";
import { useLeads } from "../../../../../modules/leads/hooks/useLeads";
import ModalEditLeads from "@/modules/leads/components/ModalEdit";

import ModalAddProjectRequest from "../../../../../modules/project-request/components/ModalAdd";
import ModalEditProjectRequest from "../../../../../modules/project-request/components/ModalEdit";
import ModalDeleteProjectRequest from "../../../../../modules/project-request/components/ModalDelete";

const statusList = [
    "new",
    "qualified",
    "project request",
    "proposal",
    "negotation",
    "won"
];

const statusLabel = {
    new: "New",
    qualified: "Qualified",
    "project request": "Project Request",
    proposal: "Proposal",
    negotation: "Negotiation",
    won: "Won",
    lost: "Lost"
};

const formatCurrency = (value) => {
    if (!value) return "-";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
};

const formatDate = (value) => {
    if (!value) return "-";

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(value));
};

const getStatusVariant = (status) => {
    switch (status) {
        case "new":
            return "secondary";
        case "qualified":
            return "info";
        case "project request":
            return "primary";
        case "proposal":
            return "warning";
        case "negotation":
            return "warning";
        case "won":
            return "success";
        case "lost":
            return "danger";
        default:
            return "secondary";
    }
};

const Layout = () => {
    const { id } = useParams();
    const { fetchDetailLeads } = useLeads()
    const [lead, setLead] = useState([])

    const _fetchData = async () => {
        const res = await fetchDetailLeads(id);

        if (res) {
            console.log(res.data)
            setLead(res.data);
        }
    };

    useEffect(() => {
        _fetchData()
    }, [])

    const showProjectRequest = [
        "project request",
        "proposal",
        "negotation",
        "won"
    ].includes(lead.status);

    const showClient = lead.status === "won" && lead.client;

    const [showModalEdit, setShowModalEdit] = useState(false)
    const _handleShowModalEdit = (data) => {
        setShowModalEdit(true)
    }
    const _handleCloseModalEdit = () => setShowModalEdit(false)


    return (
        <>
            <ModalEditLeads
                data={lead}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <div className="leads-detail-page">
                <Container fluid="xl">
                    <div className="mb-4">
                        <Link to="/superadmin/leads" className="detail-back-link">
                            <i className="bi bi-arrow-left me-2"></i>
                            Kembali ke Leads
                        </Link>
                    </div>

                    <Card className="detail-hero border-0 mb-4">
                        <Card.Body>
                            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <h3 className="fw-semibold mb-0">
                                            {lead.nama_lengkap}
                                        </h3>

                                        <Badge bg={getStatusVariant(lead.status)}>
                                            {statusLabel[lead.status]}
                                        </Badge>
                                    </div>

                                    <div className="text-muted small">
                                        <span>{lead.email}</span>
                                        <span className="mx-2">•</span>
                                        <span>{lead.no_wa}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline-primary"
                                    className="detail-action-btn"
                                    onClick={_handleShowModalEdit}
                                >
                                    <i className="bi bi-pencil me-2"></i>
                                    Edit Lead
                                </Button>
                            </div>

                            <div className="lead-progress mt-4">
                                {statusList.map((status, index) => {
                                    const currentIndex = statusList.indexOf(
                                        lead.status
                                    );

                                    const active = index <= currentIndex;

                                    return (
                                        <div
                                            className={`lead-progress-item ${active ? "active" : ""}`}
                                            key={status}
                                        >
                                            <div className="lead-progress-dot">
                                                {active && (
                                                    <i className="bi bi-check"></i>
                                                )}
                                            </div>

                                            <span>
                                                {statusLabel[status]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card.Body>
                    </Card>

                    <Row className="g-4 mb-4">
                        <Col lg={7}>
                            <Card className="detail-card border-0 h-100">
                                <Card.Body>
                                    <SectionTitle
                                        icon="person"
                                        title="Informasi Lead"
                                    />

                                    <Row className="g-4">
                                        <InfoItem
                                            label="Nama Lengkap"
                                            value={lead.nama_lengkap}
                                        />

                                        <InfoItem
                                            label="Email"
                                            value={lead.email}
                                        />

                                        <InfoItem
                                            label="WhatsApp"
                                            value={lead.no_wa}
                                        />

                                        <InfoItem
                                            label="Source"
                                            value={lead.source}
                                        />

                                        <InfoItem
                                            label="Category"
                                            value={
                                                lead.category
                                                    ? lead.category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    lead.category.slice(1)
                                                    : "-"
                                            }
                                        />

                                        {/* <InfoItem
                                        label="Assign To"
                                        value={`User #${lead.assign_to}`}
                                    /> */}
                                    </Row>

                                    {lead.notes && (
                                        <div className="detail-notes mt-4">
                                            <small>Notes</small>
                                            <p>{lead.notes}</p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={5}>
                            <Card className="detail-card border-0 h-100">
                                <Card.Body>
                                    <SectionTitle
                                        icon="calendar-check"
                                        title="Follow Up"
                                    />

                                    <div className="follow-up-item">
                                        <div>
                                            <small>Follow Up Berikutnya</small>
                                            <strong>
                                                {formatDate(lead.follow_up_at)}
                                            </strong>
                                        </div>

                                        <i className="bi bi-calendar-event"></i>
                                    </div>

                                    <div className="follow-up-item">
                                        <div>
                                            <small>Last Update Status</small>
                                            <strong>
                                                {formatDate(
                                                    lead.last_update_status_at
                                                )}
                                            </strong>
                                        </div>

                                        <i className="bi bi-clock-history"></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {showProjectRequest && (
                        <ProjectRequestSection
                            projectRequests={lead.projectRequests}
                            onSuccess={_fetchData}
                        />
                    )}

                    {showClient && <ClientSection client={lead.client} />}
                </Container>
            </div>
        </>

    );
};

const SectionTitle = ({ icon, title }) => {
    return (
        <div className="section-title">
            <div className="section-title-icon">
                <i className={`bi bi-${icon}`}></i>
            </div>

            <div>
                <h5>{title}</h5>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => {
    return (
        <Col md={6}>
            <div className="info-item">
                <small>{label}</small>
                <div>{value || "-"}</div>
            </div>
        </Col>
    );
};

const ProjectRequestSection = ({ projectRequests, onSuccess }) => {
    const { id } = useParams();
    const [selectedData, setSelectedData] = useState([])

    const [showActionMenu, setShowActionMenu] = useState(null);

    const _handleToggleActionMenu = (projectId) => {
        setShowActionMenu((prev) =>
            prev === projectId ? null : projectId
        );
    };

    const [showModalProjectRequest, setShowModalProjectRequest] = useState(false)
    const _handleShowModalProjectRequest = () => {
        setShowModalProjectRequest(true)
    }
    const _handleCloseModalProjectRequest = () => setShowModalProjectRequest(false)

    const [showModalEdit, setShowModalEdit] = useState(false)
    const _handleShowModalEdit = (data) => {
        setSelectedData(data)
        setShowModalEdit(true)
    }
    const _handleCloseModalEdit = () => setShowModalEdit(false)

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".project-action-container")) {
                setShowActionMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <ModalAddProjectRequest
                leadId={id}
                show={showModalProjectRequest}
                handleClose={_handleCloseModalProjectRequest}
                onSuccess={onSuccess}
            />

            <ModalEditProjectRequest
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={onSuccess}
            />

            <ModalDeleteProjectRequest
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={onSuccess}
            />

            <Card className="detail-card border-0 mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <SectionTitle
                            icon="briefcase"
                            title="Project Request"
                        />

                        <Button
                            variant="primary"
                            className="detail-action-btn"
                            onClick={_handleShowModalProjectRequest}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Tambah Project
                        </Button>
                    </div>

                    {projectRequests.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <i className="bi bi-briefcase"></i>
                            </div>

                            <h6>Belum ada Project Request</h6>

                            <p>
                                Lead ini sudah masuk tahap Project Request,
                                tetapi belum memiliki detail project.
                            </p>

                            <Button
                                variant="primary"
                                onClick={_handleShowModalProjectRequest}
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                Tambahkan Project Request
                            </Button>
                        </div>
                    ) : (
                        <Row className="g-3">
                            {projectRequests.map((project) => (
                                <Col lg={6} key={project.id}>
                                    <div className="project-request-card">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <small>Nama Company</small>
                                                <h6>
                                                    {project.nama_company || "-"}
                                                </h6>
                                            </div>

                                            <div className="position-relative project-action-container">
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    onClick={() =>
                                                        _handleToggleActionMenu(project.id)
                                                    }
                                                >
                                                    <i className="bi bi-three-dots"></i>
                                                </Button>

                                                {showActionMenu === project.id && (
                                                    <div className="project-action-menu">
                                                        <button
                                                            type="button"
                                                            className="project-action-menu-item"
                                                            onClick={() =>
                                                                _handleShowModalEdit(project)
                                                            }
                                                        >
                                                            <i className="bi bi-pencil me-2"></i>
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="project-action-menu-item text-danger"
                                                            onClick={() =>
                                                                _handleShowModalDelete(project)
                                                            }
                                                        >
                                                            <i className="bi bi-trash me-2"></i>
                                                            Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <Row className="g-3 mt-1">
                                            <Col sm={6}>
                                                <div className="project-info">
                                                    <small>Jenis Project</small>
                                                    <span>
                                                        {project.jenis_project ||
                                                            "-"}
                                                    </span>
                                                </div>
                                            </Col>

                                            <Col sm={6}>
                                                <div className="project-info">
                                                    <small>Estimasi Budget</small>
                                                    <span>{project.estimasi_budget}</span>
                                                </div>
                                            </Col>

                                            <Col sm={6}>
                                                <div className="project-info">
                                                    <small>Target Project</small>
                                                    <span>{project.target_project}</span>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="project-needs">
                                            <small>Kebutuhan</small>
                                            <p>
                                                {project.kebutuhan || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

const ClientSection = ({ client }) => {
    return (
        <Card className="detail-card border-0 mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <SectionTitle
                        icon="building"
                        title="Client Information"
                    />

                    <Badge
                        bg={
                            client.status === "active"
                                ? "success"
                                : "secondary"
                        }
                    >
                        {client.status}
                    </Badge>
                </div>

                <Row className="g-4">
                    <Col lg={8}>
                        <div className="client-company">
                            <div className="client-logo">
                                {client.logo_company ? (
                                    <img
                                        src={client.logo_company}
                                        alt={client.nama_company}
                                    />
                                ) : (
                                    <i className="bi bi-building"></i>
                                )}
                            </div>

                            <div>
                                <h5>{client.nama_company}</h5>
                                <p>{client.industry || "-"}</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="info-item">
                            <small>Website</small>
                            <div>
                                {client.website ? (
                                    <a
                                        href={client.website}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {client.website}
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="info-item">
                            <small>Alamat</small>
                            <div>
                                {client.address || "-"}
                                <br />
                                {client.city}, {client.province}
                            </div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="info-item">
                            <small>Company Email</small>
                            <div>{client.email || "-"}</div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="info-item">
                            <small>Phone</small>
                            <div>{client.phone || "-"}</div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="info-item">
                            <small>PIC</small>
                            <div>
                                <strong>{client.pic_name || "-"}</strong>

                                <div className="small text-muted mt-1">
                                    {client.pic_email || "-"}
                                </div>

                                <div className="small text-muted">
                                    {client.pic_whatsapp || "-"}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Layout;