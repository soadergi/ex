import classNames from 'classnames'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { isReadNewsLoadingSelector } from 'weplay-core/reduxs/news/reducer'
import { setTooltipViewed } from 'weplay-core/reduxs/tooltips/actions'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import Icon from 'weplay-components/Icon'
import Tooltip from 'weplay-components/Tooltip'

import CategoryTag from './CategoryTag/CategoryTag'
import styles from './CategoryTags.scss'

const saveButtonTooltip = {
  path: 'categories/saveButton',
  confirmBtn: true,
}

const CategoryTags = ({
  tags,
  handleTagSelect,
  getIsTagActive,
  resetSelectedTags,
  isSelectedTagsEmpty,
}) => {
  const t = useTranslation()
  const dispatch = useDispatch()

  const [isCollapsed, setIsCollapsed] = useState(true)
  const isLoggedIn = useSelector(isLoggedInSelector)
  const isNewsLoading = useSelector(isReadNewsLoadingSelector)
  const handleSavePreferencesButtonClick = () => {
    dispatch(triggerSignUpModal())
    dispatch(setTooltipViewed(saveButtonTooltip))
  }

  const handleTagsListToggle = () => {
    setIsCollapsed(state => !state)
  }

  const tagsListToggleText = t(`mediaCore.categoryPage.${!isCollapsed ? 'showLess' : 'showMore'}`)
  return (
    <>
      <Tooltip
        tooltip={saveButtonTooltip}
        position="bottomCenter"
      >
        <ul className={classNames(
          styles.list,
          { [styles.collapsed]: isCollapsed },
        )}
        >
          {tags.map(tag => (
            <CategoryTag
              tag={tag}
              key={tag.name}
              isTagActive={getIsTagActive(tag)}
              onClick={() => handleTagSelect(tag)}
              isDisabled={isNewsLoading}
            />
          ))}
        </ul>
      </Tooltip>
      <div className={styles.controls}>
        <Button
          priority={BUTTON_PRIORITY.LINK}
          className={classNames(
            styles.button,
            { [styles.isActive]: !isCollapsed },
          )}
          onClick={handleTagsListToggle}
        >
          {tagsListToggleText}
          <Icon
            className={styles.icon}
            iconName="arrow-expand"
            size="small"
          />
        </Button>
        <div>
          {!isLoggedIn && (
            <Button
              color={BUTTON_COLOR.CTA}
              className={styles.button}
              onClick={handleSavePreferencesButtonClick}
            >
              {t('mediaCore.categoryPage.savePreferences')}
            </Button>
          )}
          <Button
            priority={BUTTON_PRIORITY.SECONDARY}
            color={BUTTON_COLOR.WHITE}
            icon="reset"
            className={styles.button}
            onClick={resetSelectedTags}
            disabled={isSelectedTagsEmpty}
          >
            {t('mediaCore.categoryPage.resetPreferences')}
          </Button>
        </div>
      </div>
    </>
  )
}

CategoryTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  handleTagSelect: PropTypes.func.isRequired,
  getIsTagActive: PropTypes.func.isRequired,
  resetSelectedTags: PropTypes.func.isRequired,
  isSelectedTagsEmpty: PropTypes.bool.isRequired,
}

export default React.memo(CategoryTags)
