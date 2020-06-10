import React, { useState, useMemo } from 'react'
import className from 'classnames'
import { Formik, Field, Form } from 'formik'
import originalAxios from 'axios'
import proposalsImage from 'components/Proposals/img/pattern.svg'
import { getFormCollapseValidationSchema } from 'helpers/getFormCollapseValidationSchema'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import FieldComponent from 'weplay-components/Field/Field'
import Button from 'weplay-components/Button'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'

import classes from './GoogleFormCollapse.scss'

const NAME_FIELD_ID = 'entry.1839331122'
const EMAIL_FIELD_ID = 'entry.486601731'
const GOOGLE_FORM_ID = '1FAIpQLSc9dh7p2XREjrPI6irWIgWoc_Ef4Ume3blH1sE5XIvFAUA6Cg'
const GOOGLE_FORM_LINK = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`

export const GoogleFormCollapse = ({
  title,
  text,
  openFormButtonText,
  submitButtonText,
  submittedTitle,
  submittedText,
}) => {
  const t = useTranslation()
  const [isFormOpen, setFormOpen] = useState(false)
  const [isFormSent, setFormSent] = useState(false)
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const validationSchema = useMemo(() => getFormCollapseValidationSchema(t), [t])
  const initialValues = useMemo(() => ({
    name: '',
    email: '',
    hasAgreed: false,
  }), [])
  const handleSubmit = async (values) => {
    if (isFormOpen) {
      try {
        await originalAxios
          .get(`${GOOGLE_FORM_LINK}?${NAME_FIELD_ID}=${values.name}&${EMAIL_FIELD_ID}=${values.email}`)
      } catch (err) {
        console.warn('err', err)
      }
      setFormOpen(false)
      setFormSent(true)
    }
  }
  const buttonText = isFormOpen ? t(submitButtonText) : t(openFormButtonText)

  return (
    <div className={classes.block}>
      {!isTabletWidth && (
      <Image
        className={className(
          'o-img-responsive',
          classes.bgImage,
        )}
        src={proposalsImage}
      />
      )}
      {isFormSent
        ? (
          <div className={classes.success}>
            <div className={classes.successIcon}>
              <Icon
                iconName="check"
                size="large"
                className={classes.icon}
              />
            </div>
            <h2>{t(submittedTitle)}</h2>
            <p className={classes.text}>{t(submittedText)}</p>
          </div>
        )
        : (
          <>
            <div className={classes.titleWrap}>
              <h3 className={classes.title}>{t(title)}</h3>
              <p className={classes.text}>{t(text)}</p>
            </div>

            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={values => handleSubmit(values)}
            >
              {props => (
                <Form>
                  <div className={className(
                    classes.formFieldsWrapper,
                    {
                      [classes.isOpen]: isFormOpen,
                    },
                  )}
                  >
                    <Field
                      type="text"
                      name="name"
                      placeholder={t('common.contactUs.form.field.name.placeholder')}
                      label={t('common.contactUs.form.field.name.label')}
                      component={FieldComponent}
                    />
                    <Field
                      type="email"
                      name="email"
                      placeholder={t('common.contactUs.form.field.email.placeholder')}
                      label={t('common.contactUs.form.field.email.label')}
                      component={FieldComponent}
                    />
                    <Field
                      type="checkbox"
                      name="hasAgreed"
                      label={t('services.mediaRights.formCollapse.field.agree.label')}
                      component={FieldComponent}
                    />
                  </div>
                  <Button
                    type="submit"
                    className={classes.button}
                    disabled={isFormOpen && !props.isValid}
                    onClick={() => setFormOpen(true)}
                  >
                    {buttonText}
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
    </div>
  )
}

export default GoogleFormCollapse
