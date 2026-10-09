import { Col, Row, Spinner } from "react-bootstrap";
import "./Layout.css";
import { useContext, useEffect, useState } from "react";
import { useDashboard } from "../../../../modules/dashboard/hooks/useDashboard";
import { AuthContext } from "@/context/AuthContext";

const Layout = () => {
    const { client } = useContext(AuthContext);
    const [dashboard, setDashboard] = useState({ stats: {} });
    const { fetchDashboardClient, loading } = useDashboard();

    useEffect(() => {
        const fetchData = async () => {
            if (!client?.id) return;

            const res = await fetchDashboardClient(client.id);

            if (res) {
                setDashboard(res.data ?? res);
            }
        };

        fetchData();
    }, [client?.id]);

    return (
        <div className="client-dashboard">
            {/* Dashboard Header */}
            <div className="mb-4">
                <div className="text-primary small fw-semibold mb-2">
                    CLIENT PORTAL
                </div>

                <h3 className="fw-bold mb-1">
                    Dashboard Overview
                </h3>

                <p className="text-muted mb-0">
                    Monitor your projects, maintenance, and support tickets.
                </p>
            </div>

            {/* Statistics Cards */}
            <Row className="g-3">
                {/* Ticket Open */}
                <Col xs={12} sm={6} xl={4}>
                    <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Ticket Open
                                    </p>
                                    <h2 className="fw-bold mb-0">
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            String(dashboard.stats?.ticketOpen ?? 0).padStart(2, "0")
                                        )}
                                    </h2>
                                </div>
                                <div className="dashboard-stat-icon text-primary bg-primary-subtle">
                                    <i className="bi bi-ticket-detailed"></i>
                                </div>
                            </div>
                            <div className="text-muted small">
                                Tickets awaiting resolution
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Ticket Resolved */}
                <Col xs={12} sm={6} xl={4}>
                    <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Ticket Resolved
                                    </p>
                                    <h2 className="fw-bold mb-0">
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            String(dashboard.stats?.ticketResolved ?? 0).padStart(2, "0")
                                        )}
                                    </h2>
                                </div>
                                <div className="dashboard-stat-icon text-success bg-success-subtle">
                                    <i className="bi bi-check-circle"></i>
                                </div>
                            </div>
                            <div className="text-muted small">
                                Successfully resolved
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Ticket Closed */}
                <Col xs={12} sm={6} xl={4}>
                    <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Ticket Closed
                                    </p>
                                    <h2 className="fw-bold mb-0">
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            String(dashboard.stats?.ticketClosed ?? 0).padStart(2, "0")
                                        )}
                                    </h2>
                                </div>
                                <div className="dashboard-stat-icon text-secondary bg-secondary-subtle">
                                    <i className="bi bi-archive"></i>
                                </div>
                            </div>
                            <div className="text-muted small">
                                Completed support requests
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Total Projects */}
                <Col xs={12} sm={6} xl={4}>
                    <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Total Projects
                                    </p>
                                    <h2 className="fw-bold mb-0">
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            String(dashboard.stats?.totalProjects ?? 0).padStart(2, "0")
                                        )}
                                    </h2>
                                </div>
                                <div className="dashboard-stat-icon text-info bg-info-subtle">
                                    <i className="bi bi-kanban"></i>
                                </div>
                            </div>
                            <div className="text-muted small">
                                Your registered projects
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Total Maintenance */}
                <Col xs={12} sm={6} xl={4}>
                    <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-muted small mb-2">
                                        Total Maintenance
                                    </p>
                                    <h2 className="fw-bold mb-0">
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            String(dashboard.stats?.totalMaintenance ?? 0).padStart(2, "0")
                                        )}
                                    </h2>
                                </div>
                                <div className="dashboard-stat-icon text-warning bg-warning-subtle">
                                    <i className="bi bi-tools"></i>
                                </div>
                            </div>
                            <div className="text-muted small">
                                Registered maintenance records
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Layout;