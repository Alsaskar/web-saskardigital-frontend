import Layout from './Layout';

const DashboardClient = () => {
  const title = 'Client Portal - Dashboard';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default DashboardClient;
