// dev.to (Forem Crayons) spacing / radius tokens adapted for mobile.
// su-* scale: 2/4/8/12/16/20/24/32/48. Radius: 4 cards/buttons/tags, 12 large.
export const SPACING = {
	su05: 2,
	su1: 4,
	su2: 8,
	su3: 12,
	su4: 16,
	su5: 20,
	su6: 24,
	su7: 32,
	su8: 48,
	listPadding: 8,
	cardPadding: 16,
	cardPaddingBottom: 12,
	separator: 8,
} as const;

export const RADIUS = {
	small: 4,
	large: 12,
	round: 1000,
} as const;

export const HEADER_HEIGHT = 56;
export const AVATAR_SIZE = 32;
