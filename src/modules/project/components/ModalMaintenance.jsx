import { useEffect, useState } from "react";
import { Modal, Button, Badge, Row, Col, Spinner, Card } from "react-bootstrap";
import { useMaintenance } from '../../maintenance/hooks/useMaintenance'
import './modal-detail-maintenance.css'
import { formatDate } from "../../../../../backend/core/utils/dateUtil";
import { formatAmount } from "../../../utils/utilHook";

const ModalDetailMaintenance = ({ data, show, handleClose }) => {
    const { getByIdProjectMaintenance } = useMaintenance()
    const [maintenance, setMaintenance] = useState()
    const [loading, setLoading] = useState(false);

    const _fetchData = async () => {
        try {
            setLoading(true);

            const res = await getByIdProjectMaintenance(data.id);

            if (res) {
                setMaintenance(res.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch maintenance:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!show) return;

        _fetchData()
    }, [show])

    const getStatusVariant = (status) => {
        switch (status) {
            case "active":
                return "success";

            case "pending":
                return "warning";

            case "expired":
                return "secondary";

            case "cancelled":
                return "danger";

            default:
                return "secondary";
        }
    };

    const getBillingCycleLabel = (cycle) => {
        switch (cycle) {
            case "monthly":
                return "Monthly";

            case "quarterly":
                return "Quarterly";

            case "yearly":
                return "Yearly";

            default:
                return cycle || "-";
        }
    };

    const getAutoRenewLabel = (value) => {
        if (
            value === true ||
            value === "true" ||
            value === "yes" ||
            value === "1"
        ) {
            return "Auto Renew";
        }

        return "Manual Renewal";
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "active":
                return "Active";

            case "pending":
                return "Pending";

            case "expired":
                return "Expired";

            case "cancelled":
                return "Cancelled";

            default:
                return status || "-";
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            className="maintenance-detail-modal"
        >
            <Modal.Header closeButton>
                <div>
                    <div className="maintenance-modal-eyebrow">
                        PROJECT MAINTENANCE
                    </div>

                    <Modal.Title>
                        Maintenance
                    </Modal.Title>

                    <div className="maintenance-modal-project">
                        <i className="bi bi-kanban-fill me-2"></i>
                        {data?.nama || "Project"}
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body>
                {loading ? (
                    <div className="maintenance-loading">
                        <Spinner animation="border" size="sm" />
                        <span>Memuat data maintenance...</span>
                    </div>
                ) : !maintenance ? (
                    <div className="maintenance-empty">
                        <div className="maintenance-empty-icon">
                            <i className="bi bi-tools"></i>
                        </div>

                        <h6>Belum Ada Maintenance</h6>

                        <p>
                            Belum terdapat layanan maintenance yang terdaftar
                            untuk project ini.
                        </p>
                    </div>
                ) : (
                    <Card className="maintenance-card">
                        <Card.Body>
                            <div className="maintenance-card-header">
                                <div className="maintenance-title-wrapper">
                                    <div className="maintenance-icon">
                                        <i className="bi bi-tools"></i>
                                    </div>

                                    <div>
                                        <h5>{maintenance.title}</h5>

                                        <span>
                                            Maintenance #{maintenance.id}
                                        </span>
                                    </div>
                                </div>

                                <Badge
                                    bg={getStatusVariant(maintenance.status)}
                                    className="maintenance-status"
                                >
                                    {getStatusLabel(maintenance.status)}
                                </Badge>
                            </div>

                            <div className="maintenance-description">
                                {maintenance.description ? (
                                    <p>{maintenance.description}</p>
                                ) : (
                                    <p className="text-muted">
                                        Tidak ada deskripsi maintenance.
                                    </p>
                                )}
                            </div>

                            <Row className="g-3 maintenance-info">
                                <Col md={6}>
                                    <div className="maintenance-info-item">
                                        <span>
                                            <i className="bi bi-calendar3"></i>
                                            Periode Maintenance
                                        </span>

                                        <strong>
                                            {formatDate(
                                                maintenance.start_date
                                            )}

                                            <i className="bi bi-arrow-right mx-2"></i>

                                            {formatDate(
                                                maintenance.end_date
                                            )}
                                        </strong>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="maintenance-info-item">
                                        <span>
                                            <i className="bi bi-arrow-repeat"></i>
                                            Billing Cycle
                                        </span>

                                        <strong>
                                            {getBillingCycleLabel(
                                                maintenance.billing_cycle
                                            )}
                                        </strong>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="maintenance-info-item">
                                        <span>
                                            <i className="bi bi-wallet2"></i>
                                            Maintenance Fee
                                        </span>

                                        <strong className="maintenance-price">
                                            Rp.{" "}
                                            {formatAmount(
                                                maintenance.price
                                            )}
                                        </strong>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="maintenance-info-item">
                                        <span>
                                            <i className="bi bi-arrow-clockwise"></i>
                                            Renewal
                                        </span>

                                        <strong>
                                            {getAutoRenewLabel(
                                                maintenance.auto_renew
                                            )}
                                        </strong>
                                    </div>
                                </Col>
                            </Row>

                            <div className="maintenance-footer">
                                <span>
                                    <i className="bi bi-shield-check me-2"></i>
                                    Layanan maintenance project
                                </span>

                                <span>
                                    ID #{maintenance.id}
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClose}
                >
                    <i className="bi bi-x-lg me-2"></i>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetailMaintenance;