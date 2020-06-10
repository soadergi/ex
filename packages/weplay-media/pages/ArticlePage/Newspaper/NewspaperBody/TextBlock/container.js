import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import InstagramPost from 'weplay-components/InstagramPost/loadable'

import ImageScale from '../../components/ImageScale/ImageScale'

import {
  INSTAGRAM_CONTAINER,
  QUIZ_CONTAINER,
  QUIZ_SCRIPT_URL,
  TWITTER_CONTAINER,
} from './config'
import TweetWidget from './TweetWidget/loadable'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),

  withHandlers(() => {
    let contentRef
    return ({
      handleContentRef: () => (ref) => { contentRef = ref },
      handleEmbedContent: ({
        globalScope,
        content,
      }) => () => {
        if (!contentRef) return
        const imageElements = contentRef.getElementsByTagName('img')
        Array
          .from(imageElements)
          .forEach((imageTag) => {
            const temp = globalScope.document.createElement('span')
            ReactDOM.render((
              <ImageScale
                imageAlt={imageTag.alt}
                imageSrc={imageTag.src}
                className={imageTag.className}
              />
            ), temp)
            imageTag.parentNode.replaceChild(temp, imageTag)
          })

        const twitterElements = contentRef.getElementsByClassName(TWITTER_CONTAINER)
        Array
          .from(twitterElements)
          .map(item => item && ReactDOM.render(<TweetWidget id={item.id} />, item))

        const instagramElements = contentRef.getElementsByClassName(INSTAGRAM_CONTAINER)
        Array
          .from(instagramElements)
          .map(item => item.innerText && ReactDOM.render(<InstagramPost url={item.innerText} />, item))

        if (content.includes(QUIZ_CONTAINER)) {
          const script = globalScope.document.createElement('script')
          script.src = QUIZ_SCRIPT_URL
          globalScope.document.head.appendChild(script)
        }
      },
    })
  }),

  lifecycle({
    componentDidMount() {
      this.props.handleEmbedContent()
    },

    componentDidUpdate(prevProps) {
      if (this.props.newsId !== prevProps.newsId) {
        this.props.handleEmbedContent()
      }
    },
  }),
)

export default container
