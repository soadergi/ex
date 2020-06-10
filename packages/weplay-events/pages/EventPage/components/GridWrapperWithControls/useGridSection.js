import {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'

import { $prop } from 'weplay-core/$utils/$prop'

import { gridSelectors } from 'weplay-events/reduxs/grids'
import useStandings from 'weplay-events/pages/EventPage/hooks/useStandings'

function getActiveStageIndex(stages) {
  const activeStageIndex = stages.findIndex(stage => stage.isActive)
  return activeStageIndex === -1 ? 0 : activeStageIndex
}

export default function useGridSection() {
  const { tournamentStages } = useStandings()

  const activeStageIndex = useMemo(() => getActiveStageIndex(tournamentStages), [tournamentStages])

  const stageOptions = useMemo(
    () => (
      tournamentStages.map(stage => ({
        label: stage.name,
        value: stage.name,
      }))
    ),
    [tournamentStages],
  )

  const [activeStage, setActiveStage] = useState(tournamentStages[activeStageIndex])

  useEffect(() => {
    setActiveStage(tournamentStages[activeStageIndex])
  }, [tournamentStages])

  const allGrids = useSelector(gridSelectors.allRecordsSelector)

  const grids = useMemo(
    () => {
      if (!activeStage) {
        return []
      }

      const activeStageGridIds = activeStage.relationships.grids.map($prop('id'))
      return allGrids.filter(grid => activeStageGridIds.includes(grid.id))
    },
    [activeStage, allGrids],
  )

  const tabsOptions = useMemo(
    () => grids.map(grid => ({
      id: grid.id,
      value: grid.name,
    })),
    [grids],
  )

  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {
    if (!tabsOptions) {
      return
    }

    const currentActiveGrid = grids.find(grid => grid.extraInfo?.active)

    if (currentActiveGrid) {
      setActiveTab(tabsOptions.find(tab => tab.id === currentActiveGrid.id))
    } else {
      setActiveTab(tabsOptions[0])
    }
  }, [tabsOptions, grids])

  const activeGrid = useMemo(
    () => grids.find(grid => grid.id === activeTab?.id),
    [activeTab, grids],
  )

  const handleStageChange = useCallback(
    (newStageValue) => {
      setActiveStage(
        tournamentStages.find(stage => stage.name === newStageValue),
      )
    },
    [setActiveStage, tournamentStages],
  )

  return {
    activeStage,
    stageOptions,
    tabsOptions,
    handleStageChange,
    setActiveTab,
    activeTab,
    activeGrid,
  }
}
