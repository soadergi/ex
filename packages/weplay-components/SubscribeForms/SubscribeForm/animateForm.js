import {
  formClassNames,
  DURATION_ONE,
  DURATION_TWO,
  DURATION_THREE,
} from '../consts'

const animateForm = submitForm => import('gsap').then(({
  TimelineLite,
  Power1,
}) => {
  const tl = new TimelineLite()
  const ease = Power1.easeInOut

  const form = submitForm.querySelector(`.${formClassNames.form}`)
  const formHeight = form.offsetHeight
  const sbsFormInput = form.querySelector(`.${formClassNames.inputsWrap}`)
  const sbsFormCheckbox = form.querySelector(`.${formClassNames.checkbox}`)
  const sbsFormButton = form.querySelector(`.${formClassNames.submitBtn}`)
  const sbsFormButtonText = form.querySelector(`.${formClassNames.submitText}`)
  const sbsFormButtonIcon = form.querySelector(`.${formClassNames.submitIcon}`)
  const subscribeSuccess = form.querySelector(`.${formClassNames.blockSuccess}`)
  const subscribeSuccessTitle = form.querySelector(`.${formClassNames.successTitle}`)
  const subscribeSuccessSubTitle = form.querySelector(`.${formClassNames.successText}`)
  const subscribeFormInputs = form.querySelector(`.${formClassNames.inputGroup}`)
  const subscribeSubmit = form.querySelector(`.${formClassNames.blockSubmit}`)

  return tl
    .to(form, 0, {
      height: formHeight,
      ease,
    }, 'label')
    .to(sbsFormInput, DURATION_ONE, {
      opacity: 0,
      width: 0,
      height: 0,
      ease,
    }, 'label')
    .to(sbsFormCheckbox, DURATION_ONE, {
      y: 15,
      opacity: 0,
      ease,
    }, 'label+=0.3')
    .to(sbsFormButtonText, DURATION_ONE, {
      scale: 0,
      opacity: 0,
      ease,
    }, 'label')
    .to(sbsFormButton, DURATION_ONE, {
      width: '2.5rem',
      'border-radius': '50%',
      ease,
    }, 'label')
    .to(sbsFormButtonIcon, DURATION_ONE, {
      scale: 1,
      opacity: 1,
      ease,
    }, 'label+=0.3')
    .to(subscribeFormInputs, DURATION_THREE, {
      display: 'none',
      ease,
    }, 'label+=0.5')
    .to(subscribeSubmit, 1, {
      width: '100%',
      ease,
    }, 'label+=0.5')
    .to(subscribeSuccess, 0, {
      left: '2.5rem',
      ease,
    }, 'label+=0.5')
    .to(subscribeSuccessTitle, DURATION_TWO, {
      y: 0,
      opacity: 1,
      ease,
    }, 'label+=1.1')
    .to(subscribeSuccessSubTitle, DURATION_TWO, {
      y: 0,
      opacity: 1,
      ease,
    }, 'label+=1.4')
})

export default animateForm
