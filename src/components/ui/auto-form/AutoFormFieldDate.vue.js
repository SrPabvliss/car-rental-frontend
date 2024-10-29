import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from '@radix-icons/vue';
import AutoFormLabel from './AutoFormLabel.vue';
import { beautifyObjectName } from './utils';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Popover;
        /** @type { [typeof __VLS_components.Popover, typeof __VLS_components.Popover, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.PopoverTrigger;
        /** @type { [typeof __VLS_components.PopoverTrigger, typeof __VLS_components.PopoverTrigger, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ asChild: (true), disabled: ((__VLS_ctx.disabled)), }));
        const __VLS_32 = __VLS_31({ asChild: (true), disabled: ((__VLS_ctx.disabled)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ variant: ("outline"), ...{ class: ((__VLS_ctx.cn('w-full justify-start text-left font-normal', !slotProps.componentField.modelValue && 'text-muted-foreground'))) }, }));
        const __VLS_38 = __VLS_37({ variant: ("outline"), ...{ class: ((__VLS_ctx.cn('w-full justify-start text-left font-normal', !slotProps.componentField.modelValue && 'text-muted-foreground'))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.CalendarIcon;
        /** @type { [typeof __VLS_components.CalendarIcon, ] } */
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("mr-2 h-4 w-4") }, }));
        const __VLS_44 = __VLS_43({ ...{ class: ("mr-2 h-4 w-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        (slotProps.componentField.modelValue ? __VLS_ctx.df.format(slotProps.componentField.modelValue.toDate(__VLS_ctx.getLocalTimeZone())) : "Pick a date");
        __VLS_nonNullable(__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
        __VLS_nonNullable(__VLS_35.slots).default;
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.PopoverContent;
        /** @type { [typeof __VLS_components.PopoverContent, typeof __VLS_components.PopoverContent, ] } */
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("w-auto p-0") }, }));
        const __VLS_50 = __VLS_49({ ...{ class: ("w-auto p-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.Calendar;
        /** @type { [typeof __VLS_components.Calendar, ] } */
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ initialFocus: (true), ...(slotProps.componentField), }));
        const __VLS_56 = __VLS_55({ initialFocus: (true), ...(slotProps.componentField), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        __VLS_nonNullable(__VLS_53.slots).default;
        const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
        __VLS_nonNullable(__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        __VLS_nonNullable(__VLS_22.slots).default;
        __VLS_nonNullable(__VLS_22.slots).default;
        const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
        if (__VLS_ctx.config?.description) {
            const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.FormDescription;
            /** @type { [typeof __VLS_components.FormDescription, typeof __VLS_components.FormDescription, ] } */
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
            const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
            (__VLS_ctx.config.description);
            __VLS_nonNullable(__VLS_65.slots).default;
            const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
        }
        const __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.FormMessage;
        /** @type { [typeof __VLS_components.FormMessage, ] } */
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
        const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['w-auto'];
    __VLS_styleScopedClasses['p-0'];
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
            Calendar: Calendar,
            FormControl: FormControl,
            FormDescription: FormDescription,
            FormField: FormField,
            FormItem: FormItem,
            FormMessage: FormMessage,
            Popover: Popover,
            PopoverContent: PopoverContent,
            PopoverTrigger: PopoverTrigger,
            cn: cn,
            getLocalTimeZone: getLocalTimeZone,
            CalendarIcon: CalendarIcon,
            AutoFormLabel: AutoFormLabel,
            beautifyObjectName: beautifyObjectName,
            df: df,
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
