import DynamicPagination from "@/components/DynamicPagination";
import ModalAddProject from "@/modules/project/components/ModalAdd";
import ModalDeleteProject from "@/modules/project/components/ModalDelete";
import ModalEditProject from "@/modules/project/components/ModalEdit";
import ProjectTable from "@/modules/project/components/ProjectTable";
import { useProject } from "@/modules/project/hooks/useProject";
import { useEffect, useState } from "react";
import ModalUpdateStatusProject from "../../../../modules/project/components/ModalUpdateStatus";
import ModalDetailProject from "../../../../modules/project/components/ModalDetail";

const Layout = () => {
    const { fetchProject } = useProject()
    const [projects, setProjects] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState([])

    const [showModalAdd, setShowModalAdd] = useState(false);
    const _handleShowModalAdd = () => setShowModalAdd(true);
    const _handleCloseModalAdd = () => setShowModalAdd(false);

    const [showModalEdit, setShowModalEdit] = useState(false)
    const _handleShowModalEdit = (data) => {
        setSelectedData(data)
        setShowModalEdit(true)
    }
    const _handleCloseModalEdit = () => setShowModalEdit(false)

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    const [showModalUpdateStatus, setShowModalUpdateStatus] = useState(false)
    const _handleShowModalUpdateStatus = (data) => {
        setSelectedData(data)
        setShowModalUpdateStatus(true)
    }
    const _handleCloseModalUpdateStatus = () => setShowModalUpdateStatus(false)

    const [showModalDetail, setShowModalDetail] = useState(false)
    const _handleShowModalDetail = (data) => {
        setSelectedData(data)
        setShowModalDetail(true)
    }
    const _handleCloseModalDetail = () => setShowModalDetail(false)

    const _fetchData = async () => {
        const res = await fetchProject(page, search);

        if (res) {
            setProjects(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    useEffect(() => {
        _fetchData()
    }, [page, search])

    return (
        <>
            <ModalAddProject
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditProject
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteProject
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <ModalUpdateStatusProject
                data={selectedData}
                show={showModalUpdateStatus}
                handleClose={_handleCloseModalUpdateStatus}
                onSuccess={_fetchData}
            />

            <ModalDetailProject
                data={selectedData}
                show={showModalDetail}
                handleClose={_handleCloseModalDetail}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola Project</h4>
                    <div>Data Project yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah Project Baru
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari Project..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <ProjectTable
                        projects={projects}
                        onEdit={_handleShowModalEdit}
                        onDelete={_handleShowModalDelete}
                        onUpdateStatus={_handleShowModalUpdateStatus}
                        onDetail={_handleShowModalDetail}
                    />

                    <DynamicPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default Layout;
