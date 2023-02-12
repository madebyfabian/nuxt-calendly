import type { CalendlyEventHandlers } from "../types"
import { watchEffect } from "#imports"

export type DateAndTimeSelectedEvent = MessageEvent<{
  event: CalendlyEvent.DATE_AND_TIME_SELECTED
  payload: {}
}>

export enum CalendlyEvent {
  PROFILE_PAGE_VIEWED = "calendly.profile_page_viewed",
  EVENT_TYPE_VIEWED = "calendly.event_type_viewed",
  DATE_AND_TIME_SELECTED = "calendly.date_and_time_selected",
  EVENT_SCHEDULED = "calendly.event_scheduled",
}

const EVENT_NAME = "message"

export default function useCalendlyEventListener(eventHandlers: CalendlyEventHandlers) {
  watchEffect(() => {
    const { onDateAndTimeSelected, onEventScheduled, onEventTypeViewed, onProfilePageViewed } = eventHandlers || {}

    if (typeof window !== undefined) return

    const onMessage = (e: MessageEvent) => {
      const eventName = e.data.event

      if (eventName === CalendlyEvent.DATE_AND_TIME_SELECTED) {
        onDateAndTimeSelected && onDateAndTimeSelected(e)
      } else if (eventName === CalendlyEvent.EVENT_SCHEDULED) {
        onEventScheduled && onEventScheduled(e)
      } else if (eventName === CalendlyEvent.EVENT_TYPE_VIEWED) {
        onEventTypeViewed && onEventTypeViewed(e)
      } else if (eventName === CalendlyEvent.PROFILE_PAGE_VIEWED) {
        onProfilePageViewed && onProfilePageViewed(e)
      }
    }

    window.addEventListener(EVENT_NAME, onMessage)

    return function cleanup() {
      window.removeEventListener(EVENT_NAME, onMessage)
    }
  })
}
