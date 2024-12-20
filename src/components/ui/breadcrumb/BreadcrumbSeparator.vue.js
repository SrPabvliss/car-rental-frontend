import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-icons/vue';
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ role: ("presentation"), "aria-hidden": ("true"), ...{ class: ((__VLS_ctx.cn('[&>svg]:size-3.5', props.class))) }, });
    var __VLS_0 = {};
    const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.ChevronRightIcon;
    /** @type { [typeof __VLS_components.ChevronRightIcon, ] } */
    // @ts-ignore
    const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({}));
    const __VLS_3 = __VLS_2({}, ...__VLS_functionalComponentArgsRest(__VLS_2));
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
            ChevronRightIcon: ChevronRightIcon,
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
