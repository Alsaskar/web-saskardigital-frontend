import Layout from './Layout';

const UsersSuperadmin = () => {
  const title = 'Users';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default UsersSuperadmin;
