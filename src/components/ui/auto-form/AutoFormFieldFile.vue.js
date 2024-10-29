import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@radix-icons/vue';
import { ref } from 'vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const inputFile = ref();
async function parseFileAsString(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsDataURL(file);
        }
    });
}
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
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...(__VLS_ctx.$attrs), }));
        const __VLS_8 = __VLS_7({ ...(__VLS_ctx.$attrs), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
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
        if (!__VLS_ctx.inputFile) {
            const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Input;
            /** @type { [typeof __VLS_components.Input, ] } */
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onChange': {} }, type: ("file"), ...({ ...__VLS_ctx.config?.inputProps }), disabled: ((__VLS_ctx.disabled)), }));
            const __VLS_26 = __VLS_25({ ...{ 'onChange': {} }, type: ("file"), ...({ ...__VLS_ctx.config?.inputProps }), disabled: ((__VLS_ctx.disabled)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            let __VLS_30;
            const __VLS_31 = {
                onChange: (async (ev) => {
                    const file = ev.target.files?.[0];
                    __VLS_ctx.inputFile = file;
                    const parsed = await __VLS_ctx.parseFileAsString(file);
                    slotProps.componentField.onInput(parsed);
                })
            };
            let __VLS_27;
            let __VLS_28;
            const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent pl-3 pr-1 py-1 text-sm shadow-sm transition-colors") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.inputFile?.name);
            const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.Button;
            /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ ...{ 'onClick': {} }, size: (('icon')), variant: (('ghost')), ...{ class: ("h-[26px] w-[26px]") }, "aria-label": ("Remove file"), type: ("button"), }));
            const __VLS_34 = __VLS_33({ ...{ 'onClick': {} }, size: (('icon')), variant: (('ghost')), ...{ class: ("h-[26px] w-[26px]") }, "aria-label": ("Remove file"), type: ("button"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            let __VLS_38;
            const __VLS_39 = {
                onClick: (() => {
                    __VLS_ctx.inputFile = undefined;
                    slotProps.componentField.onInput(undefined);
                })
            };
            let __VLS_35;
            let __VLS_36;
            const __VLS_40 = __VLS_resolvedLocalAndGlobalComponents.TrashIcon;
            /** @type { [typeof __VLS_components.TrashIcon, ] } */
            // @ts-ignore
            const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
            const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
            __VLS_nonNullable(__VLS_37.slots).default;
            const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        }
        __VLS_nonNullable(__VLS_22.slots).default;
        __VLS_nonNullable(__VLS_22.slots).default;
        const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
        if (__VLS_ctx.config?.description) {
            const __VLS_46 = __VLS_resolvedLocalAndGlobalComponents.FormDescription;
            /** @type { [typeof __VLS_components.FormDescription, typeof __VLS_components.FormDescription, ] } */
            // @ts-ignore
            const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
            const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
            (__VLS_ctx.config.description);
            __VLS_nonNullable(__VLS_51.slots).default;
            const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
        }
        const __VLS_52 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
        /** @type { [typeof __VLS_components.FormMessage, ] } */
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
        const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['h-9'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-input'];
    __VLS_styleScopedClasses['bg-transparent'];
    __VLS_styleScopedClasses['pl-3'];
    __VLS_styleScopedClasses['pr-1'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['h-[26px]'];
    __VLS_styleScopedClasses['w-[26px]'];
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
            Button: Button,
            FormControl: FormControl,
            FormDescription: FormDescription,
            FormField: FormField,
            FormItem: FormItem,
            FormMessage: FormMessage,
            Input: Input,
            TrashIcon: TrashIcon,
            AutoFormLabel: AutoFormLabel,
            beautifyObjectName: beautifyObjectName,
            inputFile: inputFile,
            parseFileAsString: parseFileAsString,
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
