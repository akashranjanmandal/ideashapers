import CreatorsDirectory from "../CreatorsDirectory";

export default async function CreatorSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CreatorsDirectory initialSlug={slug} />;
}
