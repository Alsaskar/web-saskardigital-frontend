import { Link } from "react-router-dom";
import { Table, Button, Badge } from "react-bootstrap";

const TicketTable = ({ tickets, onEdit, onDelete, onUpdateStatus, isAdmin }) => {
    const getPriorityVariant = (priority) => {
        switch (priority) {
            case "low":
                return "success";
            case "medium":
                return "info";
            case "high":
                return "warning";
            case "urgent":
                return "danger";
            default:
                return "secondary";
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case "open":
                return "primary";
            case "in progress":
                return "info";
            case "waiting client":
                return "warning";
            case "resolved":
                return "success";
            case "closed":
                return "secondary";
            case "cancelled":
                return "danger";
            default:
                return "secondary";
        }
    };

    const getCategoryVariant = (category) => {
        switch (category) {
            case "bug":
                return "danger";
            case "feature request":
                return "primary";
            case "technical support":
                return "info";
            case "account":
                return "secondary";
            case "billing":
                return "warning";
            case "other":
                return "dark";
            default:
                return "secondary";
        }
    };

    const formatLabel = (value) => {
        if (!value) return "-";

        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Ticket Number</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {tickets.length > 0 ? (
                    tickets.map((data, index) => (
                        <tr key={data.id ?? index} align="center">
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    to={isAdmin ? `/superadmin/ticket-view/${data.ticket_number}` : `/client/ticket-view/${data.ticket_number}`}
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    #{data.ticket_number}
                                </Link>
                            </td>
                            <td>{data.subject}</td>

                            <td>
                                <Badge bg={getPriorityVariant(data.priority)}>
                                    {formatLabel(data.priority)}
                                </Badge>
                            </td>

                            <td>
                                <Badge bg={getStatusVariant(data.status)}>
                                    {formatLabel(data.status)}
                                </Badge>
                            </td>

                            <td>
                                <Badge bg={getCategoryVariant(data.category)}>
                                    {formatLabel(data.category)}
                                </Badge>
                            </td>

                            <td>
                                {isAdmin &&
                                    data.status !== "closed" &&
                                    data.status !== "cancelled" && (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => onUpdateStatus(data)}
                                                title="Update Status Ticket"
                                            >
                                                <i className="bi bi-arrow-repeat"></i>
                                            </Button>{" "}
                                        </>
                                    )}

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
                        <td colSpan="7" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default TicketTable;