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
* @returns {string}
*/
  name(): string;
/**
* @param {AnnealingEpsilonGreedy} agent
* @param {number} n_arms
*/
  static reset(agent: AnnealingEpsilonGreedy, n_arms: number): void;
/**
* @param {AnnealingEpsilonGreedy} agent
* @returns {number}
*/
  static select_arm(agent: AnnealingEpsilonGreedy): number;
/**
* @param {AnnealingEpsilonGreedy} agent
* @param {number} chosen_arm
* @param {number} reward
*/
  static update(agent: AnnealingEpsilonGreedy, chosen_arm: number, reward: number): void;
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
* @returns {string}
*/
  name(): string;
/**
* @param {AnnealingSoftmax} agent
* @param {number} n_arms
*/
  static reset(agent: AnnealingSoftmax, n_arms: number): void;
/**
* @param {AnnealingSoftmax} agent
* @returns {number}
*/
  static select_arm(agent: AnnealingSoftmax): number;
/**
* @param {AnnealingSoftmax} agent
* @param {number} chosen_arm
* @param {number} reward
*/
  static update(agent: AnnealingSoftmax, chosen_arm: number, reward: number): void;
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
* @returns {string}
*/
  name(): string;
/**
* @param {EpsilonGreedy} agent
* @param {number} n_arms
*/
  static reset(agent: EpsilonGreedy, n_arms: number): void;
/**
* @param {EpsilonGreedy} agent
* @returns {number}
*/
  static select_arm(agent: EpsilonGreedy): number;
/**
* @param {EpsilonGreedy} agent
* @param {number} chosen_arm
* @param {number} reward
*/
  static update(agent: EpsilonGreedy, chosen_arm: number, reward: number): void;
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
* @returns {string}
*/
  name(): string;
/**
* @param {Random} agent
* @returns {number}
*/
  static select_arm(agent: Random): number;
/**
* @param {Random} agent
* @param {number} n_arms
*/
  static reset(agent: Random, n_arms: number): void;
/**
* @param {Random} agent
* @param {number} chosen_arm
* @param {number} reward
*/
  static update(agent: Random, chosen_arm: number, reward: number): void;
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
* @returns {string}
*/
  name(): string;
/**
* @param {Softmax} agent
* @param {number} n_arms
*/
  static reset(agent: Softmax, n_arms: number): void;
/**
* @param {Softmax} agent
* @returns {number}
*/
  static select_arm(agent: Softmax): number;
/**
* @param {Softmax} agent
* @param {number} chosen_arm
* @param {number} reward
*/
  static update(agent: Softmax, chosen_arm: number, reward: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_annealingepsilongreedy_free: (a: number) => void;
  readonly __wbg_get_annealingepsilongreedy_epsilon: (a: number) => number;
  readonly __wbg_set_annealingepsilongreedy_epsilon: (a: number, b: number) => void;
  readonly annealingepsilongreedy_new: (a: number) => number;
  readonly annealingepsilongreedy_name: (a: number, b: number) => void;
  readonly annealingepsilongreedy_reset: (a: number, b: number) => void;
  readonly annealingepsilongreedy_select_arm: (a: number) => number;
  readonly annealingepsilongreedy_update: (a: number, b: number, c: number) => void;
  readonly __wbg_annealingsoftmax_free: (a: number) => void;
  readonly annealingsoftmax_new: (a: number) => number;
  readonly annealingsoftmax_name: (a: number, b: number) => void;
  readonly annealingsoftmax_reset: (a: number, b: number) => void;
  readonly annealingsoftmax_select_arm: (a: number) => number;
  readonly annealingsoftmax_update: (a: number, b: number, c: number) => void;
  readonly __wbg_softmax_free: (a: number) => void;
  readonly softmax_new: (a: number) => number;
  readonly softmax_name: (a: number, b: number) => void;
  readonly softmax_reset: (a: number, b: number) => void;
  readonly softmax_select_arm: (a: number) => number;
  readonly softmax_update: (a: number, b: number, c: number) => void;
  readonly __wbg_epsilongreedy_free: (a: number) => void;
  readonly epsilongreedy_new: (a: number, b: number) => number;
  readonly epsilongreedy_name: (a: number, b: number) => void;
  readonly epsilongreedy_reset: (a: number, b: number) => void;
  readonly epsilongreedy_select_arm: (a: number) => number;
  readonly epsilongreedy_update: (a: number, b: number, c: number) => void;
  readonly __wbg_random_free: (a: number) => void;
  readonly random_new: (a: number) => number;
  readonly random_name: (a: number, b: number) => void;
  readonly random_select_arm: (a: number) => number;
  readonly random_reset: (a: number, b: number) => void;
  readonly random_update: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
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
