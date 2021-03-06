import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import { FooterItemQuery } from 'graphql-types'
import messages from './messages'
import { media } from 'components/Layout'
import Link from 'src/components/Link'

const query = graphql`
  query FooterItem {
    commit: gitCommit(latest: { eq: true }) {
      hash
      message
      date
    }
  }
`

const FooterCore = styled.footer`
  margin: 15px 0 0;
  padding: 8px 0;
  background: #44607b;
  color: white;
  ${media.greaterThan('normal-pc')`
    width: 100%;
    position: absolute;
    bottom: 0;
  `}
  ${media.lessThan('tablet')`
    margin-top: 0;
  `}
`

const FooterLink = styled(Link)`
  &,
  &:hover {
    color: white;
  }
`

const Footer: FunctionComponent = () => {
  const { commit } = useStaticQuery<FooterQueryResult>(query)
  const repositoryName = process.env.GATSBY_REPOSITORY_NAME as string
  const repositoryTreeUrl = process.env.GATSBY_REPOSITORY_TREE_URL as string

  if (!commit) {
    throw new Error('Invalid data')
  }

  return (
    <FooterCore className="text-center">
      <FormattedMessage {...messages.copyright} values={{
        link: <FooterLink to={`${repositoryTreeUrl}${commit.hash}`}>{repositoryName}</FooterLink>,
      }} />
    </FooterCore>
  )
}

type FooterQueryResult = FooterItemQuery

export default Footer
