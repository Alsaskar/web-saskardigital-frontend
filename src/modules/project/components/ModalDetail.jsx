import { Modal, Button, Badge, Row, Col } from "react-bootstrap";
import { formatAmount, formatDateTime } from "../../../utils/utilHook";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";

const ModalDetailProject = ({ data, show, handleClose }) => {

    const getCategoryVariant = (category) => {
        switch (category) {
            case "web company profile":
                return "primary";

            case "software custom":
                return "info";

            default:
                return "secondary";
        }
    };

    const getStatusVariant = (status) => {
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
                return "secondary";
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Detail Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {data ? (
                    <>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Nama Project
                                    </small>
                                    <div className="fw-semibold">
                                        {data.nama || "-"}
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Client
                                    </small>
                                    <div className="fw-semibold">
                                        {data.client?.nama_company || "-"}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Project Type
                                    </small>
                                    <div>
                                        {data.project_type || "-"}
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Category Service
                                    </small>
                                    <div>
                                        <Badge
                                            bg={getCategoryVariant(
                                                data.category_service
                                            )}
                                        >
                                            {data.category_service || "-"}
                                        </Badge>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="mb-3">
                            <small className="text-muted">
                                Description
                            </small>
                            <div>
                                {data.description || "-"}
                            </div>
                        </div>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Contract Value
                                    </small>
                                    <div className="fw-semibold">
                                        Rp.{" "}
                                        {data.contract_value
                                            ? formatAmount(data.contract_value)
                                            : "0"}
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Project Manager
                                    </small>
                                    <div>
                                        {data.project_manager || "-"}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Start Date
                                    </small>
                                    <div>
                                        {data.start_date
                                            ? formatDate(data.start_date)
                                            : "-"}
                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Deadline
                                    </small>
                                    <div>
                                        {data.deadline
                                            ? formatDate(data.deadline)
                                            : "-"}
                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Finish Date
                                    </small>
                                    <div>
                                        {data.finish_date
                                            ? formatDate(data.finish_date)
                                            : "-"}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Status
                                    </small>
                                    <div>
                                        <Badge
                                            bg={getStatusVariant(data.status)}
                                        >
                                            {data.status || "-"}
                                        </Badge>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="mb-3">
                            <small className="text-muted">
                                Notes
                            </small>
                            <div>
                                {data.notes || "-"}
                            </div>
                        </div>

                        <hr />

                        <Row>
                            <Col md={6}>
                                <small className="text-muted">
                                    Created At
                                </small>
                                <div>
                                    {data.created_at
                                        ? formatDateTime(data.created_at)
                                        : "-"}
                                </div>
                            </Col>

                            <Col md={6}>
                                <small className="text-muted">
                                    Updated At
                                </small>
                                <div>
                                    {data.updated_at
                                        ? formatDateTime(data.updated_at)
                                        : "-"}
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div className="text-center text-muted py-4">
                        Tidak ada data project
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClose}
                >
                    Keluar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetailProject;