export type Category = "Remeras" | "Bermudas" | "Accesorios";
export type Drop = "DROP 2";

export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: Category;
  drop: Drop;
  description: string;
  sizes: string[];
  images: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "chomba-rayada",
    name: "Chomba Rayada",
    subtitle: "Chomba oversize de algodón peinado",
    price: 45000,
    category: "Remeras",
    drop: "DROP 2",
    description:
      "Chomba oversize de algodón peinado con rayas anchas en crudo y gris oscuro. Bordado 'kloths.' en el pecho. Cuello con botones. Fit relajado.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/chomba-rayada-frente.jpg",
      "/images/products/chomba-rayada-espalda.jpg",
    ],
  },
  {
    id: 2,
    slug: "bermuda-negra",
    name: "Bermuda Negra",
    subtitle: "Bermuda baggy de gabardina",
    price: 45000,
    category: "Bermudas",
    drop: "DROP 2",
    description:
      "Bermuda baggy de gabardina negra. Bordado 'kloths.' en la pierna y surfer line art en el bolsillo trasero. Fit amplio, costuras reforzadas.",
    sizes: ["38", "40", "42", "44"],
    images: [
      "/images/products/bermuda-negra-frente.jpg",
      "/images/products/bermuda-negra-espalda.jpg",
    ],
  },
  {
    id: 3,
    slug: "bermuda-jean-celeste",
    name: "Bermuda Jean Celeste",
    subtitle: "Bermuda baggy de denim lavado",
    price: 45000,
    category: "Bermudas",
    drop: "DROP 2",
    description:
      "Bermuda baggy de denim lavado celeste. Alto gramaje, caída pesada. Logo bordado en el bolsillo trasero. Fit amplio y auténtico.",
    sizes: ["38", "40", "42", "44"],
    images: [
      "/images/products/bermuda-jean-frente.jpg",
      "/images/products/bermuda-jean-espalda.jpg",
    ],
  },
  {
    id: 4,
    slug: "gorro-negro",
    name: "Gorro Negro",
    subtitle: "Sombrero australiano de gabardina",
    price: 25000,
    category: "Accesorios",
    drop: "DROP 2",
    description:
      "Sombrero australiano de gabardina negra con bordado 'kloths.' al frente. Ala ancha con ojales metálicos. Protección solar con onda.",
    sizes: ["Único"],
    images: ["/images/products/gorro-negro.png"],
  },
  {
    id: 5,
    slug: "gorro-verde",
    name: "Gorro Verde",
    subtitle: "Sombrero australiano verde oliva",
    price: 25000,
    category: "Accesorios",
    drop: "DROP 2",
    description:
      "Sombrero australiano de gabardina verde oliva con bordado 'kloths.' al frente. Ala ancha con ojales metálicos. El complemento perfecto para la playa.",
    sizes: ["Único"],
    images: ["/images/products/gorro-verde.png"],
  },
  {
    id: 6,
    slug: "remera-logo-ola",
    name: "Remera Logo Ola",
    subtitle: "Remera oversize con logo ola",
    price: 35000,
    category: "Remeras",
    drop: "DROP 2",
    description:
      "Remera oversize de algodón peinado blanca con logo ola klt. estampado en el pecho. 100% algodón, gramaje alto. Fit amplio que mantiene la forma.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/remera-ola-frente.png",
      "/images/products/remera-ola-espalda.png",
    ],
  },
  {
    id: 7,
    slug: "remera-klt",
    name: "Remera KLT.",
    subtitle: "Remera oversize con estampado KLT.",
    price: 35000,
    category: "Remeras",
    drop: "DROP 2",
    description:
      "Remera oversize blanca con estampado 'KLT.' en el pecho y surfer line art en la espalda. 100% algodón peinado. La esencia de kloths. en una remera.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/products/remera-klt-frente.png",
      "/images/products/remera-klt-espalda.png",
    ],
  },
];

export const drop2Products = products;

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
