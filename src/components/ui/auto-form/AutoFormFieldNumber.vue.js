import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
defineOptions({
    inheritAttrs: false,
});
let __VLS_typeProps;
const __VLS_props = defineProps();
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FormField;
    /** @type { [typeof __VLS_components.FormField, typeof __VLS_components.FormField, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ name: ((__VLS_ctx.fieldName)), }));
    const __VLS_2 = __VLS_1({ name: ((__VLS_ctx.fieldName)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    {
        const { default: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.FormItem;
        /** @type { [typeof __VLS_components.FormItem, typeof __VLS_components.FormItem, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        if (!__VLS_ctx.config?.hideLabel) {
            // @ts-ignore
            [AutoFormLabel, AutoFormLabel,];
            // @ts-ignore
            const __VLS_12 = __VLS_asFunctionalComponent(AutoFormLabel, new AutoFormLabel({ required: ((__VLS_ctx.required)), }));
            const __VLS_13 = __VLS_12({ required: ((__VLS_ctx.required)), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
            (__VLS_ctx.config?.label || __VLS_ctx.beautifyObjectName(__VLS_ctx.label ?? __VLS_ctx.fieldName));
            __VLS_nonNullable(__VLS_16.slots).default;
            const __VLS_16 = __VLS_pickFunctionalComponentCtx(AutoFormLabel, __VLS_13);
        }
        const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.FormControl;
        /** @type { [typeof __VLS_components.FormControl, typeof __VLS_components.FormControl, ] } */
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
        const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
        var __VLS_23 = {
            ...(slotProps),
        };
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Input;
        /** @type { [typeof __VLS_components.Input, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ type: ("number"), ...({ ...slotProps.componentField, ...__VLS_ctx.config?.inputProps }), disabled: ((__VLS_ctx.disabled)), }));
        const __VLS_26 = __VLS_25({ type: ("number"), ...({ ...slotProps.componentField, ...__VLS_ctx.config?.inputProps }), disabled: ((__VLS_ctx.disabled)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_nonNullable(__VLS_22.slots).default;
        __VLS_nonNullable(__VLS_22.slots).default;
        const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
        if (__VLS_ctx.config?.description) {
            const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.FormDescription;
            /** @type { [typeof __VLS_components.FormDescription, typeof __VLS_components.FormDescription, ] } */
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
            const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
            (__VLS_ctx.config.description);
            __VLS_nonNullable(__VLS_35.slots).default;
            const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        }
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
        /** @type { [typeof __VLS_components.FormMessage, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
        const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FormControl: FormControl,
            FormDescription: FormDescription,
            FormField: FormField,
            FormItem: FormItem,
            FormMessage: FormMessage,
            Input: Input,
            AutoFormLabel: AutoFormLabel,
            beautifyObjectName: beautifyObjectName,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
;
