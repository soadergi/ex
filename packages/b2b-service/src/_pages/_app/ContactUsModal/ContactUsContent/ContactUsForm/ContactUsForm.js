import originalAxios from 'axios'
import { FastField, Formik } from 'formik'
import React, { useMemo } from 'react'
import classNames from 'classnames'
import { socialLinks } from '_pages/_app/consts/socialLinks'
import { ROUTE_NAMES } from 'routes'
import { CONTACT_FORM_PATH } from 'contactFormPath'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { $filter } from 'weplay-core/$utils/$filter'
import { $map } from 'weplay-core/$utils/$map'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import useEnvLabel from 'weplay-core/hooks/useEnvLabel'
import { sameBaseAxios } from 'weplay-core/services/axios'

import Field from 'weplay-components/Field/Field'
import LegacyButton from 'weplay-components/LegacyButton'
import SocialIcons from 'weplay-components/SocialIcons'

import classes from './ContactUsForm.scss'
import { getContactUsValidationSchema } from './getContactUsValidationSchema'

const termsOfUse = {
  en: 'https://weplay.tv/legal/terms-of-service',
  ru: 'https://weplay.tv/ru/legal/terms-of-service',
}

const policy = {
  en: 'https://weplay.tv/legal/privacy-policy',
  ru: 'https://weplay.tv/ru/legal/privacy-policy',
}
const devHubspotConfig = {
  portalId: '6484148',
  formId: '1df38262-8d95-408a-9ec2-5b8f2bed7152',
}
const hubspotConfig = {
  localhost: devHubspotConfig,
  dev: devHubspotConfig,
  qa: {
    portalId: '6484148',
    formId: 'c456f1da-9c39-45c6-a0c3-91e3ee495b85',
  },
  prod: {
    portalId: '6484148',
    formId: '38d8f3a1-d813-44b1-a297-19ec22fc4c24',
  },
}

const getFieldsFromValues = values => values
  |> Object.entries
  |> $filter(([fieldName]) => fieldName !== 'hasAgreed')
  |> $map(([fieldName, value]) => ({
    name: fieldName === 'name' ? 'firstname' : fieldName,
    value,
  }))

const ContactUsForm = ({
  onSuccess,
  isInModal,
  routeInfo,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const envLabel = useEnvLabel()
  const { portalId, formId } = hubspotConfig[envLabel]
  const validationSchema = useMemo(() => getContactUsValidationSchema(t), [t])
  const initialValues = useMemo(() => ({
    name: '',
    email: '',
    message: '',
    hasAgreed: false,
  }), [])
  const contactFormSendPath = useMemo(() => (
    routeInfo.name === ROUTE_NAMES.PRESS_ROOM
      ? CONTACT_FORM_PATH.PRESS
      : CONTACT_FORM_PATH.BUSINESS
  ), [routeInfo.name])

  return (
    <div className={classNames(
      classes.block,
      {
        [classes.isInModal]: isInModal,
      },
    )}
    >
      <h4 className={classes.title}>{t('common.contactUs.form.title')}</h4>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            await sameBaseAxios.post(contactFormSendPath, values)
            const fields = getFieldsFromValues(values)
            await originalAxios.post(
              `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
              {
                fields,
                context: {
                  pageUri: window.location.href,
                  pageName: `${routeInfo.name}?isInModal=${isInModal}`,
                },
              },
              { withCredentials: false },
            )
            window.dataLayer.push({ event: 'Formsuccess' })
            onSuccess()
          } catch (err) {
            console.warn('err', err)
          }
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div className={classes.infoWrap}>
              <FastField
                type="text"
                name="name"
                placeholder={t('common.contactUs.form.field.name.placeholder')}
                label={t('common.contactUs.form.field.name.label')}
                component={Field}
              />
              <FastField
                type="email"
                name="email"
                placeholder={t('common.contactUs.form.field.email.placeholder')}
                label={t('common.contactUs.form.field.email.label')}
                component={Field}
              />
            </div>
            <FastField
              type="textarea"
              name="message"
              placeholder={t('common.contactUs.form.field.message.placeholder')}
              label={t('common.contactUs.form.field.message.label')}
              component={Field}
            />
            <FastField
              type="checkbox"
              name="hasAgreed"
              label={t('common.contactUs.form.field.agree.label')}
              component={Field}
            />
            <a
              target="_blank"
              rel="noreferrer noopener"
              className={classNames(
                classes.link,
                'u-mx-half',
              )}
              href={termsOfUse[locale]}
            >
              {t('common.contactUs.form.field.terms')}
            </a>
            <span className={classes.text}>{t('common.contactUs.form.field.union')}</span>
            <a
              target="_blank"
              rel="noreferrer noopener"
              className={classNames(
                classes.link,
                'u-mx-half',
              )}
              href={policy[locale]}
            >
              {t('common.contactUs.form.field.privacy')}
            </a>
            <LegacyButton
              type="submit"
              disabled={!props.isValid}
              className={classes.button}
            >
              {t('common.contactUs.form.button')}
            </LegacyButton>
          </form>
        )}
      />
      <div className={classes.socialWrap}>
        <p>{t('common.contactUs.form.socials.title')}</p>
        <SocialIcons
          className={classes.socials}
          links={socialLinks}
          iconSize="small"
          color="darkBlue"
          withMarginRight
        />
      </div>
    </div>
  )
}

export default withRouteInfo(React.memo(ContactUsForm))
