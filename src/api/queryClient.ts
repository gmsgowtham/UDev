import NetInfo from "@react-native-community/netinfo";
import { QueryClient, onlineManager } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			gcTime: 10 * 60 * 1000,
			retry: 2,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
		},
	},
});

export function setupQueryOnlineManager(): void {
	onlineManager.setEventListener((setOnline) => {
		const subscription = NetInfo.addEventListener((state) => {
			setOnline(!!state.isConnected);
		});
		return subscription;
	});
}
