"use client";
import type { Product } from "@/types/cart";
import { catalogTags as tags, productos } from "@/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuantityButton } from "../QuantityButton";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import styles from "./Catalog.module.css";

type CatalogProps = {
  addToCart: (producto: Product, cantidad: number, sabor?: string) => void;
};

const Catalog = ({ addToCart }: CatalogProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [newProductos, setNewProductos] = useState(productos);
  const [producto, setProduct] = useState({
    id: productos[0].id,
    name: newProductos[0].name,
    img: newProductos[0].img,
    description: newProductos[0].description,
    tags: newProductos[0].tags,
    price: newProductos[0].price,
    sabores: newProductos[0].sabores,
  });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    productos[0].sabores[0],
  );

  useEffect(() => {
    setNewProductos(
      // Aca se supone que si cambiar una etiqueta debería cambiar el producto seleccionado y buscarlo en la "Api" si existiera una para traer la información del producto.
      productos.filter((producto) => {
        if (selectedTags.length === 0) {
          return true;
        }
        return selectedTags.every((tag) => producto.tags.includes(tag));
      }),
    );
  }, [selectedTags]);

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div id="catalogo" className={styles.section}>
      <Reveal>
        <SectionHeading kicker="Catálogo" title="Elegí tu torta favorita" />
      </Reveal>
      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          {/* Sección de Filtro */}
          <div className={styles.filterHeader}>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn} onClick={toggleMenu}>
                <SlidersHorizontal size={18} strokeWidth={2} />
                Filtros
              </button>
              {menuOpen && (
                <div className={styles.dropdownContent}>
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className={styles.tagItem}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Sección de Buscador */}
          <div className={styles.searchContainer}>
            <Search size={18} strokeWidth={2} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Etiquetas Seleccionadas (abajo) */}
        <div className={styles.selectedTagsContainer}>
          {selectedTags.map((tag) => (
            <div key={tag} className={styles.tagItem}>
              {tag}
              <button
                type="button"
                className={styles.tagRemove}
                onClick={() => removeTag(tag)}
                aria-label={`Quitar filtro ${tag}`}
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.catalog}>
          {/* Catálogo de Productos */}
          <div className={styles.productsGrid}>
            {newProductos.map((producto, index) => (
              <Reveal
                key={producto.id}
                delay={Math.min(index, 6) * 0.05}
                className={styles.productCard}
              >
                <button
                  type="button"
                  className={styles.productImageButton}
                  onClick={() => {
                    setProduct(producto);
                    setSelectedQuantity(1);
                    setSelectedFlavor(producto.sabores[0]);
                  }}
                >
                  <Image
                    src={producto.img}
                    alt={producto.name}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 900px) 33vw, 16vw"
                    style={{ objectFit: "cover" }}
                  />
                </button>
                <div>
                  <h3>{producto.name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className={styles.selectedProduct}>
            <div className={styles.selectedProductImage}>
              <Image
                src={producto.img}
                alt="Imagen de producto seleccionado"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.productHeader}>
                <h3>{producto.name}</h3>
                <p className={styles.valor}>$ {producto.price}</p>
              </div>
              <p>{producto.description}</p>
              {producto.sabores.length > 1 && (
                <div className={styles.flavors}>
                  <span className={styles.flavorsLabel}>Sabor</span>
                  <div className={styles.flavorOptions}>
                    {producto.sabores.map((sabor) => (
                      <button
                        key={sabor}
                        type="button"
                        className={`${styles.flavorChip} ${selectedFlavor === sabor ? styles.flavorChipActive : ""}`}
                        onClick={() => setSelectedFlavor(sabor)}
                      >
                        {sabor}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.purchaseActions}>
                <QuantityButton onQuantityChange={setSelectedQuantity} />
                <button
                  className={styles.boton}
                  onClick={() =>
                    addToCart(
                      {
                        id: producto.id,
                        name: producto.name,
                        description: producto.description,
                        price: String(producto.price),
                        image: producto.img,
                      },
                      selectedQuantity,
                      selectedFlavor,
                    )
                  }
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
