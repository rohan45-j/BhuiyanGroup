export interface SisterConcern {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  tagline: string;
  sector: string;
  description: string;
  longDescription: string;
  foundedYear: string;
  iconName: string;
  logo?: string;
  keySpecialties: string[];
  stats: {
    label: string;
    value: string;
  }[];
  capabilities: {
    title: string;
    description: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    office: string;
  };
}

export interface CompanyData {
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  heroBanner: string;
  vision: string;
  mission: string;
  overview: string;
  corporateHeadquarters: {
    title: string;
    address: string;
    city: string;
    country: string;
    hotline: string;
    phone: string;
    email: string;
    supportEmail: string;
    workingHours: string;
  };
  groupStats: {
    label: string;
    value: string;
    description: string;
  }[];
  coreSectors: {
    id: string;
    title: string;
    description: string;
    concernSlug: string;
    concernName: string;
    icon: string;
  }[];
  sisterConcerns: SisterConcern[];
  navLinks: {
    name: string;
    href: string;
  }[];
}

export const companyData: CompanyData = {
  name: "Bhuiyan Group",
  shortName: "BG",
  tagline: "Powering Progress, Engineering Sustainable Futures",
  logo: "/img/bhuiyan-group-logo.jpg",
  heroBanner: "/img/bhuiyan-group-hero-banner.jpg",
  vision:
    "To be the premier diversified industrial and engineering conglomerate in Bangladesh, delivering sustainable power, clean water, renewable energy, and world-class products that drive national economic self-reliance.",
  mission:
    "Empower industries and communities across Bangladesh through relentless engineering excellence, turnkey power generation, green energy adoption, resilient electro-mechanical infrastructure, and high-standard consumer products.",
  overview:
    "Established as a cornerstone of Bangladeshi industrial growth, Bhuiyan Group (BG) operates across five strategic sectors: heavy power generation, renewable solar technology, electro-mechanical substation engineering, industrial water pump systems, and certified infant care essentials. With an established footprint across Dhaka, Chittagong, and major industrial hubs, Bhuiyan Group combines deep engineering expertise with steadfast corporate integrity.",
  corporateHeadquarters: {
    title: "Bhuiyan Group Corporate Headquarters",
    address: "Bhuiyan Corporate Tower, Level 7-9, 45 Gulshan South Avenue, Gulshan-1",
    city: "Dhaka-1212",
    country: "Bangladesh",
    hotline: "+880 1711-000000",
    phone: "+880 2 988-1234 / +880 2 988-5678",
    email: "info@bhuiyangroup.com.bd",
    supportEmail: "support@bhuiyangroup.com.bd",
    workingHours: "Saturday - Thursday: 9:00 AM - 6:00 PM (BST)",
  },
  groupStats: [
    {
      value: "350+ MW",
      label: "Power Deployed",
      description: "Delivered standby & captive power across Bangladesh",
    },
    {
      value: "1,200+",
      label: "Engineering Projects",
      description: "Successfully executed nationwide turnkey installations",
    },
    {
      value: "5",
      label: "Sister Concerns",
      description: "Specialized subsidiaries serving critical market sectors",
    },
    {
      value: "99.8%",
      label: "Client Reliability",
      description: "Trusted by RMG, government, healthcare, and export sectors",
    },
  ],
  coreSectors: [
    {
      id: "power-generation",
      title: "Heavy Power Generation & Diesel Generators",
      description:
        "Industrial standby, prime, and continuous power generation systems powered by Perkins, Cummins, and Baudouin engines for industrial factories, export zones, and commercial complexes.",
      concernSlug: "generex-power",
      concernName: "Generex Power",
      icon: "Zap",
    },
    {
      id: "renewable-solar",
      title: "Rooftop Solar & Renewable Clean Energy",
      description:
        "Turnkey commercial & industrial (C&I) solar photovoltaic systems, net-metering integration, solar water pumps, and utility-grade solar EPC solutions accelerating Bangladesh's green energy transition.",
      concernSlug: "radial-renewable-technology",
      concernName: "Radial Renewable Technology Bangladesh",
      icon: "SunMedium",
    },
    {
      id: "water-engineering",
      title: "Industrial Water Pumps & Hydrant Infrastructure",
      description:
        "High-performance centrifugal pumps, deep tube-well installations, industrial dewatering, wastewater handling, and NFPA-compliant fire-fighting pump systems.",
      concernSlug: "glory-energy-engineering",
      concernName: "Glory Energy Engineering",
      icon: "Droplets",
    },
    {
      id: "electromechanical-substations",
      title: "Electro-Mechanical & Substation Engineering",
      description:
        "Design, manufacturing, and commissioning of 11kV/33kV substations, HT/LT switchgear panels, PFI plants, dry & oil-type transformers, and automated synchronizing systems.",
      concernSlug: "radial-power-engineering",
      concernName: "Radial Power & Engineering",
      icon: "Cpu",
    },
    {
      id: "infant-care",
      title: "Certified Mother & Infant Essentials",
      description:
        "Import, distribution, and retail of medical-grade baby feeding, sterile mother care accessories, infant nutrition hygiene, and developmental nursery products.",
      concernSlug: "infant-zone",
      concernName: "Infant Zone",
      icon: "HeartHandshake",
    },
  ],
  sisterConcerns: [
    {
      id: "infant-zone",
      name: "Infant Zone",
      slug: "infant-zone",
      shortName: "Infant Zone",
      tagline: "Nurturing the Next Generation with Certified Purity & Care",
      sector: "Mother & Baby Healthcare & Nursery Essentials",
      description:
        "Trusted brand for premium baby care, pediatric-grade feeding essentials, sterile maternal care products, and certified nursery goods in Bangladesh.",
      longDescription:
        "Infant Zone brings uncompromising safety, clinical sterilization standards, and comfort to families across Bangladesh. From BPA-free newborn feeding accessories to ergonomic infant strollers and nursery hygiene gear, Infant Zone stands for pristine quality and parental peace of mind.",
      foundedYear: "2019",
      iconName: "HeartHandshake",
      logo: "/img/infant-zone-logo.png",
      keySpecialties: [
        "BPA-Free Pediatric-Grade Baby Feeding Bottles & Nipples",
        "Sterile Breast Pumps & Post-Natal Maternal Care Accessories",
        "Organic Hygiene Wipes & Pediatric-Tested Skincare",
        "Ergonomic Infant Strollers, Car Seats & High Chairs",
        "Nationwide Mother & Child Retail and E-Commerce Distribution",
      ],
      stats: [
        { label: "Happy Parents Served", value: "250,000+" },
        { label: "Certified Safe Products", value: "120+ SKUs" },
        { label: "Retail Partner Outlets", value: "400+ Stores" },
      ],
      capabilities: [
        {
          title: "Strict Safety & Material Testing",
          description:
            "Every product batch complies with EU Directive and FDA standards for non-toxic silicone, food-grade polypropylene, and zero phthalates.",
        },
        {
          title: "Medical-Grade Sterilization Standards",
          description:
            "Supplying healthcare maternity wards and hospitals with clinically packaged nursing accessories and sterile infant feeding devices.",
        },
        {
          title: "Nationwide Logistics & Express Delivery",
          description:
            "Dedicated climate-controlled central warehousing in Dhaka ensuring pristine condition and rapid distribution to all 64 districts.",
        },
      ],
      contactInfo: {
        email: "support@infantzone.com.bd",
        phone: "+880 1711-000005",
        office: "Bhuiyan Corporate Tower, Ground & 1st Floor, Gulshan-1, Dhaka",
      },
    },
    {
      id: "generex-power",
      name: "Generex Power",
      slug: "generex-power",
      shortName: "Generex",
      tagline: "Uncompromised Industrial Power & Energy Reliability",
      sector: "Power Generation & Energy Systems",
      description:
        "Leading provider of industrial diesel, gas, and dual-fuel generator sets ranging from 20 kVA to 3000 kVA, offering comprehensive EPC and 24/7 maintenance support.",
      longDescription:
        "Generex Power is the vanguard of industrial energy resilience in Bhuiyan Group. We supply, commission, and maintain heavy-duty power generation solutions engineered for continuous textile mill operations, pharmaceutical grade stability, commercial high-rises, and mission-critical telecommunications facilities across Bangladesh.",
      foundedYear: "2012",
      iconName: "Zap",
      logo: "/img/generex-power-square.png",
      keySpecialties: [
        "Diesel & Gas Generator Sets (20 kVA - 3000 kVA)",
        "Soundproof Canopy & Acoustic Enclosure Fabrication",
        "Load Sharing & Automatic Synchronizing Panels",
        "Genuine Spare Parts Supply (Perkins, Cummins, Stamford)",
        "Nationwide 24/7 Rapid Emergency Maintenance Support",
      ],
      stats: [
        { label: "Generators Installed", value: "850+ Units" },
        { label: "Prime Power Delivered", value: "240+ MW" },
        { label: "SLA Response Time", value: "< 2 Hours" },
      ],
      capabilities: [
        {
          title: "Customized Acoustic Engineering",
          description:
            "Design and manufacturing of soundproof canopies strictly compliant with Bangladesh environmental noise thresholds for urban factories and healthcare institutions.",
        },
        {
          title: "Intelligent Power Synchronization",
          description:
            "Multi-generator load sharing and automated main-failure (AMF) controls that safeguard production continuity with zero millisecond dropout.",
        },
        {
          title: "Long-Term O&M Contracting",
          description:
            "Turnkey operation and maintenance packages ensuring maximum uptime and guaranteed operational life for industrial prime movers.",
        },
      ],
      contactInfo: {
        email: "generex@bhuiyangroup.com.bd",
        phone: "+880 1711-000001",
        office: "Bhuiyan Corporate Tower, Level 8, Gulshan-1, Dhaka",
      },
    },
    {
      id: "glory-energy-engineering",
      name: "Glory Energy Engineering",
      slug: "glory-energy-engineering",
      shortName: "Glory Energy",
      tagline: "Pioneering Fluid Mechanics & Water Pump Engineering",
      sector: "Industrial Water Systems & Fire Safety",
      description:
        "High-capacity industrial water pump solutions, submersible deep-well irrigation, municipal fluid management, and certified fire protection hydrant pump networks.",
      longDescription:
        "Glory Energy Engineering delivers heavy-duty fluid dynamics solutions engineered for Bangladesh’s demanding hydrological conditions. From deep extraction pumps for industrial wash plants to high-pressure UL/FM compliant fire-fighting skid pumps, we ensure continuous water security and life-safety compliance.",
      foundedYear: "2014",
      iconName: "Droplets",
      logo: "/img/glory-energy-square.png",
      keySpecialties: [
        "End-Suction & Split-Case Centrifugal Water Pumps",
        "Submersible Deep-Well & Borehole Pumping Systems",
        "UL/FM Fire Protection Hydrant & Sprinkler Booster Sets",
        "Effluent Treatment Plant (ETP) Pumping & Slurry Handling",
        "Variable Frequency Drive (VFD) Pressure Booster Stations",
      ],
      stats: [
        { label: "Pump Installations", value: "1,500+ Sets" },
        { label: "Flow Rate Handled", value: "450k m³/hr" },
        { label: "Industrial Clients", value: "320+ Units" },
      ],
      capabilities: [
        {
          title: "Fire Safety Hydro-Pneumatics",
          description:
            "Custom engineered diesel and electric fire hydrant pump skids fully certified to NFPA and Bangladesh Fire Service & Civil Defence standards.",
        },
        {
          title: "Deep Ground Water Extraction",
          description:
            "High-head submersible borehole pumps built with anti-corrosion stainless steel internals designed for harsh industrial water tables.",
        },
        {
          title: "Smart Booster Hydro-Pneumatic Systems",
          description:
            "Energy-saving multi-pump variable speed sets that maintain razor-sharp constant pressure across high-rise residential and commercial towers.",
        },
      ],
      contactInfo: {
        email: "glory@bhuiyangroup.com.bd",
        phone: "+880 1711-000003",
        office: "Bhuiyan Corporate Tower, Level 8, Gulshan-1, Dhaka",
      },
    },
    {
      id: "radial-power-engineering",
      name: "Radial Power & Engineering",
      slug: "radial-power-engineering",
      shortName: "Radial Power",
      tagline: "Precision Electro-Mechanical Infrastructure & Substations",
      sector: "Substation & Electrical Switchgear Engineering",
      description:
        "Specialists in 11kV/33kV industrial electrical substations, high-voltage switchgear, power factor improvement (PFI) plants, and automated power distribution.",
      longDescription:
        "Radial Power & Engineering is the electro-mechanical backbone of Bhuiyan Group. Our engineering teams design, test, build, and certify heavy electrical distribution systems that power RMG factories, heavy chemical plants, cement works, and corporate IT parks with zero margin for electrical faults.",
      foundedYear: "2015",
      iconName: "Cpu",
      logo: "/img/radial-power-logo.jpg",
      keySpecialties: [
        "11kV & 33kV Indoor/Outdoor Electrical Substations",
        "HT & LT Switchgear Panel Design & Assembly",
        "Automated Power Factor Improvement (PFI) Plants",
        "Oil-Immersed & Dry-Type Cast Resin Transformers",
        "Automatic Transfer Switches (ATS) & Busbar Trunking (BBT)",
      ],
      stats: [
        { label: "Substations Commissioned", value: "420+ Units" },
        { label: "Total MVA Managed", value: "650+ MVA" },
        { label: "Inspection Pass Rate", value: "100%" },
      ],
      capabilities: [
        {
          title: "Custom Switchgear Fabrication",
          description:
            "In-house precision sheet metal CNC fabrication, powder coating, and busbar engineering conforming to IEC 61439 switchgear standards.",
        },
        {
          title: "Harmonic Filtration & PFI Plants",
          description:
            "Eliminate utility power factor penalties and clean harmonic distortions with intelligent micro-processor managed capacitor bank panels.",
        },
        {
          title: "Electrical Safety Audits & Thermography",
          description:
            "Certified IR thermal imaging, insulation resistance testing, and load-balancing diagnostic services compliant with Accord/RSC safety guidelines.",
        },
      ],
      contactInfo: {
        email: "radialpower@bhuiyangroup.com.bd",
        phone: "+880 1711-000004",
        office: "Bhuiyan Corporate Tower, Level 9, Gulshan-1, Dhaka",
      },
    },
    {
      id: "radial-renewable-technology",
      name: "Radial Renewable Technology Bangladesh",
      slug: "radial-renewable-technology",
      shortName: "Radial Solar",
      tagline: "Harnessing the Sun for an Eco-Resilient Bangladesh",
      sector: "Solar Photovoltaic & Clean Tech EPC",
      description:
        "Pioneering commercial & industrial (C&I) rooftop solar, solar irrigation systems, and smart microgrids aligned with national net-metering energy guidelines.",
      longDescription:
        "Radial Renewable Technology Bangladesh is driving corporate decarbonization through cutting-edge solar PV engineering. Specializing in high-yield Tier-1 monocrystalline installations and smart inverter ecosystems, we turn commercial rooftop expanses into self-funding, carbon-reducing clean power stations.",
      foundedYear: "2017",
      iconName: "SunMedium",
      logo: "/img/radial-renewable-logo.jpg",
      keySpecialties: [
        "Turnkey C&I Rooftop Solar EPC (100 kWp - 10 MWp)",
        "Net-Metering System Design & Regulatory Approvals",
        "Solar Agricultural Irrigation & Water Pump Solutions",
        "Hybrid Battery Energy Storage Systems (BESS)",
        "Real-Time SCADA Solar Telemetry & Yield Optimization",
      ],
      stats: [
        { label: "Clean Energy Installed", value: "48+ MWp" },
        { label: "CO2 Offset Annually", value: "32,000 Tons" },
        { label: "Tier-1 Solar Efficiency", value: "22.8%" },
      ],
      capabilities: [
        {
          title: "Turnkey Solar EPC & Permitting",
          description:
            "End-to-end feasibility, structural roof auditing, electrical engineering, SREDA compliance, and utility grid interconnection.",
        },
        {
          title: "Industrial Net-Metering Solutions",
          description:
            "Enabling export-oriented manufacturing plants to sell excess midday solar yield back into the national grid under BPDB/BREB net-metering policies.",
        },
        {
          title: "Remote Monitoring Systems",
          description:
            "Cloud-connected SCADA monitoring tracks module-level string performance, dirt degradation, and inverter efficiency 24 hours a day.",
        },
      ],
      contactInfo: {
        email: "renewable@bhuiyangroup.com.bd",
        phone: "+880 1711-000002",
        office: "Bhuiyan Corporate Tower, Level 7, Gulshan-1, Dhaka",
      },
    },
  ],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about-us" },
    { name: "Sister Concerns", href: "/#sister-concerns" },
    { name: "Core Sectors", href: "/#core-sectors" },
    { name: "Projects", href: "/#projects" },
  ],
};
