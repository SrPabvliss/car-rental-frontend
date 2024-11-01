import { cn } from '@/lib/utils';
import { CalendarRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '.';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emits = defineEmits();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.CalendarRoot;
    /** @type { [typeof __VLS_components.CalendarRoot, typeof __VLS_components.CalendarRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ((__VLS_ctx.cn('p-3', props.class))) }, ...(__VLS_ctx.forwarded), }));
    const __VLS_2 = __VLS_1({ ...{ class: ((__VLS_ctx.cn('p-3', props.class))) }, ...(__VLS_ctx.forwarded), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    {
        const { default: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        const [{ grid, weekDays }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.CalendarHeader;
        /** @type { [typeof __VLS_components.CalendarHeader, typeof __VLS_components.CalendarHeader, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.CalendarPrevButton;
        /** @type { [typeof __VLS_components.CalendarPrevButton, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.CalendarHeading;
        /** @type { [typeof __VLS_components.CalendarHeading, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.CalendarNextButton;
        /** @type { [typeof __VLS_components.CalendarNextButton, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_nonNullable(__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0") }, });
        for (const [month] of __VLS_getVForSourceType((grid))) {
            const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.CalendarGrid;
            /** @type { [typeof __VLS_components.CalendarGrid, typeof __VLS_components.CalendarGrid, ] } */
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ key: ((month.value.toString())), }));
            const __VLS_32 = __VLS_31({ key: ((month.value.toString())), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.CalendarGridHead;
            /** @type { [typeof __VLS_components.CalendarGridHead, typeof __VLS_components.CalendarGridHead, ] } */
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
            const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
            const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.CalendarGridRow;
            /** @type { [typeof __VLS_components.CalendarGridRow, typeof __VLS_components.CalendarGridRow, ] } */
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
            const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
            for (const [day] of __VLS_getVForSourceType((weekDays))) {
                const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.CalendarHeadCell;
                /** @type { [typeof __VLS_components.CalendarHeadCell, typeof __VLS_components.CalendarHeadCell, ] } */
                // @ts-ignore
                const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ key: ((day)), }));
                const __VLS_50 = __VLS_49({ key: ((day)), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
                (day);
                __VLS_nonNullable(__VLS_53.slots).default;
                const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
            }
            __VLS_nonNullable(__VLS_47.slots).default;
            const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
            __VLS_nonNullable(__VLS_41.slots).default;
            const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
            const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.CalendarGridBody;
            /** @type { [typeof __VLS_components.CalendarGridBody, typeof __VLS_components.CalendarGridBody, ] } */
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
            const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
            for (const [weekDates, index] of __VLS_getVForSourceType((month.rows))) {
                const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.CalendarGridRow;
                /** @type { [typeof __VLS_components.CalendarGridRow, typeof __VLS_components.CalendarGridRow, ] } */
                // @ts-ignore
                const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ key: ((`weekDate-${index}`)), ...{ class: ("mt-2 w-full") }, }));
                const __VLS_62 = __VLS_61({ key: ((`weekDate-${index}`)), ...{ class: ("mt-2 w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
                for (const [weekDate] of __VLS_getVForSourceType((weekDates))) {
                    const __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.CalendarCell;
                    /** @type { [typeof __VLS_components.CalendarCell, typeof __VLS_components.CalendarCell, ] } */
                    // @ts-ignore
                    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ key: ((weekDate.toString())), date: ((weekDate)), }));
                    const __VLS_68 = __VLS_67({ key: ((weekDate.toString())), date: ((weekDate)), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
                    const __VLS_72 = __VLS_resolvedLocalAndGlobalComponents.CalendarCellTrigger;
                    /** @type { [typeof __VLS_components.CalendarCellTrigger, ] } */
                    // @ts-ignore
                    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ day: ((weekDate)), month: ((month.value)), }));
                    const __VLS_74 = __VLS_73({ day: ((weekDate)), month: ((month.value)), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
                    __VLS_nonNullable(__VLS_71.slots).default;
                    const __VLS_71 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
                }
                __VLS_nonNullable(__VLS_65.slots).default;
                const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
            }
            __VLS_nonNullable(__VLS_59.slots).default;
            const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
            __VLS_nonNullable(__VLS_35.slots).default;
            const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        }
        __VLS_nonNullable(__VLS_5.slots)['' /* empty slot name completion */];
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-4'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['sm:flex-row'];
    __VLS_styleScopedClasses['sm:gap-x-4'];
    __VLS_styleScopedClasses['sm:gap-y-0'];
    __VLS_styleScopedClasses['mt-2'];
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
            cn: cn,
            CalendarRoot: CalendarRoot,
            CalendarCell: CalendarCell,
            CalendarCellTrigger: CalendarCellTrigger,
            CalendarGrid: CalendarGrid,
            CalendarGridBody: CalendarGridBody,
            CalendarGridHead: CalendarGridHead,
            CalendarGridRow: CalendarGridRow,
            CalendarHeadCell: CalendarHeadCell,
            CalendarHeader: CalendarHeader,
            CalendarHeading: CalendarHeading,
            CalendarNextButton: CalendarNextButton,
            CalendarPrevButton: CalendarPrevButton,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
;
