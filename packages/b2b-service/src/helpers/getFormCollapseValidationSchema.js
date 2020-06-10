const yup = require('yup')
// eslint-disable-next-line import/extensions

module.exports.getFormCollapseValidationSchema = t => yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, t('common.forms.validation.error.tooShort', { min: 3 }))
    .max(50, t('common.forms.validation.error.tooLong', { max: 50 }))
    .required(t('common.forms.validation.error.required')),
  email: yup.string()
    .trim()
    .email(t('common.forms.validation.error.invalidEmail'))
    .required(t('common.forms.validation.error.required')),
  hasAgreed: yup.bool().oneOf([true], 'common.contactUs.form.field.hasAgreed.error.invalid'),
})
