import Layout from './Layout';

const ClientsSuperadmin = () => {
  const title = 'Clients';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default ClientsSuperadmin;
