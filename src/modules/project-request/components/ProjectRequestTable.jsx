import { Table, Button } from "react-bootstrap";

const ProjectRequestTable = ({ projectRequests, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr align="center">
                    <th>#</th>
                    <th>Nama Company</th>
                    <th>Jenis Project</th>
                    <th>Estimasi Budget</th>
                    <th>Target Project</th>
                    <th>Opsi</th>
                </tr>
            </thead>

            <tbody>
                {projectRequests.length > 0 ? (
                    projectRequests.map((data, index) => (
                        <tr key={index} align="center">
                            <td>{index + 1}</td>
                            <td>{data.nama_company}</td>
                            <td>{data.jenis_project}</td>
                            <td>{data.estimasi_budget}</td>
                            <td>{data.target_project}</td>
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
                        <td colSpan="6" align="center">
                            Belum ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ProjectRequestTable;
