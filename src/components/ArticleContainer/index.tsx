import React, { DetailedHTMLProps, HTMLAttributes, FunctionComponent } from 'react'
import styled from 'styled-components'

import { media } from 'components/Layout'

const MainContent = styled.article`
  background: white;
  color: #111;
  padding: 20px;
  box-shadow: 0 2px 4px 0 #c1c1c1;
  border-radius: 3px;
  & + & {
    margin-top: 20px;
    ${media.lessThan('tablet')`
      margin-top: 15px;
    `}
  }
  ${media.lessThan('tablet')`
    padding: 15px;
  `}
`

const ArticleContainer: FunctionComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ref,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...rest
}) => (
  <MainContent {...rest}>
    {children}
  </MainContent>
)

export default ArticleContainer