"use client";

import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const testimonials = [
  {
    quote:
      "GearUp helped our production team find a complete camera setup in less than an hour. The equipment was excellent and the process was incredibly smooth.",
    name: "Nafisa Rahman",
    role: "Creative Director",
    initials: "NR",
  },
  {
    quote:
      "I rented camping equipment for a weekend trip instead of buying everything. The provider was helpful and every item was in great condition.",
    name: "Tanvir Hasan",
    role: "Adventure Traveller",
    initials: "TH",
  },
  {
    quote:
      "Listing my photography equipment on GearUp has created a new revenue source while keeping the booking process organized and professional.",
    name: "Farhan Ahmed",
    role: "Equipment Provider",
    initials: "FA",
  },
  {
    quote:
      "The transparent pricing and verified provider system made me feel confident from booking until I returned the equipment.",
    name: "Sadia Karim",
    role: "Event Organizer",
    initials: "SK",
  },
];

export function Testimonials() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay],
  );

  return (
    <section className="section-space overflow-hidden">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Customer stories"
            title="Trusted by explorers, creators and providers."
            description="Real experiences from people using GearUp to access better equipment and build new opportunities."
          />

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="flex size-12 items-center justify-center rounded-full border bg-background transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                emblaApi?.scrollPrev();
              }}
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              className="flex size-12 items-center justify-center rounded-full border bg-background transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                emblaApi?.scrollNext();
              }}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={emblaRef}
          className="mt-14 overflow-hidden"
        >
          <div className="-ml-5 flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%]"
              >
                <article className="glass-panel flex h-full min-h-96 flex-col rounded-[2rem] p-7 sm:p-9">
                  <div className="flex items-start justify-between">
                    <Quote className="size-10 text-primary/40" />

                    <div className="flex gap-1">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-10 font-display text-2xl leading-relaxed font-medium tracking-[-0.025em]">
                    “{testimonial.quote}”
                  </blockquote>

                  <div className="mt-auto flex items-center gap-4 border-t pt-7">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </span>

                    <div>
                      <p className="font-semibold">
                        {testimonial.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}