import { load, trackPageview } from 'fathom-client'
import React, { FC, Suspense, useEffect } from 'react'
import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export const FathomAnalyticsHandler: FC = () => {
  const { siteConfig } = useDocusaurusContext()
  const location = useLocation()

  const isProduction = siteConfig.customFields?.NODE_ENV === 'production'
  const fathomSiteId = siteConfig.customFields?.REACT_APP_FATHOM_SITE_ID as string

  useEffect(() => {
    if (!isProduction) return
    if (!fathomSiteId) return

    load(fathomSiteId, {
      auto: false,
    })
  }, [])

  useEffect(() => {
    if (!isProduction) return
    if (!fathomSiteId) return
    if (!location) return

    trackPageview({
      url: location.pathname,
      referrer: document.referrer,
    })
  }, [location])

  return null
}

export const FathomAnalytics: FC = () => (
  <Suspense fallback={null}>
    <FathomAnalyticsHandler />
  </Suspense>
)
