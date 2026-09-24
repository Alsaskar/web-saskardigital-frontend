import Layout from './Layout';

export default function NotFound() {
  const title = '404 Page Not Found - PT Bawika Adhikari Servindo';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}
