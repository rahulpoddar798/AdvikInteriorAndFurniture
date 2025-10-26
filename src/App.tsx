import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductSection } from "./components/ProductSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  // Product data reorganized based on actual product categories
  // 22 Beds + 30 Sofas + 22 Chairs + 6 Dining Tables = 80 items total

  const bedsProducts = [
    {
      id: 2,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0102_j0iepi.jpg",
      description:
        "Solid wood platform bed with modern design.",
      itemCode: "AFI002",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452665/IMG-20251005-WA0073_ewdoj8.jpg",
      description: "Elegant tufted headboard with soft fabric.",
      itemCode: "AFI003",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452664/IMG-20251005-WA0070_tig2w9.jpg",
      description:
        "Functional bed with built-in storage drawers.",
      itemCode: "AFI004",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452663/IMG-20251005-WA0068_wp1qml.jpg",
      description: "Classic queen-size panel bed design.",
      itemCode: "AFI005",
    },
    {
      id: 7,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0064_dpqrzw.jpg",
      description:
        "Traditional sleigh bed with curved headboard.",
      itemCode: "AFI007",
    },
    {
      id: 9,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0061_qh8tpc.jpg",
      description:
        "Soft velvet upholstery with elegant finish.",
      itemCode: "AFI009",
    },
    {
      id: 10,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452656/IMG-20251005-WA0058_cx1ldk.jpg",
      description:
        "Classic four-poster bed for grand bedrooms.",
      itemCode: "AFI010",
    },
    {
      id: 11,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0055_zoj0z4.jpg",
      description:
        "Premium leather headboard with sturdy frame.",
      itemCode: "AFI011",
    },
    {
      id: 12,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0053_tjj4k4.jpg",
      description: "Stylish wingback design with comfort.",
      itemCode: "AFI012",
    },
    {
      id: 13,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452651/IMG-20251005-WA0048_rzsxd8.jpg",
      description: "Adjustable base for customized comfort.",
      itemCode: "AFI013",
    },
    {
      id: 33,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0042_hsp7f0.jpg",
      description: "Cozy bed design perfect for small spaces.",
      itemCode: "AFI033",
    },
    {
      id: 36,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0039_hu7xmf.jpg",
      description: "Flexible modular design for any layout.",
      itemCode: "AFI036",
    },
    {
      id: 37,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0036_aaa3hc.jpg",
      description: "Unique curved design statement piece.",
      itemCode: "AFI037",
    },
    {
      id: 38,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0038_l1wsw5.jpg",
      description: "Space-efficient design for apartments.",
      itemCode: "AFI038",
    },
    {
      id: 39,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0032_xx8pkc.jpg",
      description: "Large king-sized bed for families.",
      itemCode: "AFI039",
    },
    {
      id: 40,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452626/IMG-20251005-WA0035_zci1fq.jpg",
      description: "Bed with extended platform design.",
      itemCode: "AFI040",
    },
    {
      id: 41,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452624/IMG-20251005-WA0031_rlzu4q.jpg",
      description: "Low-profile contemporary bed design.",
      itemCode: "AFI041",
    },
    {
      id: 42,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452620/IMG-20251005-WA0030_rzguzu.jpg",
      description: "Multi-functional convertible bed.",
      itemCode: "AFI042",
    },
    {
      id: 43,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0027_mdqrq0.jpg",
      description: "Exclusive designer bed collection.",
      itemCode: "AFI043",
    },
    {
      id: 44,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452619/IMG-20251005-WA0028_kq8a9s.jpg",
      description: "Luxurious royal-themed bed set.",
      itemCode: "AFI044",
    },
    {
      id: 45,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452618/IMG-20251005-WA0026_mxszcn.jpg",
      description: "Classic master bedroom bed design.",
      itemCode: "AFI045",
    },
    {
      id: 59,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0099_tmbwqo.jpg",
      description: "Traditional elegant bed frame design.",
      itemCode: "AFI059",
    },
  ];

  const sofasProducts = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452666/IMG-20251005-WA0072_g2u7lp.jpg",
      description:
        "Luxurious sofa with premium upholstery.",
      itemCode: "AFI001",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452659/IMG-20251005-WA0065_fykb0q.jpg",
      description:
        "Sleek minimalist design for modern living rooms.",
      itemCode: "AFI006",
    },
    {
      id: 8,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452658/IMG-20251005-WA0060_iuxgo5.jpg",
      description: "Contemporary low-profile sofa design.",
      itemCode: "AFI008",
    },
    {
      id: 29,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0007_p0olxl.jpg",
      description: "Space-saving corner sofa for modern homes.",
      itemCode: "AFI029",
    },
    {
      id: 54,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452594/IMG-20251005-WA0051_lgvn22.jpg",
      description: "Premium ergonomic sofa design.",
      itemCode: "AFI054",
    },
    {
      id: 55,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0045_grgiy9.jpg",
      description: "Statement sofa for living spaces.",
      itemCode: "AFI055",
    },
    {
      id: 56,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0044_zlbt3e.jpg",
      description: "Modern compact sofa with adjustable features.",
      itemCode: "AFI056",
    },
    {
      id: 57,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452593/IMG-20251005-WA0006_mhq3i8.jpg",
      description: "Classic wooden frame sofa design.",
      itemCode: "AFI057",
    },
    {
      id: 58,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452578/IMG-20251005-WA0101_rjnfwz.jpg",
      description: "Space-saving sofa design.",
      itemCode: "AFI058",
    },
    {
      id: 60,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0094_kb1u3p.jpg",
      description: "Comfortable lounge sofa for relaxation.",
      itemCode: "AFI060",
    },
    {
      id: 61,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0097_uemedw.jpg",
      description: "High-performance contemporary sofa.",
      itemCode: "AFI061",
    },
    {
      id: 62,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452573/IMG-20251005-WA0096_zbsgdp.jpg",
      description: "Ergonomic comfort sofa design.",
      itemCode: "AFI062",
    },
    {
      id: 63,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0093_vtsezb.jpg",
      description: "Breathable modern sofa design.",
      itemCode: "AFI063",
    },
    {
      id: 64,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0090_hxvu2i.jpg",
      description: "Solid wood frame sofa.",
      itemCode: "AFI064",
    },
    {
      id: 65,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452572/IMG-20251005-WA0092_l68itw.jpg",
      description: "Fully upholstered comfort sofa.",
      itemCode: "AFI065",
    },
    {
      id: 66,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0084_deubcr.jpg",
      description: "Professional living room sofa.",
      itemCode: "AFI066",
    },
    {
      id: 67,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0089_r02v4e.jpg",
      description: "Adjustable recliner sofa.",
      itemCode: "AFI067",
    },
    {
      id: 68,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0085_pkabfy.jpg",
      description: "Colorful sofa designed for families.",
      itemCode: "AFI068",
    },
    {
      id: 69,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0088_acpry7.jpg",
      description: "Professional conference room sofa.",
      itemCode: "AFI069",
    },
    {
      id: 70,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0087_gernz0.jpg",
      description: "Decorative designer sofa.",
      itemCode: "AFI070",
    },
    {
      id: 71,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0083_kllt1p.jpg",
      description: "360-degree premium sofa design.",
      itemCode: "AFI071",
    },
    {
      id: 72,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0077_pfk4rz.jpg",
      description: "High-back executive sofa.",
      itemCode: "AFI072",
    },
    {
      id: 73,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452571/IMG-20251005-WA0081_uz6tgz.jpg",
      description: "Low-back minimalist sofa.",
      itemCode: "AFI073",
    },
    {
      id: 74,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0066_qqqf7p.jpg",
      description: "Weather-resistant outdoor sofa.",
      itemCode: "AFI074",
    },
    {
      id: 75,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0050_ljxkl9.jpg",
      description: "Complete sectional sofa set.",
      itemCode: "AFI075",
    },
    {
      id: 76,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0063_edjovj.jpg",
      description: "Solid traditional sofa for 6-8 people.",
      itemCode: "AFI076",
    },
    {
      id: 77,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0076_l18tvy.jpg",
      description: "Versatile modular sofa design.",
      itemCode: "AFI077",
    },
    {
      id: 78,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452570/IMG-20251005-WA0054_c4ck2q.jpg",
      description: "Round curved sofa design.",
      itemCode: "AFI078",
    },
    {
      id: 79,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0062_r1enxu.jpg",
      description: "Modern L-shaped sofa design.",
      itemCode: "AFI079",
    },
    {
      id: 80,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452569/IMG-20251005-WA0067_ze3msm.jpg",
      description: "Luxurious premium sofa set.",
      itemCode: "AFI080",
    },
  ];

  const chairsProducts = [
    {
      id: 14,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0025_qweynn.jpg",
      description: "Romantic elegant chair with draping design.",
      itemCode: "AFI014",
    },
    {
      id: 15,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0022_pur5xb.jpg",
      description: "Compact single chair for smaller spaces.",
      itemCode: "AFI015",
    },
    {
      id: 16,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0021_cyw8xs.jpg",
      description: "Durable metal frame with modern styling.",
      itemCode: "AFI016",
    },
    {
      id: 17,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0019_zl5xqw.jpg",
      description: "Space-saving stackable chair design.",
      itemCode: "AFI017",
    },
    {
      id: 18,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452650/IMG-20251005-WA0020_fam1ij.jpg",
      description: "Versatile chair with flexible design.",
      itemCode: "AFI018",
    },
    {
      id: 19,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0018_r5a61c.jpg",
      description: "Chair with hydraulic storage features.",
      itemCode: "AFI019",
    },
    {
      id: 20,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0017_hidmif.jpg",
      description:
        "Classic cushioned chair with upholstered finish.",
      itemCode: "AFI020",
    },
    {
      id: 21,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452643/IMG-20251005-WA0016_qw6wpm.jpg",
      description: "Unique designer chair with artistic details.",
      itemCode: "AFI021",
    },
    {
      id: 22,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0015_hli2ik.jpg",
      description:
        "Elegant velvet chair with deep seating and premium comfort.",
      itemCode: "AFI022",
    },
    {
      id: 23,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0014_mqizc6.jpg",
      description:
        "Spacious armchair with contemporary design.",
      itemCode: "AFI023",
    },
    {
      id: 25,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0010_yatxvc.jpg",
      description: "Clean lines and minimalist aesthetic.",
      itemCode: "AFI025",
    },
    {
      id: 32,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452632/IMG-20251005-WA0043_zszv8j.jpg",
      description: "Contemporary design with sleek lines.",
      itemCode: "AFI032",
    },
    {
      id: 34,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452631/IMG-20251005-WA0041_a9hynl.jpg",
      description: "Convertible chair for guests.",
      itemCode: "AFI034",
    },
    {
      id: 35,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452627/IMG-20251005-WA0040_bpqjyy.jpg",
      description: "Button tufted design adds elegance.",
      itemCode: "AFI035",
    },
    {
      id: 46,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0025_qhfkea.jpg",
      description: "Chair with built-in storage compartments.",
      itemCode: "AFI046",
    },
    {
      id: 47,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452614/IMG-20251005-WA0022_gtvndg.jpg",
      description: "Nordic-inspired minimalist chair.",
      itemCode: "AFI047",
    },
    {
      id: 48,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0020_lowbp6.jpg",
      description: "Chair with integrated side table.",
      itemCode: "AFI048",
    },
    {
      id: 49,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0019_ohjvkb.jpg",
      description: "Ultra-plush deep cushion chair.",
      itemCode: "AFI049",
    },
    {
      id: 50,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0017_fa4wlg.jpg",
      description: "Reversible accent chair design.",
      itemCode: "AFI050",
    },
    {
      id: 51,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0018_uy4abu.jpg",
      description: "Classic armchair design.",
      itemCode: "AFI051",
    },
    {
      id: 52,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452613/IMG-20251005-WA0014_qsstce.jpg",
      description:
        "Traditional comfort chair with loose cushions.",
      itemCode: "AFI052",
    },
    {
      id: 53,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452612/IMG-20251005-WA0015_utsyer.jpg",
      description:
        "Elegant dining chairs with ergonomic design.",
      itemCode: "AFI053",
    },
  ];

  const diningTablesProducts = [
    {
      id: 24,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0011_cgupte.jpg",
      description:
        "Timeless design with button tufting and rolled arms.",
      itemCode: "AFI024",
    },
    {
      id: 26,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0013_kkho8o.jpg",
      description:
        "Comfortable dining table perfect for family meals.",
      itemCode: "AFI026",
    },
    {
      id: 27,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452642/IMG-20251005-WA0009_wcrd3t.jpg",
      description: "Stylish wooden table with elegant finish.",
      itemCode: "AFI027",
    },
    {
      id: 28,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452637/IMG-20251005-WA0008_pnoyjb.jpg",
      description:
        "Premium dining set with superior comfort.",
      itemCode: "AFI028",
    },
    {
      id: 30,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452636/IMG-20251005-WA0005_zdzdbb.jpg",
      description:
        "Modular dining table with customizable arrangement.",
      itemCode: "AFI030",
    },
    {
      id: 31,
      image:
        "https://res.cloudinary.com/do2naxaz5/image/upload/v1760452635/IMG-20251005-WA0004_chker5.jpg",
      description: "Retro-inspired design with modern comfort.",
      itemCode: "AFI031",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Beds Section */}
      <ProductSection
        id="beds"
        title="Beds Collection"
        subtitle="Rest in style with our premium bed collection"
        products={bedsProducts}
      />

      {/* Sofas Section */}
      <ProductSection
        id="sofas"
        title="Sofas Collection"
        subtitle="Transform your living space with our luxurious sofas"
        products={sofasProducts}
      />

      {/* Chairs Section */}
      <ProductSection
        id="chairs"
        title="Chairs Collection"
        subtitle="Comfort meets elegance in every chair"
        products={chairsProducts}
      />

      {/* Dining Tables Section */}
      <ProductSection
        id="dining-tables"
        title="Dining Tables"
        subtitle="Gather around our beautiful dining tables"
        products={diningTablesProducts}
      />

      <ContactSection />
      <Footer />
    </div>
  );
}
