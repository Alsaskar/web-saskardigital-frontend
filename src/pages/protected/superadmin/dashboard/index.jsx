import Layout from './Layout';

const DashboardSuperadmin = () => {
  const title = 'Dashboard - PT Saskardigital Solusi Indonesia';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default DashboardSuperadmin;
