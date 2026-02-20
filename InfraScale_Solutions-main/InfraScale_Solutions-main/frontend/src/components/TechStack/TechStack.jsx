import "./TechStack.css";

function TechStack() {
  return (
    <section className="techstack" id="techstack">
      <h2>THE TECH WE MASTER</h2>

      <div className="tech-grid">
        <div>
          <h3>Virtualization</h3>
          <p>Nutanix / VMware / Hyper-V / Proxmox</p>
        </div>

        <div>
          <h3>Storage</h3>
          <p>HPE / Dell / Lenovo / StoreOnce / TrueNAS</p>
        </div>

        <div>
          <h3>Backup</h3>
          <p>Veeam / Commvault / Rubrik</p>
        </div>

        <div>
          <h3>OS & Apps</h3>
          <p>Linux / Docker / AD / Microsoft 365 / Shell</p>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
