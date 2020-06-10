import React from 'react'
import container from 'weplay-competitive/pages/SteamVerifyPage/container'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

const SteamVerifyPage = () => <div data-qa-id={dataQaIds.pages[NAMES.STEAM_VERIFY].container} />

export default container(SteamVerifyPage)
