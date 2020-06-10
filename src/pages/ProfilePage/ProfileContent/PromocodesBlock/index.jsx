import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'

import styles from './styles.scss'
import container from './container'
import Table from './Table'

const PromocodesBlock = ({
  // required props
  activeTournamentTitle,

  // container props
  i18nTexts,
  promocodesList,
  handlerShowAllPromoCodes,
  linkToCodesPage,
  showAllCodesButtonText,
  hasActivatedPromocodes,
  isPromocodesCountHidden,
  background,

  // optional props
}) => (
  <div
    className={styles.block}
    style={background}
  >

    <div className={styles.wrapper}>
      <p className={styles.title}>
        {`${activeTournamentTitle} ${i18nTexts.cabinet.promoTitle}`}
      </p>

      {hasActivatedPromocodes && (
        <>
          <Table
            promocodesList={promocodesList}
          />

          {isPromocodesCountHidden && (
            <div className="u-text-center">
              <a
                onClick={handlerShowAllPromoCodes}
                rel="noreferrer noopener"
                className={styles.button}
              >
                {showAllCodesButtonText}
              </a>
            </div>
          )}
        </>
      )}

      {!hasActivatedPromocodes && (
        <>
          <p className={styles.text}>{i18nTexts.cabinet.promoFirstText}</p>

          <Link
            to={linkToCodesPage}
            className={styles.button}
          >
            {i18nTexts.cabinet.promoFirstBtn}
          </Link>
        </>
      )}
    </div>
  </div>
)

PromocodesBlock.propTypes = {
  // required props
  activeTournamentTitle: PropTypes.string.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  handlerShowAllPromoCodes: PropTypes.func.isRequired,
  promocodesList: PropTypes.arrayOf(PropTypes.shape({
    activated_date: PropTypes.string,
    id: PropTypes.number,
    promocode: PropTypes.string,
    promocode_id: PropTypes.number,
    status: PropTypes.string,
    user_id: PropTypes.number,
  })).isRequired,
  linkToCodesPage: PropTypes.string.isRequired,
  background: PropTypes.shape({}),
  showAllCodesButtonText: PropTypes.string.isRequired,
  hasActivatedPromocodes: PropTypes.bool.isRequired,
  isPromocodesCountHidden: PropTypes.bool.isRequired,
}

PromocodesBlock.defaultProps = {
  background: {},
}

export default container(PromocodesBlock)
