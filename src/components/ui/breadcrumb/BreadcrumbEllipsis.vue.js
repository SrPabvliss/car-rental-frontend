import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-icons/vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ role: ("presentation"), "aria-hidden": ("true"), ...{ class: ((__VLS_ctx.cn('flex h-9 w-9 items-center justify-center', props.class))) }, });
    var __VLS_0 = {};
    const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.DotsHorizontalIcon;
    /** @type { [typeof __VLS_components.DotsHorizontalIcon, ] } */
    // @ts-ignore
    const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ ...{ class: ("h-4 w-4") }, }));
    const __VLS_3 = __VLS_2({ ...{ class: ("h-4 w-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_2));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("sr-only") }, });
    __VLS_styleScopedClasses['h-4'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['sr-only'];
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
            DotsHorizontalIcon: DotsHorizontalIcon,
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
