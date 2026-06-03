type SectionHeadingProps = {
  /** Small red label above the title, e.g. "Today's". */
  label: string;
  /** Large heading, e.g. "Flash Sales". */
  title?: string;
  children?: React.ReactNode;
};

/**
 * The red-tab + label combo (and optional big title) that introduces every
 * section in the Exclusive design.
 */
export default function SectionHeading({
  label,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="h-10 w-5 rounded bg-primary" />
        <span className="text-base font-semibold text-primary">{label}</span>
      </div>
      {(title || children) && (
        <div className="flex flex-wrap items-end justify-between gap-8">
          {title && (
            <h2 className="text-2xl font-semibold tracking-[0.04em] text-black sm:text-4xl">
              {title}
            </h2>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
