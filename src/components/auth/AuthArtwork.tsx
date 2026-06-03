import Image from "next/image";

/** The cyan shopping illustration shared by the sign-up and login pages. */
export default function AuthArtwork() {
  return (
    <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-[#cbe4e8] lg:min-h-[700px] lg:rounded-r-md">
      <Image
        src="/auth/signup.png"
        alt="Shopping cart with a smartphone and shopping bags"
        width={805}
        height={781}
        priority
        className="h-full w-full object-contain object-bottom"
      />
    </div>
  );
}
