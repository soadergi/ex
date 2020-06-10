import React, { useState } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import Label from 'weplay-components/Label'
import HeadLine from 'weplay-components/HeadLine'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import Button from 'weplay-components/Button'

import classes from './CompletedProjects.scss'

const MAX_INITIAL_PROJECTS = 4

const CompletedProjects = ({ allProjects }) => {
  const t = useTranslation()
  const [visibleProjects, setVisibleProjects] = useState(allProjects.slice(0, MAX_INITIAL_PROJECTS))
  const showAllProjects = () => setVisibleProjects(allProjects)

  return (
    <Section paddingY={PADDING_Y.SM}>
      <ContentContainer>
        <HeadLine
          className="u-text-center"
          title={t('projectsPage.completedProjects.title')}
        />
        <div className={classes.block}>
          <div className={classes.wrapContent}>
            {visibleProjects.map(project => (
              <Link
                className={classes.item}
                to={`/projects/${project.event.url}-${project.event.id}`}
                key={project.tournamentTitle}
              >
                <Image
                  className={classes.image}
                  src={project.coverImage.path}
                  alt={project.coverImage.attributes.path}
                />

                <div className={classes.infoWrap}>
                  {project.event.tournamentData.labels?.map(label => (
                    <Label
                      color="blue"
                      className="u-mr-1"
                    >
                      {label}
                    </Label>
                  ))}
                  <h4 className={classes.title}>{project.event.title}</h4>
                </div>
              </Link>
            ))}
          </div>

          {visibleProjects.length < allProjects.length && (
            <div className="u-text-center u-mt-6">
              <Button
                className={classes.button}
                icon="load-more"
                onClick={showAllProjects}
              >
                {t('projectsPage.completedProjects.button.text')}
              </Button>
            </div>
          )}
        </div>
      </ContentContainer>
    </Section>
  )
}

export default React.memo(CompletedProjects)
