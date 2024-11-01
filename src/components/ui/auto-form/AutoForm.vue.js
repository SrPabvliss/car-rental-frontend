import { Form } from '@/components/ui/form';
import { toTypedSchema } from '@vee-validate/zod';
import { computed, toRefs } from 'vue';
import AutoFormField from './AutoFormField.vue';
import { provideDependencies } from './dependencies';
import { getBaseSchema, getBaseType, getDefaultValueInZodStack, getObjectFormSchema } from './utils';
export default ((__VLS_props, __VLS_ctx, __VLS_expose, __VLS_setup = (async () => {
    const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
    let __VLS_typeProps;
    const props = defineProps();
    const emits = defineEmits();
    const { dependencies } = toRefs(props);
    provideDependencies(dependencies);
    const shapes = computed(() => {
        // @ts-expect-error ignore {} not assignable to object
        const val = {};
        const baseSchema = getObjectFormSchema(props.schema);
        const shape = baseSchema.shape;
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
                schema: baseItem,
            };
        });
        return val;
    });
    const fields = computed(() => {
        // @ts-expect-error ignore {} not assignable to object
        const val = {};
        for (const key in shapes.value) {
            const shape = shapes.value[key];
            val[key] = {
                shape,
                config: props.fieldConfig?.[key],
                fieldName: key,
            };
        }
        return val;
    });
    const formComponent = computed(() => props.form ? 'form' : Form);
    const formComponentProps = computed(() => {
        if (props.form) {
            return {
                onSubmit: props.form.handleSubmit(val => emits('submit', val)),
            };
        }
        else {
            const formSchema = toTypedSchema(props.schema);
            return {
                keepValues: true,
                validationSchema: formSchema,
                onSubmit: (val) => emits('submit', val),
            };
        }
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
        const __VLS_0 = ((__VLS_ctx.formComponent));
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...(__VLS_ctx.formComponentProps), }));
        const __VLS_2 = __VLS_1({ ...(__VLS_ctx.formComponentProps), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        var __VLS_6 = {
            fields: ((__VLS_ctx.fields)),
        };
        for (const [shape, key] of __VLS_getVForSourceType((__VLS_ctx.shapes))) {
            var __VLS_7 = {
                shape: ((shape)), fieldName: ((key.toString())), config: __VLS_ctx.fieldConfig?.[key],
            };
            var __VLS_8 = key.toString();
            // @ts-ignore
            [AutoFormField,];
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(AutoFormField, new AutoFormField({ config: __VLS_ctx.fieldConfig?.[key], fieldName: ((key.toString())), shape: ((shape)), }));
            const __VLS_10 = __VLS_9({ config: __VLS_ctx.fieldConfig?.[key], fieldName: ((key.toString())), shape: ((shape)), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
            __VLS_nonNullable(__VLS_5.slots).default;
        }
        __VLS_nonNullable(__VLS_5.slots).default;
        var __VLS_14 = {
            shapes: ((__VLS_ctx.shapes)),
        };
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
                AutoFormField: AutoFormField,
                shapes: shapes,
                fields: fields,
                formComponent: formComponent,
                formComponentProps: formComponentProps,
            };
        },
        __typeEmits: {},
        __typeProps: {},
    });
    return {};
})()) => ({}));
