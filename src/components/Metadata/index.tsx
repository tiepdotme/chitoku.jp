import React, { FunctionComponent, createContext } from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { graphql, useStaticQuery } from 'gatsby'
import { Location } from '@reach/router'

import { MetadataItemQuery } from 'graphql-types'
import messages from './messages'

const THUMBNAIL_DEFAULT = '/thumbnails/default.png'

const query = graphql`
  query MetadataItem {
    site {
      siteMetadata {
        siteUrl
      }
    }
    about: aboutYaml {
      contacts {
        service
        primary
        accounts {
          name
          url
        }
      }
    }
  }
`

const metadata: MetadataItem = {
  type: 'article',
  title: '',
  keywords: [],
  description: '',
  thumbnail: '',
}

export const MetadataContext = createContext(metadata)

const Metadata: FunctionComponent<MetadataItem> = ({
  children,
  ...newState
}) => {
  const { formatMessage } = useIntl()
  const { about, site } = useStaticQuery<MetadataQueryResult>(query)

  if (!about || !site) {
    throw new Error('Invalid data')
  }

  const { contacts } = about
  const {
    siteMetadata: {
      siteUrl,
    },
  } = site

  Object.assign(metadata, {
    ...newState,
    title: newState.title
      ? formatMessage(messages.title_template, { title: newState.title })
      : formatMessage(messages.title),
  })

  return (
    <Location>
      {({ location }) => (
        <Helmet>
          <html lang="ja" />
          <meta property="og:type" content={metadata.type} />
          <meta property="og:url" content={siteUrl + location.pathname} />
          <meta name="twitter:card" content="summary" />
          <title>{metadata.title}</title>
          {[ 'og:title', 'twitter:title' ].map(property => (
            <meta key={property} property={property} content={metadata.title ?? ''} />
          ))}
          {[ 'og:image', 'twitter:image' ].map(property => (
            <meta key={property} property={property} content={`${siteUrl}${metadata.thumbnail ?? THUMBNAIL_DEFAULT}`} />
          ))}
          {metadata.description && [ 'og:description', 'description' ].map(property => (
            <meta key={property} property={property} content={metadata.description} />
          ))}
          {metadata.keywords && metadata.keywords.length ? (
            <meta name="keywords" content={metadata.keywords.join()} />
          ) : null}
          {contacts
            .filter(contact => contact.primary)
            .flatMap(contact => contact.accounts)
            .map(({ url }) => (
              <link key={url} rel="me" href={url} />
            ))}
          {children}
          <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/feed/rss2/`} />
          <link rel="alternate" type="application/atom+xml" href={`${siteUrl}/feed/atom/`} />
        </Helmet>
      )}
    </Location>
  )
}

type MetadataQueryResult = MetadataItemQuery

interface MetadataItem {
  type?: string
  title: string | null
  keywords?: string[]
  description?: string
  thumbnail?: string | null
}

export default Metadata
