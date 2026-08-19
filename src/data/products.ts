export type ProductCategory =
  | 'vfd'
  | 'induction-motors'
  | 'instrumentation'
  | 'switchgear'
  | 'transfer-switch'
  | 'panelboards-meter-centers'
  | 'synchronizing-switchgear'
  | 'circuit-breaker';

export type SpecRow = { label: string; value: string };

export type ProductVariant = {
  name: string;
  image?: string;
  specs?: SpecRow[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  standard?: string;
  mainImage?: string;
  features: string[];
  variants: ProductVariant[];
  stockItems?: string[];
  brochureLabel?: string;
  brochureUrl?: string;
  relatedIds?: string[];
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'vfd': 'Variable Frequency Drives (Fuji Electric)',
  'induction-motors': 'Induction Motors',
  'instrumentation': 'Instrumentation Products',
  'switchgear': 'Low/Medium Voltage Switchgear',
  'transfer-switch': 'Automatic / Manual Transfer Switch',
  'panelboards-meter-centers': 'Panelboards / Meter Centers',
  'synchronizing-switchgear': 'Automatic Synchronizing Switchgear',
  'circuit-breaker': 'Circuit Breaker',
};

const products: Product[] = [
  // ─── HIMEL ───────────────────────────────────────────────────────────────

  {
    id: 'hdb-mcb',
    name: 'Miniature Circuit Breaker',
    brand: 'HIMEL',
    category: 'circuit-breaker',
    tagline: 'HDB6s / HDB9 Series',
    description:
      'High-breaking-capacity miniature circuit breakers providing reliable protection against overload and short-circuit currents. Available in 1P–4P configurations with Class 3 current energy-limiting capacity and Quick Closed technology for superior operational durability.',
    standard: 'IEC 60898-1',
    mainImage: '/images/products/hdb9_mcb.png',
    features: [
      'High breaking capacity up to 10 kA',
      '"Class 3" current energy-limiting capacity',
      'Quick Closed technology — 20,000 mechanical / 10,000 electrical operations',
      'Ambient temperature rating: −30°C to +70°C',
      'Thermoplastic shell with impact resistance and fire retardancy',
      'Trip curves B, C and D available',
    ],
    variants: [
      { name: 'HDB9H 1P', image: '/images/products/mcb/hdb9_1p.png', specs: [{ label: 'Poles', value: '1P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '10 kAIC @ 230V' }] },
      { name: 'HDB9H 2P', image: '/images/products/mcb/hdb9_2p.png', specs: [{ label: 'Poles', value: '2P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '10 kAIC @ 230V' }] },
      { name: 'HDB9H 3P', image: '/images/products/mcb/hdb9_3p.png', specs: [{ label: 'Poles', value: '3P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '10 kAIC @ 230V' }] },
      { name: 'HDB9H 4P', image: '/images/products/mcb/hdb9_4p.png', specs: [{ label: 'Poles', value: '4P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '10 kAIC @ 230V' }] },
      { name: 'HDB6s 1P', image: '/images/products/mcb/hdb6_1p.png', specs: [{ label: 'Poles', value: '1P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '6/4.5 kAIC @ 230V' }] },
      { name: 'HDB6s 2P', image: '/images/products/mcb/hdb6_2p.png', specs: [{ label: 'Poles', value: '2P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '6/4.5 kAIC @ 400V' }] },
      { name: 'HDB6s 3P', image: '/images/products/mcb/hdb6_3p.png', specs: [{ label: 'Poles', value: '3P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '6/4.5 kAIC @ 400V' }] },
      { name: 'HDB6s 4P', image: '/images/products/mcb/hdb6_4p.png', specs: [{ label: 'Poles', value: '4P' }, { label: 'Rating', value: '1–63A' }, { label: 'Breaking Capacity', value: '6/4.5 kAIC @ 400V' }] },
    ],
    stockItems: [
      'HDB9H Series, 1–63A, 1P, 10 kAIC @ 230V',
      'HDB9H Series, 1–63A, 2P, 10 kAIC @ 230V',
      'HDB9H Series, 1–63A, 3P, 10 kAIC @ 230V',
      'HDB9H Series, 1–63A, 4P, 10 kAIC @ 230V',
      'HDB6s Series, 1/2/3/4/6/10/16/20/25/32/40/50/63A, 1P, 6/4.5 kAIC @ 230V',
      'HDB6s Series, 1/2/3/4/6/10/16/20/25/32/40/50/63A, 2P, 6/4.5 kAIC @ 400V',
      'HDB6s Series, 1/2/3/4/6/10/16/20/25/32/40/50/63A, 3P, 6/4.5 kAIC @ 400V',
      'HDB6s Series, 1/2/3/4/6/10/16/20/25/32/40/50/63A, 4P, 6/4.5 kAIC @ 400V',
    ],
    brochureLabel: 'HDB9 Series Brochure',
    relatedIds: ['hdp6-starter', 'hdm6l-mccb'],
  },

  {
    id: 'hdp6-starter',
    name: 'Manual Motor Starter',
    brand: 'HIMEL',
    category: 'circuit-breaker',
    tagline: 'HDP6 Series',
    description:
      'Professional motor control and protection device combining the functionality of a 3-pole circuit breaker and thermal overload relay. Ideal for direct motor towing in low-frequency switching applications, with IEC-compliant performance for commercial and industrial motor control panels.',
    standard: 'IEC 947-1, IEC 947-2, IEC 947-4-1',
    mainImage: '/images/products/hdp6_mp.png',
    features: [
      'Combines circuit breaker + thermal overload relay in one unit',
      'Most comprehensive motor control and protection in its class',
      'Perfect industrial design for panel assembly',
      'Easy installation with firm terminal connections',
      'Suitable for low-frequency switching applications',
    ],
    variants: [
      { name: 'HDC6 Magnetic Contactor (9–95A)', image: '/images/products/mp/hdc6_95a.png', specs: [{ label: 'Current Range', value: '9–95A' }, { label: 'Type', value: 'AC Magnetic Contactor' }] },
      { name: 'HDC6 Magnetic Contactor (115–630A)', image: '/images/products/mp/hdc6_630a.png', specs: [{ label: 'Current Range', value: '115–630A' }, { label: 'Type', value: 'AC Magnetic Contactor' }] },
      { name: 'HDR6 Thermal Overload Relay', image: '/images/products/mp/hdr6.png', specs: [{ label: 'Type', value: 'Thermal Overload Relay' }] },
    ],
    stockItems: [
      'HDC6 AC Magnetic Contactor, 9–95A',
      'HDC6 AC Magnetic Contactor, 115–630A',
      'HDR6 Thermal Overload Relay',
    ],
    brochureLabel: 'HDP6 Series Brochure',
    relatedIds: ['hdb-mcb', 'hdm6l-mccb'],
  },

  {
    id: 'hdm6l-mccb',
    name: 'Molded Case & Air Circuit Breakers',
    brand: 'HIMEL',
    category: 'circuit-breaker',
    tagline: 'HDM6L / HDW6 Series',
    description:
      'Heavy-duty circuit protection for industrial distribution panels. The HDM6L MCCB series covers 16–800A, while the HDW6 ACB series handles up to 6300A with drawout capability and motorized operation — ideal for main incomer and bus coupler applications.',
    standard: 'IEC 60947-2',
    mainImage: '/images/products/hdm6l_elcb.png',
    features: [
      'Rated insulation voltage Ui: AC 800V',
      'Rated impulse withstand voltage Uimp: 8 kV',
      'Convenient and flexible trip setting parameters',
      'ACB series available in fixed or drawout, manual or motorized',
      'Breaking capacity up to 120 kAIC (6300AF ACB)',
      'Reliable quality with perfect industrial design',
    ],
    variants: [
      { name: 'ACB 630–2000AT', image: '/images/products/acb/acb_630-2000at.png', specs: [{ label: 'Frame', value: '2000AF' }, { label: 'Rating', value: '630–2000AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '80 kAIC' }, { label: 'Type', value: 'Fixed or Drawout, Manual or Motorized' }] },
      { name: 'ACB 2000–3200AT', image: '/images/products/acb/acb_2000-3200at.png', specs: [{ label: 'Frame', value: '3200AF' }, { label: 'Rating', value: '2000–3200AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '80 kAIC' }, { label: 'Type', value: 'Fixed or Drawout, Manual or Motorized' }] },
      { name: 'ACB 4000–6300AT', image: '/images/products/acb/acb_4000-6300at.png', specs: [{ label: 'Frame', value: '6300AF' }, { label: 'Rating', value: '4000–6300AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '120 kAIC' }, { label: 'Type', value: 'Drawout, Manual or Motorized' }] },
      { name: 'MCCB 16–100AT', image: '/images/products/mccb/mccb_16-100at.png', specs: [{ label: 'Frame', value: '100AF' }, { label: 'Rating', value: '16–100AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '26 kAIC @ 400V' }] },
      { name: 'MCCB 100–250AT', image: '/images/products/mccb/mccb_100-250at.png', specs: [{ label: 'Frame', value: '250AF' }, { label: 'Rating', value: '100–250AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '26 kAIC @ 400V' }] },
      { name: 'MCCB 200–400AT', image: '/images/products/mccb/mccb_200-400at.png', specs: [{ label: 'Frame', value: '400AF' }, { label: 'Rating', value: '200–400AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '50 kAIC @ 400V' }] },
      { name: 'MCCB 400–630AT', image: '/images/products/mccb/mccb_400-630at.png', specs: [{ label: 'Frame', value: '630AF' }, { label: 'Rating', value: '400–630AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '50 kAIC @ 400V' }] },
      { name: 'MCCB 630–800AT', image: '/images/products/mccb/mccb_630-800at.png', specs: [{ label: 'Frame', value: '800AF' }, { label: 'Rating', value: '630–800AT' }, { label: 'Poles', value: '3P or 4P' }, { label: 'Breaking', value: '50 kAIC @ 400V' }] },
    ],
    stockItems: [
      'HDW6 Series, 630–2000AT/2000AF, 3P or 4P, 80 kAIC, Fixed or Drawout, Manual or Motorized',
      'HDW6 Series, 2000–3200AT/3200AF, 3P or 4P, 80 kAIC, Fixed or Drawout, Manual or Motorized',
      'HDW6 Series, 4000–6300AT/6300AF, 3P or 4P, 120 kAIC, Drawout, Manual or Motorized',
      'HDM6s Series, 16–100AT/100AF, 3P or 4P, 26 kAIC @ 400V',
      'HDM6s Series, 100–250AT/250AF, 3P or 4P, 26 kAIC @ 400V',
      'HDM6s Series, 200–400AT/400AF, 3P or 4P, 50 kAIC @ 400V',
      'HDM6s Series, 400–630AT/630AF, 3P or 4P, 50 kAIC @ 400V',
      'HDM6s Series, 630–800AT/800AF, 3P or 4P, 50 kAIC @ 400V',
    ],
    brochureLabel: 'HDM6L Series Brochure',
    relatedIds: ['hdb-mcb', 'hdp6-starter'],
  },

  // ─── FUJI ELECTRIC ───────────────────────────────────────────────────────

  {
    id: 'frenic-ace',
    name: 'FRENIC-ACE Inverter',
    brand: 'Fuji Electric',
    category: 'vfd',
    tagline: 'General-Purpose Variable Frequency Drive',
    description:
      'The standard inverter for the next generation — designed for most types of applications from fans and pumps to specialized machinery. Features customizable logic functions, sensorless vector control, and a 10-year lifetime design for maximum operational reliability.',
    mainImage: '/images/products/vfd/frenic_ace.jpg',
    features: [
      'Customizable logic functions (up to 200 steps, digital and analog)',
      'Sensorless dynamic torque vector control',
      'Motor vector control with PG (optional card)',
      'Synchronous motor with sensorless vector control',
      '2-channel on-board RS485 communications (Modbus RTU)',
      'Removable keypad and control terminal block',
      'Built-in Safe Torque Off (STO)',
      '10-year lifetime design',
    ],
    variants: [
      { name: 'Standard Type (0.2–37kW)', image: '/images/products/vfd/frenic_ace.jpg', specs: [{ label: 'Capacity', value: '0.2–590 kW' }, { label: 'Built-in Brake Chopper', value: '0.2–37 kW' }, { label: 'Voltage Class', value: '200V / 400V, 3-phase' }] },
      { name: 'Single Phase Model', image: '/images/products/vfd/frenic_ace.jpg', specs: [{ label: 'Capacity', value: '0.1–2.2 kW' }, { label: 'Voltage', value: '200V Class' }] },
      { name: 'EMC Filter Built-in', image: '/images/products/vfd/frenic_ace.jpg', specs: [{ label: 'Phase', value: '3PH 200V / 400V Class' }, { label: 'EMC', value: 'EN61800-3 Compliant' }] },
    ],
    stockItems: [
      'Standard Type — Built-in Brake Chopper, 0.2–37 kW',
      'Standard Type — 45–590 kW (Option)',
      'Single Phase, 0.1–2.2 kW, 200V Class',
      'EMC Filter Built-in, 3PH 200V / 400V Class',
    ],
    brochureLabel: 'FRENIC-ACE Brochure',
    relatedIds: ['frenic-hvac', 'frenic-aqua', 'frenic-mega'],
  },

  {
    id: 'frenic-hvac',
    name: 'FRENIC-HVAC Inverter',
    brand: 'Fuji Electric',
    category: 'vfd',
    tagline: 'Slim-Type Inverter for HVAC Energy Saving',
    description:
      'The first slim-type inverter specialized for energy-saving in HVAC applications. Provides dedicated pump and fan control with BACnet MS/TP, Modbus RTU, and Metasys N2 communications as standard — enabling seamless integration into building automation systems.',
    mainImage: '/images/products/vfd/frenic_hvac.jpg',
    features: [
      'Optimal control with energy-saving function',
      'Dedicated pump control function as standard',
      'Slim body design for space-constrained installations',
      'Stand-alone operation capability',
      'SEMI F47 voltage sag immunity compliance certified',
      'IP21 or IP55 protective structure (0.75–90 kW)',
      'Built-in Safe Torque Off (STO)',
      'BACnet MS/TP, Modbus RTU, Metasys N2 as standard',
    ],
    variants: [
      { name: 'Standard Type with EMC Filter', image: '/images/products/vfd/frenic_hvac.jpg', specs: [{ label: 'Capacity', value: '0.75–710 kW' }, { label: 'Enclosure', value: 'IP21 or IP55 (0.75–90 kW)' }] },
      { name: 'DCR + EMC Filter Built-in', image: '/images/products/vfd/frenic_hvac.jpg', specs: [{ label: 'Capacity', value: '0.75–710 kW' }, { label: 'DC Reactor', value: 'Built-in' }, { label: 'EMC Filter', value: 'Built-in' }] },
    ],
    stockItems: [
      'Standard Type (EMC Built-in), 0.75–710 kW',
      'DCR + EMC Filter Built-in Type, 0.75–710 kW',
    ],
    brochureLabel: 'FRENIC-HVAC Brochure',
    brochureUrl: '/brochures/frenic-hvac-catalog.pdf',
    relatedIds: ['frenic-ace', 'frenic-aqua', 'frenic-mega'],
  },

  {
    id: 'frenic-aqua',
    name: 'FRENIC-AQUA Inverter',
    brand: 'Fuji Electric',
    category: 'vfd',
    tagline: 'Slim-Type Inverter for Water and Pump Applications',
    description:
      'Purpose-built for water treatment, pump, and fluid control applications. Shares the slim-body design with FRENIC-HVAC but optimized for waterworks and pump system environments, with full BAS communications support and stand-alone operation.',
    mainImage: '/images/products/vfd/frenic_aqua.jpg',
    features: [
      'Dedicated pump control function as standard',
      'Optimal energy-saving control algorithm',
      'Slim body for compact pump panel installations',
      'SEMI F47 voltage sag immunity compliance certified',
      'IP21 or IP55 protective structure (0.75–90 kW)',
      'Built-in Safe Torque Off (STO)',
      'BACnet MS/TP, Modbus RTU, Metasys N2 as standard',
    ],
    variants: [
      { name: 'Standard Type with EMC Filter', image: '/images/products/vfd/frenic_aqua.jpg', specs: [{ label: 'Capacity', value: '0.75–710 kW' }, { label: 'Enclosure', value: 'IP21 or IP55 (0.75–90 kW)' }] },
      { name: 'DCR + EMC Filter Built-in', image: '/images/products/vfd/frenic_aqua.jpg', specs: [{ label: 'Capacity', value: '0.75–710 kW' }, { label: 'DC Reactor', value: 'Built-in' }, { label: 'EMC Filter', value: 'Built-in' }] },
    ],
    stockItems: [
      'Standard Type (EMC Built-in), 0.75–710 kW',
      'DCR + EMC Filter Built-in Type, 0.75–710 kW',
    ],
    brochureLabel: 'FRENIC-AQUA Brochure',
    relatedIds: ['frenic-ace', 'frenic-hvac', 'frenic-mega'],
  },

  {
    id: 'frenic-mega',
    name: 'FRENIC-MEGA Inverter',
    brand: 'Fuji Electric',
    category: 'vfd',
    tagline: 'High-Performance Drive for Heavy Industrial Loads',
    description:
      'High-performance variable frequency drive designed for heavy-duty industrial applications requiring high dynamic torque response. Available in HD (High Duty) and LD (Low Duty) ratings, with the same advanced logic customization as the ACE series and 10-year lifetime design.',
    mainImage: '/images/products/vfd/frenic_mega.jpg',
    features: [
      'HD (Heavy Duty) and LD (Light Duty) rated versions',
      'Customizable logic functions (up to 200 steps)',
      'Sensorless dynamic torque vector control',
      'Motor vector control with PG feedback (optional)',
      '2-channel on-board RS485 (Modbus RTU)',
      'Removable keypad with USB port option',
      'Built-in Safe Torque Off (STO)',
      '10-year lifetime design',
    ],
    variants: [
      { name: 'HD Standard 3-Phase', image: '/images/products/vfd/frenic_mega.jpg', specs: [{ label: 'Load Rating', value: 'HD — Heavy Duty' }, { label: 'Voltage', value: '200V / 400V, 3-phase' }] },
      { name: 'LD Standard 3-Phase', image: '/images/products/vfd/frenic_mega.jpg', specs: [{ label: 'Load Rating', value: 'LD — Light Duty' }, { label: 'Voltage', value: '200V / 400V, 3-phase' }] },
      { name: 'Single Phase Model', image: '/images/products/vfd/frenic_mega.jpg', specs: [{ label: 'Capacity', value: '0.1–2.2 kW' }, { label: 'Voltage', value: '200V Class' }] },
    ],
    stockItems: [
      'HD Type, 3PH 200V / 400V Class',
      'LD Type, 3PH 200V / 400V Class',
      'Single Phase, 0.1–2.2 kW, 200V Class',
      'EMC Filter Built-in, 3PH 200V / 400V Class',
    ],
    brochureLabel: 'FRENIC-MEGA Brochure',
    relatedIds: ['frenic-ace', 'frenic-hvac', 'frenic-aqua'],
  },

  // ─── PANEL & SYSTEM ──────────────────────────────────────────────────────

  {
    id: 'switchgear',
    name: 'Switchgear Systems',
    brand: "T'sys / Total Power Box",
    category: 'switchgear',
    tagline: 'LVSG · MVSG · HVSG · ECBM',
    description:
      "Custom-fabricated switchgear for low, medium, and high voltage distribution. Designed, produced, and installed by T'sys's team of certified electrical engineers using 3D CAD/CAM systems — from 400V LV distribution boards to HV switchgear for large commercial and industrial facilities.",
    mainImage: '/images/products/powerbox_prod_switchgear_264_160.png',
    features: [
      'Full design-and-build capability using 3D CAD/CAM',
      'Certified electrical engineers for all voltage classes',
      'LV, MV, and HV solutions from one supplier',
      'Custom configurations for commercial and industrial applications',
      'Retrofit and installation services available',
      'Metering options for ECBM panels',
    ],
    variants: [
      { name: 'Low Voltage Switchgear (LVSG)', image: '/images/products/switchgear/lvsg.png', specs: [{ label: 'Voltage Class', value: 'Low Voltage (≤1 kV)' }] },
      { name: 'Medium Voltage Switchgear (MVSG)', image: '/images/products/switchgear/mvsg.png', specs: [{ label: 'Voltage Class', value: 'Medium Voltage (1–35 kV)' }] },
      { name: 'High Voltage Switchgear (HVSG)', image: '/images/products/switchgear/hvsg.png', specs: [{ label: 'Voltage Class', value: 'High Voltage (>35 kV)' }] },
      { name: 'Enclosed Circuit Breaker with Metering (ECBM)', image: '/images/products/switchgear/ecbm.png', specs: [{ label: 'Type', value: 'Enclosed Circuit Breaker with Metering' }] },
    ],
    relatedIds: ['t-line-panelboard', 'busway', 'oil-immersed-transformer'],
  },

  {
    id: 't-line-panelboard',
    name: 'T-LINE Panelboard',
    brand: "T'sys / Total Power Box",
    category: 'panelboards-meter-centers',
    tagline: 'NEMA 1 Distribution Panelboards',
    description:
      "Factory-fabricated NEMA 1 panelboards for branch circuit distribution. Available in standard, swing dead-front, and DIN-rail mounted configurations — built to specification by T'sys's in-house fabrication team for reliable and organized power distribution in commercial and industrial buildings.",
    mainImage: '/images/products/powerbox_prod_tline.png',
    features: [
      'NEMA 1 enclosure standard',
      'Swing-type dead front option for safe access',
      'DIN-rail mounted breaker configuration available',
      'Custom-fabricated to project specifications',
      'Suitable for commercial and industrial distribution',
    ],
    variants: [
      { name: 'Standard NEMA 1 Panelboard', image: '/images/products/panelboard/nema1_pb.png', specs: [{ label: 'Enclosure', value: 'NEMA 1' }] },
      { name: 'Swing-Type Dead Front', image: '/images/products/panelboard/nema1_pb_swingtype.png', specs: [{ label: 'Enclosure', value: 'NEMA 1' }, { label: 'Door Type', value: 'Swing Dead Front' }] },
      { name: 'DIN-Rail Mounted on NEMA 1', image: '/images/products/panelboard/nema1_pb_dinrail.png', specs: [{ label: 'Enclosure', value: 'NEMA 1' }, { label: 'Mounting', value: 'DIN-Rail' }] },
    ],
    relatedIds: ['switchgear', 'busway'],
  },

  {
    id: 'busway',
    name: 'Busway / Busduct System',
    brand: "T'sys / Total Power Box",
    category: 'switchgear',
    tagline: 'Busduct Feeder System',
    description:
      "Prefabricated busduct and busway feeder systems for efficient high-current power distribution in buildings and industrial plants. Eliminates the need for large cable conduit runs while providing a clean, maintainable, and expandable power distribution infrastructure.",
    mainImage: '/images/products/powerbox_prod_busway.png',
    features: [
      'High-current capacity feeder distribution',
      'Prefabricated for faster installation',
      'Elbow and tee sections for routing flexibility',
      'Cleaner installation vs. cable tray for high-load feeders',
      'Custom lengths available',
    ],
    variants: [
      { name: 'Busduct — Straight Run', image: '/images/products/busduct/busduct.png' },
      { name: 'Busduct Elbow', image: '/images/products/busduct/busduct_elbow.png' },
      { name: 'Busduct Elbow (Alt.)', image: '/images/products/busduct/busduct_elbow2.png' },
    ],
    relatedIds: ['t-line-panelboard', 'cable-tray'],
  },

  {
    id: 'oil-immersed-transformer',
    name: 'Oil Immersed Transformer',
    brand: 'Fuji Electric / Fuji Tusco',
    category: 'switchgear',
    tagline: 'Distribution & Power Transformers',
    description:
      "Oil-immersed distribution and power transformers manufactured by Fuji Tusco, combining Fuji Electric's transformer engineering with local manufacturing. Built with Hi-B oriented silicon steel core construction and high series capacitance disc winding for reliable performance in commercial and industrial power distribution.",
    standard: 'IEC 60076, IEC 60076-5',
    mainImage: '/images/products/switchgear/oil_immersed_transformer.jpg',
    features: [
      'Hi-B (high magnetic flux density) oriented silicon steel core for low noise and losses',
      'High series capacitance disc winding for improved impulse voltage protection',
      'Transposed conductor winding reduces stray load loss and local overheating',
      'Short-circuit withstand tested to IEC 60076-5, KEMA-certified',
      'Cooling system selectable per capacity and site requirements (ONAN, ONAF, ODAN, ODAF, OFOW)',
      'Manufactured by Fuji Tusco under Fuji Electric technical assignment',
    ],
    variants: [
      { name: 'Oil-Immersed Distribution Transformer', image: '/images/products/switchgear/oil_immersed_transformer.jpg', specs: [{ label: 'Standard', value: 'IEC 60076-5' }, { label: 'Cooling', value: 'ONAN' }] },
      { name: 'Oil-Immersed Power Transformer', image: '/images/products/switchgear/oil_immersed_transformer.jpg', specs: [{ label: 'Standard', value: 'IEC 60076-5' }, { label: 'Cooling', value: 'ONAN / ONAF / ODAN / ODAF / OFOW' }] },
    ],
    brochureLabel: 'Oil Immersed Transformer Brochure',
    brochureUrl: '/brochures/fuji-oil-immersed-transformer.pdf',
    relatedIds: ['switchgear', 'busway'],
  },

  {
    id: 'cable-tray',
    name: 'Cable Tray System',
    brand: "T'sys / Total Power Box",
    category: 'panelboards-meter-centers',
    tagline: 'Galvanized Iron Cable Management',
    description:
      "Galvanized iron cable tray systems for organized and accessible cable routing throughout buildings and industrial facilities. Available in ladder type, horizontal elbow, and tee configurations for complete cable management infrastructure.",
    mainImage: '/images/products/powerbox_prod_cabletray.png',
    features: [
      'Galvanized iron construction for corrosion resistance',
      'Ladder-type for maximum cable ventilation',
      'Elbow and tee fittings for directional changes',
      'Accessible for future cable additions or maintenance',
      'Standard and custom widths available',
    ],
    variants: [
      { name: 'GI Horizontal Elbow', image: '/images/products/cabletray/cabletray_gi_elbow.png' },
      { name: 'Cable Tray TEE', image: '/images/products/cabletray/cabletray_tee.png' },
      { name: 'GI Ladder Type (Standard)', image: '/images/products/cabletray/cabletray_gi_ladder.png' },
      { name: 'GI Ladder Type (Wide)', image: '/images/products/cabletray/cabletray_gi_ladder2.png' },
    ],
    relatedIds: ['busway', 't-line-panelboard'],
  },

  // ─── INSTRUMENTATION ─────────────────────────────────────────────────────

  {
    id: 'fcx-pressure-transmitter',
    name: 'Pressure Transmitter',
    brand: 'Fuji Electric',
    category: 'instrumentation',
    tagline: 'FCX-AIII Series — Direct Mount Type (FKP)',
    description:
      'Micromachined capacitive silicon sensor pressure transmitter that accurately measures gauge pressure and transmits a proportional 4 to 20mA signal. Combines a high-accuracy sensor with microprocessor-based signal processing for reliable performance across liquid, gas, and vapor applications.',
    standard: 'IEC 60076 hazardous-area approvals available (ATEX, FM, CSA, IECEx, TIIS)',
    mainImage: '/images/products/instrumentation/pressure_transmitter.jpg',
    features: [
      'High accuracy ±0.1% of span, standard on all calibration ranges',
      '"Advanced Floating Cell" design minimizes error from temperature and overpressure',
      'Fuji/HART® bilingual communications protocol',
      'Adjustable burnout current (Under Scale 3.2–4.0mA, Over Scale 20.0–22.5mA) per NAMUR NE43',
      'Dry calibration without reference pressure',
      'Full range of hazardous area approvals; built-in RFI filter and lightning arrester option',
      '5-digit LCD meter with engineering unit (optional)',
    ],
    variants: [
      { name: 'FKP□01', image: '/images/products/instrumentation/pressure_transmitter.jpg', specs: [{ label: 'Span Limit', value: '8.125–130 kPa' }, { label: 'Range Limit', value: '−100 to +130 kPa' }, { label: 'Overrange Limit', value: '1 MPa' }] },
      { name: 'FKP□02', image: '/images/products/instrumentation/pressure_transmitter.jpg', specs: [{ label: 'Span Limit', value: '31.25–500 kPa' }, { label: 'Range Limit', value: '−100 to +500 kPa' }, { label: 'Overrange Limit', value: '1.5 MPa' }] },
      { name: 'FKP□03', image: '/images/products/instrumentation/pressure_transmitter.jpg', specs: [{ label: 'Span Limit', value: '187.5–3000 kPa' }, { label: 'Range Limit', value: '−100 to +3000 kPa' }, { label: 'Overrange Limit', value: '9 MPa' }] },
      { name: 'FKP□04', image: '/images/products/instrumentation/pressure_transmitter.jpg', specs: [{ label: 'Span Limit', value: '625–10000 kPa' }, { label: 'Range Limit', value: '−100 to +10000 kPa' }, { label: 'Overrange Limit', value: '15 MPa' }] },
    ],
    brochureLabel: 'FKP...5 Data Sheet',
    brochureUrl: '/brochures/fkp5-pressure-transmitter.pdf',
    relatedIds: ['ultrasonic-flowmeter'],
  },

  {
    id: 'ultrasonic-flowmeter',
    name: 'Ultrasonic Flowmeter',
    brand: 'Fuji Electric',
    category: 'instrumentation',
    tagline: 'M-Flow PW — Clamp-On Type (FLR-3)',
    description:
      'Compact clamp-on ultrasonic flowmeter that measures liquid flow rate without contacting the fluid, by detecting the time difference of ultrasonic pulses propagated between sensors mounted on the exterior of the pipe. Features advanced anti-bubble measurement (ABM) for stable readings even with entrained bubbles.',
    mainImage: '/images/products/instrumentation/ultrasonic_flowmeter.png',
    features: [
      'Advanced ABM (anti-bubble measurement) — 10x better bubble tolerance than conventional method',
      'Compact transmitter: 140(H) x 130(W) x 69(D)mm, 0.8kg — 1/3 the size of previous model',
      'High-speed digital signal processing, 0.2 second response',
      'Easy clamp-on installation to existing pipe — no need to cut into the line',
      '4–20mA DC output, 2-point pulse output, RS-485 (MODBUS) communication',
      'Applicable pipe diameter φ25 to φ1200mm',
      'Measurement accuracy up to 1.0% of rate (high accuracy type)',
    ],
    variants: [
      { name: 'Compact Type Detector (FSSA)', image: '/images/products/instrumentation/ultrasonic_flowmeter.png', specs: [{ label: 'Pipe Diameter', value: 'φ25–225mm' }, { label: 'Mounting', value: 'V method' }, { label: 'Fluid Temp.', value: '−20 to 100°C' }] },
      { name: 'Extendable Rail Type Detector (FSSC)', image: '/images/products/instrumentation/ultrasonic_flowmeter.png', specs: [{ label: 'Pipe Diameter', value: 'φ50–1200mm' }, { label: 'Mounting', value: 'V or Z method' }, { label: 'Fluid Temp.', value: '−40 to 120°C' }] },
    ],
    brochureLabel: 'M-Flow PW Brochure',
    brochureUrl: '/brochures/flr-ultrasonic-flowmeter.pdf',
    relatedIds: ['fcx-pressure-transmitter'],
  },
];

export default products;

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductCountByCategory(category: ProductCategory): number {
  return products.filter(p => p.category === category).length;
}
