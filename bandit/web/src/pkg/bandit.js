let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class AnnealingEpsilonGreedy {

    static __wrap(ptr) {
        const obj = Object.create(AnnealingEpsilonGreedy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_annealingepsilongreedy_free(ptr);
    }
    /**
    * @returns {number}
    */
    get epsilon() {
        const ret = wasm.__wbg_get_annealingepsilongreedy_epsilon(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set epsilon(arg0) {
        wasm.__wbg_set_annealingepsilongreedy_epsilon(this.ptr, arg0);
    }
    /**
    * @param {number} n_arms
    * @returns {AnnealingEpsilonGreedy}
    */
    static new(n_arms) {
        const ret = wasm.annealingepsilongreedy_new(n_arms);
        return AnnealingEpsilonGreedy.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.annealingepsilongreedy_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {AnnealingEpsilonGreedy} agent
    * @param {number} n_arms
    */
    static reset(agent, n_arms) {
        _assertClass(agent, AnnealingEpsilonGreedy);
        wasm.annealingepsilongreedy_reset(agent.ptr, n_arms);
    }
    /**
    * @param {AnnealingEpsilonGreedy} agent
    * @returns {number}
    */
    static select_arm(agent) {
        _assertClass(agent, AnnealingEpsilonGreedy);
        const ret = wasm.annealingepsilongreedy_select_arm(agent.ptr);
        return ret >>> 0;
    }
    /**
    * @param {AnnealingEpsilonGreedy} agent
    * @param {number} chosen_arm
    * @param {number} reward
    */
    static update(agent, chosen_arm, reward) {
        _assertClass(agent, AnnealingEpsilonGreedy);
        wasm.annealingepsilongreedy_update(agent.ptr, chosen_arm, reward);
    }
}
/**
*/
export class AnnealingSoftmax {

    static __wrap(ptr) {
        const obj = Object.create(AnnealingSoftmax.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_annealingsoftmax_free(ptr);
    }
    /**
    * @param {number} n_arms
    * @returns {AnnealingSoftmax}
    */
    static new(n_arms) {
        const ret = wasm.annealingsoftmax_new(n_arms);
        return AnnealingSoftmax.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.annealingsoftmax_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {AnnealingSoftmax} agent
    * @param {number} n_arms
    */
    static reset(agent, n_arms) {
        _assertClass(agent, AnnealingSoftmax);
        wasm.annealingsoftmax_reset(agent.ptr, n_arms);
    }
    /**
    * @param {AnnealingSoftmax} agent
    * @returns {number}
    */
    static select_arm(agent) {
        _assertClass(agent, AnnealingSoftmax);
        const ret = wasm.annealingsoftmax_select_arm(agent.ptr);
        return ret >>> 0;
    }
    /**
    * @param {AnnealingSoftmax} agent
    * @param {number} chosen_arm
    * @param {number} reward
    */
    static update(agent, chosen_arm, reward) {
        _assertClass(agent, AnnealingSoftmax);
        wasm.annealingsoftmax_update(agent.ptr, chosen_arm, reward);
    }
}
/**
*/
export class EpsilonGreedy {

    static __wrap(ptr) {
        const obj = Object.create(EpsilonGreedy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_epsilongreedy_free(ptr);
    }
    /**
    * @param {number} epsilon
    * @param {number} n_arms
    * @returns {EpsilonGreedy}
    */
    static new(epsilon, n_arms) {
        const ret = wasm.epsilongreedy_new(epsilon, n_arms);
        return EpsilonGreedy.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.epsilongreedy_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {EpsilonGreedy} agent
    * @param {number} n_arms
    */
    static reset(agent, n_arms) {
        _assertClass(agent, EpsilonGreedy);
        wasm.epsilongreedy_reset(agent.ptr, n_arms);
    }
    /**
    * @param {EpsilonGreedy} agent
    * @returns {number}
    */
    static select_arm(agent) {
        _assertClass(agent, EpsilonGreedy);
        const ret = wasm.epsilongreedy_select_arm(agent.ptr);
        return ret >>> 0;
    }
    /**
    * @param {EpsilonGreedy} agent
    * @param {number} chosen_arm
    * @param {number} reward
    */
    static update(agent, chosen_arm, reward) {
        _assertClass(agent, EpsilonGreedy);
        wasm.epsilongreedy_update(agent.ptr, chosen_arm, reward);
    }
}
/**
*/
export class Random {

    static __wrap(ptr) {
        const obj = Object.create(Random.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_random_free(ptr);
    }
    /**
    * @param {number} n_arms
    * @returns {Random}
    */
    static new(n_arms) {
        const ret = wasm.random_new(n_arms);
        return Random.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.random_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {Random} agent
    * @returns {number}
    */
    static select_arm(agent) {
        _assertClass(agent, Random);
        const ret = wasm.random_select_arm(agent.ptr);
        return ret >>> 0;
    }
    /**
    * @param {Random} agent
    * @param {number} n_arms
    */
    static reset(agent, n_arms) {
        _assertClass(agent, Random);
        wasm.random_reset(agent.ptr, n_arms);
    }
    /**
    * @param {Random} agent
    * @param {number} chosen_arm
    * @param {number} reward
    */
    static update(agent, chosen_arm, reward) {
        _assertClass(agent, Random);
        wasm.random_update(agent.ptr, chosen_arm, reward);
    }
}
/**
*/
export class Softmax {

    static __wrap(ptr) {
        const obj = Object.create(Softmax.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_softmax_free(ptr);
    }
    /**
    * @param {number} n_arms
    * @returns {Softmax}
    */
    static new(n_arms) {
        const ret = wasm.softmax_new(n_arms);
        return Softmax.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.softmax_name(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @param {Softmax} agent
    * @param {number} n_arms
    */
    static reset(agent, n_arms) {
        _assertClass(agent, Softmax);
        wasm.softmax_reset(agent.ptr, n_arms);
    }
    /**
    * @param {Softmax} agent
    * @returns {number}
    */
    static select_arm(agent) {
        _assertClass(agent, Softmax);
        const ret = wasm.softmax_select_arm(agent.ptr);
        return ret >>> 0;
    }
    /**
    * @param {Softmax} agent
    * @param {number} chosen_arm
    * @param {number} reward
    */
    static update(agent, chosen_arm, reward) {
        _assertClass(agent, Softmax);
        wasm.softmax_update(agent.ptr, chosen_arm, reward);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_crypto_70a96de3b6b73dac = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_dd1577445152112e = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_58036bec3add9e6f = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_6a9d28205ed5b0d8 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_msCrypto_adbc770ec9eca9c7 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_f05d779769764e82 = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_3774744e221a22ad = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_e950366c42764a07 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_95d1ea488d03e4e8 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_e7c1f827057f6584 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_a09ec664e14b1b81 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_c85a9259e621f3db = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_call_9495de66fdbe016b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_cf65c07de34b9a08 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5 = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_537b7341ce90bb31 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_17499e8aa4003ebd = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_newwithlength_b56c882b57805732 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_7526649b91a252a6 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('bandit_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
