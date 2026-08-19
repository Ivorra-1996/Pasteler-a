'use client';
import React, { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import { QuantityButton } from "../QuantityButton";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import type { Product } from "@/types/cart";

const productos = [
    {
        id: 1,
        name: "Torta de Chocolate",
        img: "/img/pexels-abhinavcoca-291528.jpg",
        description: "Capas de bizcocho de chocolate húmedo y esponjoso, rellenas con generoso dulce de leche cremoso. Cubierta con ganache de chocolate brillante y decorada con virutas de chocolate y un toque de nueces caramelizadas.",
        tags: ["Torta", "Chocolate", "Dulce", "Leche", "Ganache", "Virutas"],
        price: 1000,
    },
    {
        id: 2,
        name: "Torta de Nueces",
        img: "/img/pexels-valeriya-827516.jpg",
        description: "Torta de nueces con bizcocho húmedo y nueces caramelizadas",
        tags: ["Torta", "Nueces", "Caramelizadas", "Bizcocho", "Húmedo"],
        price: 1200,
    },
    {
        id: 3,
        name: "Cheesecake de Frutos del Bosque",
        img: "/img/pexels-eric-mufasa-578798-1414234.jpg",
        description: "Bizcocho cremoso con coulis de frutos del bosque y un toque brillante de gelatina.",
        tags: ["Torta", "Cremoso", "Brillante"],
        price: 1500,
    },
    {
        id: 4,
        name: "Torta Marmolada",
        img: "/img/pexels-abhinavcoca-291528.jpg",
        description: "Bizcocho marmolado de chocolate y vainilla, húmedo por dentro y con ganache brillante.",
        tags: ["Torta", "Chocolate", "Húmedo", "Brillante"],
        price: 1100,
    },
    {
        id: 5,
        name: "Torta de Dulce de Leche",
        img: "/img/pexels-valeriya-827516.jpg",
        description: "Capas esponjosas rellenas de dulce de leche casero, dulce y suave en cada bocado.",
        tags: ["Torta", "Dulce", "Leche", "Esponjoso"],
        price: 1300,
    },
    {
        id: 6,
        name: "Torta de Nueces Caramelizadas",
        img: "/img/pexels-eric-mufasa-578798-1414234.jpg",
        description: "Bizcocho húmedo cubierto con nueces caramelizadas y un baño de ganache brillante.",
        tags: ["Torta", "Nueces", "Caramelizadas", "Húmedo", "Brillante"],
        price: 1400,
    },
    {
        id: 7,
        name: "Especial de la Casa",
        img: "/img/pexels-abhinavcoca-291528.jpg",
        description: "Nuestra combinación preferida: bizcocho de chocolate, dulce de leche y virutas crocantes.",
        tags: ["Torta", "Chocolate", "Dulce", "Leche", "Virutas"],
        price: 1600,
    },
];

const tags = [
    "Torta",
    "Chocolate",
    "Dulce",
    "Leche",
    "Ganache",
    "Virutas",
    "Nueces",
    "Caramelizadas",
    "Bizcocho",
    "Húmedo",
    "Esponjoso",
    "Cremoso",
    "Brillante",
];

type CatalogProps = {
    addToCart: (producto: Product, cantidad: number) => void;
};

const Catalog = ({ addToCart }: CatalogProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [newProductos, setNewProductos] = useState(productos);
    const [producto, setProduct] = useState({
        id: productos[0].id, name: newProductos[0].name, img: newProductos[0].img, description: newProductos[0].description, tags: newProductos[0].tags, price: newProductos[0].price
    });
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        setNewProductos(
            // Aca se supone que si cambiar una etiqueta debería cambiar el producto seleccionado y buscarlo en la "Api" si existiera una para traer la información del producto.
            productos.filter((producto) => {
                if (selectedTags.length === 0) {
                    return true;
                }
                return selectedTags.every((tag) => producto.tags.includes(tag));
            })
        );
    }, [selectedTags]);
    

    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
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

                {/* Etiquetas Seleccionadas (abajo) */}
                <div className={styles.selectedTagsContainer}>
                    {selectedTags.map((tag) => (
                        <div key={tag} className={styles.tagItem}>
                            {tag}
                            <button type="button" className={styles.tagRemove} onClick={() => removeTag(tag)} aria-label={`Quitar filtro ${tag}`}>
                                <X size={10} strokeWidth={3} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.catalog}>
                    {/* Catálogo de Productos */}
                    <div className={styles.productsGrid}>
                        {newProductos.map((producto, index) => (
                            <Reveal key={producto.id} delay={Math.min(index, 6) * 0.05} className={styles.productCard}>
                                <button
                                    type="button"
                                    className={styles.productImageButton}
                                    onClick={() => { setProduct(producto); setSelectedQuantity(1); }}
                                >
                                    <img src={producto.img} alt={producto.name} />
                                </button>
                                <div>
                                    <h3>{producto.name}</h3>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <div className={styles.selectedProduct}>
                        <img src={producto.img} alt="Imagen de producto seleccionado" />
                        <div className={styles.info}>
                              <h3>{producto.name}</h3>
                              <p>{producto.description}</p>
                              <div className={styles.content}>
                                <p className={styles.valor}>$ {producto.price}</p>
                                <QuantityButton onQuantityChange={setSelectedQuantity} />
                                <button
                                    className={styles.boton}
                                    onClick={() => addToCart({
                                        id: producto.id,
                                        name: producto.name,
                                        description: producto.description,
                                        price: String(producto.price),
                                        image: producto.img,
                                    }, selectedQuantity)}
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
