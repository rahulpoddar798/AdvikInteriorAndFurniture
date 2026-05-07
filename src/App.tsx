import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductSection } from "./components/ProductSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";

export default function App() {
  // Product data reorganized based on actual product categories
  // 22 Beds + 30 Sofas + 22 Chairs + 6 Dining Tables = 80 items total

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Beds Section */}
      <ProductSection
        id="beds"
        title="Beds Collection"
        subtitle="Rest in style with our premium bed collection"
      />

      {/* Sofas Section */}
      <ProductSection
        id="sofas"
        title="Sofas Collection"
        subtitle="Transform your living space with our luxurious sofas"
      />

      {/* Chairs Section */}
      <ProductSection
        id="chairs"
        title="Chairs Collection"
        subtitle="Comfort meets elegance in every chair"
      />

      {/* Dining Tables Section */}
      <ProductSection
        id="dining-tables"
        title="Dining Tables"
        subtitle="Gather around our beautiful dining tables"
      />

      <ContactSection />
      <Footer />
      <Toaster />
    </div >
  );
}
