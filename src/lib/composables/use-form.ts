import { ref, reactive, toRaw } from 'vue'
import { ZodSchema, ZodError } from 'zod'

export function useForm<T extends Record<string, any>>(schema: ZodSchema<T>) {
  const formData = reactive<T>({} as T)
  const errors = ref<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>,
  )

  const validate = () => {
    try {
      schema.parse(toRaw(formData) as T)
      resetErrors()
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach(err => {
          const field = err.path[0] as keyof T
          errors.value[field] = err.message
        })
      }
      return false
    }
  }

  const validateField = (field: keyof T) => {
    try {
      schema.parse(toRaw(formData) as T)
      errors.value[field] = null
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field)
        errors.value[field] = fieldError ? fieldError.message : null
      }
    }
  }

  const resetErrors = () => {
    for (const key in errors.value) {
      errors.value[key] = null
    }
  }

  const handleSubmit = (callback: (data: T) => void) => {
    if (validate()) {
      callback(toRaw(formData) as T)
    }
  }

  return {
    formData,
    errors,
    handleSubmit,
    validateField,
  }
}
