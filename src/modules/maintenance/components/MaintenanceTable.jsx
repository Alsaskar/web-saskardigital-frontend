import { Table, Button, Badge } from "react-bootstrap";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";
import { formatAmount } from "../../../utils/utilHook";

const MaintenanceTable = ({ maintenances, onEdit, onDelete, onDetail }) => {
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

        return labels[value] || value;
    };

    const formatStatus = (value) => {
        const labels = {
            pending: "Pending",
            active: "Active",
            expired: "Expired",
            cancelled: "Cancelled",
        };

        return labels[value] || value;
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Project</th>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Billing Cycle</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {maintenances.length > 0 ? (
                    maintenances.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.project.nama}</td>
                            <td>{data.title}</td>
                            <td>{formatDate(data.start_date)}</td>
                            <td>{formatDate(data.end_date)}</td>
                            <td>Rp. {formatAmount(data.price)}</td>
                            <td>
                                <Badge bg={billingCycleVariant[data.billing_cycle]}>
                                    {formatBillingCycle(data.billing_cycle)}
                                </Badge>
                            </td>

                            <td>
                                <Badge bg={statusVariant[data.status]}>
                                    {formatStatus(data.status)}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => onDetail(data)}
                                >
                                    <i className="bi bi-eye"></i>
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
                        <td colSpan="9" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default MaintenanceTable;
