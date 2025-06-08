/* eslint-disable no-unused-vars */
import depthsLocation from '@/assets/json/depths/locations.json'
import skyLocation from '@/assets/json/sky/locations.json'
import surfaceLocation from '@/assets/json/surface/locations.json'

import depthsQuest from '@/assets/json/depths/quest.json'
import skyQuest from '@/assets/json/sky/quest.json'
import surfaceQuest from '@/assets/json/surface/quest.json'

import type { LayoutType, LocationType } from '@/types'

const locations:{
  [key in LayoutType]: LocationType[]
} = {
  depths: depthsLocation,
  sky: skyLocation,
  surface: surfaceLocation
}

const quests:{
  [key in LayoutType]: LocationType[]
} = {
  depths: depthsQuest,
  sky: skyQuest,
  surface: surfaceQuest
}
export {
  locations,
  quests
}
