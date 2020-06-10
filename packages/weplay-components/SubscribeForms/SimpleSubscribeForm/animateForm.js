import {
  formClassNames,
  DURATION_ONE,
  DURATION_TWO,
} from '../consts'

const animateForm = submitForm => import('gsap').then(({
  TimelineLite,
  Power1,
}) => {
  const tl = new TimelineLite()
  const ease = Power1.easeInOut

  const form = submitForm.querySelector(`.${formClassNames.form}`)
  const formHeight = form.offsetHeight
  const sbsFormInput = form.querySelector(`.${formClassNames.inputGroup}`)
  const sbsFormCheckbox = form.querySelector(`.${formClassNames.checkbox}`)
  const sbsFormButton = form.querySelector(`.${formClassNames.submitBtn}`)
  const sbsFormButtonText = form.querySelector(`.${formClassNames.submitText}`)
  const sbsFormButtonIcon = form.querySelector(`.${formClassNames.submitIcon}`)
  const subscribeSuccess = form.querySelector(`.${formClassNames.blockSuccess}`)
  const subscribeSuccessTitle = form.querySelector(`.${formClassNames.successTitle}`)
  const subscribeSuccessSubTitle = form.querySelector(`.${formClassNames.successText}`)
  const subscribeFormInputs = form.querySelector(`.${formClassNames.inputsWrap}`)
  const subscribeSubmit = form.querySelector(`.${formClassNames.blockSubmit}`)

  return tl
    .to(form, 0, { height: formHeight, ease }, 'label')
    .to(sbsFormInput,
      DURATION_ONE,
      { y: -8, opacity: 0, ease },
      'label')
    .to(sbsFormCheckbox,
      DURATION_ONE,
      { y: -8, opacity: 0, ease },
      'label+=0.2')
    .to(sbsFormButtonText,
      DURATION_ONE,
      { scale: 0, opacity: 0, ease },
      'label')
    .to(sbsFormButton,
      DURATION_TWO,
      { width: '2.5rem', 'border-radius': '50%', ease },
      'label')
    .to(sbsFormButtonIcon,
      DURATION_ONE,
      { scale: 1, opacity: 1, ease },
      'label+=0.2')
    .to(subscribeFormInputs,
      DURATION_ONE,
      { width: 0, height: 0, ease },
      'label+=0.4')
    .to(subscribeSubmit, 1, { width: '100%', ease }, 'label+=0.6')
    .to(subscribeSuccess, 0, { y: 0, ease }, 'label+=0.6')
    .to(subscribeSuccessTitle,
      DURATION_ONE,
      { y: 0, opacity: 1, ease },
      'label+=0.6')
    .to(subscribeSuccessSubTitle,
      DURATION_ONE,
      { y: 0, opacity: 1, ease },
      'label+=0.8')
})

export default animateForm
