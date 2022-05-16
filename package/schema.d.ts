export function schema(configuration: any): {
    form: import("svelte/store").Writable<{}>;
    validation: import("svelte/store").Writable<{
        _form: {
            valid: boolean;
            invalid: boolean;
        };
    }>;
};
