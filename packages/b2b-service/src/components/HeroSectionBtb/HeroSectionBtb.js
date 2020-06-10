import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import hexToGradient from 'weplay-core/helpers/hexToGradient'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Label from 'weplay-components/Label'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'

import CTAButton from 'components/CTAButton/CTAButton'

import classes from './HeroSectionBtb.scss'

const divider = ' - '

const HeroSectionBtb = ({
  image,
  bgColor,
  labels,
  startDate,
  endDate,
  title,
  text,
  buttonText,
  goToLink,
  isLightTheme,
  logoImage,
}) => {
  const t = useTranslation()
  const isLogoExist = Boolean(logoImage)
  const isLabelsExist = Boolean(labels?.length)
  return (
    <div
      className={classNames(
        classes.block,
        isLightTheme && classes.lightTheme,
      )}
      style={
       image
         ? { backgroundImage: `url(${image})` }
         : { background: hexToGradient(bgColor) }
      }
    >
      <div className={classes.content}>
        <div className={classes.wrap}>
          {isLogoExist && (
            <Image
              className={classNames(
                'o-img-responsive',
                classes.image,
              )}
              src={logoImage}
            />
          )}
          {isLabelsExist && (
            <div className="u-mb-2">
              {labels.map(label => (
                <Label
                  color="blue"
                  className={classes.label}
                >
                  {label}
                </Label>
              ))}
            </div>
          )}

          {startDate && endDate && (
          // ToDo replace it shit to EventDuration component
            <div className="u-mb-6">
              <p>
                <Icon
                  iconName="calendar"
                />
              </p>
              <LocalizedMoment
                dateTime={startDate}
                formatKey="short"
              />
              <span>{divider}</span>
              <LocalizedMoment
                dateTime={endDate}
                formatKey="short"
              />
            </div>
          )}

          <h1 className={classes.title}>{title}</h1>

          {text && (
            <p className={classes.text}>{text}</p>
          )}

          {buttonText && (
            <CTAButton
              className={classes.button}
              text={buttonText}
            />
          )}

          {goToLink && (
            <Link
              to={goToLink}
              className={classes.link}
            >
              {t('mainPage.moreInfo.button')}
              <Icon
                iconName="arrow-link"
                className="u-ml-1"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(HeroSectionBtb)
