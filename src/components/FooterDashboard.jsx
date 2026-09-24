export default function FooterDashboard() {
  return (
    <div
      className="footer-dashboard text-center border-top text-muted p-2"
      style={{ borderBottom: '3px solid #005e9c', backgroundColor: '#f5f5f5' }}
    >
      <small>
        © {new Date().getFullYear()} PT. Saskardigital Solusi Indonesia. All rights reserved.
      </small>
    </div>
  );
}
