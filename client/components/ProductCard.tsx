import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image });
    }
  };

  return (
    <div className="w-full max-w-[260px] bg-artra-light-blue rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="relative h-[220px] p-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1">
          <button className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" fill="transparent" />
            </svg>
          </button>
          <button
            onClick={handleToggleWishlist}
            className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist ? "text-red-500 fill-red-500" : "text-gray-300"
              }`}
            />
          </button>
          <button className="w-8 h-8 rounded-full bg-artra-navy flex items-center justify-center hover:bg-artra-blue transition-colors">
            <Share2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/producto/${id}`}>
          <h3 className="text-artra-navy text-base font-bold mb-2">{name}</h3>
        </Link>
        <p className="text-artra-navy text-base mb-4">${price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full h-10 bg-artra-blue hover:bg-artra-dark-navy transition-colors rounded-2xl flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          <span className="text-white text-base font-semibold">
            Añadir al carrito
          </span>
        </button>
      </div>
    </div>
  );
}
