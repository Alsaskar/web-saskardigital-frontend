import { Table, Button, Badge, Dropdown } from "react-bootstrap";

const ClientTable = ({ clients, onEdit, onDelete, onDetail, onAddUser }) => {
    const getStatusVariant = (status) => {
        switch (status) {
            case "active":
                return "success";
            case "inactive":
                return "secondary";
            default:
                return "dark";
        }
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Nama Perusahaan</th>
                    <th>Industry</th>
                    <th>PIC</th>
                    <th>Portal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody>
                {clients.length > 0 ? (
                    clients.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.nama_company === null ? '-' : data.nama_company}</td>
                            <td>{data.industry === null ? '-' : data.industry}</td>
                            <td>{data.pic_name}</td>
                            <td>
                                {data.user_count > 0 ? (
                                    <Badge bg="success">
                                        Enabled
                                    </Badge>
                                ) : (
                                    <Badge bg="secondary">
                                        Not Registered
                                    </Badge>
                                )}
                            </td>
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

                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item
                                            onClick={() => onDetail(data)}
                                        >
                                            <i className="bi bi-eye me-2"></i>
                                            View Client
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            onClick={() => onAddUser(data)}
                                        >
                                            <i className="bi bi-person-plus me-2"></i>
                                            Add User
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            onClick={() => onEdit(data)}
                                        >
                                            <i className="bi bi-pencil me-2"></i>
                                            Edit Client
                                        </Dropdown.Item>

                                        <Dropdown.Divider />

                                        <Dropdown.Item
                                            className="text-danger"
                                            onClick={() => onDelete(data)}
                                        >
                                            <i className="bi bi-trash me-2"></i>
                                            Delete Client
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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

export default ClientTable;
