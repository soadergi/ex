import React, { useCallback, useState } from 'react'
import { idToMainImage } from '_dynamic-pages/project/mocks/idToMainImage'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import transliterate from 'weplay-core/helpers/translit'

import LegacyButton from 'weplay-components/LegacyButton'
import Image from 'weplay-components/Image'
import Label from 'weplay-components/Label'
import Link from 'weplay-components/Link'

import classes from './CompletedProjects.scss'

const buttonModifiers = ['blockBorderBlue']
const archiveIdToProjectId = {
  // Minor2020 id=1 on PES
  45: 45,
  // Forge of Masters. WePlay! League. LAN finals
  14: 14,
  // Reshuffle Madness 2019
  8: 13,
  // WePlay! Dota Underlords Open
  3: 12,

  // Forge of Master LAN !!! NO DATA ON ES !!!
  4: 999,

  // Tug of War: Dire
  1: 8,
  // Forge of Masters Online
  5: 11,
  // Tug of War: Radiant
  2: 7,
  // Lock and Load
  6: 5,
  // Winter Madness
  7: 4,
  // Valentine Madness
  9: 6,
  // Artifact Strength
  10: 1,
  // Artifact Agility
  12: 2,
  // Reshuffle Madness 2018
  13: 0,
}

const CompletedProjects = ({
  allProjects,
}) => {
  const [visibleProjects, setVisibleProjects] = useState(allProjects.slice(0, 4))
  const showAll = useCallback(() => {
    setVisibleProjects(allProjects)
  }, [allProjects])
  const t = useTranslation()

  return (
    <div className={classes.block}>
      <div className={classes.wrapContent}>
        {visibleProjects.map(archiveProject => (
          <Link
            className={classes.item}
            to={`/projects/${transliterate(archiveProject.tournamentTitle)}`}
            key={archiveProject.tournamentTitle}
          >
            <Image
              className={classes.image}
              src={idToMainImage[archiveIdToProjectId[archiveProject.id]]}
            />
            <div className={classes.infoWrap}>
              {archiveProject.labels.map(label => (
                <Label
                  color="blue"
                  className="u-mr-1"
                >
                  {label}
                </Label>
              ))}
              <h4 className={classes.title}>{archiveProject.tournamentTitle}</h4>
            </div>
          </Link>
        ))}
      </div>
      {visibleProjects.length < allProjects.length && (
        <div className="u-text-center u-mt-6">
          <LegacyButton
            className={classes.button}
            modifiers={buttonModifiers}
            icon="load-more"
            text={t('projectsPage.completedProjects.button.text')}
            onClick={showAll}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(CompletedProjects)
