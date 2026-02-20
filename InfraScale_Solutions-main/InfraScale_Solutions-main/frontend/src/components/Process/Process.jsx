import "./Process.css";

function Process() {
  return (
    <section className="process" id="process">
      <h2>The 5-Step Infrascale Framework</h2>

      <div className="process-steps">
        <div className="step">
          <h3>1. Discover</h3>
          <p>Deep-dive into your current infrastructure environment.</p>
        </div>

        <div className="step">
          <h3>2. Assess</h3>
          <p>Identify hidden risks and performance bottlenecks.</p>
        </div>

        <div className="step">
          <h3>3. Report</h3>
          <p>Deliver a detailed Infrastructure Health Report & Risk Matrix.</p>
        </div>

        <div className="step">
          <h3>4. Implement</h3>
          <p>Execute deployment or migration with precision.</p>
        </div>

        <div className="step">
          <h3>5. Optimize</h3>
          <p>Continuous tuning to ensure peak performance.</p>
        </div>
      </div>
    </section>
  );
}

export default Process;
