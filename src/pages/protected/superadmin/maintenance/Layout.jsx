import DynamicPagination from "@/components/DynamicPagination";
import ModalAddMaintenance from "@/modules/maintenance/components/ModalAdd";
import ModalDeleteMaintenance from "@/modules/maintenance/components/ModalDelete";
import ModalEditMaintenance from "@/modules/maintenance/components/ModalEdit";
import MaintenanceTable from "@/modules/maintenance/components/MaintenanceTable";
import { useMaintenance } from "@/modules/maintenance/hooks/useMaintenance";
import { useEffect, useState } from "react";
import ModalDetailMaintenance from "../../../../modules/maintenance/components/ModalDetail";

const Layout = () => {
    const { fetchMaintenance } = useMaintenance()
    const [maintenances, setMaintenances] = useState([])

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

    const [showModalDetail, setShowModalDetail] = useState(false)
    const _handleShowModalDetail = (data) => {
        setSelectedData(data)
        setShowModalDetail(true)
    }
    const _handleCloseModalDetail = () => setShowModalDetail(false)

    const _fetchData = async () => {
        const res = await fetchMaintenance(page, search);

        if (res) {
            setMaintenances(res.data.data);
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
            <ModalAddMaintenance
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditMaintenance
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteMaintenance
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <ModalDetailMaintenance
                data={selectedData}
                show={showModalDetail}
                handleClose={_handleCloseModalDetail}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola Maintenance</h4>
                    <div>Data Maintenance yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah Maintenance
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari Maintenance..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <MaintenanceTable
                        maintenances={maintenances}
                        onEdit={_handleShowModalEdit}
                        onDelete={_handleShowModalDelete}
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
