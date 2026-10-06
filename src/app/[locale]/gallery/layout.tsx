import { generateGalleryMetadata } from "@/lib/seo";

// The gallery page is a client component, so its metadata lives here
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateGalleryMetadata(locale);
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
