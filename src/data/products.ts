/**
 * Catálogo real de productos (fotos propias). Precios y descripciones son
 * de ejemplo — reemplazar por los datos reales de cada producto.
 */
export type CatalogProduct = {
  id: number;
  name: string;
  img: string;
  description: string;
  tags: string[];
  price: number;
  sabores: string[];
};

export const productos: CatalogProduct[] = [
  {
    id: 1,
    name: "Bizcochuelo",
    img: "/img/bizcochuelo-1.jpg",
    description:
      "Bizcochuelo casero, esponjoso y parejo, horneado en el momento. Ideal para acompañar el mate o el café.",
    tags: ["Bizcochuelo", "Esponjoso", "Casero"],
    price: 900,
    sabores: ["Bizcochuelo clásico"],
  },
  {
    id: 2,
    name: "Bizcochuelo de Chocolate",
    img: "/img/bizcochuelo-chocolate-1.jpg",
    description:
      "La versión de chocolate del bizcochuelo clásico: húmedo, esponjoso y con sabor intenso a cacao.",
    tags: ["Bizcochuelo", "Chocolate", "Húmedo", "Casero"],
    price: 950,
    sabores: ["Chocolate clásico"],
  },
  {
    id: 3,
    name: "Budín de Pan",
    img: "/img/budin-de-pan-1.jpg",
    description:
      "Budín de pan casero con un toque de caramelo, cremoso por dentro y dorado por fuera.",
    tags: ["Budín", "Caramelo", "Casero"],
    price: 850,
    sabores: ["Budín clásico"],
  },
  {
    id: 4,
    name: "Tarta de Manzana",
    img: "/img/tarta-de-manzana.jpg",
    description:
      "Tarta de manzana con manzanas frescas, un toque de mermelada y masa casera crocante.",
    tags: ["Tarta", "Manzana", "Casero"],
    price: 1000,
    sabores: ["Tarta de manzana clásica"],
  },
  {
    id: 5,
    name: "Torta Matilda",
    img: "/img/torta-matilda.jpg",
    description:
      "Nuestra torta de chocolate bien húmeda, cubierta con ganache — la favorita de quienes piden \"la torta grande de chocolate\".",
    tags: ["Torta", "Chocolate", "Ganache", "Casero"],
    price: 1300,
    sabores: ["Chocolate clásico"],
  },
];

export const catalogTags = [
  "Bizcochuelo",
  "Chocolate",
  "Esponjoso",
  "Casero",
  "Húmedo",
  "Budín",
  "Caramelo",
  "Tarta",
  "Manzana",
  "Torta",
  "Ganache",
];
