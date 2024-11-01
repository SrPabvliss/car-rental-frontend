import { computed } from 'vue';
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant';
import useDependencies from './dependencies';
export default ((__VLS_props, __VLS_ctx, __VLS_expose, __VLS_setup = (async () => {
    const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
    let __VLS_typeProps;
    const props = defineProps();
    function isValidConfig(config) {
        return !!config?.component;
    }
    const delegatedProps = computed(() => {
        if (['ZodObject', 'ZodArray'].includes(props.shape?.type))
            return { schema: props.shape?.schema };
        return undefined;
    });
    const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(props.fieldName);
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
        if (!__VLS_ctx.isHidden) {
            const __VLS_0 = ((__VLS_ctx.isValidConfig(__VLS_ctx.config)
                ? typeof __VLS_ctx.config.component === 'string'
                    ? __VLS_ctx.INPUT_COMPONENTS[__VLS_ctx.config.component]
                    : __VLS_ctx.config.component
                : __VLS_ctx.INPUT_COMPONENTS[__VLS_ctx.DEFAULT_ZOD_HANDLERS[__VLS_ctx.shape.type]]));
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ fieldName: ((__VLS_ctx.fieldName)), label: ((__VLS_ctx.shape.schema?.description)), required: ((__VLS_ctx.isRequired || __VLS_ctx.shape.required)), options: ((__VLS_ctx.overrideOptions || __VLS_ctx.shape.options)), disabled: ((__VLS_ctx.isDisabled)), config: ((__VLS_ctx.config)), ...(__VLS_ctx.delegatedProps), }));
            const __VLS_2 = __VLS_1({ fieldName: ((__VLS_ctx.fieldName)), label: ((__VLS_ctx.shape.schema?.description)), required: ((__VLS_ctx.isRequired || __VLS_ctx.shape.required)), options: ((__VLS_ctx.overrideOptions || __VLS_ctx.shape.options)), disabled: ((__VLS_ctx.isDisabled)), config: ((__VLS_ctx.config)), ...(__VLS_ctx.delegatedProps), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            var __VLS_6 = {};
            __VLS_nonNullable(__VLS_5.slots).default;
            const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        }
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
                DEFAULT_ZOD_HANDLERS: DEFAULT_ZOD_HANDLERS,
                INPUT_COMPONENTS: INPUT_COMPONENTS,
                isValidConfig: isValidConfig,
                delegatedProps: delegatedProps,
                isDisabled: isDisabled,
                isHidden: isHidden,
                isRequired: isRequired,
                overrideOptions: overrideOptions,
            };
        },
        __typeProps: {},
    });
    return {};
})()) => ({}));
