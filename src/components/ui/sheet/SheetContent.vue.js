import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-icons/vue';
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits, } from 'radix-vue';
import { computed } from 'vue';
import { sheetVariants } from '.';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
defineOptions({
    inheritAttrs: false,
});
let __VLS_typeProps;
const props = defineProps();
const emits = defineEmits();
const delegatedProps = computed(() => {
    const { class: _, side, ...delegated } = props;
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.DialogPortal;
    /** @type { [typeof __VLS_components.DialogPortal, typeof __VLS_components.DialogPortal, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.DialogOverlay;
    /** @type { [typeof __VLS_components.DialogOverlay, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.DialogContent;
    /** @type { [typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: ((__VLS_ctx.cn(__VLS_ctx.sheetVariants({ side: __VLS_ctx.side }), props.class))) }, ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }), }));
    const __VLS_14 = __VLS_13({ ...{ class: ((__VLS_ctx.cn(__VLS_ctx.sheetVariants({ side: __VLS_ctx.side }), props.class))) }, ...({ ...__VLS_ctx.forwarded, ...__VLS_ctx.$attrs }), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    var __VLS_18 = {};
    const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.DialogClose;
    /** @type { [typeof __VLS_components.DialogClose, typeof __VLS_components.DialogClose, ] } */
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ class: ("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary") }, }));
    const __VLS_21 = __VLS_20({ ...{ class: ("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.Cross2Icon;
    /** @type { [typeof __VLS_components.Cross2Icon, ] } */
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({ ...{ class: ("w-4 h-4") }, }));
    const __VLS_27 = __VLS_26({ ...{ class: ("w-4 h-4") }, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_nonNullable(__VLS_24.slots).default;
    const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
    __VLS_nonNullable(__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['bg-black/80'];
    __VLS_styleScopedClasses['data-[state=open]:animate-in'];
    __VLS_styleScopedClasses['data-[state=closed]:animate-out'];
    __VLS_styleScopedClasses['data-[state=closed]:fade-out-0'];
    __VLS_styleScopedClasses['data-[state=open]:fade-in-0'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['right-4'];
    __VLS_styleScopedClasses['top-4'];
    __VLS_styleScopedClasses['rounded-sm'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['ring-offset-background'];
    __VLS_styleScopedClasses['transition-opacity'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-ring'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['disabled:pointer-events-none'];
    __VLS_styleScopedClasses['data-[state=open]:bg-secondary'];
    __VLS_styleScopedClasses['w-4'];
    __VLS_styleScopedClasses['h-4'];
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
            Cross2Icon: Cross2Icon,
            DialogClose: DialogClose,
            DialogContent: DialogContent,
            DialogOverlay: DialogOverlay,
            DialogPortal: DialogPortal,
            sheetVariants: sheetVariants,
            forwarded: forwarded,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
;
