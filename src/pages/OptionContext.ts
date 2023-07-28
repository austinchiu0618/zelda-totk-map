import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type OptionType = {
  showCompleted: boolean,
  showPlaceName: boolean
}

export type OptionContextType = {
  options: OptionType
  setOption: Dispatch<SetStateAction<OptionType>>
}

export const OptionContext = createContext<OptionContextType>({
  options: {
    showCompleted: false,
    showPlaceName: false
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOption: () => {}
})

export const useOptionContext = () => useContext(OptionContext)
