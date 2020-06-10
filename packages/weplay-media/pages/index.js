import React from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { NAMES, pathForRoute } from 'weplay-core/routes'

import BrowserDevRoute from 'weplay-components/BrowserDevRoute/BrowserDevRoute'

import MediaSubHeaderPortal from '../components/MediaSubHeaderPortal/MediaSubHeaderPortal'

import container from './container'
import MediaPage from './MediaPage/loadable'
import ArticlePage from './ArticlePage/loadable'
import AuthorPage from './AuthorPage/loadable'
import TagsPage from './TagsPage/loadable'
import TagPage from './TagPage/loadable'
import SpecialTagPage from './SpecialTagPage/loadable'
import SpecialTagsPage from './SpecialTagsPage/loadable'
import UnusualTagPage from './UnusualTagPage/loadable'
import NoLangPage from './NoLangPage/loadable'
import ColumnistsPage from './ColumnistsPage/loadable'
import GiveawayPage from './GiveawayPage/loadable'
import CategoryPage from './CategoryPage/loadable'
import CharactersPage from './CharactersPage/loadable'
import CharacterPage from './CharacterPage/loadable'

const MediaProject = ({
  currentLanguagePrefix,
  location: { pathname },
}) => (
  <>
    <MediaSubHeaderPortal />

    <Switch>
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.NO_LANG)}`}
        component={NoLangPage}
      />
      {!pathname.includes('no-language-page-') && (
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.ARTICLE_SHOW)}`}
        component={ArticlePage}
      />
      )}
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.MEDIA)}`}
        component={MediaPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.AUTHOR)}`}
        component={AuthorPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.TAGS)}`}
        component={TagsPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.TAG_SHOW)}`}
        component={TagPage}
      />

      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.UNUSUAL_TAG)}`}
        component={UnusualTagPage}
      />

      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.SPECIAL_TAG)}`}
        component={SpecialTagPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.SPECIAL_TAGS)}`}
        component={SpecialTagsPage}
      />

      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.COLUMNISTS)}`}
        component={ColumnistsPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.GIVEAWAY)}`}
        component={GiveawayPage}
      />
      <Route
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.CATEGORIES)}`}
        component={CategoryPage}
      />
      <BrowserDevRoute
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.CHARACTERS)}`}
        component={CharactersPage}
      />
      <BrowserDevRoute
        exact
        path={`${currentLanguagePrefix}/${pathForRoute(NAMES.CHARACTER)}`}
        component={CharacterPage}
      />
      <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
    </Switch>
  </>
)

MediaProject.propTypes = {
  currentLanguagePrefix: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default container(MediaProject)
