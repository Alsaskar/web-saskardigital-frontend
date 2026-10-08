import Layout from './Layout';

const ProfileClient = () => {
  const title = 'Profile';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default ProfileClient;
