import Layout from './Layout';

const Homepage = () => {
  const title = 'PT Saskardigital Solusi Indonesia';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default Homepage;
