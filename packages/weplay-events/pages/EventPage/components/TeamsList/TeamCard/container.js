import { useState } from 'react'

export const useTeamCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return {
    toggleExpanded,
    isExpanded,
  }
}
