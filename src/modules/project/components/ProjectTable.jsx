import { Table, Button, Badge } from "react-bootstrap";
import { formatAmount } from "../../../utils/utilHook";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";

const ProjectTable = ({ projects, onEdit, onDelete, onDetail, onUpdateStatus }) => {
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
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Tipe</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {projects.length > 0 ? (
                    projects.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.client?.nama_company}</td>
                            <td>{data.nama}</td>
                            <td>{data.project_type}</td>
                            <td>
                                <Badge
                                    bg={getCategoryVariant(
                                        data.category_service
                                    )}
                                >
                                    {data.category_service}
                                </Badge>
                            </td>
                            <td>Rp. {formatAmount(data.contract_value)}</td>
                            <td>{formatDate(data.start_date)}</td>
                            <td>{formatDate(data.deadline)}</td>
                            <td>
                                <Badge bg={getStatusVariant(data.status)}>
                                    {data.status}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => onDetail(data)}
                                    title="Detail Project"
                                >
                                    <i className="bi bi-eye"></i>
                                </Button>{" "}

                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => onUpdateStatus(data)}
                                    title="Update Status Project"
                                >
                                    <i className="bi bi-arrow-repeat"></i>
                                </Button>{" "}

                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onEdit(data)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>{" "}

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(data)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="11" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ProjectTable;
