import DynamicPagination from "@/components/DynamicPagination";
import ModalAddUser from "@/modules/user/components/ModalAdd";
import ModalDeleteUser from "@/modules/user/components/ModalDelete";
import UserTable from "@/modules/user/components/UserTable";
import { useUser } from "@/modules/user/hooks/useUser";
import { useEffect, useState } from "react";

const Layout = () => {
    const { fetchUser } = useUser()
    const [users, setUsers] = useState([])

    // pagination state
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState([])

    const [showModalAdd, setShowModalAdd] = useState(false);
    const _handleShowModalAdd = () => setShowModalAdd(true);
    const _handleCloseModalAdd = () => setShowModalAdd(false);

    const [showModalDelete, setShowModalDelete] = useState(false)
    const _handleShowModalDelete = (data) => {
        setSelectedData(data)
        setShowModalDelete(true)
    }
    const _handleCloseModalDelete = () => setShowModalDelete(false)

    const _fetchData = async () => {
        const res = await fetchUser(page, search);

        if (res) {
            setUsers(res.data.data);
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
            <ModalAddUser
                show={showModalAdd}
                handleClose={_handleCloseModalAdd}
                onSuccess={_fetchData}
            />

            <ModalDeleteUser
                data={selectedData}
                show={showModalDelete}
                handleClose={_handleCloseModalDelete}
                onSuccess={_fetchData}
            />

            <div className="card">
                <div className="card-body">
                    <h4>Kelola User</h4>
                    <div>Data User yang telah dibuat</div><hr />

                    <div className="row mb-3">
                        <div className="col-md-2 col-4">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                onClick={_handleShowModalAdd}
                            >
                                Tambah User Baru
                            </button>
                        </div>
                    </div>

                    <div className="row g-2 mb-2 align-items-end">
                        <div className="col-md-4 col-6">
                            <input
                                type="text"
                                className="form-control form-select-sm"
                                placeholder="Cari User..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <UserTable
                        users={users}
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
