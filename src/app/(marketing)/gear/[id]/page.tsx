import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GearDetails } from "@/components/gear/gear-details";
import { GearGallery } from "@/components/gear/gear-gallery";
import { ApiError } from "@/lib/api/api-error";
import { getPublicGearById } from "@/features/gear/gear.api";

interface GearDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getGearOrNotFound(
  id: string,
) {
  try {
    return await getPublicGearById(id);
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: GearDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const gear =
      await getPublicGearById(id);

    return {
      title: gear.name,

      description:
        gear.description.slice(0, 160) ||
        `Rent ${gear.name} through GearUp.`,

      openGraph: {
        title: gear.name,
        description:
          gear.description.slice(
            0,
            160,
          ),
        images: gear.images[0]
          ? [gear.images[0]]
          : undefined,
      },
    };
  } catch {
    return {
      title: "Gear details",
    };
  }
}

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  const { id } = await params;

  const gear =
    await getGearOrNotFound(id);

  return (
    <section className="container-shell py-12 lg:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="lg:sticky lg:top-28">
          <GearGallery
            images={gear.images}
            name={gear.name}
          />
        </div>

        <GearDetails gear={gear} />
      </div>
    </section>
  );
}