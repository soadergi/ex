import * as R from 'ramda'
import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import config, { TwitchUrl } from 'weplay-core/config'
import { getTwitchChannelId } from 'weplay-core/helpers/getTwitchChannelId'
import { axios } from 'weplay-core/services/axios'

const withStreams = (WrappedComponent) => {
  const HOC = class extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        streams: [],
      }
    }

    componentDidMount() {
      if (this.props.videoUrl) {
        this.getTwitchStream()
      } else {
        this.setState({
          streams: [],
        })
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.videoUrl !== this.props.videoUrl && this.props.videoUrl) {
        this.getTwitchStream()
      }
    }

      getTwitchStream = () => {
        const streamUrl = this.props.videoUrl
        if (!streamUrl.includes('https://www.twitch.tv/')) {
          throw new Error('not a twitch url')
        }
        const channelId = getTwitchChannelId(streamUrl)

        return axios.get(config.twitchApiProxyService.url, {
          params: {
            query: `${TwitchUrl}/streams?user_login=${channelId}`,
          },
          withCredentials: false,
        })
          .then((twitchStreamResponse) => {
            this.setState({
              streams: twitchStreamResponse?.data?.data,
            })
          })
          .catch(error => console.warn(error))
      };

      render() {
        const { streams } = this.state
        const isStreamLive = !R.isEmpty(streams)

        return (
          <WrappedComponent
            {...this.props}
            streams={streams}
            isStreamLive={isStreamLive}
          />
        )
      }
  }
  HOC.propTypes = {
    videoUrl: PropTypes.string,
  }
  HOC.defaultProps = {
    videoUrl: null,
  }
  return HOC
}

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withStreams,
)

export default container
