import DynamicPagination from "@/components/DynamicPagination";
import ModalAddLeads from "@/modules/leads/components/ModalAdd";
import ModalDeleteLeads from "@/modules/leads/components/ModalDelete";
import ModalEditLeads from "@/modules/leads/components/ModalEdit";
import LeadsTable from "@/modules/leads/components/LeadsTable";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { useEffect, useState } from "react";
import ModalUpdateStatusLeads from "../../../../modules/leads/components/ModalUpdateStatus";
import ModalImportLeads from "../../../../modules/leads/components/ModalImport";


const leadStatusGuides = [
    {
        value: 'new',
        label: 'New',
        description: 'Leads baru ditambahkan atau diimpor dan belum dihubungi.',
        icon: 'bi-inbox',
        color: 'secondary',
    },
    {
        value: 'contacted',
        label: 'Contacted',
        description: 'Leads sudah dihubungi melalui WhatsApp, telepon, atau channel lainnya.',
        icon: 'bi-chat-dots',
        color: 'info',
    },
    {
        value: 'qualified',
        label: 'Qualified',
        description: 'Leads telah dievaluasi dan berpotensi menjadi klien.',
        icon: 'bi-patch-check',
        color: 'primary',
    },
    {
        value: 'project request',
        label: 'Project Request',
        description: 'Calon klien sudah menyampaikan kebutuhan proyek secara konkret.',
        icon: 'bi-clipboard-check',
        color: 'primary',
    },
    {
        value: 'proposal',
        label: 'Proposal',
        description: 'Penawaran proyek sedang disiapkan atau sudah dikirim kepada calon klien.',
        icon: 'bi-file-earmark-text',
        color: 'warning',
    },
    {
        value: 'negotation',
        label: 'Negotiation',
        description: 'Pembahasan harga, ruang lingkup, atau ketentuan kerja sama sedang berlangsung.',
        icon: 'bi-handshake',
        color: 'warning',
    },
    {
        value: 'won',
        label: 'Won',
        description: 'Peluang berhasil dikonversi menjadi klien Saskardigital.',
        icon: 'bi-trophy',
        color: 'success',
    },
    {
        value: 'lost',
        label: 'Lost',
        description: 'Peluang bisnis tidak berhasil atau diputuskan untuk tidak dilanjutkan.',
        icon: 'bi-x-circle',
        color: 'danger',
    },
];

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


                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                            <div>
                                <h5 className="mb-1">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Panduan Status Leads
                                </h5>
                                <p className="text-muted small mb-0">
                                    Penjelasan setiap tahapan dalam proses penjualan Saskardigital.
                                </p>
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
                            {leadStatusGuides.map((item) => (
                                <div className="col" key={item.value}>
                                    <div className="card h-100 border shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div
                                                    className={`d-flex align-items-center justify-content-center rounded-3 bg-${item.color} bg-opacity-10 text-${item.color}`}
                                                    style={{ width: '42px', height: '42px', flexShrink: 0 }}
                                                >
                                                    <i className={`bi ${item.icon} fs-5`}></i>
                                                </div>

                                                <h6 className="mb-0 fw-semibold">
                                                    {item.label}
                                                </h6>
                                            </div>

                                            <p className="text-muted small mb-0">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div><hr />

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
                                <option value="contacted">Contacted</option>
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
