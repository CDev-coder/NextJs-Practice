// Helper function to convert subcategory name to product data format
export const normalizeSubcategory = (subcategory: string): string => {
  ///////The Map should be used when namings get too complexed and to keep it centeralize, we can map it.
  const mappings: Record<string, string> = {
    "treat mixes 2": "mix",
    "nutritional supplements 2": "supplements",
    "scratching posts 2": "scratching posts",
    "nesting boxes 2": "nesting",
    "play gyms 2": "toys",
    "seed balls 2": "hanging",
    "millet sprays 2": "sprays",
    "freeze-dried 2": "freeze-dried",
  };

  // Convert to lowercase and replace spaces with hyphens
  const normalized = subcategory.toLowerCase();
  // Try to match slugified version back to keys if keys use spaces (e.g. treat-mixes-2 -> treat mixes 2)
  const deslugged = normalized.replace(/-/g, " ");

  // Return mapped value if exists, otherwise return subcategory
  return mappings[normalized] || mappings[deslugged] || subcategory;
};
