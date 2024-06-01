import type { CalendlyEventHandlers } from "../types"
import { onMounted, onUnmounted } from "vue"

export type DateAndTimeSelectedEvent = MessageEvent<{
  event: CalendlyEvent.DATE_AND_TIME_SELECTED
  payload: {}
}>

export enum CalendlyEvent {
  PROFILE_PAGE_VIEWED = "calendly.profile_page_viewed",
  EVENT_TYPE_VIEWED = "calendly.event_type_viewed",
  DATE_AND_TIME_SELECTED = "calendly.date_and_time_selected",
  EVENT_SCHEDULED = "calendly.event_scheduled",
  PAGE_HEIGHT = "calendly.page_height",
}

const EVENT_NAME = "message"

export default function useCalendlyEventListener(eventHandlers: CalendlyEventHandlers) {
  const { onDateAndTimeSelected, onEventScheduled, onEventTypeViewed, onProfilePageViewed, onPageHeightResize } = eventHandlers || {}
  
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
    } else if (eventName === CalendlyEvent.PAGE_HEIGHT) {
      onPageHeightResize && onPageHeightResize(e);
    }
  }

  onMounted(() => {
    if (!import.meta.client) return
    window.addEventListener(EVENT_NAME, onMessage)
  })

  onUnmounted(() => {
    if (!import.meta.client) return
    window.removeEventListener(EVENT_NAME, onMessage)
  })
}
