/** @typedef {typeof __propDef.props}  FormProps */
/** @typedef {typeof __propDef.events}  FormEvents */
/** @typedef {typeof __propDef.slots}  FormSlots */
export default class Form extends SvelteComponentTyped<{
    validators: any;
    label: any;
    value?: any;
    features?: any[];
    type?: string;
}, {
    submit: SubmitEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        validators: any;
        label: any;
        value?: any;
        features?: any[];
        type?: string;
    };
    events: {
        submit: SubmitEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
