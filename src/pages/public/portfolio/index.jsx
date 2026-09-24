import Layout from './Layout';

const Portfolio = () => {
    const title = 'Portfolio - PT Saskardigital Solusi Indonesia';
    const description =
        'Lihat berbagai portfolio website dan software custom yang telah dikembangkan oleh PT Saskardigital Solusi Indonesia untuk membantu bisnis memiliki solusi digital yang sesuai dengan kebutuhan mereka.';

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />

            <Layout />
        </>
    );
}

export default Portfolio;
