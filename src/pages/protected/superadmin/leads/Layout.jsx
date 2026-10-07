import DynamicPagination from "@/components/DynamicPagination";
import ModalAddLeads from "@/modules/leads/components/ModalAdd";
import ModalDeleteLeads from "@/modules/leads/components/ModalDelete";
import ModalEditLeads from "@/modules/leads/components/ModalEdit";
import LeadsTable from "@/modules/leads/components/LeadsTable";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useEffect, useState } from "react";
import ModalUpdateStatusLeads from "../../../../modules/leads/components/ModalUpdateStatus";
import ModalImportLeads from "../../../../modules/leads/components/ModalImport";

const Layout = () => {
    const { fetchLeads } = useLeads()
    const [leadss, setLeadss] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState([])

    // Filter data
    const [status, setStatus] = useState("")
    const [category, setCategory] = useState("")

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

    const [showModalImport, setShowModalImport] = useState(false);
    const _handleShowModalImport = () => setShowModalImport(true);
    const _handleCloseModalImport = () => setShowModalImport(false);

    const _fetchData = async () => {
        const res = await fetchLeads(page, search, status, category);

        if (res) {
            setLeadss(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        }
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    useEffect(() => {
        _fetchData()
    }, [page, search, status, category])

    return (
        <>
            <ModalAddLeads
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditLeads
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteLeads
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <ModalUpdateStatusLeads
                data={selectedData}
                show={showModalUpdateStatus}
                handleClose={_handleCloseModalUpdateStatus}
                onSuccess={_fetchData}
            />

            <ModalImportLeads 
                show={showModalImport}
                handleClose={_handleCloseModalImport}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola Leads</h4>
                    <div>Data Leads yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah Leads Baru
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-success btn-sm w-100"
                                onClick={_handleShowModalImport}
                            >
                                Import Leads
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari Leads..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3 col-6">
                            <select
                                className="form-select form-select-sm"
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <option value="">Semua Status</option>
                                <option value="new">New</option>
                                <option value="qualified">Qualified</option>
                                <option value="project request">Project Request</option>
                                <option value="proposal">Proposal</option>
                                <option value="negotation">Negotation</option>
                                <option value="won">Won</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>

                        <div className="col-md-3 col-6">
                            <select
                                className="form-select form-select-sm"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <option value="">Semua Kategori</option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>
                    </div>

                    <LeadsTable
                        leadss={leadss}
                        onUpdateStatus={_handleShowModalUpdateStatus}
                        onEdit={_handleShowModalEdit}
                        onDelete={_handleShowModalDelete}
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
