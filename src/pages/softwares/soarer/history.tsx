import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Metadata from 'components/Metadata'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Article, { ArticleItem } from 'components/Article'
import SoarerHistory from 'components/SoarerHistory'

export const pageQuery = graphql`
  query update {
    notice: file(relativePath: { eq: "posts/softwares/soarer/history.md" }) {
      article: childMarkdownRemark {
        ...Article
        htmlAst
      }
    }
  }
`

interface SoarerHistoryPageProps extends PageProps {
  data: {
    notice: {
      article: ArticleItem
    }
  }
}

const SoarerHistoryPage: FunctionComponent<SoarerHistoryPageProps> = ({
  data: {
    notice: {
      article,
    },
  },
}) => (
  <Layout>
    <Metadata title={article.attributes.title} thumbnail="/thumbnails/soarer.png" />
    <Header />
    <Navbar />
    <Content sidebar={article.attributes.sidebar !== false}>
      <Container>
        <Article article={article} components={{
          'soarer-history': SoarerHistory,
        }} />
      </Container>
    </Content>
    <Footer />
  </Layout>
)

export default SoarerHistoryPage
