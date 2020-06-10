import React, { Fragment, PureComponent } from 'react'

import soundUrl from './matchAlert.mp3'

const withMatchAlert = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    constructor(props) {
      super(props)
      this.matchAlertAudio = React.createRef()
    }

    playMatchAlertSound = () => {
      const playPromise = this.matchAlertAudio.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error(`Error in playing match alert: ${error}`)
        })
      }
    }

    render() {
      const { ...restProps } = this.props
      return (
        <>
          <audio
            ref={this.matchAlertAudio}
            autoPlay={false}
          >
            <source
              src={soundUrl}
              type="audio/mp3"
            />
            <track
              default
              kind="captions"
              srcLang="en"
              src=""
            />
          </audio>
          <WrappedComponent
            {...restProps}
            playMatchAlertSound={this.playMatchAlertSound}
          />
        </>
      )
    }
  }

  return HOC
}

export default withMatchAlert
