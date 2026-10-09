import DynamicPagination from "@/components/DynamicPagination";
import ProjectTable from "@/modules/project/components/ProjectTable";
import { useProject } from "@/modules/project/hooks/useProject";
import { useContext, useEffect, useState } from "react";
import ModalDetailProject from "../../../../modules/project/components/ModalDetail";
import ModalDetailMaintenance from "../../../../modules/project/components/ModalMaintenance";
import { AuthContext } from '@/context/AuthContext'

const Layout = () => {
    const { fetchProject } = useProject()
    const [projects, setProjects] = useState([])
    const { client } = useContext(AuthContext)

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState([])

    const [showModalDetail, setShowModalDetail] = useState(false)
    const _handleShowModalDetail = (data) => {
        setSelectedData(data)
        setShowModalDetail(true)
    }
    const _handleCloseModalDetail = () => setShowModalDetail(false)

    const [showModalDetailMaintenance, setShowModalDetailMaintenance] = useState(false)
    const _handleShowModalDetailMaintenance = (data) => {
        setSelectedData(data)
        setShowModalDetailMaintenance(true)
    }
    const _handleCloseModalDetailMaintenance = () => setShowModalDetailMaintenance(false)

    const _fetchData = async () => {
        const res = await fetchProject(page, search, client.id);

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
            <ModalDetailProject
                data={selectedData}
                show={showModalDetail}
                handleClose={_handleCloseModalDetail}
                onSuccess={_fetchData}
            />

            <ModalDetailMaintenance
                data={selectedData}
                show={showModalDetailMaintenance}
                handleClose={_handleCloseModalDetailMaintenance}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Project Anda</h4>
                    <div>Ini merupakan Data Project Anda</div><hr />

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
                        onDetail={_handleShowModalDetail}
                        onDetailMaintenance={_handleShowModalDetailMaintenance}
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
