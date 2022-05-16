export namespace PageMeta {
    const title: string;
    const description: string;
}
/** @typedef {typeof __propDef.props}  BasicFormProps */
/** @typedef {typeof __propDef.events}  BasicFormEvents */
/** @typedef {typeof __propDef.slots}  BasicFormSlots */
export default class BasicForm extends SvelteComponentTyped<{}, {
    submit: SubmitEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type BasicFormProps = typeof __propDef.props;
export type BasicFormEvents = typeof __propDef.events;
export type BasicFormSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        submit: SubmitEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
