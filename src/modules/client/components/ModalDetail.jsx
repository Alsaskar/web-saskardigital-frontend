import { useEffect } from "react";
import { Modal, Button, Badge, Row, Col, Table } from "react-bootstrap";

const ModalDetailClient = ({ data, show, handleClose }) => {
    const users = data?.users || [];

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="bi bi-building me-2"></i>
                    View Client
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* COMPANY */}
                <div className="mb-4">
                    <h5 className="mb-1">
                        {data?.nama_company || "-"}
                    </h5>

                    <div className="text-muted">
                        {data?.industry || "-"}
                    </div>
                </div>

                {/* COMPANY INFORMATION */}
                <h6 className="border-bottom pb-2 mb-3">
                    <i className="bi bi-building me-2"></i>
                    Company Information
                </h6>

                <Row className="mb-4">
                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Nama Perusahaan
                        </small>

                        <div className="fw-semibold">
                            {data?.nama_company || "-"}
                        </div>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Industry
                        </small>

                        <div>
                            {data?.industry || "-"}
                        </div>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Email
                        </small>

                        <div>
                            {data?.email || "-"}
                        </div>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Phone
                        </small>

                        <div>
                            {data?.phone || "-"}
                        </div>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Website
                        </small>

                        <div>
                            {data?.website || "-"}
                        </div>
                    </Col>

                    <Col md={6} className="mb-3">
                        <small className="text-muted">
                            Status
                        </small>

                        <div>
                            <Badge
                                bg={
                                    data?.status === "active"
                                        ? "success"
                                        : "secondary"
                                }
                            >
                                {data?.status || "-"}
                            </Badge>
                        </div>
                    </Col>

                    <Col md={12}>
                        <small className="text-muted">
                            Address
                        </small>

                        <div>
                            {data?.address || "-"}
                        </div>

                        {(data?.city || data?.province) && (
                            <small className="text-muted">
                                {[data.city, data.province]
                                    .filter(Boolean)
                                    .join(", ")}
                            </small>
                        )}
                    </Col>
                </Row>

                {/* PIC */}
                <h6 className="border-bottom pb-2 mb-3">
                    <i className="bi bi-person me-2"></i>
                    PIC Information
                </h6>

                <Row className="mb-4">
                    <Col md={4} className="mb-3">
                        <small className="text-muted">
                            Name
                        </small>

                        <div>
                            {data?.pic_name || "-"}
                        </div>
                    </Col>

                    <Col md={4} className="mb-3">
                        <small className="text-muted">
                            Email
                        </small>

                        <div>
                            {data?.pic_email || "-"}
                        </div>
                    </Col>

                    <Col md={4} className="mb-3">
                        <small className="text-muted">
                            WhatsApp
                        </small>

                        <div>
                            {data?.pic_whatsapp || "-"}
                        </div>
                    </Col>
                </Row>

                {/* PORTAL USERS */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <h6 className="mb-0">
                        <i className="bi bi-people me-2"></i>
                        Portal Users
                    </h6>

                    <Badge bg={users.length > 0 ? "success" : "secondary"}>
                        {users.length} User
                        {users.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                {users.length > 0 ? (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        size="sm"
                    >
                        <thead>
                            <tr align="center">
                                <th>#</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody align="center">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td align="center">
                                        {index + 1}
                                    </td>

                                    <td>
                                        {[
                                            user.firstname,
                                            user.lastname
                                        ]
                                            .filter(Boolean)
                                            .join(" ") || "-"}
                                    </td>

                                    <td>
                                        {user.email || "-"}
                                    </td>

                                    <td align="center">
                                        <Badge bg="primary">
                                            {user.role}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="text-center border rounded p-4">
                        <i className="bi bi-person-x fs-3 text-muted"></i>

                        <div className="fw-semibold mt-2">
                            Belum ada Portal User
                        </div>

                        <small className="text-muted">
                            Client ini belum memiliki akun Client Portal.
                        </small>
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

export default ModalDetailClient;