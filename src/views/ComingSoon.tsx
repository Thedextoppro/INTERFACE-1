import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const ComingSoon = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">Welcome To DexTop</Heading>
        <br></br>
         <Link href="/swap" passHref>
          <Button as="a" scale="sm">
            {t('Open App')}
          </Button>
        </Link> 
      </StyledNotFound>
    </Page>
  )
}

export default ComingSoon
