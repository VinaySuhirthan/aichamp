"use client";

export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar" aria-label="Quick actions">
      <a
        href="#work"
        className="btn btn--ghost flex-1 justify-center text-center"
        aria-label="View our work"
      >
        <span>Our Work</span>
      </a>
      <a
        href="#contact"
        className="btn btn--primary flex-1 justify-center text-center"
        aria-label="Book a consultation"
      >
        <span>Book Consultation</span>
      </a>
    </div>
  );
}
