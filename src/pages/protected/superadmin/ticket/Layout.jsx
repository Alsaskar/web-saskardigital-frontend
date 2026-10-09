import DynamicPagination from "@/components/DynamicPagination";
import ModalAddTicket from "@/modules/ticket/components/ModalAdd";
import ModalDeleteTicket from "@/modules/ticket/components/ModalDelete";
import ModalEditTicket from "@/modules/ticket/components/ModalEdit";
import TicketTable from "@/modules/ticket/components/TicketTable";
import { useTicket } from "@/modules/ticket/hooks/useTicket";
import { useEffect, useState } from "react";
import ModalUpdateStatusTicket from "../../../../modules/ticket/components/ModalUpdateStatus";

const Layout = () => {
    const { fetchTicket } = useTicket()
    const [tickets, setTickets] = useState([])

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

    const _fetchData = async () => {
        const res = await fetchTicket(page, search);

        if (res) {
            setTickets(res.data.data);
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
            <ModalAddTicket
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
                isAdmin={true}
            />

            <ModalEditTicket
                data={selectedData}
                show={showModalEdit}
                handleClose={_handleCloseModalEdit}
                onSuccess={_fetchData}
                isAdmin={true}
            />

            <ModalDeleteTicket
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <ModalUpdateStatusTicket 
                data={selectedData}
                show={showModalUpdateStatus}
                handleClose={_handleCloseModalUpdateStatus}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola Ticket</h4>
                    <div>Data Ticket yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah Ticket Baru
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari Ticket..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <TicketTable
                        tickets={tickets}
                        onEdit={_handleShowModalEdit}
                        onDelete={_handleShowModalDelete}
                        onUpdateStatus={_handleShowModalUpdateStatus}
                        isAdmin={true}
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
