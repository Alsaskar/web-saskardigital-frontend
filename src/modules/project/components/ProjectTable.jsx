import { Table, Button, Badge, Dropdown } from "react-bootstrap";
import { formatAmount } from "../../../utils/utilHook";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";

const ProjectTable = ({ projects, onEdit, onDelete, onDetail, onUpdateStatus, onDetailMaintenance, isAdmin = false }) => {
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
                    {isAdmin && <th>Client</th>}
                    <th>Project</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody>
                {projects.length > 0 ? (
                    projects.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            {isAdmin && <td>{data.client?.nama_company}</td>}
                            <td>{data.nama}</td>
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
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="secondary"
                                        size="sm"
                                        id={`dropdown-client-${data.id}`}
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                        align="end"
                                        popperConfig={{
                                            strategy: "fixed",
                                            modifiers: [
                                                {
                                                    name: "preventOverflow",
                                                    options: {
                                                        boundary: "viewport",
                                                    },
                                                },
                                                {
                                                    name: "flip",
                                                    options: {
                                                        fallbackPlacements: [
                                                            "top-end",
                                                            "bottom-end",
                                                        ],
                                                    },
                                                },
                                            ],
                                        }}
                                    >
                                        <Dropdown.Item onClick={() => onDetail(data)}>
                                            <i className="bi bi-eye me-2"></i>
                                            View Project
                                        </Dropdown.Item>

                                        <Dropdown.Item onClick={() => onDetailMaintenance(data)}>
                                            <i className="bi bi-tools me-2"></i>
                                            View Maintenance
                                        </Dropdown.Item>

                                        {isAdmin && (
                                            <>
                                                <Dropdown.Item onClick={() => onUpdateStatus(data)}>
                                                    <i className="bi bi-arrow-repeat me-2"></i>
                                                    Update Status
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() => onEdit(data)}>
                                                    <i className="bi bi-pencil me-2"></i>
                                                    Edit Project
                                                </Dropdown.Item>

                                                <Dropdown.Divider />

                                                <Dropdown.Item
                                                    className="text-danger"
                                                    onClick={() => onDelete(data)}
                                                >
                                                    <i className="bi bi-trash me-2"></i>
                                                    Delete Project
                                                </Dropdown.Item>
                                            </>
                                        )}

                                    </Dropdown.Menu>
                                </Dropdown>
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
