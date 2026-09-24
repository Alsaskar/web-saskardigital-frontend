import DynamicPagination from "@/components/DynamicPagination";
import ModalAddClient from "@/modules/client/components/ModalAdd";
import ModalDeleteClient from "@/modules/client/components/ModalDelete";
import ModalEditClient from "@/modules/client/components/ModalEdit";
import ClientTable from "@/modules/client/components/ClientTable";
import { useClient } from "@/modules/client/hooks/useClient";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchClient } = useClient()
    const [clients, setClients] = useState([])

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

    const _fetchData = async () => {
        const res = await fetchClient(page, search);

        if (res) {
            setClients(res.data.data);
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
            <ModalAddClient
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalEditClient
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
            />

            <ModalDeleteClient
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola Client</h4>
                    <div>Data Client yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah Client
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari Client..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <ClientTable
                        clients={clients}
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
