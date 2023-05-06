export const replaceNewlines = (str: string, replaceValue: string): string => {
	return str.replace(/(?:\r\n|\r|\n)/gm, replaceValue);
};
