export const buildURLParams = (
	params: Record<string, string | number | boolean | undefined | null>,
): string => {
	let paramsArray: string[] = [];
	for (const property in params) {
		const value = params[property];
		if (typeof value === "undefined" || value === null) {
			continue;
		}

		paramsArray = [...paramsArray, `${property}=${value}`];
	}

	return paramsArray.join("&");
};
