import Layout from './Layout';

const ViewTicketClient = () => {
  const title = 'View Ticket';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default ViewTicketClient;
