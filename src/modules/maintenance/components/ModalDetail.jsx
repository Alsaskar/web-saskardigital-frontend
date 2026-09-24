import { Modal, Button, Badge, Row, Col } from "react-bootstrap";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";
import { formatAmount } from "../../../utils/utilHook";

const ModalDetailMaintenance = ({ data, show, handleClose }) => {

    const billingCycleVariant = {
        monthly: "info",
        quarterly: "primary",
        yearly: "dark",
    };

    const statusVariant = {
        pending: "warning",
        active: "success",
        expired: "secondary",
        cancelled: "danger",
    };

    const formatBillingCycle = (value) => {
        const labels = {
            monthly: "Monthly",
            quarterly: "Quarterly",
            yearly: "Yearly",
        };

        return labels[value] || value || "-";
    };

    const formatStatus = (value) => {
        const labels = {
            pending: "Pending",
            active: "Active",
            expired: "Expired",
            cancelled: "Cancelled",
        };

        return labels[value] || value || "-";
    };

    const formatAutoRenew = (value) => {
        if (value === true || value === "true" || value === "1") {
            return {
                label: "Aktif",
                variant: "success",
            };
        }

        return {
            label: "Tidak Aktif",
            variant: "secondary",
        };
    };

    const autoRenew = formatAutoRenew(data?.auto_renew);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Detail Maintenance</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-light">

                {!data ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" size="sm" />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-white border rounded p-3 mb-3">
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <div className="text-muted small mb-1">
                                        Project
                                    </div>

                                    <h5 className="mb-1">
                                        {data.project?.nama || "-"}
                                    </h5>

                                    <div className="text-muted">
                                        {data.title || "-"}
                                    </div>
                                </Col>

                                <Col md={4} className="text-md-end mt-3 mt-md-0">
                                    <Badge
                                        bg={statusVariant[data.status]}
                                        className="px-3 py-2"
                                    >
                                        {formatStatus(data.status)}
                                    </Badge>
                                </Col>
                            </Row>
                        </div>

                        {/* Informasi Maintenance */}
                        <div className="bg-white border rounded p-3 mb-3">
                            <h6 className="fw-bold mb-3">
                                Informasi Maintenance
                            </h6>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <div className="text-muted small">
                                        Billing Cycle
                                    </div>

                                    <div className="mt-1">
                                        <Badge
                                            bg={
                                                billingCycleVariant[
                                                    data.billing_cycle
                                                ]
                                            }
                                        >
                                            {formatBillingCycle(
                                                data.billing_cycle
                                            )}
                                        </Badge>
                                    </div>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <div className="text-muted small">
                                        Auto Renew
                                    </div>

                                    <div className="mt-1">
                                        <Badge bg={autoRenew.variant}>
                                            {autoRenew.label}
                                        </Badge>
                                    </div>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <div className="text-muted small">
                                        Start Date
                                    </div>

                                    <div className="fw-semibold mt-1">
                                        {formatDate(data.start_date)}
                                    </div>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <div className="text-muted small">
                                        End Date
                                    </div>

                                    <div className="fw-semibold mt-1">
                                        {formatDate(data.end_date)}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Harga */}
                        <div className="bg-white border rounded p-3 mb-3">
                            <h6 className="fw-bold mb-3">
                                Informasi Harga
                            </h6>

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="text-muted small">
                                        Harga Maintenance
                                    </div>

                                    <div className="fs-5 fw-bold">
                                        Rp. {formatAmount(data.price)}
                                    </div>
                                </div>

                                <div className="text-end">
                                    <div className="text-muted small">
                                        Periode
                                    </div>

                                    <div className="fw-semibold">
                                        {formatBillingCycle(
                                            data.billing_cycle
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white border rounded p-3">
                            <h6 className="fw-bold mb-3">
                                Deskripsi
                            </h6>

                            <div className="text-muted">
                                {data.description || "Tidak ada deskripsi."}
                            </div>
                        </div>
                    </>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClose}
                >
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetailMaintenance;