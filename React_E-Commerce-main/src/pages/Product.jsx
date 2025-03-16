import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // Use the same product data that's in Products.jsx
  // This is a temporary solution until you implement proper data management
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

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = () => {
      setLoading(true);
      setLoading2(true);

      // Find the product by ID from our local data
      const productId = parseInt(id); // Convert string ID to number
      const selectedProduct = productData.find(p => p.id === productId);

      if (selectedProduct) {
        setProduct(selectedProduct);

        // Find similar products from the same category
        const similar = productData.filter(p =>
          p.category === selectedProduct.category && p.id !== productId
        );
        setSimilarProducts(similar);
      }

      setLoading(false);
      setLoading2(false);
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6 my-4">Rs. {product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;