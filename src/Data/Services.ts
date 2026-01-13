interface Service {
  title: string;
  description: string;
  ctaName?: string;
  ctaLink?: string;
  imagePath: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Delivery",
    description:
      "Home Central delivers building materials across Owego, Vestal, and Candor. From boomed and dumped to hand-delivered with our Moffett truck, we handle every job—big or small—for contractors, homeowners, and DIY projects.",
    ctaName: "Request a Quote",
    ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/Delivery.png",
    icon: "/assets/image/Services/serviceList/icons/Group.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Custom Paint Mixing/Color Matching",
    description:
      "Home Central offers custom paint mixing and precise color matching in Owego, Vestal, and Candor. Bring a sample or a paint can—our computerized system and qualified team can adjust the shade to meet your project needs.",
    ctaName: "Learn More",
    ctaLink: "/paint",
    imagePath: "/assets/image/Services/serviceList/images/paint.svg",
    icon: "/assets/image/Services/serviceList/icons/Paint Roller.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Special Ordering",
    description:
      "Can't find what you need? Home Central offers special ordering for building materials and supplies in Owego, Vestal, and Candor. Our experienced team sources products for your project—often saving on shipping fees—so you get exactly what you need, hassle-free.",
    ctaName: "Learn More",
    ctaLink: "/special-ordering",
    imagePath: "/assets/image/Services/serviceList/images/Special.png", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/Box.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Business Solutions",
    description:
      "Running a business in Owego, Vestal, or Candor? Home Central’s Business Solutions sales team helps you streamline bulk orders of building materials, tools, and supplies. With local delivery, online billing, and personalized ordering, we make it easy for schools, farms, banks, and contractors to get what they need—just like a national supplier, but with the support of a family-owned business.",
    ctaName: "Request a Quote",
    ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/Business.png", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/WinRar.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Lock Re-Keying/Key Cutting",
    description:
      "Need house, car, or master keys? Home Central can re-key locks, cut keys, and program chip keys for newer vehicles. We make it easy to have all your locks keyed alike or master keyed, with fast, reliable service from our experienced team.",
    ctaName: "Visit Your Nearest Branch",
    ctaLink: "/locations",
    imagePath: "/assets/image/Services/serviceList/images/Locks.png",
    icon: "/assets/image/Services/serviceList/icons/Scissors.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Material Cutting",
    description:
      "Home Central offers basic material cutting services for your projects. We cut boards to length and sheet goods into halves, thirds, or quarters. Small cuts are quick, and larger orders are available—call ahead for bulk requests.",
    ctaName: "Contact Us",
    ctaLink: "/contact",
    imagePath: "/assets/image/Services/serviceList/images/MaterialCutting.png",
    icon: "/assets/image/Services/serviceList/icons/Scissors.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Pipe Cut/Thread",
    description:
      "Home Central provides pipe cutting and threading services for the most common sizes to your specified lengths.",
    ctaName: "Request a Quote",
    ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/Pipe.png",
    icon: "/assets/image/Services/serviceList/icons/Scissors.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Screen, Glass, Plexiglass Cutting/Window and Door Repair",
    description:
      "Home Central offers screen, glass, and plexiglass cutting, along with window and door repair services. Our experienced staff handles screen repairs, mirrors, insulated window units, and hand glazing, providing reliable solutions for homeowners and contractors in Owego, Vestal, and Candor.",
    ctaName: "Request a Quote",
    ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/screenCutting.svg", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/Structure.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Project Estimation",
    description:
      "Home Central provides expert project estimation services for small and large construction or renovation projects. Our skilled estimators guide you from start to finish, making it easy to plan, budget, and complete your projects successfully.",
    ctaName: "Contact Us",
    ctaLink: "/contact",
    imagePath:
      "/assets/image/Services/serviceList/images/projectEstimation.svg",
    icon: "/assets/image/Services/serviceList/icons/WindowFrame.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Ship-to-Store",
    description:
      "Skip shipping fees with Home Central’ Ship-to-Store program. Order online from True Value and have your products shipped to your preferred Owego, Vestal, or Candor location. We’ll hold your items under your name until you’re ready to pick them up—convenient, local, and cost-saving.",
    ctaName: "Start Shopping",
    ctaLink: "/shop/catalogue",
    imagePath: "/assets/image/Services/serviceList/images/shipTostore.svg", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/Calculator.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Product Assembly",
    description:
      "We offer product assembly services for items purchased at Home Central. Let our skilled staff know ahead of time, and we’ll assemble it so you can enjoy it immediately—saving time and effort.",
    ctaName: "Contact Us",
    ctaLink: "/contact",
    imagePath: "/assets/image/Services/serviceList/images/assembly.svg", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/Group.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Tool Repair",
    description:
      "We provide professional tool repair services for most brands and models of power tools. Before replacing your tools, bring them in and let our experienced staff inspect, repair, and restore them to working order.",
    ctaName: "Visit Us",
    ctaLink: "/locations",
    imagePath: "/assets/image/Services/serviceList/images/Repair.png",
    icon: "/assets/image/Services/serviceList/icons/Palette.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Sharpening Services",
    description:
      "Home Central offers professional blade sharpening services for saw blades, knives, scissors, garden tools, and more. Drop off your items in-store, and they’ll be professionally sharpened through one of our trusted sharpening partners.",
    ctaName: "Contact Us",
    ctaLink: "/contact",
    imagePath: "/assets/image/Services/serviceList/images/sharpening.svg",
    icon: "/assets/image/Services/serviceList/icons/Scissors.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Kitchen & Bath Design Renderings",
    description:
      "Home Central provides digital drawings and 3D renderings to help you visualize your kitchen or bathroom before work begins. Our design tools allow you to explore layout options, finishes, and key details so you can make confident, informed decisions for your project.",
    ctaName: "Explore Showroom",
    ctaLink: "/owego-showroom",
    imagePath: "/assets/image/Services/serviceList/images/DigitalDrawing.svg",
    icon: "/assets/image/Services/serviceList/icons/RulerPen.svg", // Import and pass the JSX element as needed
  },
  // {
  //   title: "Tool Rental",
  //   description:
  //     "Need a tool for your project without buying it? Home Central offers a wide selection of rental tools, from power drills and shop vacs to flooring nailers and rebar tiers. Rent daily or weekly and complete your project with ease. Don’t see the tool you need? Ask us – we may be able to add it to our tool rental inventory.",
  //   ctaName: "Contact Us",
  //   ctaLink: "/contact",
  //   imagePath: "/assets/image/Services/serviceList/images/ToolRental.svg", // Replace with actual image paths later
  //   icon: "/assets/image/Services/serviceList/icons/Sledgehammer.svg", // Import and pass the JSX element as needed
  // },
  // {
  //   title: "In-Store Propane Refill & Re-Certification Station",
  //   description:
  //     "Refill your propane tank safely and conveniently at Home Central. We inspect tank condition and dates with every visit and offer propane tank re-certification.",
  //   ctaName: "Request a Quote",
  //   ctaLink: "/request-quote",
  //   imagePath: "/assets/image/Services/serviceList/images/propane.svg",
  //   icon: "/assets/image/Services/serviceList/icons/GasStation.svg", // Import and pass the JSX element as needed
  // },
  {
    title: "Blueprint Takeoffs / Estimating Showroom",
    description:
      "Bring us the construction blueprints, and our expert team will provide a detailed material estimate. We perform comprehensive takeoffs, calculate location-specific costs, and double-check all quantities using advanced digital tools, helping contractors and homeowners plan their projects with confidence.",
    ctaName: "Request a Quote",
    ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/blueprint.svg",
    icon: "/assets/image/Services/serviceList/icons/RulerPen.svg", // Import and pass the JSX element as needed
  },
  // {
  //   title: "Window Screen & Glass Replacement",
  //   description:
  //     "Need a window or door repaired? Our skilled team can handle screen repairs, glass replacements, mirrors, and insulated units for both windows and doors. Fast, reliable, and precise—ensuring your openings look and function like new.",
  //   ctaName: "Contact Us",
  //   ctaLink: "/contact",
  //   imagePath:
  //     "/assets/image/Services/serviceList/images/windowScreenReplacement.svg", // Replace with actual image paths later
  //   icon: "/assets/image/Services/serviceList/icons/Structure.svg", // Import and pass the JSX element as needed
  // },
];

const contractorServices: Service[] = [
  {
    title: "Delivery Options",
    description:
      "Fast, reliable delivery for your job sites. We make bulk building materials boomed, dumped, or unloaded with a moffit truck on time.",
    // ctaName: "Request a Quote",
    // ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/truck.svg",
    icon: "/assets/image/Services/serviceList/icons/Group.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Business Solutions",
    description:
      "Our sales team will simplify Pro purchasing with volume ordering, bulk pricing, online billing, and delivery options.",
    ctaName: "Contact Us",
    ctaLink: "/contact",
    imagePath: "/assets/image/Services/serviceList/images/business.svg", // Replace with actual image paths later
    icon: "/assets/image/Services/serviceList/icons/WinRar.svg", // Import and pass the JSX element as needed
  },
  {
    title: "Blueprint Take-off",
    description:
      "Provide your construction blueprints, and we’ll create a free of charge, accurate and detailed material quote so you know exactly what you need to build.",
    // ctaName: "Request a Quote",
    // ctaLink: "/request-quote",
    imagePath: "/assets/image/Services/serviceList/images/blueprint.svg",
    icon: "/assets/image/Services/serviceList/icons/RulerPen.svg", // Import and pass the JSX element as needed
  },
];

export { services, contractorServices };
