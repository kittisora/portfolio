"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns `false` during SSR and the first (hydrating) render, `true` afterwards.
 *
 * Use this instead of the `useState(false)` + `useEffect(() => setMounted(true))`
 * pattern: that pattern schedules a second render pass on every mount, which
 * React flags as a cascading render (`react-hooks/set-state-in-effect`).
 * `useSyncExternalStore` gives React the client/server split directly.
 */
export function useMounted(): boolean {
    return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
