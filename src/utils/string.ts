export const replaceNewlines = (str: string, replaceValue: string): string => {
	if (str.length < 1) {
		return str;
	}

	return str.replace(/(?:\r\n|\r|\n)/gm, replaceValue);
};

export const toTitleCase = (str?: string) => {
	if (!str || str.length < 1) {
		return str;
	}
	return `${str[0].toUpperCase()}${str.substring(1)}`;
};
