import { motion } from "motion/react";
import { ShoppingCart, Heart, Eye, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface Product {
  id: number;
  image: string;
  description: string;
  itemCode: string;
}

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
}

export function ProductSection({
  id,
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  const [hoveredProduct, setHoveredProduct] = useState<
    number | null
  >(null);
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    description: string;
    itemCode: string;
  } | null>(null);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openImageDialog = (
    image: string,
    description: string,
    itemCode: string,
  ) => {
    setSelectedImage({ image, description, itemCode });
  };

  return (
    <section id={id} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div
                  className="relative overflow-hidden aspect-[4/3] cursor-zoom-in"
                  onClick={() =>
                    openImageDialog(
                      product.image,
                      product.description,
                      product.itemCode,
                    )
                  }
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity:
                        hoveredProduct === product.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      onClick={scrollToContact}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </motion.div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    New
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3 flex-1">
                    <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
                      {product.description}
                    </p>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md shrink-0 h-fit">
                      {product.itemCode}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-auto"
                    onClick={scrollToContact}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
          >
            Contact for More Products
          </Button>
        </motion.div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage
              ? `${selectedImage.description} - ${selectedImage.itemCode}`
              : "Product Image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedImage
              ? `Large preview of ${selectedImage.description}`
              : "Product image preview"}
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50 bg-background/80 backdrop-blur-sm p-2">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedImage && (
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              <div className="relative w-full h-full flex items-center justify-center">
                <ImageWithFallback
                  src={selectedImage.image}
                  alt={selectedImage.description}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {selectedImage.description}
                </p>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  {selectedImage.itemCode}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}