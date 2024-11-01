import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-icons/vue';
import { SelectIcon, SelectTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwardedProps = useForwardProps(delegatedProps);
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.SelectTrigger;
    /** @type { [typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn('flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start', props.class))) }, }));
    const __VLS_2 = __VLS_1({ ...(__VLS_ctx.forwardedProps), ...{ class: ((__VLS_ctx.cn('flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.SelectIcon;
    /** @type { [typeof __VLS_components.SelectIcon, typeof __VLS_components.SelectIcon, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ asChild: (true), }));
    const __VLS_9 = __VLS_8({ asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.CaretSortIcon;
    /** @type { [typeof __VLS_components.CaretSortIcon, ] } */
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ ...{ class: ("w-4 h-4 opacity-50 shrink-0") }, }));
    const __VLS_15 = __VLS_14({ ...{ class: ("w-4 h-4 opacity-50 shrink-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_nonNullable(__VLS_12.slots).default;
    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['shrink-0'];
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
            CaretSortIcon: CaretSortIcon,
            SelectIcon: SelectIcon,
            SelectTrigger: SelectTrigger,
            forwardedProps: forwardedProps,
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
