// --- from https://github.com/tcampb/react-calendly ---
type Optional<T extends object> = {
  [P in keyof T]?: T[P]
}

export type Prefill = Optional<{
  name: string
  email: string
  firstName: string
  lastName: string
  smsReminderNumber: string
  location: string
  guests: string[]
  customAnswers: Optional<{
    a1: string
    a2: string
    a3: string
    a4: string
    a5: string
    a6: string
    a7: string
    a8: string
    a9: string
    a10: string
  }>
  date: Date
}>

export type Utm = Optional<{
  utmCampaign: string
  utmSource: string
  utmMedium: string
  utmContent: string
  utmTerm: string
  salesforce_uuid: string
}>

/**
 * @description The default title is Calendly Scheduling Page
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title}
 */
export type IframeTitle = string

export type PageSettings = Optional<{
  /**
   * @description Use this setting to hide your profile picture, name, event duration, location, and description when Calendly is embedded. This will help reduce duplicate information that you may already have on your web page.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options#2} for further information.
   */
  hideLandingPageDetails: boolean
  /**
   * @description Use this setting to hide your profile picture, name, event duration, location, and description when Calendly is embedded. This will help reduce duplicate information that you may already have on your web page.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options#2} for further information.
   */
  hideEventTypeDetails: boolean
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's background color.
   * @example 00a2ff
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  backgroundColor: string
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's text color.
   * @example ffffff
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  textColor: string
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's primary color.
   * @example 4d5055
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  primaryColor: string
  /**
   * @description The General Data Protection Regulation governs data protection in the EU and EEA. Certain Calendly integrations require access to cookies with user information. If you do not embed the GDPR banner, users in those areas will not have the ability to give their consent in order to access integrations such as Google Analytics, Facebook Pixel, PayPal, and Stripe.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360007385493-Cookie-FAQs} for further information.
   */
  hideGdprBanner: boolean
}>

type PopupOptionsBase = {
  /**
   * Calendly URL (Required)
   * @description The URL of your Calendly event page.
   * @example https://calendly.com/johndoe/30min
   */
  url: string
}

export type CalendlyInlineWidgetOptions = {
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type CalendlyPopupButtonOptions = PopupOptionsBase & {
  rootElement: HTMLElement
  text?: string
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type CalendlyPopupWidgetOptions = PopupOptionsBase & {
  rootElement?: HTMLElement
  text?: string
  color?: string
  textColor?: string
  branding?: boolean
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type PopupModalContentOptions = PopupOptionsBase & {
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type PopupModalOptions = PopupModalContentOptions & {
  isOpen: boolean
  rootElement: HTMLElement
}

export type DateAndTimeSelectedEvent = MessageEvent<{
  event: CalendlyEvent.DATE_AND_TIME_SELECTED
  payload: {}
}>

export type EventScheduledEvent = MessageEvent<{
  event: CalendlyEvent.EVENT_SCHEDULED
  payload: {
    event: {
      /**
       * @description Canonical reference (unique identifier) to the event that was scheduled.
       * @example https://calendly.com/api/v2/scheduled_events/AAAAAAAAAAAAAA
       * @see {@link https://developer.calendly.com/docs/api-docs/reference/calendly-api/openapi.yaml/paths/~1scheduled_events~1%7Buuid%7D/get} for further information.
       */
      uri: string
    }
    invitee: {
      /**
       * @description Canonical reference (unique identifier) for the invitee who scheduled the event.
       * @example https://calendly.com/api/v2/scheduled_events/AAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAA
       * @see {@link https://developer.calendly.com/docs/api-docs/reference/calendly-api/openapi.yaml/paths/~1scheduled_events~1%7Bevent_uuid%7D~1invitees~1%7Binvitee_uuid%7D/get} for further information.
       */
      uri: string
    }
  }
}>

export type EventTypeViewedEvent = MessageEvent<{
  event: CalendlyEvent.EVENT_TYPE_VIEWED
  payload: {}
}>

export type ProfilePageViewedEvent = MessageEvent<{
  event: CalendlyEvent.PROFILE_PAGE_VIEWED
  payload: {}
}>

export type PageHeightResizeEvent = MessageEvent<{
  event: CalendlyEvent.PAGE_HEIGHT;
  payload: {
    /**
       * @description The height of the Calendly scheduling page in pixels.
       * @example 1200px
    */
    height: string;
  };
}>;

export type CalendlyEventHandlers = {
  onDateAndTimeSelected?: (e: DateAndTimeSelectedEvent) => any
  onEventScheduled?: (e: EventScheduledEvent) => any
  onEventTypeViewed?: (e: EventTypeViewedEvent) => any
  onProfilePageViewed?: (e: ProfilePageViewedEvent) => any
  onPageHeightResize?: (e: PageHeightResizeEvent) => any;
}

// --- custom ---

export type EventType = "Inline" | "PopupWidget" | "PopupButton"

export type CalendlyClient = {
  closePopupWidget: () => Promise<void>
  destroyBadgeWidget: () => Promise<void>
  initBadgeWidget: (options: CalendlyPopupWidgetOptions) => Promise<void>
  initPopupWidget: (options: PopupModalContentOptions) => Promise<void>
  showPopupWidget: (url: CalendlyPopupWidgetOptions["url"]) => Promise<void>
  initInlineWidget: (options?: CalendlyInlineWidgetOptions) => Promise<void>
}
