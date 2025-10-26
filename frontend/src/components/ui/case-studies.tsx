import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users } from "lucide-react";
import CountUp from "react-countup";

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-left p-6">
      <p
        className="text-2xl font-medium text-foreground sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-foreground text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-muted-foreground text-left">{sub}</p>
      ) : null}
    </div>
  );
}

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      quote:
        "BlueCarbonSIH revolutionized how we trade carbon credits. The platform is transparent, verified, and we've offset 40% more carbon this year.",
      name: "Dr. Maya Chen",
      role: "Environmental Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      icon: Monitor,
      metrics: [
        { value: "40%", label: "More Carbon Offset", sub: "Year over year" },
        { value: "95%", label: "Verification Rate", sub: "All projects verified" },
      ],
    },
    {
      id: 2,
      quote:
        "As an NGO, BlueCarbonSIH gave us a unified dashboard to manage our mangrove restoration projects. Our impact visibility increased dramatically.",
      name: "Carlos Rodriguez",
      role: "Conservation Lead",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      icon: LayoutDashboard,
      metrics: [
        { value: "3.5x", label: "Efficiency Gain", sub: "In project management" },
        { value: "70%", label: "Reduced Admin", sub: "Time saved" },
      ],
    },
    {
      id: 3,
      quote:
        "The collaborative features in BlueCarbonSIH changed how our team coordinates coastal restoration. Everything is transparent and seamless.",
      name: "Aisha Patel",
      role: "Project Coordinator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      icon: Users,
      metrics: [
        { value: "2x", label: "Faster Onboarding", sub: "For new partners" },
        { value: "88%", label: "Team Satisfaction", sub: "Platform-wide" },
      ],
    },
  ];

  return (
    <section
      className="py-32 bg-background"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-foreground"
          >
            Real Impact with Blue Carbon
          </h2>
          <p className="text-muted-foreground">
            From conservation to carbon trading—BlueCarbonSIH powers teams with transparency,
            verification, and impact.
          </p>
        </div>

        {/* Cases */}
        <div className="mt-20 flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-border pb-12"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r lg:pr-12 xl:pr-16 text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l border-border lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-border",
                  ].join(" ")}
                >
                  <img
                    src={study.image}
                    alt={`${study.name} portrait`}
                    width={300}
                    height={400}
                    className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-border hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <figure className="flex flex-col justify-between gap-8 text-left">
                    <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed text-left">
                      <h3 className="text-lg sm:text-xl lg:text-xl font-normal text-foreground leading-relaxed text-left">
                        Verified Carbon Trading{" "}
                        <span className="block text-muted-foreground text-sm sm:text-base lg:text-lg mt-2">
                          {study.quote}
                        </span>
                      </h3>
                    </blockquote>
                    <figcaption className="flex items-center gap-6 mt-4 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-md font-medium text-foreground">
                          {study.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-left",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
