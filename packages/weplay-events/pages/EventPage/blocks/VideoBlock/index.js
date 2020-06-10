import React, {
  useEffect,
  useRef,
} from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import MediaPlayer from 'weplay-components/MediaPlayer'
import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { useEventsPageRefsProvider } from 'weplay-events/pages/EventPage/EventsPageRefsProvider'
import { useStreamsPlayer } from 'weplay-events/pages/EventPage/components/StreamsPlayer/container'
import StreamPreview from 'weplay-events/pages/EventPage/components/StreamsPlayer/StreamPreview'
import styles from 'weplay-events/pages/EventPage/components/StreamsPlayer/styles.scss'

export default function VideoBlock() {
  const t = useTranslation()
  const { locale } = useLocale()

  const {
    previewStreams,
    currentStream,
    clickHandler,
    isPlayerVisible,
    currentStreamTitle,
    setCurrentStreamTitle,
  } = useStreamsPlayer()

  const blockRef = useRef(null)
  const { setStreamsBlockRef } = useEventsPageRefsProvider()

  useEffect(() => { setStreamsBlockRef(blockRef) }, [blockRef])

  if (!isPlayerVisible) return null

  return (
    <Section className="u-py-8">
      <ContentContainer>
        <div className={styles.header}>
          <p className={styles.title}>
            {t('events.streamPlayer.title')}

            <span className={styles.text}>{currentStreamTitle}</span>
          </p>

          <Button
            className={styles.button}
            color={BUTTON_COLOR.TWITCH}
            href={`https://www.twitch.tv/weplayesport_${[locale]}`}
            icon="twitch"
          >
            {t('events.twitchButton.text')}
          </Button>
        </div>

        <MediaPlayer
          url={currentStream.url}
          blockRef={blockRef}
          withChat
        />

        <div className={styles.wrap}>
          {previewStreams.map(stream => (
            <StreamPreview
              key={stream.id}
              stream={stream}
              isActive={currentStream.id === stream.id}
              clickHandler={clickHandler}
              setCurrentStreamTitle={setCurrentStreamTitle}
            />
          ))}
        </div>
      </ContentContainer>
    </Section>
  )
}
