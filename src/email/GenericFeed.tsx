import { Container } from '@react-email/container'
import { Hr } from '@react-email/hr'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Output } from 'rss-parser'
import { CustomItem } from '../parseFeeds'
import { formatDate } from '../utils/formatter'
import Summary from './Summary'
import { parseLinks } from './parseLinks'

interface Props {
  feed: Output<CustomItem>
  hasBottomSeparator: boolean
}

export default ({ feed, hasBottomSeparator }: Props) => {
  return (
    <Container style={box}>
      <Text style={header}>
        <Link style={headerLink} href={feed.link}>
          {feed.title}
        </Link>
      </Text>
      {feed.items.map((item) => {
        const href = parseLinks(item.links)

        return (
          <Container key={item.guid} style={section}>
            <Link style={anchor} href={href}>
              {item.title}
            </Link>
            {item.pubDate && <Text style={date}>{formatDate(item.pubDate)}</Text>}
            {item.content && <Summary href={href} paragraphStyle={paragraph} blockquoteStyle={{ ...paragraph, ...blockquote }} content={item.content} />}
          </Container>
        )
      })}
      {hasBottomSeparator && (
        <Section>
          <Hr style={hr} />
        </Section>
      )}
    </Container>
  )
}

const box = {
  padding: '32px 32px 24px',
}

const header = {
  color: '#111111',
  fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
  fontSize: '16px',
  margin: 0,
}

const headerLink = {
  color: '#111111',
  textDecoration: 'underline',
  textDecorationColor: '#000000',
  textDecorationStyle: 'solid' as const,
  textUnderlineOffset: '1px',
}

const section = {
  margin: '32px 0',
}

const anchor = {
  fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
  color: '#000000',
  fontSize: '20px',
}

const date = {
  color: '#777777',
  fontFamily: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
  fontSize: '12px',
  margin: '0 0 8px',
}

const paragraph = {
  color: '#777777',
  fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  margin: 0,
}

const blockquote = {
  paddingLeft: '12px',
  borderLeft: '2px solid #000000',
}

const hr = {
  margin: '24px 0 0',
  borderTopColor: '#777777',
}
