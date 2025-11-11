"use client";

import Image from "next/image";

// Timeline connector SVG component
const TimelineConnector = () => (
  <svg
    className="h-[42px] w-[18px]"
    viewBox="0 0 18 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 0V42" stroke="#B9B9C4" strokeWidth="2" />
    <circle
      cx="9"
      cy="21"
      r="6"
      fill="#B9B9C4"
      stroke="#B9B9C4"
      strokeWidth="2"
    />
  </svg>
);

interface YearSection {
  year?: string;
  yearRange?: { start: string; end: string };
  description: string | React.ReactNode;
}

interface ImageConfig {
  src: string;
  alt: string;
  width?: string; // e.g., '158px', 'flex-1'
  height?: string; // e.g., '200px', 'full'
  aspectRatio?: string; // e.g., '400/109'
}

interface ImageRow {
  images: ImageConfig[];
  gap?: string;
}

interface TimelineCardProps {
  title: string;
  yearSections: YearSection[];
  imageLayout: ImageRow[];
}

const TimelineCard = ({
  title,
  yearSections,
  imageLayout,
}: TimelineCardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-[16px] items-start w-full p-0 md:p-[24px]">
      {/* Images Section */}
      <div className="flex-1 flex flex-col gap-[8px] w-full md:w-auto self-stretch">
        {imageLayout.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex flex-col md:flex-row gap-[${
              row.gap || "8px"
            }] w-full`}
          >
            {row.images.map((img, imgIdx) => {
              const widthClass =
                img.width === "158px"
                  ? "w-full md:w-[158px]"
                  : img.width === "flex-1" || !img.width
                  ? "flex-1"
                  : `w-${img.width}`;

              const heightClass = img.height
                ? `h-[${img.height}]`
                : "h-full min-h-[300px]";

              return (
                <div
                  key={imgIdx}
                  className={`relative ${widthClass} ${
                    img.aspectRatio
                      ? `aspect-[${img.aspectRatio}]`
                      : heightClass
                  } rounded-[var(--Radius-md)] overflow-hidden`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Timeline Connector - Only visible on desktop */}
      <div className="hidden md:flex items-start pt-[12px] shrink-0">
        <TimelineConnector />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-[16px] w-full md:w-auto md:min-w-[322px]">
        <h3
          className="text-[28px] font-[700] text-[var(--Secondary-600)] tracking-[0.56px]"
          style={{ fontFamily: "var(--font-sora), sans-serif", lineHeight: 1 }}
        >
          {title}
        </h3>

        {/* Year Sections */}
        {yearSections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-[16px]">
            {/* Year Badge */}
            {section.year && (
              <div className="flex gap-[8px] items-start">
                <div className="bg-[var(--Colors-Neutral-50)] px-[8px] py-[4px] rounded-[54px]">
                  <p
                    className="text-[14px] font-[400] text-black text-center whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-figtree), sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {section.year}
                  </p>
                </div>
              </div>
            )}

            {/* Year Range Badge */}
            {section.yearRange && (
              <div className="flex gap-[8px] items-center">
                <div className="bg-[var(--Colors-Neutral-50)] px-[8px] py-[4px] rounded-[54px]">
                  <p
                    className="text-[14px] font-[400] text-black text-center whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-figtree), sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {section.yearRange.start}
                  </p>
                </div>
                <span className="text-[25.2px] leading-none text-[var(--secondary-500-main)]">
                  -
                </span>
                <div className="bg-[var(--Colors-Neutral-50)] px-[8px] py-[4px] rounded-[54px]">
                  <p
                    className="text-[14px] font-[400] text-black text-center whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-figtree), sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {section.yearRange.end}
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div
              className="text-[18px] font-[400] text-[var(--Colors-Neutral-700)] tracking-[0.36px]"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                lineHeight: 1.5,
              }}
            >
              {section.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HistoryTimeline = () => {
  // For now using placeholder - real images should be added later
  const placeholder = "/assets/image/History/placeholder.svg";

  const timelineCards: TimelineCardProps[] = [
    // Card 1: The Beginning of Home Central Stores (1973)
    {
      title: "The Beginning of Home Central Stores",
      yearSections: [
        {
          year: "1973",
          description:
            "Don purchased B.J. Patch Building Supply on Temple Street in Owego and reopened it in August as Owego Promart Home Center. Before starting the business, Don served in the Airforce as a Russian translator, operated two dairy farms, worked as a milk tester, earned a degree from Cornell in 1962, briefly worked for IBM, and partnered in his in-laws' feed mill. Recognizing a growing need for a hardware and building materials store in Owego, Don decided to pursue this opportunity.",
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/1.svg",
              alt: "Home Central Stores Beginning in 1973",
              width: "flex-1",
            },
          ],
        },
      ],
    },

    // Card 2: Family Growth and Expansion (1975)
    {
      title: "Family Growth and Expansion",
      yearSections: [
        {
          year: "1975",
          description:
            "Don's son, Aaron, joined the business and focused on expanding the young company. Over the next decade, Aaron purchased surrounding properties, adding more building materials, parking, and a central office to support future locations.",
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/2.svg",
              alt: "Family Growth and Expansion",
              width: "flex-1",
            },
          ],
        },
      ],
    },

    // Card 3: Candor Home Central & Vestal Lumber Join Family (1981 + 1985)
    {
      title: "Candor Home Central & Vestal Lumber Join Family",
      yearSections: [
        {
          year: "1981",
          description:
            "The existing stock from the Ward and VanScoy feed mill was purchased, and the location reopened as Candor Home Center, serving the growing contractor and homeowner community.",
        },
        {
          year: "1985",
          description:
            "Vestal Lumber, a staple in the Vestal community, was acquired. This location began serving a wider audience, including contractors and homeowners, expanding the company's reach in New York.",
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/3-1.svg",
              alt: "Candor Home Central",
              width: "flex-1",
            },
            {
              src: "/assets/image/History/3-2.svg",
              alt: "Candor Home Central Store",
              width: "flex-1",
            },
          ],
        },
      ],
    },

    // Card 4: Unifying Home Central Brand (1994 + 1997)
    {
      title: "Unifying Home Central Brand",
      yearSections: [
        {
          year: "1994",
          description:
            "The E.J. Shoe Factory in Owego was transformed into a new home at the Promart location. At this point, all three locations were unified under the Home Central name. The Owego site featured a 15,000 sq. ft. showroom and a 27,000 sq. ft. drive-thru warehouse, combining a small business model with a big-box efficiency. This allowed Home Central to serve contractors, commercial sales, and DIY enthusiasts with various hardware, building, and plumbing supplies.",
        },
        {
          year: "1997",
          description: (
            <>
              Home Central joined the{" "}
              <a
                href="https://www.truevalue.com/"
                className="text-[var(--secondary-500-main)] underline cursor-pointer"
              >
                True Value cooperative
              </a>
              , gaining access to better supplier pricing and strengthening its
              offerings to contractors and vendors.
            </>
          ),
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/4-1.svg",
              alt: "Unified Home Central Store",
              width: "flex-1",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/4-2.svg",
              alt: "Home Central Warehouse",
              width: "flex-1",
            },
          ],
        },
      ],
    },

    // Card 5: Continuing the Legacy (2000 + 2004-2005 + 2009-2011)
    {
      title: "Continuing the Legacy",
      yearSections: [
        {
          year: "2000",
          description:
            'Don, affectionately called "Pa," passed away after a long battle with emphysema and heart disease. Aaron and Bayonne restructured ownership and continued expanding Home Central Stores with a focus on contractor support and local service.',
        },
        {
          yearRange: { start: "2004", end: "2005" },
          description:
            "Aaron's daughter, Kate, joined full-time, marking further family involvement. In 2005, a 20,000 sq. ft. storage warehouse was added in Owego, increasing contractor-focused inventory capacity.",
        },
        {
          yearRange: { start: "2009", end: "2011" },
          description:
            'The Owego location was renovated inside and out with new signage and improved storefronts. Between 2010 and 2011, the Vestal location was updated to match the Owego "brand," creating a cohesive customer experience.',
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/5-1.svg",
              alt: "Home Central Store",
              width: "flex-1",
            },
            {
              src: "/assets/image/History/5-2.svg",
              alt: "Home Central Team",
              width: "flex-1",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/5-3.svg",
              alt: "Home Central Interior",
              width: "flex-1",
            },
            {
              src: "/assets/image/History/5-4.svg",
              alt: "Home Central Building",
              width: "158px",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/5-5.svg",
              alt: "Home Central Signage",
              width: "flex-1",
              aspectRatio: "400/109",
            },
          ],
        },
      ],
    },

    // Card 6: Modernizing Operations (2015 + 2017 + 2020 + 2021 + 2022 + 2023 + 2024 + 2025)
    {
      title: "Modernizing Operations",
      yearSections: [
        {
          year: "2015",
          description:
            "Vestal was remerchandised with expanded product offerings and warehouse improvements. A new Moffet truck was added to the delivery fleet, improving contractor service.",
        },
        {
          year: "2017",
          description:
            "Marks Owego's revamped kitchen, appliance, paint, and building material showroom. That same year, the Candor location moved, further optimizing its space to serve local contractors and vendors efficiently.",
        },
        {
          year: "2020",
          description:
            "In early 2020, the Vestal store suffered a devastating fire. Despite the challenges, the Home Central team and community worked together to rebuild. The store reopened just over a year later, fully restored and improved — a testament to resilience, teamwork, and commitment to serving the Southern Tier.",
        },
        {
          year: "2021",
          description:
            "Our CEO and President, Kate, passed away after a long and courageous battle with cancer. Her leadership shaped Home Central's direction, culture, and values. Ben Whittemore stepped into leadership to continue her vision and ensure the company's mission endures.",
        },
        {
          year: "2022",
          description:
            "Fulfilling Kate's vision, Home Central expanded its Owego location with the Showroom and Design Center — a collaborative space where homeowners, contractors, and designers can plan projects, compare materials, and bring ideas to life.",
        },
        {
          year: "2023",
          description:
            "To prepare for the future of retail and professional ordering, Home Central transitioned to NetSuite in 2023, laying the foundation for integrated ecommerce, improved inventory visibility, and better customer experience across all locations.",
        },
        {
          year: "2024",
          description:
            "In late 2024, True Value filed for bankruptcy, prompting Home Central to move its vendor partnerships to Do it Best. This transition strengthened supply chain access, cost competitiveness, and continued product availability.",
        },
        {
          year: "2025",
          description: (
            <>
              <p className="mb-0">
                In 2025, Home Central introduced a new clothing and boots
                department, offering durable, job-ready gear tailored to
                contractors and outdoor work.
              </p>
              <p>
                That same year, Home Central launched its ecommerce website,
                expanding customer access to materials, supplies, and online
                ordering across Owego, Vestal, Candor, and beyond.
              </p>
            </>
          ),
        },
      ],
      imageLayout: [
        {
          images: [
            {
              src: "/assets/image/History/6-1.svg",
              alt: "Store Modernization",
              width: "flex-1",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/6-2.svg",
              alt: "Modern Store Interior",
              width: "flex-1",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/6-3.svg",
              alt: "Store Updates",
              width: "flex-1",
              aspectRatio: "400/109",
            },
          ],
        },
        {
          images: [
            {
              src: "/assets/image/History/6-4.svg",
              alt: "Modern Facilities",
              width: "flex-1",
            },
            {
              src: "/assets/image/History/6-5.svg",
              alt: "New Equipment",
              width: "158px",
            },
          ],
        },
      ],
    },
  ];

  return (
    <section className="bg-white w-full py-0 md:py-[48px]">
      <div className="w-full px-6 md:px-[5.3%] max-w-[1920px] mx-auto">
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[1352px]">
            {/* Vertical Timeline Line */}
            <div className="hidden 2xl:block absolute left-[675px] top-[24px] w-px h-[calc(100%-48px)] bg-[var(--Neutral-300)] rounded-[var(--Radius-md)]" />

            {/* Timeline Entries */}
            <div className="flex flex-col gap-[20px] w-full">
              {timelineCards.map((card, index) => (
                <TimelineCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
