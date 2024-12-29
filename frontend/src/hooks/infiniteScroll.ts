// useInfiniteScroll.ts

import { useEffect, useRef } from "react";

/**
 * A custom hook that sets up an IntersectionObserver on a sentinel element
 * to automatically trigger a callback (usually fetchNextPage) when in view.
 *
 * @param hasNextPage - Boolean indicating if there's more data to fetch.
 * @param isFetchingNextPage - Boolean indicating if we're already fetching.
 * @param fetchNextPage - Callback to fetch the next page of data.
 */
export function useInfiniteScroll(hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: ()=> void) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!sentinelRef.current) return;

		const observer = new IntersectionObserver((entries) => {
			// If the sentinel is in view, fetch next page if available
			if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		});

		observer.observe(sentinelRef.current);

		return () => {
			if (sentinelRef.current) {
				observer.unobserve(sentinelRef.current);
			}
		};
	}, [sentinelRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return {
		sentinelRef,
	};
}
