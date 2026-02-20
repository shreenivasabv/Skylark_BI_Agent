import "./Domains.css";

function Domains() {
  return (
    <section className="domains">
      <h2>OUR SPECIALIZED DOMAINS</h2>

      <div className="domain">
        <h3>Virtualization & HCI</h3>
        <p>HA architecture, DRS tuning, seamless integration.</p>
      </div>

      <div className="domain">
        <h3>Storage, Backup & DR</h3>
        <p>Zero-loss architecture & immutable backups.</p>
      </div>

      <div className="domain">
        <h3>Enterprise Platforms & DevOps</h3>
        <p>AD design, Docker, Linux automation.</p>
      </div>
    </section>
  );
}

export default Domains;
