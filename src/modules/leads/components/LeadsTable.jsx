import { Table, Button, Badge } from "react-bootstrap";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";
import { Link } from "react-router-dom";

const LeadsTable = ({ leadss, onEdit, onDelete, onUpdateStatus }) => {
    const formatText = (text) => {
        if (!text) return "-";

        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const getStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case "new":
                return "primary";
            case "qualified":
                return "info";
            case "project request":
                return "warning";
            case "proposal":
                return "secondary";
            case "negotation":
                return "dark";
            case "won":
                return "success";
            case "lost":
                return "danger";
            default:
                return "secondary";
        }
    };

    const getCategoryVariant = (category) => {
        switch (category?.toLowerCase()) {
            case "cold":
                return "secondary";
            case "warm":
                return "warning";
            case "hot":
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
                    <th>Nama Lengkap</th>
                    <th>Email</th>
                    <th>No Wa</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Follow Up At</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {leadss.length > 0 ? (
                    leadss.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.nama_lengkap}</td>
                            <td>{data.email}</td>
                            <td>{data.no_wa}</td>

                            <td>
                                <Badge bg={getStatusVariant(data.status)}>
                                    {formatText(data.status)}
                                </Badge>
                            </td>

                            <td>
                                <Badge bg={getCategoryVariant(data.category)}>
                                    {formatText(data.category)}
                                </Badge>
                            </td>

                            <td>
                                {data.follow_up_at === null
                                    ? "-"
                                    : formatDate(data.follow_up_at)}
                            </td>

                            <td>
                                {data.status !== 'won' && (
                                    <>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => onUpdateStatus(data)}
                                        >
                                            <i className="bi bi-arrow-repeat"></i>
                                        </Button>{" "}
                                    </>
                                )}

                                <Link
                                    to={`/superadmin/leads/detail/${data.id}`}
                                    className="btn btn-success btn-sm"
                                >
                                    <i className="bi bi-eye"></i>
                                </Link>{" "}

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
                        <td colSpan="8" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default LeadsTable;