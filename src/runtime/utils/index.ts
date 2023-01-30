import type { Prefill, PageSettings, Utm, EventType } from "../types"

const sanitizeColorString = (str: string) => {
  if (str.charAt(0) === "#") {
    return str.slice(1)
  }
  return str
}

export const sanitizePageSettingsProps = (props: PageSettings) => {
  if (props?.primaryColor) {
    props.primaryColor = sanitizeColorString(props.primaryColor)
  }

  if (props?.textColor) {
    props.textColor = sanitizeColorString(props.textColor)
  }

  if (props?.backgroundColor) {
    props.backgroundColor = sanitizeColorString(props.backgroundColor)
  }

  return props
}

export const formatCalendlyUrl = ({
  url,
  prefill = {},
  pageSettings = {},
  utm = {},
  embedType,
}: {
  url: string
  prefill?: Prefill
  pageSettings?: PageSettings
  utm?: Utm
  embedType?: EventType
}) => {
  const sanitizedPageSettings = sanitizePageSettingsProps(pageSettings)

  const { backgroundColor, hideEventTypeDetails, hideLandingPageDetails, primaryColor, textColor, hideGdprBanner } =
    sanitizedPageSettings

  const { customAnswers, date, email, firstName, guests, lastName, location, name } = prefill

  const { utmCampaign, utmContent, utmMedium, utmSource, utmTerm, salesforce_uuid } = utm

  const queryStringIndex = url.indexOf("?")
  const hasQueryString = queryStringIndex > -1
  const queryString = url.slice(queryStringIndex + 1)
  const baseUrl = hasQueryString ? url.slice(0, queryStringIndex) : url

  const updatedQueryString = [
    hasQueryString ? queryString : null,
    backgroundColor ? `background_color=${backgroundColor}` : null,
    hideEventTypeDetails ? `hide_event_type_details=1` : null,
    hideLandingPageDetails ? `hide_landing_page_details=1` : null,
    primaryColor ? `primary_color=${primaryColor}` : null,
    textColor ? `text_color=${textColor}` : null,
    hideGdprBanner ? `hide_gdpr_banner=1` : null,
    name ? `name=${encodeURIComponent(name)}` : null,
    location ? `location=${encodeURIComponent(location)}` : null,
    firstName ? `first_name=${encodeURIComponent(firstName)}` : null,
    lastName ? `last_name=${encodeURIComponent(lastName)}` : null,
    guests ? `guests=${guests.map(encodeURIComponent).join(",")}` : null,
    email ? `email=${encodeURIComponent(email)}` : null,
    date && date instanceof Date ? `date=${formatDate(date)}` : null,
    utmCampaign ? `utm_campaign=${encodeURIComponent(utmCampaign)}` : null,
    utmContent ? `utm_content=${encodeURIComponent(utmContent)}` : null,
    utmMedium ? `utm_medium=${encodeURIComponent(utmMedium)}` : null,
    utmSource ? `utm_source=${encodeURIComponent(utmSource)}` : null,
    utmTerm ? `utm_term=${encodeURIComponent(utmTerm)}` : null,
    salesforce_uuid ? `salesforce_uuid=${encodeURIComponent(salesforce_uuid)}` : null,
    embedType ? `embed_type=${embedType}` : null,
    /*
     * https://github.com/tcampb/react-calendly/pull/31
     * embed_domain must be defined to receive messages from the Calendly iframe.
     */
    `embed_domain=1`,
  ]
    .concat(customAnswers ? formatCustomAnswers(customAnswers) : [])
    .filter(item => item !== null)
    .join("&")

  return `${baseUrl}?${updatedQueryString}`
}

const formatDate = (d: Date) => {
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = d.getFullYear()

  return [year, month < 10 ? `0${month}` : month, day < 10 ? `0${day}` : day].join("-")
}

const CUSTOM_ANSWER_PATTERN = /^a\d{1,2}$/
const formatCustomAnswers = (customAnswers: object) => {
  const customAnswersFiltered = Object.keys(customAnswers).filter(key => key.match(CUSTOM_ANSWER_PATTERN))

  if (!customAnswersFiltered.length) return []

  return customAnswersFiltered.map(key => `${key}=${encodeURIComponent(customAnswers[key])}`)
}
