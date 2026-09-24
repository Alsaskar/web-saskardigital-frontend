import Layout from './Layout';

const WebCompanyProfile = () => {
    const title = 'Jasa Pembuatan Website Company Profile Profesional | Saskardigital';
    const description = 'Jasa pembuatan website company profile profesional, modern, responsive, dan sesuai kebutuhan bisnis. Bangun kredibilitas bisnis dan permudah calon pelanggan menemukan informasi tentang perusahaan Anda bersama Saskardigital.';

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />

            <Layout />
        </>
    );
}

export default WebCompanyProfile;
