import { Table, Button, Badge } from "react-bootstrap";
import { truncateText } from "../../../utils/utilHook"; 

const TestimoniTable = ({ testimonis, onEdit, onDelete }) => {
    const getStatusVariant = (status) => {
        switch (status) {
            case "draft":
                return "secondary";
            case "published":
                return "success";
            case "reject":
                return "danger";
            default:
                return "dark";
        }
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Client</th>
                    <th>PIC</th>
                    <th>Jabatan</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {testimonis.length > 0 ? (
                    testimonis.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data?.client?.nama_company}</td>
                            <td>{data.nama_pic}</td>
                            <td>{data.jabatan}</td>
                            <td>{truncateText(data.message, 50)}</td>
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

export default TestimoniTable;