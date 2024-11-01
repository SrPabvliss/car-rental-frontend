import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FormItem } from '@/components/ui/form';
import { FieldContextKey, useField } from 'vee-validate';
import { computed, provide } from 'vue';
import AutoFormField from './AutoFormField.vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName, getBaseSchema, getBaseType, getDefaultValueInZodStack } from './utils';
export default ((__VLS_props, __VLS_ctx, __VLS_expose, __VLS_setup = (async () => {
    const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
    let __VLS_typeProps;
    const props = defineProps();
    const shapes = computed(() => {
        // @ts-expect-error ignore {} not assignable to object
        const val = {};
        if (!props.schema)
            return;
        const shape = getBaseSchema(props.schema)?.shape;
        if (!shape)
            return;
        Object.keys(shape).forEach((name) => {
            const item = shape[name];
            const baseItem = getBaseSchema(item);
            let options = (baseItem && 'values' in baseItem._def) ? baseItem._def.values : undefined;
            if (!Array.isArray(options) && typeof options === 'object')
                options = Object.values(options);
            val[name] = {
                type: getBaseType(item),
                default: getDefaultValueInZodStack(item),
                options,
                required: !['ZodOptional', 'ZodNullable'].includes(item._def.typeName),
                schema: item,
            };
        });
        return val;
    });
    const fieldContext = useField(props.fieldName);
    // @ts-expect-error ignore missing `id`
    provide(FieldContextKey, fieldContext);
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
        var __VLS_0 = {
            ...(props),
        };
        const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.Accordion;
        /** @type { [typeof __VLS_components.Accordion, typeof __VLS_components.Accordion, ] } */
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ type: ("single"), asChild: (true), ...{ class: ("w-full") }, collapsible: (true), disabled: ((__VLS_ctx.disabled)), }));
        const __VLS_3 = __VLS_2({ type: ("single"), asChild: (true), ...{ class: ("w-full") }, collapsible: (true), disabled: ((__VLS_ctx.disabled)), }, ...__VLS_functionalComponentArgsRest(__VLS_2));
        const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.FormItem;
        /** @type { [typeof __VLS_components.FormItem, typeof __VLS_components.FormItem, ] } */
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
        const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
        const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.AccordionItem;
        /** @type { [typeof __VLS_components.AccordionItem, typeof __VLS_components.AccordionItem, ] } */
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ value: ((__VLS_ctx.fieldName)), ...{ class: ("border-none") }, }));
        const __VLS_15 = __VLS_14({ value: ((__VLS_ctx.fieldName)), ...{ class: ("border-none") }, }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.AccordionTrigger;
        /** @type { [typeof __VLS_components.AccordionTrigger, typeof __VLS_components.AccordionTrigger, ] } */
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
        const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
        // @ts-ignore
        [AutoFormLabel, AutoFormLabel,];
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(AutoFormLabel, new AutoFormLabel({ ...{ class: ("text-base") }, required: ((__VLS_ctx.required)), }));
        const __VLS_26 = __VLS_25({ ...{ class: ("text-base") }, required: ((__VLS_ctx.required)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        (__VLS_ctx.schema?.description || __VLS_ctx.beautifyObjectName(__VLS_ctx.fieldName));
        __VLS_nonNullable(__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(AutoFormLabel, __VLS_26);
        __VLS_nonNullable(__VLS_24.slots).default;
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.AccordionContent;
        /** @type { [typeof __VLS_components.AccordionContent, typeof __VLS_components.AccordionContent, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("p-1 space-y-5") }, }));
        const __VLS_32 = __VLS_31({ ...{ class: ("p-1 space-y-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        for (const [shape, key] of __VLS_getVForSourceType((__VLS_ctx.shapes))) {
            // @ts-ignore
            [AutoFormField,];
            // @ts-ignore
            const __VLS_36 = __VLS_asFunctionalComponent(AutoFormField, new AutoFormField({ config: __VLS_ctx.config?.[key], fieldName: ((`${__VLS_ctx.fieldName}.${key.toString()}`)), label: ((key.toString())), shape: ((shape)), }));
            const __VLS_37 = __VLS_36({ config: __VLS_ctx.config?.[key], fieldName: ((`${__VLS_ctx.fieldName}.${key.toString()}`)), label: ((key.toString())), shape: ((shape)), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        }
        __VLS_nonNullable(__VLS_35.slots).default;
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        __VLS_nonNullable(__VLS_18.slots).default;
        const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
        __VLS_nonNullable(__VLS_12.slots).default;
        const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
        __VLS_nonNullable(__VLS_6.slots).default;
        const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['border-none'];
        __VLS_styleScopedClasses['text-base'];
        __VLS_styleScopedClasses['p-1'];
        __VLS_styleScopedClasses['space-y-5'];
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
                Accordion: Accordion,
                AccordionContent: AccordionContent,
                AccordionItem: AccordionItem,
                AccordionTrigger: AccordionTrigger,
                FormItem: FormItem,
                AutoFormField: AutoFormField,
                AutoFormLabel: AutoFormLabel,
                beautifyObjectName: beautifyObjectName,
                shapes: shapes,
            };
        },
        __typeProps: {},
    });
    return {};
})()) => ({}));
