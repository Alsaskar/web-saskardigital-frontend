import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Badge,
    Button
} from "react-bootstrap";
import { useDashboard } from "../../../../modules/dashboard/hooks/useDashboard";
import { Link } from 'react-router-dom'

const Layout = () => {

    const [dashboard, setDashboard] = useState(null);
    const { fetchDashboard, loading } = useDashboard();

    const _fetchData = async () => {
        const res = await fetchDashboard();

        if (res) {
            setDashboard(res.data);
        }
    };

    useEffect(() => {
        _fetchData();
    }, []);

    if (loading && !dashboard) {
        return (
            <div className="p-4">

                <div className="text-center py-5">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <div className="mt-2 text-muted">
                        Loading dashboard...
                    </div>

                </div>

            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="p-4">

                <Card className="border-0 shadow-sm">

                    <Card.Body className="text-center py-5">

                        <i className="bi bi-exclamation-circle fs-1 text-muted"></i>

                        <h5 className="mt-3">
                            Dashboard tidak dapat dimuat
                        </h5>

                        <p className="text-muted">
                            Terjadi kesalahan ketika mengambil data dashboard.
                        </p>

                        <Button
                            variant="primary"
                            onClick={_fetchData}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Coba Lagi
                        </Button>

                    </Card.Body>

                </Card>

            </div>
        );
    }

    const stats = [
        {
            title: "Total Leads",
            value: dashboard.stats?.totalLeads ?? 0,
            subtitle: "Total leads",
            icon: "bi-people"
        },
        {
            title: "Project Request",
            value: dashboard.stats?.totalProjectRequests ?? 0,
            subtitle: "Request masuk",
            icon: "bi-folder2-open"
        },
        {
            title: "Total Project",
            value: dashboard.stats?.totalProjects ?? 0,
            subtitle: "Project terdaftar",
            icon: "bi-briefcase"
        },
        {
            title: "Maintenance",
            value: dashboard.stats?.totalMaintenance ?? 0,
            subtitle: "Maintenance aktif",
            icon: "bi-tools"
        },
        {
            title: "Portfolio",
            value: dashboard.stats?.totalPortfolio ?? 0,
            subtitle: `${dashboard.stats?.publishedPortfolio ?? 0} published`,
            icon: "bi-grid"
        },
        {
            title: "Testimoni",
            value: dashboard.stats?.totalTestimoni ?? 0,
            subtitle: `${dashboard.stats?.pendingTestimoni ?? 0} menunggu approval`,
            icon: "bi-chat-quote"
        }
    ];

    const getLeadStatus = (status) => {

        switch (status) {
            case "new":
                return "primary";

            case "qualified":
                return "success";

            case "project request":
                return "warning";

            case "proposal":
                return "info";

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

    const getProjectStatus = (status) => {

        switch (status) {
            case "planning":
                return "secondary";

            case "in progress":
                return "primary";

            case "on hold":
                return "warning";

            case "completed":
                return "success";

            case "cancelled":
                return "danger";

            default:
                return "dark";
        }

    };

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    };

    return (
        <div className="p-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4 className="fw-bold mb-1">
                        Hai, Saskardigital 👋
                    </h4>

                    <p className="text-muted mb-0">
                        Berikut ringkasan aktivitas Saskardigital hari ini.
                    </p>

                </div>

                <div className="text-end">

                    <small className="text-muted d-block">
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })}
                    </small>

                    <span className="small text-muted">
                        Superadmin Dashboard
                    </span>

                </div>

            </div>

            {/* Statistics */}
            <Row className="g-3 mb-4">

                {stats.map((item, index) => (

                    <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        xl={2}
                    >

                        <Card className="border-0 shadow-sm h-100">

                            <Card.Body>

                                <div className="d-flex justify-content-between align-items-start mb-3">

                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light rounded-3"
                                        style={{
                                            width: "44px",
                                            height: "44px"
                                        }}
                                    >
                                        <i className={`bi ${item.icon} fs-5`}></i>
                                    </div>

                                </div>

                                <small className="text-muted">
                                    {item.title}
                                </small>

                                <h3 className="fw-bold mb-1">
                                    {item.value}
                                </h3>

                                <small className="text-muted">
                                    {item.subtitle}
                                </small>

                            </Card.Body>

                        </Card>

                    </Col>

                ))}

            </Row>

            {/* Leads + Project Requests */}
            <Row className="g-3 mb-4">

                {/* Recent Leads */}
                <Col xl={7}>

                    <Card className="border-0 shadow-sm">

                        <Card.Body className="p-0">

                            <div className="d-flex justify-content-between align-items-center p-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Recent Leads
                                    </h5>

                                    <small className="text-muted">
                                        Leads terbaru yang masuk
                                    </small>

                                </div>

                                <Link
                                    to="/superadmin/leads"
                                    className="btn btn-light btn-sm"
                                >
                                    View All
                                </Link>

                            </div>

                            <div className="table-responsive">

                                <Table
                                    hover
                                    className="mb-0 align-middle"
                                >

                                    <thead className="table-light">

                                        <tr>

                                            <th className="px-4">
                                                Client
                                            </th>

                                            <th>
                                                Source
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Date
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {dashboard.recentLeads?.length > 0 ? (

                                            dashboard.recentLeads.map((lead, index) => (

                                                <tr key={lead.id || index}>

                                                    <td className="px-4">

                                                        <div className="fw-semibold">
                                                            {lead.nama_lengkap || "-"}
                                                        </div>

                                                        <small className="text-muted">
                                                            {lead.email || "-"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small>
                                                            {lead.source || "-"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <Badge
                                                            bg={getLeadStatus(lead.status)}
                                                            className="fw-normal"
                                                        >
                                                            {lead.status || "-"}
                                                        </Badge>

                                                    </td>

                                                    <td>

                                                        <small className="text-muted">
                                                            {formatDate(lead.created_at)}
                                                        </small>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center py-4 text-muted"
                                                >
                                                    Belum ada leads.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </Table>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

                {/* Project Requests */}
                <Col xl={5}>

                    <Card className="border-0 shadow-sm h-100">

                        <Card.Body>

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Project Requests
                                    </h5>

                                    <small className="text-muted">
                                        Request terbaru
                                    </small>

                                </div>

                                <i className="bi bi-folder2-open fs-5"></i>

                            </div>

                            {dashboard.recentProjectRequests?.length > 0 ? (

                                dashboard.recentProjectRequests.map((request, index) => (

                                    <div
                                        key={request.id || index}
                                        className="border-bottom pb-3 mb-3"
                                    >

                                        <div>

                                            <div className="fw-semibold">
                                                {request.jenis_project || "-"}
                                            </div>

                                            <small className="text-muted">
                                                {request.nama_company || "-"}
                                            </small>

                                        </div>

                                        <div className="d-flex justify-content-between mt-2">

                                            <small className="text-muted">
                                                Estimated Budget
                                            </small>

                                            <small className="fw-semibold">
                                                {request.estimasi_budget || "-"}
                                            </small>

                                        </div>

                                        <div className="d-flex justify-content-between mt-1">

                                            <small className="text-muted">
                                                Target
                                            </small>

                                            <small className="text-muted">
                                                {request.target_project || "-"}
                                            </small>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="text-center py-4">

                                    <i className="bi bi-folder2-open fs-2 text-muted"></i>

                                    <p className="text-muted mt-2 mb-0">
                                        Belum ada project request.
                                    </p>

                                </div>

                            )}

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            {/* Active Projects */}
            <Row className="g-3">

                <Col xs={12}>

                    <Card className="border-0 shadow-sm">

                        <Card.Body className="p-0">

                            <div className="d-flex justify-content-between align-items-center p-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Active Projects
                                    </h5>

                                    <small className="text-muted">
                                        Project yang sedang berjalan
                                    </small>

                                </div>

                                <i className="bi bi-briefcase fs-5"></i>

                            </div>

                            <div className="table-responsive">

                                <Table
                                    hover
                                    className="mb-0 align-middle"
                                >

                                    <thead className="table-light">

                                        <tr>

                                            <th className="px-4">
                                                Project
                                            </th>

                                            <th>
                                                Type
                                            </th>

                                            <th>
                                                Contract Value
                                            </th>

                                            <th>
                                                Project Manager
                                            </th>

                                            <th>
                                                Deadline
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {dashboard.activeProjects?.length > 0 ? (

                                            dashboard.activeProjects.map((project, index) => (

                                                <tr key={project.id || index}>

                                                    <td className="px-4">

                                                        <div className="fw-semibold">
                                                            {project.nama || "-"}
                                                        </div>

                                                        <small className="text-muted">
                                                            {project.category_service || "-"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small>
                                                            {project.project_type || "-"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small className="fw-semibold">

                                                            {project.contract_value
                                                                ? `Rp ${Number(project.contract_value).toLocaleString("id-ID")}`
                                                                : "-"
                                                            }

                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small>
                                                            {project.project_manager || "-"}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <small className="text-muted">
                                                            {formatDate(project.deadline)}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <Badge
                                                            bg={getProjectStatus(project.status)}
                                                            className="fw-normal"
                                                        >
                                                            {project.status || "-"}
                                                        </Badge>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center py-4 text-muted"
                                                >
                                                    Belum ada project aktif.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </Table>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </div>
    );
};

export default Layout;