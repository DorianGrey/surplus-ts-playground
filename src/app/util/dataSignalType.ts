import { DataSignal } from "s-js";

export type WithDataSignals<T> = { [P in keyof T]: DataSignal<T[P]> };
