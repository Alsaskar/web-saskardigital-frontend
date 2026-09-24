import Layout from './Layout';

const SoftwareCustom = () => {
    const title = "Jasa Software Custom untuk Bisnis | Saskardigital";
    const description = "Saskardigital membantu bisnis membangun software custom, web application, mobile application, CRM, HRIS, dan business system sesuai kebutuhan dan proses bisnis.";

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />

            <Layout />
        </>
    );
}

export default SoftwareCustom;
