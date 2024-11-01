import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
        if (__VLS_ctx.config?.component === 'radio') {
            const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RadioGroup;
            /** @type { [typeof __VLS_components.RadioGroup, typeof __VLS_components.RadioGroup, ] } */
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ disabled: ((__VLS_ctx.disabled)), orientation: (('vertical')), ...({ ...slotProps.componentField }), }));
            const __VLS_26 = __VLS_25({ disabled: ((__VLS_ctx.disabled)), orientation: (('vertical')), ...({ ...slotProps.componentField }), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            for (const [option, index] of __VLS_getVForSourceType((__VLS_ctx.options))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((option)), ...{ class: ("mb-2 flex items-center gap-3 space-y-0") }, });
                const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.RadioGroupItem;
                /** @type { [typeof __VLS_components.RadioGroupItem, ] } */
                // @ts-ignore
                const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ id: ((`${option}-${index}`)), value: ((option)), }));
                const __VLS_32 = __VLS_31({ id: ((`${option}-${index}`)), value: ((option)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.Label;
                /** @type { [typeof __VLS_components.Label, typeof __VLS_components.Label, ] } */
                // @ts-ignore
                const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ for: ((`${option}-${index}`)), }));
                const __VLS_38 = __VLS_37({ for: ((`${option}-${index}`)), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
                (__VLS_ctx.beautifyObjectName(option));
                __VLS_nonNullable(__VLS_41.slots).default;
                const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
            }
            __VLS_nonNullable(__VLS_29.slots).default;
            const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        }
        else {
            const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Select;
            /** @type { [typeof __VLS_components.Select, typeof __VLS_components.Select, ] } */
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ disabled: ((__VLS_ctx.disabled)), ...({ ...slotProps.componentField }), }));
            const __VLS_44 = __VLS_43({ disabled: ((__VLS_ctx.disabled)), ...({ ...slotProps.componentField }), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
            const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.SelectTrigger;
            /** @type { [typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ] } */
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("w-full") }, }));
            const __VLS_50 = __VLS_49({ ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.SelectValue;
            /** @type { [typeof __VLS_components.SelectValue, ] } */
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ placeholder: ((__VLS_ctx.config?.inputProps?.placeholder)), }));
            const __VLS_56 = __VLS_55({ placeholder: ((__VLS_ctx.config?.inputProps?.placeholder)), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
            __VLS_nonNullable(__VLS_53.slots).default;
            const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
            const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.SelectContent;
            /** @type { [typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ] } */
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
            const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
            for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
                const __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.SelectItem;
                /** @type { [typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ] } */
                // @ts-ignore
                const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ key: ((option)), value: ((option)), }));
                const __VLS_68 = __VLS_67({ key: ((option)), value: ((option)), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
                (__VLS_ctx.beautifyObjectName(option));
                __VLS_nonNullable(__VLS_71.slots).default;
                const __VLS_71 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
            }
            __VLS_nonNullable(__VLS_65.slots).default;
            const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
            __VLS_nonNullable(__VLS_47.slots).default;
            const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        }
        __VLS_nonNullable(__VLS_22.slots).default;
        __VLS_nonNullable(__VLS_22.slots).default;
        const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
        if (__VLS_ctx.config?.description) {
            const __VLS_72 = __VLS_resolvedLocalAndGlobalComponents.FormDescription;
            /** @type { [typeof __VLS_components.FormDescription, typeof __VLS_components.FormDescription, ] } */
            // @ts-ignore
            const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
            const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
            (__VLS_ctx.config.description);
            __VLS_nonNullable(__VLS_77.slots).default;
            const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
        }
        const __VLS_78 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
        /** @type { [typeof __VLS_components.FormMessage, ] } */
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
        const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-3'];
    __VLS_styleScopedClasses['space-y-0'];
    __VLS_styleScopedClasses['w-full'];
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
            Label: Label,
            RadioGroup: RadioGroup,
            RadioGroupItem: RadioGroupItem,
            Select: Select,
            SelectContent: SelectContent,
            SelectItem: SelectItem,
            SelectTrigger: SelectTrigger,
            SelectValue: SelectValue,
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
