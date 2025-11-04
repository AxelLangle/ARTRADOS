// Reusable Tailwind className constants for Header-related components
// Review and approve before applying in Header.tsx

/**
 * Used by the main nav links: Inicio, Tienda, ¿Quién es ARTRA?
 */
export const NAV_LINK = "text-white text-base font-semibold hover:text-artra-lighter-blue transition-colors" as const;

/**
 * Used by the Favorites and Cart icon buttons (white rounded buttons).
 */
export const ICON_BUTTON = "p-2 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors relative" as const;

/**
 * Red circular badge shown on the top-right of Favorites/Cart buttons.
 */
export const BADGE_COUNT = "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" as const;

/**
 * Icon color/size for Heart and ShoppingCart inside the white buttons.
 */
export const ICON_NAVY_24 = "w-6 h-6 text-artra-navy" as const;

/**
 * Small inline row with tight gap and no top margin.
 * Used by: rows under the ARTRA title ("Arte . Tradición" and "Hecho en México").
 */
export const INLINE_ROW_TIGHT = "flex items-center gap-1 mt-0" as const;

/**
 * Small white label text used within the ARTRA title block ("Arte", "Tradición").
 */
export const SMALL_WHITE_LABEL = "text-white text-[12px] font-semibold" as const;

// Optional: grouped export for convenience
export const HeaderClasses = {
  NAV_LINK,
  ICON_BUTTON,
  BADGE_COUNT,
  ICON_NAVY_24,
  INLINE_ROW_TIGHT,
  SMALL_WHITE_LABEL,
} as const;
