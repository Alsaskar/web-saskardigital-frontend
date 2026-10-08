import Layout from './Layout';

const PortalClientLogin = () => {
  const title = 'Client Portal - PT Saskardigital Solusi Indonesia';
  const description = "Client Portal Saskardigital untuk mengakses project, maintenance, ticket, dan layanan digital Anda";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <Layout />
    </>
  );
}

export default PortalClientLogin;
