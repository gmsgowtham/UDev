// Looping is more performant than spreading when value grows in size & memory
export const perfArrayConcat = <T>(value0: T[], value1: T[]): T[] => {
	if (value0.length < 1) {
		return value1.slice();
	}

	if (value1.length < 1) {
		return value0.slice();
	}

	const result: T[] = value0.slice();

	for (let i = 0; i < value1.length; i++) {
		result.push(value1[i]);
	}
	return result;
};
