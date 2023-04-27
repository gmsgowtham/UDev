// TODO: explanation
export const perfArrayConcat = <T>(value0: T[], value1: T[]): T[] => {
	const result: T[] = [];
	for (let i = 0; i < value0.length; i++) {
		result.push(value0[i]);
	}
	for (let i = 0; i < value1.length; i++) {
		result.push(value1[i]);
	}
	return result;
};
