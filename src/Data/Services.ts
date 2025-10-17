
interface Service {
    title: string;
    description: string;
    ctaName: string;
    ctaLink: string;
    imagePath: string;
    icon: string;
}


const services: Service[] = [
    {
        title: "Delivery",
        description: "Home Central Stores delivers building materials across Owego, Vestal, and Candor. From boomed and dumped to hand-delivered with our Moffett truck, we handle every job—big or small—for contractors, vendors, and DIY projects.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/truck.svg",
        icon: '/assets/image/Services/serviceList/icons/Group.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Custom Paint Mixing/Color Matching",
        description: "Home Central Stores offers custom paint mixing and precise color matching in Owego, Vestal, and Candor. Bring a sample or a paint can—our computerized system and qualified team can adjust the shade to meet your project needs.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/paint.svg",
        icon: '/assets/image/Services/serviceList/icons/Paint Roller.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Special Ordering",
        description: "Can’t find what you need? Home Central Stores offers special ordering for building materials and supplies in Owego, Vestal, and Candor. Our experienced team sources products for your project—often saving on shipping fees—so you get exactly what you need, hassle-free.",
        ctaName: "Shop Now",
        ctaLink: "/shop",
        imagePath: "/assets/image/Services/serviceList/images/specialOrdering.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Box.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Business Solutions",
        description: "Running a business in Owego, Vestal, or Candor? Home Central Stores’ Business Solutions sales team helps you streamline bulk orders of building materials, tools, and supplies. With local delivery, online billing, and personalized ordering, we make it easy for schools, farms, banks, and contractors to get what they need—just like a national supplier, but with the support of a family-owned business.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/business.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/WinRar.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Lock Re-Keying/Key Cutting",
        description: "Need house, car, or master keys? Home Central Stores can re-key locks, cut keys, and program chip keys for newer vehicles. We make it easy to have all your locks keyed alike or master keyed, with fast, reliable service from our experienced team.",
        ctaName: "Visit Your Nearest Branch",
        ctaLink: "/branches",
        imagePath: "/assets/image/Services/serviceList/images/keys.svg",
        icon: '/assets/image/Services/serviceList/icons/Scissors.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Material Cutting",
        description: "Home Central Stores offers precise material cutting services for your projects. We cut boards to length and sheet goods into halves, thirds, or quarters. Small cuts are quick, and larger orders are available—call ahead for bulk requests.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/materialCutting.svg",
        icon: '/assets/image/Services/serviceList/icons/Scissors.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Pipe Cut/Thread",
        description: "Home Central Stores provides pipe cutting and threading services for the most common sizes to your specified lengths.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/pipe.svg",
        icon: '/assets/image/Services/serviceList/icons/Scissors.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Screen, Glass, Plexiglass Cutting/Window and Door Repair",
        description: "Home Central Stores offers screen, glass, and plexiglass cutting, along with window and door repair services. Our experienced staff handles screen repairs, mirrors, insulated window units, and hand glazing, providing reliable solutions for homeowners and contractors in Owego, Vestal, and Candor.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/screenCutting.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Structure.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Project Estimation",
        description: "Home Central Stores provides expert project estimation services for small and large construction or renovation projects. Our skilled estimators guide you from start to finish, making it easy to plan, budget, and complete your projects successfully.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/projectEstimation.svg",
        icon: '/assets/image/Services/serviceList/icons/WindowFrame.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Ship-to-Store",
        description: "Skip shipping fees with Home Central Stores’ Ship-to-Store program. Order online from True Value and have your products shipped to your preferred Owego, Vestal, or Candor location. We’ll hold your items under your name until you’re ready to pick them up—convenient, local, and cost-saving.",
        ctaName: "Start Shopping",
        ctaLink: "/start-shopping",
        imagePath: "/assets/image/Services/serviceList/images/shipTostore.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Calculator.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Product Assembly",
        description: "We offer product assembly services for items purchased at Home Central Stores. Let our skilled staff know ahead of time, and we’ll assemble it so you can enjoy it immediately—saving time and effort.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/assembly.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Group.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Tool Repair",
        description: "We provide professional tool repair services for most brands and models of power tools. Before replacing your tools, bring them in and let our experienced staff inspect, repair, and restore them to working order.",
        ctaName: "Visit Us",
        ctaLink: "/visit-us",
        imagePath: "/assets/image/Services/serviceList/images/toolRepair.svg",
        icon: '/assets/image/Services/serviceList/icons/Palette.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Sharpening Services",
        description: "Home Central Stores offers professional blade sharpening services for saw blades, kitchen knives, and more. Simply drop off your items, and our skilled staff will sharpen them quickly and accurately.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/sharpening.svg",
        icon: '/assets/image/Services/serviceList/icons/Scissors.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Digital Drawings, Project Renderings & Modeling",
        description: "Home Central Stores offers digital project renderings, 3D modeling, and virtual reality design services. Visualize your deck, roof, or construction project before construction begins, helping you save time and reduce costs. Interact with your model online to explore every detail and make informed decisions for your project.",
        ctaName: "Let’s add the designs in this page",
        ctaLink: "/designs",
        imagePath: "/assets/image/Services/serviceList/images/DigitalDrawing.svg",
        icon: '/assets/image/Services/serviceList/icons/RulerPen.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Tool Rental",
        description: "Need a tool for your project without buying it? Home Central Stores offers a wide selection of rental tools, from power drills and shop vacs to flooring nailers and rebar tiers. Rent daily or weekly and complete your project with ease. Don’t see the tool you need? Ask us – we may be able to add it to our tool rental inventory.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/ToolRental.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Sledgehammer.svg', // Import and pass the JSX element as needed
    },
    {
        title: "In-Store Propane Refill & Re-Certification Station",
        description: "Refill your propane tank safely and conveniently at Home Central Stores. We inspect tank condition and dates with every visit and offer propane tank re-certification.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/propane.svg",
        icon: '/assets/image/Services/serviceList/icons/GasStation.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Blueprint Takeoffs / Estimating Showroom",
        description: "Bring us the construction blueprints, and our expert team will provide a free, detailed material estimate. We perform comprehensive takeoffs, calculate location-specific costs, and double-check all quantities using advanced digital tools, helping contractors and homeowners plan their projects with confidence.",
        ctaName: "Request a Quote",
        ctaLink: "/request-quote",
        imagePath: "/assets/image/Services/serviceList/images/blueprint.svg",
        icon: '/assets/image/Services/serviceList/icons/RulerPen.svg', // Import and pass the JSX element as needed
    },
    {
        title: "Window Screen & Glass Replacement",
        description: "Need a window or door repaired? Our skilled team can handle screen repairs, glass replacements, mirrors, and insulated units for both windows and doors. Fast, reliable, and precise—ensuring your openings look and function like new.",
        ctaName: "Contact Us",
        ctaLink: "/contact",
        imagePath: "/assets/image/Services/serviceList/images/windowScreenReplacement.svg", // Replace with actual image paths later
        icon: '/assets/image/Services/serviceList/icons/Structure.svg', // Import and pass the JSX element as needed
    }
];

export default services;
