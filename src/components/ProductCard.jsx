import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../redux/action";

const ProductCard = ({ product, imageUrl, imageLoading = "lazy" }) => {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const variantOptions = [
    { value: "default", label: "Default" },
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const computeNumericId = (id) => {
    if (typeof id === "number" && Number.isFinite(id)) return id;
    const parsed = Number(id);
    if (!Number.isNaN(parsed)) return parsed;
    if (typeof id === "string") {
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
      }
      return hash;
    }
    return null;
  };

  const numericId = computeNumericId(product?.id);

  // For demo purposes, let's make some products unavailable
  const derivedAvailable = numericId != null ? numericId % 7 !== 0 : true;
  const isAvailable = Object.prototype.hasOwnProperty.call(product, "available")
    ? product.available !== false
    : derivedAvailable;

  // For demo purposes, let's make some products discounted
  const basePrice = Number(product.price);
  let derivedOriginalPrice = null;
  if (numericId != null && numericId % 5 === 0 && !Number.isNaN(basePrice)) {
    derivedOriginalPrice = Number((basePrice * 1.3).toFixed(2));
  }

  let displayOriginalPrice = (product.originalPrice && Number(product.originalPrice) > basePrice)
    ? Number(product.originalPrice)
    : derivedOriginalPrice;
  if (displayOriginalPrice != null && !Number.isNaN(Number(displayOriginalPrice))) {
    displayOriginalPrice = Number(displayOriginalPrice).toFixed(2);
  }

  const handleAddToCart = async () => {
    if (!isAvailable) return;
    
    setIsAddingToCart(true);
    
    try {
      const productWithVariant = {
        ...product,
        selectedVariant,
      };
      
      dispatch(addCart(productWithVariant));
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <Link to={`/product/${product.id}`} className="product-card__image-link">
          <img
            className="product-card__image"
            src={imageUrl || product.image || product.imageUrl}
            alt={product.title || product.name || "Product image"}
            loading={imageLoading}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (e.currentTarget.src !== "/assets/main.png.jpg") {
                e.currentTarget.src = "/assets/main.png.jpg";
              }
            }}
          />
        </Link>
        {!isAvailable && (
          <div className="product-card__out-of-stock">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-card__content">
        <Link to={`/product/${product.id}`} className="product-card__title-link">       
          <h3 className="product-card__title">
            {product.title.length > 50 
              ? `${product.title.substring(0, 50)}...` 
              : product.title
            }
          </h3>
        </Link>

        <div className="product-card__price">
          <span className="product-card__price-amount">
            ${product.price}
          </span>
          {displayOriginalPrice && (
            <span className="product-card__price-original">
              ${displayOriginalPrice}
            </span>
          )}
        </div>

        <div className="product-card__variant">
          <label htmlFor={`variant-${product.id}`} className="product-card__variant-label">
            Variant:
          </label>
          <select
            id={`variant-${product.id}`}
            className="product-card__variant-select"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            disabled={!isAvailable}
          >
            {variantOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="product-card__actions">
          {isAvailable ? (
            <button
              className="product-card__add-to-cart"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
          ) : (
            <button
              className="product-card__out-of-stock-btn"
              disabled
            >
              Out of Stock
            </button>
          )}
          
          <Link
            to={`/product/${product.id}`}
            className="product-card__view-details"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 