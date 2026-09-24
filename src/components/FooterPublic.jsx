const FooterPublic = () => {
    return (
        <>
            {/* FOOTER */}
            <footer id="footer" className="footer-section text-white pb-3">

                <div className="footer-bottom border-top border-secondary border-opacity-25 pt-4">

                    <div className="container">

                        <div className="row g-4">

                            <div className="col-lg-4">
                                <div className="d-flex align-items-center gap-2 mb-3">

                                    <img
                                        src="/logo-bawika.jfif"
                                        alt="Bawika"
                                        width="42"
                                        height="42"
                                    />

                                    <div>

                                        <div className="fw-bold">
                                            PT. Bawika Adhikari Servindo
                                        </div>

                                        <small className="text-white-50">
                                            Industrial Catering Solutions
                                        </small>

                                    </div>

                                </div>


                                <p className="text-white-50 small mb-3">
                                    Gizi terbaik, produksi terbaik. Providing industrial-scale catering
                                    solutions for mining and remote operations across Indonesia.
                                </p>


                                {/* SOCIAL MEDIA */}
                                <div className="d-flex gap-2">

                                    <a
                                        href="https://www.linkedin.com/company/pt-bawika-adhikari-servindo"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="footer-social"
                                    >
                                        <i className="bi bi-linkedin"></i>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/bawika_catering"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="footer-social"
                                    >
                                        <i className="bi bi-instagram"></i>
                                    </a>

                                    <a
                                        href="https://wa.me/6282188857849"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="footer-social"
                                    >
                                        <i className="bi bi-whatsapp"></i>
                                    </a>

                                </div>

                            </div>

                            <div className="col-6 col-lg-3">

                                <h6 className="fw-bold mb-3">
                                    Quick Links
                                </h6>

                                <ul className="list-unstyled footer-links">

                                    <li>
                                        <a href="/">
                                            Home
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/gallery">
                                            Operations Gallery
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/articles">
                                            Articles
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/careers">
                                            Careers
                                        </a>
                                    </li>

                                </ul>

                            </div>


                            <div className="col-6 col-lg-5">

                                <h6 className="fw-bold mb-3">
                                    Contact
                                </h6>

                                <p className="text-white-50 small mb-2">
                                    Jl. Maesa No. 19, Lingkungan 1.
                                    Kel. Paal Dua, Kec. Paal Dua,
                                    Kota Manado, Sulawesi Utara 95129
                                </p>

                                <p className="text-white-50 small mb-2">
                                    WA: +62 821 88857849
                                </p>

                                <p className="text-white-50 small mb-0">
                                    yoppie.putera@bawikakatering.com
                                </p>

                            </div>

                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top border-secondary border-opacity-25 mt-4 pt-3 gap-2">

                            <p className="text-white-50 small mb-0">
                                © 2026 PT. Bawika Adhikari Servindo.
                                All rights reserved.
                            </p>

                            <div className="d-flex gap-3">

                                <a
                                    href="#"
                                    className="footer-policy small"
                                >
                                    Privacy Policy
                                </a>

                                <a
                                    href="#"
                                    className="footer-policy small"
                                >
                                    Terms of Service
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </footer>
        </>
    )
}

export default FooterPublic;