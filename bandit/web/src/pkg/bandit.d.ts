/* tslint:disable */
/* eslint-disable */
/**
*/
export class AnnealingEpsilonGreedy {
  free(): void;
/**
* @param {number} n_arms
* @returns {AnnealingEpsilonGreedy}
*/
  static new(n_arms: number): AnnealingEpsilonGreedy;
/**
* @param {number} n_arms
*/
  call_reset(n_arms: number): void;
/**
* @returns {number}
*/
  call_select_arm(): number;
/**
* @param {number} chosen_arm
* @param {number} reward
*/
  call_update(chosen_arm: number, reward: number): void;
/**
*/
  epsilon: number;
}
/**
*/
export class AnnealingSoftmax {
  free(): void;
/**
* @param {number} n_arms
* @returns {AnnealingSoftmax}
*/
  static new(n_arms: number): AnnealingSoftmax;
/**
* @param {number} n_arms
*/
  call_reset(n_arms: number): void;
/**
* @returns {number}
*/
  call_select_arm(): number;
/**
* @param {number} chosen_arm
* @param {number} reward
*/
  call_update(chosen_arm: number, reward: number): void;
}
/**
*/
export class EpsilonGreedy {
  free(): void;
/**
* @param {number} epsilon
* @param {number} n_arms
* @returns {EpsilonGreedy}
*/
  static new(epsilon: number, n_arms: number): EpsilonGreedy;
/**
* @param {number} n_arms
*/
  call_reset(n_arms: number): void;
/**
* @returns {number}
*/
  call_select_arm(): number;
/**
* @param {number} chosen_arm
* @param {number} reward
*/
  call_update(chosen_arm: number, reward: number): void;
}
/**
*/
export class Random {
  free(): void;
/**
* @param {number} n_arms
* @returns {Random}
*/
  static new(n_arms: number): Random;
/**
* @returns {number}
*/
  call_select_arm(): number;
/**
* @param {number} n_arms
*/
  call_reset(n_arms: number): void;
/**
* @param {number} chosen_arm
* @param {number} reward
*/
  call_update(chosen_arm: number, reward: number): void;
}
/**
*/
export class Softmax {
  free(): void;
/**
* @param {number} n_arms
* @returns {Softmax}
*/
  static new(n_arms: number): Softmax;
/**
* @param {number} n_arms
*/
  call_reset(n_arms: number): void;
/**
* @returns {number}
*/
  call_select_arm(): number;
/**
* @param {number} chosen_arm
* @param {number} reward
*/
  call_update(chosen_arm: number, reward: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_annealingepsilongreedy_free: (a: number) => void;
  readonly __wbg_get_annealingepsilongreedy_epsilon: (a: number) => number;
  readonly __wbg_set_annealingepsilongreedy_epsilon: (a: number, b: number) => void;
  readonly annealingepsilongreedy_new: (a: number) => number;
  readonly annealingepsilongreedy_call_reset: (a: number, b: number) => void;
  readonly annealingepsilongreedy_call_select_arm: (a: number) => number;
  readonly annealingepsilongreedy_call_update: (a: number, b: number, c: number) => void;
  readonly __wbg_annealingsoftmax_free: (a: number) => void;
  readonly annealingsoftmax_new: (a: number) => number;
  readonly annealingsoftmax_call_reset: (a: number, b: number) => void;
  readonly annealingsoftmax_call_select_arm: (a: number) => number;
  readonly annealingsoftmax_call_update: (a: number, b: number, c: number) => void;
  readonly __wbg_softmax_free: (a: number) => void;
  readonly softmax_new: (a: number) => number;
  readonly softmax_call_reset: (a: number, b: number) => void;
  readonly softmax_call_select_arm: (a: number) => number;
  readonly softmax_call_update: (a: number, b: number, c: number) => void;
  readonly __wbg_epsilongreedy_free: (a: number) => void;
  readonly epsilongreedy_new: (a: number, b: number) => number;
  readonly epsilongreedy_call_reset: (a: number, b: number) => void;
  readonly epsilongreedy_call_select_arm: (a: number) => number;
  readonly epsilongreedy_call_update: (a: number, b: number, c: number) => void;
  readonly __wbg_random_free: (a: number) => void;
  readonly random_new: (a: number) => number;
  readonly random_call_select_arm: (a: number) => number;
  readonly random_call_reset: (a: number, b: number) => void;
  readonly random_call_update: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
