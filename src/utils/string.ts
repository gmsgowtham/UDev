export const replaceNewlines = (str: string, replaceValue: string): string => {
	if (str.length < 1) {
		return str;
	}

	return str.replace(/(?:\r\n|\r|\n)/gm, replaceValue);
};
