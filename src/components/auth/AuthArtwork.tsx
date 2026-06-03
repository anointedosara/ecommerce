/** The cyan shopping illustration shared by the sign-up and login pages. */
export default function AuthArtwork() {
  return (
    <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-[#cbe4e8] lg:min-h-[700px] lg:rounded-r-md">
      <div className="flex items-end gap-2 select-none" aria-hidden>
        <span className="text-[120px] sm:text-[180px]">🛒</span>
        <span className="-ml-8 text-[140px] sm:text-[220px]">📱</span>
      </div>
      <div className="absolute bottom-16 left-1/3 flex gap-2 select-none" aria-hidden>
        <span className="text-6xl">🛍️</span>
        <span className="text-5xl">🛍️</span>
      </div>
    </div>
  );
}
