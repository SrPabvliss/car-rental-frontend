import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { computed } from 'vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const booleanComponent = computed(() => props.config?.component === 'switch' ? Switch : Checkbox);
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-0 mb-3 flex items-center gap-3") }, });
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.FormControl;
        /** @type { [typeof __VLS_components.FormControl, typeof __VLS_components.FormControl, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        var __VLS_18 = {
            ...(slotProps),
        };
        const __VLS_19 = ((__VLS_ctx.booleanComponent));
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ 'onUpdate:checked': {} }, ...({ ...slotProps.componentField }), disabled: ((__VLS_ctx.disabled)), checked: ((slotProps.componentField.modelValue)), }));
        const __VLS_21 = __VLS_20({ ...{ 'onUpdate:checked': {} }, ...({ ...slotProps.componentField }), disabled: ((__VLS_ctx.disabled)), checked: ((slotProps.componentField.modelValue)), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_25;
        const __VLS_26 = {
            'onUpdate:checked': (...[$event]) => {
                slotProps.componentField['onUpdate:modelValue'];
            }
        };
        let __VLS_22;
        let __VLS_23;
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
        __VLS_nonNullable(__VLS_17.slots).default;
        __VLS_nonNullable(__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
        if (!__VLS_ctx.config?.hideLabel) {
            // @ts-ignore
            [AutoFormLabel, AutoFormLabel,];
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent(AutoFormLabel, new AutoFormLabel({ required: ((__VLS_ctx.required)), }));
            const __VLS_28 = __VLS_27({ required: ((__VLS_ctx.required)), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
            (__VLS_ctx.config?.label || __VLS_ctx.beautifyObjectName(__VLS_ctx.label ?? __VLS_ctx.fieldName));
            __VLS_nonNullable(__VLS_31.slots).default;
            const __VLS_31 = __VLS_pickFunctionalComponentCtx(AutoFormLabel, __VLS_28);
        }
        if (__VLS_ctx.config?.description) {
            const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.FormDescription;
            /** @type { [typeof __VLS_components.FormDescription, typeof __VLS_components.FormDescription, ] } */
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
            const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
            (__VLS_ctx.config.description);
            __VLS_nonNullable(__VLS_37.slots).default;
            const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        }
        const __VLS_38 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
        /** @type { [typeof __VLS_components.FormMessage, ] } */
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
        const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['space-y-0'];
    __VLS_styleScopedClasses['mb-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-3'];
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
            AutoFormLabel: AutoFormLabel,
            beautifyObjectName: beautifyObjectName,
            booleanComponent: booleanComponent,
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
