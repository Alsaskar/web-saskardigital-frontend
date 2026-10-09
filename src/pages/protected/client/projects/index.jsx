import Layout from './Layout';

const ProjectsClient = () => {
  const title = 'Project Anda';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default ProjectsClient;
