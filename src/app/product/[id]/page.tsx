import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviews from "@/components/product/ProductReviews";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { catalog, getProductById, getRelatedProducts } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return catalog.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return {
    title: product ? `${product.name} — Exclusive` : "Product — Exclusive",
    description: product?.description ?? "Shop this product on Exclusive.",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const related = getRelatedProducts(id);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1170px] flex-1 px-4 py-20">
        {/* Breadcrumb */}
        <nav className="mb-20 flex flex-wrap items-center gap-3 text-sm">
          <Link href="/account" className="text-black/50 hover:text-black">
            Account
          </Link>
          <span className="text-black/50">/</span>
          <Link href="/" className="text-black/50 hover:text-black">
            {product.category ?? "Gaming"}
          </Link>
          <span className="text-black/50">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <ProductDetails product={product} />

        <ProductReviews productId={product.id} />

        {/* Related items */}
        <div className="mt-32">
          <SectionHeading label="Related Item" />
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} showDiscount />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
