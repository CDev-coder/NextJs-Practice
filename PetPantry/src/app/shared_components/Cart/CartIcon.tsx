"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

interface CartIconProps {
  size?: number;
}

export default function CartIcon({ size = 64 }: CartIconProps) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Badge animation
  const badgeControls = useAnimation();
  useEffect(() => {
    if (totalItems > 0) {
      badgeControls.start({
        scale: [1, 1.5, 1],
        transition: { duration: 0.4 },
      });
    }
  }, [totalItems, badgeControls]);
  // Select base icon variant based on totalItems
  const baseIcon = useMemo(() => {
    if (totalItems === 0) return "/icons/cart_0_compressed.png";
    if (totalItems < 3) return "/icons/cart_1_compressed.png";
    if (totalItems < 6) return "/icons/cart_3_compressed.png";
    return "/icons/cart_5_compressed.png";
  }, [totalItems]);

  return (
    <div className="relative w-[50px] h-[50px]">
      {/* Base cart icon changes based on total items */}
      <Image src={baseIcon} alt="Cart Icon" width={size} height={size} />

      {/* Animated badge */}
      {totalItems > 0 && (
        <motion.span
          animate={badgeControls}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
        >
          {totalItems}
        </motion.span>
      )}
    </div>
  );
}
