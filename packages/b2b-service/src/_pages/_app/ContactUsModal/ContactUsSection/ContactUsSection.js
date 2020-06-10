import React, { useCallback, useState } from 'react'

import ContactUsContent from '../ContactUsContent/ContactUsContent'

import classes from './ContactUsSection.scss'

const ContactUsSection = () => {
  const [isFormVisible, setFormVisible] = useState(true)
  const hideForm = useCallback(() => setFormVisible(false), [setFormVisible])

  return isFormVisible && (
    <div className={classes.block}>
      <ContactUsContent onConfirm={hideForm} />
    </div>
  )
}

export default React.memo(ContactUsSection)
