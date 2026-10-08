import Layout from './Layout';

const ProjectRequestPublic = () => {
    const title = 'Project Request - PT Saskardigital Solusi Indonesia';
    const description =
        'Ajuka.';

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />

            <Layout />
        </>
    );
}

export default ProjectRequestPublic;
