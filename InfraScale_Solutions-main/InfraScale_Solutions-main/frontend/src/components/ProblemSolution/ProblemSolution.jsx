import "./ProblemSolution.css";

function ProblemSolution() {
  return (
    <section className="problem-solution">
      <div className="container">
        <div className="problem-solution-wrapper">
          {/* Problem Section */}
          <div className="problem-section">
            <div className="section-icon problem-icon">❌</div>
            <h3>The Problem</h3>
            <p>
              Most software fails because of poor initial configuration. Default settings leave 
              you vulnerable to security risks and slow performance.
            </p>
            <ul>
              <li>Unoptimized configurations</li>
              <li>Security vulnerabilities</li>
              <li>Performance bottlenecks</li>
              <li>Compliance risks</li>
            </ul>
          </div>

          {/* Solution Section */}
          <div className="solution-section">
            <div className="section-icon solution-icon">✅</div>
            <h3>Our Solution</h3>
            <p>
              We don't just "install"; we optimize. We follow industry best practices 
              (e.g., CIS benchmarks or vendor-specific hardening) to ensure your system is rock solid.
            </p>
            <ul>
              <li>Industry best practices (CIS benchmarks)</li>
              <li>Vendor-specific hardening</li>
              <li>Security optimization</li>
              <li>Performance tuning</li>
              <li>Compliance assurance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSolution;
