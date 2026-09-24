import { Table, Button, Badge } from "react-bootstrap";

const ClientTable = ({ clients, onEdit, onDelete }) => {
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
                    <th>WA PIC</th>
                    <th>Status</th>
                    <th>Opsi</th>
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
                            <td>{data.pic_whatsapp}</td>
                            <td>
                                <Badge bg={getStatusVariant(data.status)}>
                                    {data.status}
                                </Badge>
                            </td>
                            <td>
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

export default ClientTable;
