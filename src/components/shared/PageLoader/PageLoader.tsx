/**
 * Full-page fallback for Suspense. Reserves min-height to avoid layout shift (CLS)
 * when route content loads. Use as Suspense fallback in root layout.
 */
export default function PageLoader() {
  return (
    <div
      className="baseContainer py-[2.5rem] min-h-[60vh] flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-[var(--primary-500-main)] border-t-transparent animate-spin"
          aria-hidden
        />
        <span className="text-[0.875rem] text-[var(--Colors-Neutral-700)]">
          Loading…
        </span>
      </div>
    </div>
  );
}
