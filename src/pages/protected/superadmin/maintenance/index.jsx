import Layout from './Layout';

const MaintenanceSuperadmin = () => {
  const title = 'Maintenance';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default MaintenanceSuperadmin;
