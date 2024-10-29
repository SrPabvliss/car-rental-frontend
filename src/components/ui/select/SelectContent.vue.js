import { cn } from '@/lib/utils';
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits, } from 'radix-vue';
import { computed } from 'vue';
import { SelectScrollDownButton, SelectScrollUpButton } from '.';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
defineOptions({
    inheritAttrs: false,
});
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    position: 'popper',
});
const emits = defineEmits();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const __VLS_withDefaultsArg = (function (t) { return t; })({
    position: 'popper',
});
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.SelectPortal;
    /** @type { [typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.SelectContent;
    /** @type { [typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }), ...{ class: ((__VLS_ctx.cn('relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', __VLS_ctx.position === 'popper'
                && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class))) }, }));
    const __VLS_8 = __VLS_7({ ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }), ...{ class: ((__VLS_ctx.cn('relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', __VLS_ctx.position === 'popper'
                && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.SelectScrollUpButton;
    /** @type { [typeof __VLS_components.SelectScrollUpButton, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.SelectViewport;
    /** @type { [typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ((__VLS_ctx.cn('p-1', __VLS_ctx.position === 'popper' && 'h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]'))) }, }));
    const __VLS_20 = __VLS_19({ ...{ class: ((__VLS_ctx.cn('p-1', __VLS_ctx.position === 'popper' && 'h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]'))) }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    var __VLS_24 = {};
    __VLS_nonNullable(__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.SelectScrollDownButton;
    /** @type { [typeof __VLS_components.SelectScrollDownButton, ] } */
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
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
            cn: cn,
            SelectContent: SelectContent,
            SelectPortal: SelectPortal,
            SelectViewport: SelectViewport,
            SelectScrollDownButton: SelectScrollDownButton,
            SelectScrollUpButton: SelectScrollUpButton,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
;
