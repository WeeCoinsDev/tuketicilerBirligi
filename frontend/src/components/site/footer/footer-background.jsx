export function FooterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
      <svg
        className="footer-line-drift footer-line-draw absolute -right-24 top-10 h-64 w-[38rem] text-secondary/10 md:right-0 md:h-80 md:w-[46rem]"
        fill="none"
        viewBox="0 0 720 420"
      >
        <path
          d="M40 260C138 126 254 101 388 184c118 74 201 62 292-39"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M86 326c78-64 154-85 228-64 88 25 124 93 228 72 47-10 83-32 112-67"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        <circle cx="160" cy="148" r="42" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="548" cy="118" r="72" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        className="footer-line-drift absolute -left-28 bottom-16 h-56 w-[34rem] text-primary-dark/10 [animation-delay:-7s] md:h-72 md:w-[42rem]"
        fill="none"
        viewBox="0 0 680 360"
      >
        <path
          d="M42 220c89-70 182-92 279-66 112 30 177 22 317-78"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <path
          d="M100 292h180c58 0 86-24 112-58 23-31 51-44 88-44h116"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
        />
      </svg>
      <div className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-primary-soft/70 blur-3xl" />
    </div>
  );
}

