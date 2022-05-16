export function validator(node: any, { form: initial, validation }: {
    form: any;
    validation: any;
}): {
    update({ form }: {
        form: any;
    }): void;
};
