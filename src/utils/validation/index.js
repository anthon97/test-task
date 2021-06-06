export const name = [
  { required: true, message: 'Это обязательное поле', trigger: 'blur' },
]

export const email = [
  { required: true, message: 'Это обязательное поле', trigger: 'blur' },
  {
    type: 'email',
    message: 'Пожалуйста введите почту правильно',
    trigger: ['blur', 'change'],
  },
]

export const password = [
  { required: true, message: 'Это обязательное поле', trigger: 'blur' },
  { min: 6, message: 'Необходимо ввести минимум 6 символов', trigger: 'blur' },
]

export const password_confirmation = (validator) => [
  {
    validator,
    trigger: 'blur',
  },
  { required: true, message: 'Это обязательное поле', trigger: 'blur' },
]
