import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  // Local handicraft product data
  const productData = [
    {
      id: 1,
      title: "Hand-painted Ceramic Vase",
      price: 45.99,
      description: "Beautifully hand-painted ceramic vase with traditional floral patterns. Each piece is unique and handcrafted by local artisans.",
      category: "pottery",
      image: "/images/products/ceramic-vase.jpg",
      rating: { rate: 4.8, count: 126 }
    },
    {
      id: 2,
      title: "Macramé Wall Hanging",
      price: 32.50,
      description: "Intricately knotted macramé wall hanging made from 100% cotton rope. Perfect addition to any bohemian or contemporary home décor.",
      category: "textile",
      image: "/images/products/macrame-wall-hanging.jpg",
      rating: { rate: 4.6, count: 89 }
    },
    {
      id: 3,
      title: "Wooden Carved Box",
      price: 58.75,
      description: "Hand-carved wooden jewelry box with intricate floral motifs. Made from sustainable hardwood with velvet-lined interior.",
      category: "woodwork",
      image: "/images/products/wooden-carved-box.jpg",
      rating: { rate: 4.9, count: 112 }
    },
    {
      id: 4,
      title: "Handwoven Basket",
      price: 39.99,
      description: "Traditional handwoven basket crafted from natural reed and grass. Perfect for storage or as a decorative accent piece.",
      category: "basketry",
      image: "/images/products/handwoven-basket.jpg",
      rating: { rate: 4.5, count: 95 }
    },
    {
      id: 5,
      title: "Embroidered Table Runner",
      price: 29.99,
      description: "Handmade table runner with intricate embroidery depicting traditional motifs. Made from 100% cotton fabric.",
      category: "textile",
      image: "/images/products/embroidered-runner.jpg",
      rating: { rate: 4.7, count: 78 }
    },
    {
      id: 6,
      title: "Copper Wire Tree Sculpture",
      price: 49.50,
      description: "Hand-twisted copper wire tree sculpture with semi-precious stone accents. Each piece is uniquely crafted by skilled artisans.",
      category: "metalwork",
      image: "/images/products/wire-tree.jpg",
      rating: { rate: 4.8, count: 63 }
    },
    {
      id: 7,
      title: "Hand-painted Silk Scarf",
      price: 45.00,
      description: "Luxurious silk scarf hand-painted with natural dyes. Features beautiful peacock design inspired by traditional motifs.",
      category: "textile",
      image: "/images/products/silk-scarf.jpeg",
      rating: { rate: 4.9, count: 104 }
    },
    {
      id: 8,
      title: "Terracotta Wind Chimes",
      price: 27.99,
      description: "Handcrafted terracotta wind chimes with melodious sound. Each piece is hand-painted and kiln-fired by traditional artisans.",
      category: "pottery",
      image: "/images/products/terracotta-chimes.jpg",
      rating: { rate: 4.4, count: 87 }
    },
    {
      id: 9,
      title: "Patchwork Quilted Cushion",
      price: 35.50,
      description: "Handmade quilted cushion cover with traditional patchwork design. Made from recycled cotton fabrics in vibrant colors.",
      category: "textile",
      image: "/images/products/patchwork-cushion.jpg",
      rating: { rate: 4.6, count: 92 }
    },
    {
      id: 10,
      title: "Brass Incense Holder",
      price: 24.99,
      description: "Hand-cast brass incense holder with intricate filigree work. Traditional design created using lost-wax casting technique.",
      category: "metalwork",
      image: "/images/products/brass-incense.jpg",
      rating: { rate: 4.7, count: 68 }
    },
    {
      id: 11,
      title: "Hand-carved Wooden Mask",
      price: 79.99,
      description: "Decorative wooden mask hand-carved from sustainable hardwood. Inspired by traditional cultural designs with detailed features.",
      category: "woodwork",
      image: "/images/products/wooden-mask.jpg",
      rating: { rate: 4.8, count: 73 }
    },
    {
      id: 12,
      title: "Hand-blocked Print Tablecloth",
      price: 42.50,
      description: "Cotton tablecloth with traditional hand-blocked prints using natural dyes. Each piece is individually stamped by skilled artisans.",
      category: "textile",
      image: "/images/products/print-tablecloth.jpeg",
      rating: { rate: 4.5, count: 85 }
    },
    {
      id: 13,
      title: "Rattan Hanging Chair",
      price: 129.99,
      description: "Handwoven rattan hanging chair made by traditional craftspeople. Perfect for indoor or covered outdoor spaces.",
      category: "basketry",
      image: "/images/products/rattan-chair.webp",
      rating: { rate: 4.9, count: 56 }
    },
    {
      id: 14,
      title: "Ceramic Oil Diffuser",
      price: 38.75,
      description: "Hand-thrown ceramic essential oil diffuser with hand-glazed finish. Each piece is unique with slight variations in color and pattern.",
      category: "pottery",
      image: "/images/products/ceramic-diffuser.jpg",
      rating: { rate: 4.7, count: 94 }
    },
    {
      id: 15,
      title: "Beaded Wall Tapestry",
      price: 89.50,
      description: "Intricate wall hanging with hand-sewn glass beads forming traditional patterns. Each piece takes weeks to complete by skilled artisans.",
      category: "textile",
      image: "/images/products/beaded-tapestry.jpeg",
      rating: { rate: 4.9, count: 47 }
    },
    {
      id: 16,
      title: "Coconut Shell Candle Holders",
      price: 22.99,
      description: "Set of three candle holders made from reclaimed coconut shells. Each piece is hand-polished and decorated with natural materials.",
      category: "eco-crafts",
      image: "/images/products/coconut-holders.webp",
      rating: { rate: 4.4, count: 118 }
    },
    {
      id: 17,
      title: "Hand-forged Copper Bells",
      price: 31.50,
      description: "Set of three decorative bells hand-forged from copper. Each bell produces a unique tone and features hand-hammered texture.",
      category: "metalwork",
      image: "/images/products/copper-bells.webp",
      rating: { rate: 4.6, count: 82 }
    },
    {
      id: 18,
      title: "Leather Tooled Journal",
      price: 49.99,
      description: "Handmade leather journal with traditional tooled designs. Features handmade paper pages and secure leather wrap closure.",
      category: "leatherwork",
      image: "/images/products/leather-journal.webp",
      rating: { rate: 4.8, count: 103 }
    },
    {
      id: 19,
      title: "Handwoven Wool Rug",
      price: 159.99,
      description: "Traditional handwoven wool rug with natural dye colors. Each piece is created on a traditional loom by master weavers.",
      category: "textile",
      image: "/images/products/wool-rug.jpeg",
      rating: { rate: 4.9, count: 38 }
    },
    {
      id: 20,
      title: "Bamboo Wind Chime",
      price: 34.50,
      description: "Melodious wind chime handcrafted from sustainable bamboo. Each piece is hand-tuned to create harmonious sounds in the breeze.",
      category: "eco-crafts",
      image: "/images/products/bamboo-chime.webp",
      rating: { rate: 4.5, count: 76 }
    }
  ];

  const [data] = useState(productData);
  const [filter, setFilter] = useState(productData);
  const [loading] = useState(false); // Keep for compatibility
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (category) => {
    if (category === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((product) => product.category === category);
      setFilter(updatedList);
    }
  };

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("all")}>
          All
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("pottery")}>
          Pottery
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("textile")}>
          Textiles
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("woodwork")}>
          Woodwork
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("basketry")}>
          Basketry
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("metalwork")}>
          Metalwork
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("eco-crafts")}>
          Eco-Crafts
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("leatherwork")}>
          Leatherwork
        </button>
      </div>

      {filter.map((product) => (
        <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <div className="card text-center h-100">
            <img className="card-img-top p-3" src={product.image} alt={product.title} height={300} />
            <div className="card-body">
              <h5 className="card-title">{product.title.substring(0, 15)}...</h5>
              <p className="card-text">{product.description.substring(0, 90)}...</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">Rs. {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Handcrafted Treasures</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
};

export default Products;
