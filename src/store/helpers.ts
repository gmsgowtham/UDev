export interface CommonState {
	loading: false;
	error: false;
	refreshing: false;
}

export const setFetchingState = <T extends CommonState>(state: T): T => {
	return {
		...state,
		loading: true,
		error: false,
		refreshing: false,
	};
};

export const setErrorState = <T extends CommonState>(state: T): T => {
	return {
		...state,
		loading: false,
		error: true,
		refreshing: false,
	};
};

export const setRefreshingState = <T extends CommonState>(state: T): T => {
	return {
		...state,
		loading: false,
		error: false,
		refreshing: true,
	};
};
