import Layout from './Layout';

const TicketClient = () => {
  const title = 'Ticket Anda';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={title} />

      <Layout />
    </>
  );
}

export default TicketClient;
