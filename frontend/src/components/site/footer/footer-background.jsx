export function FooterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="footer-guide-grid absolute inset-0 opacity-80" />
      <div className="footer-guide-scan absolute inset-x-0 top-0 h-full opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
      <div className="absolute left-1/2 top-24 h-60 w-60 -translate-x-1/2 rounded-full bg-primary-soft/60 blur-3xl" />
    </div>
  );
}
