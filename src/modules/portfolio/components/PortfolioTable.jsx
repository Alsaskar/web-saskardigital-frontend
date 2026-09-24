import { Table, Button, Badge } from "react-bootstrap";
import { formatDate } from "../../../../../backend/core/utils/dateUtil";

const PortfolioTable = ({ portfolios, onEdit, onDelete }) => {
    const getStatusVariant = (status) => {
        switch (status) {
            case "draft":
                return "secondary";

            case "published":
                return "success";

            case "archived":
                return "warning";

            default:
                return "secondary";
        }
    };

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Title</th>
                    <th>Sub Title</th>
                    <th>Category Service</th>
                    <th>Project Type</th>
                    <th>Start Date</th>
                    <th>Finish Date</th>
                    <th>Status</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {portfolios.length > 0 ? (
                    portfolios.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.title}</td>
                            <td>{data.sub_title}</td>
                            <td>{data.category_service}</td>
                            <td>{data.project_type}</td>
                            <td>{formatDate(data.start_date)}</td>
                            <td>{formatDate(data.finish_date)}</td>
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
                        <td colSpan="9" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default PortfolioTable;
