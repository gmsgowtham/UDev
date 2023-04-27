export const buildURLParams = (
	params: Record<string, string | number | boolean | undefined | null>,
): string => {
	let paramsArray: string[] = [];
	for (const property in params) {
		if (!params[property]) {
			continue;
		}

		paramsArray = [...paramsArray, `${property}=${params[property]}`];
	}

	return paramsArray.join("&");
};
