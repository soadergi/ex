const yup = require('yup')
// TODO: getContactUsValidationSchema find good place for shared node-react modules
module.exports.getContactUsValidationSchema = t => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, t('common.forms.validation.error.tooShort', { min: 3 }))
    .max(50, t('common.forms.validation.error.tooLong', { max: 50 }))
    .required(t('common.forms.validation.error.required')),
  email: yup.string()
    .trim()
    .email(t('common.forms.validation.error.invalidEmail'))
    .required(t('common.forms.validation.error.required')),
  message: yup.string()
    .trim()
    .max(500, t('common.forms.validation.error.tooLong', { max: 500 }))
    .required(t('common.forms.validation.error.required')),
  hasAgreed: yup.bool().oneOf([true], 'common.contactUs.form.field.hasAgreed.error.invalid'),
})
