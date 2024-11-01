import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FormItem, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { PlusIcon, TrashIcon } from 'lucide-vue-next';
import { FieldArray, FieldContextKey, useField } from 'vee-validate';
import { computed, provide } from 'vue';
import * as z from 'zod';
import AutoFormField from './AutoFormField.vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName, getBaseType } from './utils';
export default ((__VLS_props, __VLS_ctx, __VLS_expose, __VLS_setup = (async () => {
    const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
    let __VLS_typeProps;
    const props = defineProps();
    function isZodArray(item) {
        return item instanceof z.ZodArray;
    }
    function isZodDefault(item) {
        return item instanceof z.ZodDefault;
    }
    const itemShape = computed(() => {
        if (!props.schema)
            return;
        const schema = isZodArray(props.schema)
            ? props.schema._def.type
            : isZodDefault(props.schema)
                // @ts-expect-error missing schema
                ? props.schema._def.innerType._def.type
                : null;
        return {
            type: getBaseType(schema),
            schema,
        };
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
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.FieldArray;
        /** @type { [typeof __VLS_components.FieldArray, typeof __VLS_components.FieldArray, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ as: ("section"), name: ((__VLS_ctx.fieldName)), }));
        const __VLS_2 = __VLS_1({ as: ("section"), name: ((__VLS_ctx.fieldName)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        {
            const { default: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
            const [{ fields, remove, push }] = __VLS_getSlotParams(__VLS_thisSlot);
            var __VLS_6 = {
                ...(props),
            };
            const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.Accordion;
            /** @type { [typeof __VLS_components.Accordion, typeof __VLS_components.Accordion, ] } */
            // @ts-ignore
            const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ type: ("multiple"), ...{ class: ("w-full") }, collapsible: (true), disabled: ((__VLS_ctx.disabled)), asChild: (true), }));
            const __VLS_9 = __VLS_8({ type: ("multiple"), ...{ class: ("w-full") }, collapsible: (true), disabled: ((__VLS_ctx.disabled)), asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
            const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.FormItem;
            /** @type { [typeof __VLS_components.FormItem, typeof __VLS_components.FormItem, ] } */
            // @ts-ignore
            const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
            const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
            const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.AccordionItem;
            /** @type { [typeof __VLS_components.AccordionItem, typeof __VLS_components.AccordionItem, ] } */
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ value: ((__VLS_ctx.fieldName)), ...{ class: ("border-none") }, }));
            const __VLS_21 = __VLS_20({ value: ((__VLS_ctx.fieldName)), ...{ class: ("border-none") }, }, ...__VLS_functionalComponentArgsRest(__VLS_20));
            const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.AccordionTrigger;
            /** @type { [typeof __VLS_components.AccordionTrigger, typeof __VLS_components.AccordionTrigger, ] } */
            // @ts-ignore
            const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
            const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
            // @ts-ignore
            [AutoFormLabel, AutoFormLabel,];
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(AutoFormLabel, new AutoFormLabel({ ...{ class: ("text-base") }, required: ((__VLS_ctx.required)), }));
            const __VLS_32 = __VLS_31({ ...{ class: ("text-base") }, required: ((__VLS_ctx.required)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            (__VLS_ctx.schema?.description || __VLS_ctx.beautifyObjectName(__VLS_ctx.fieldName));
            __VLS_nonNullable(__VLS_35.slots).default;
            const __VLS_35 = __VLS_pickFunctionalComponentCtx(AutoFormLabel, __VLS_32);
            __VLS_nonNullable(__VLS_30.slots).default;
            const __VLS_30 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
            const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.AccordionContent;
            /** @type { [typeof __VLS_components.AccordionContent, typeof __VLS_components.AccordionContent, ] } */
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
            const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
            for (const [field, index] of __VLS_getVForSourceType((fields))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4 p-1") }, });
                // @ts-ignore
                [AutoFormField,];
                // @ts-ignore
                const __VLS_42 = __VLS_asFunctionalComponent(AutoFormField, new AutoFormField({ fieldName: ((`${__VLS_ctx.fieldName}[${index}]`)), label: ((__VLS_ctx.fieldName)), shape: ((__VLS_ctx.itemShape)), config: __VLS_ctx.config, }));
                const __VLS_43 = __VLS_42({ fieldName: ((`${__VLS_ctx.fieldName}[${index}]`)), label: ((__VLS_ctx.fieldName)), shape: ((__VLS_ctx.itemShape)), config: __VLS_ctx.config, }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("!my-4 flex justify-end") }, });
                const __VLS_47 = __VLS_resolvedLocalAndGlobalComponents.Button;
                /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
                // @ts-ignore
                const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({ ...{ 'onClick': {} }, type: ("button"), size: ("icon"), variant: ("secondary"), }));
                const __VLS_49 = __VLS_48({ ...{ 'onClick': {} }, type: ("button"), size: ("icon"), variant: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_48));
                let __VLS_53;
                const __VLS_54 = {
                    onClick: (...[$event]) => {
                        remove(index);
                    }
                };
                let __VLS_50;
                let __VLS_51;
                const __VLS_55 = __VLS_resolvedLocalAndGlobalComponents.TrashIcon;
                /** @type { [typeof __VLS_components.TrashIcon, ] } */
                // @ts-ignore
                const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({ size: ((16)), }));
                const __VLS_57 = __VLS_56({ size: ((16)), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
                __VLS_nonNullable(__VLS_52.slots).default;
                const __VLS_52 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49);
                if (!field.isLast) {
                    const __VLS_61 = __VLS_resolvedLocalAndGlobalComponents.Separator;
                    /** @type { [typeof __VLS_components.Separator, ] } */
                    // @ts-ignore
                    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({}));
                    const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
                }
            }
            const __VLS_67 = __VLS_resolvedLocalAndGlobalComponents.Button;
            /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
            // @ts-ignore
            const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({ ...{ 'onClick': {} }, type: ("button"), variant: ("secondary"), ...{ class: ("mt-4 flex items-center") }, }));
            const __VLS_69 = __VLS_68({ ...{ 'onClick': {} }, type: ("button"), variant: ("secondary"), ...{ class: ("mt-4 flex items-center") }, }, ...__VLS_functionalComponentArgsRest(__VLS_68));
            let __VLS_73;
            const __VLS_74 = {
                onClick: (...[$event]) => {
                    push(null);
                }
            };
            let __VLS_70;
            let __VLS_71;
            const __VLS_75 = __VLS_resolvedLocalAndGlobalComponents.PlusIcon;
            /** @type { [typeof __VLS_components.PlusIcon, ] } */
            // @ts-ignore
            const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ ...{ class: ("mr-2") }, size: ((16)), }));
            const __VLS_77 = __VLS_76({ ...{ class: ("mr-2") }, size: ((16)), }, ...__VLS_functionalComponentArgsRest(__VLS_76));
            __VLS_nonNullable(__VLS_72.slots).default;
            const __VLS_72 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69);
            __VLS_nonNullable(__VLS_41.slots).default;
            const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
            const __VLS_81 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
            /** @type { [typeof __VLS_components.FormMessage, ] } */
            // @ts-ignore
            const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({}));
            const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
            __VLS_nonNullable(__VLS_24.slots).default;
            const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
            __VLS_nonNullable(__VLS_18.slots).default;
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
            __VLS_nonNullable(__VLS_12.slots).default;
            const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
            __VLS_nonNullable(__VLS_5.slots).default;
            __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
        }
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['border-none'];
        __VLS_styleScopedClasses['text-base'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['p-1'];
        __VLS_styleScopedClasses['!my-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-end'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['mr-2'];
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
                Button: Button,
                FormItem: FormItem,
                FormMessage: FormMessage,
                Separator: Separator,
                PlusIcon: PlusIcon,
                TrashIcon: TrashIcon,
                FieldArray: FieldArray,
                AutoFormField: AutoFormField,
                AutoFormLabel: AutoFormLabel,
                beautifyObjectName: beautifyObjectName,
                itemShape: itemShape,
            };
        },
        __typeProps: {},
    });
    return {};
})()) => ({}));
