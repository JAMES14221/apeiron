'use client';

export default function DossierGrid() {
  return (
    <div className="about-dossier-grid">
      <div className="about-dossier-card">
        <h2>About Aperio</h2>
        <p>
          Aperio Research is a student-initiated platform designed to democratize the research
          experience. We curate and showcase selected student research projects that illuminate
          the frontiers of scientific inquiry.
        </p>
      </div>
      <div className="about-dossier-card">
        <h2>Our Mission</h2>
        <ul className="mission-list">
          <li>Open the entry point for students beyond elite schools and labs.</li>
          <li>Provide workshops on research methods, writing, and ethics.</li>
          <li>Build a student research community where selected works inspire others.</li>
          <li>Ensure accessibility: no submission fees, no publication fees.</li>
        </ul>
      </div>
    </div>
  );
}
