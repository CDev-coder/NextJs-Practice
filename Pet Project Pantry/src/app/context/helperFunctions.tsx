export const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

export const deslugify = (slug: string): string => {
  const mappings: Record<string, string> = {
    "grain-free": "grain-free",
    "freeze-dried": "freeze-dried",
  };

  return mappings[slug] || slug.replace(/-/g, " ");
};

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
    "catnip 2": "catnip",
    "crunchy 2": "crunchy",
    "soft 2": "soft",
    "dental 2": "dental",
    "chews 2": "chews",
    "biscuits 2": "biscuits",
    "catnip 3": "catnip",
    "soft 3": "soft",
    "dental 3": "dental",
    "chews 3": "chews",
    "biscuits 3": "biscuits",
    "catnip 4": "catnip",
    "soft 4": "soft",
    "freeze-dried 2": "freeze-dried",
  };

  // Convert to lowercase and replace spaces with hyphens
  const normalized = subcategory.toLowerCase();
  // Try to match slugified version back to keys if keys use spaces (e.g. treat-mixes-2 -> treat mixes 2)
  const deslugged = deslugify(normalized);

  // Return mapped value if exists, otherwise return subcategory
  return mappings[normalized] || mappings[deslugged] || subcategory;
};
