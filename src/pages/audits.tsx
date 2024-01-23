import styled from 'styled-components'
import { Button, Flex, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Link from 'next/link'
import PageSection from 'components/PageSection'

const bgTopGradientStyle = {
  background: 'linear-gradient(to bottom, black, transparent)',
};

const bgSideGradientStyle = {
  background: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1))`,
};

const textBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(100, 100, 100, 0.3)',
  borderRadius: '25px',
  border: '1px solid lightgray',
  padding: '10px',
  margin: '25px',
};

const auditsPage = () => {
  const { t } = useTranslation()
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '1100px' }

  return (
    <div style={bgSideGradientStyle}>
      <div style={bgTopGradientStyle}>
        <Page>
          <style jsx global>
            {`
              body {
                background-image: url('/images/home/lunar-bunny/background.jpg?');
                background-size: cover;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: center center;
              }
            `}
          </style>
          <div style={textBox}>
            <Heading scale="xxl">DexTop Token Smart Contract Audit</Heading>
            <a href="https://github.com/Saferico/xfuzion-Smart-Contract-Audit/blob/adfdfeb5639425d52f8bc56f972a298300377240/xfuzion%20Smart%20Contract%20Audit%20.pdf" target="_blank" rel="noopener noreferrer">
              Click here to read full PDF version of the Audit by saferico.com
            </a>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Executive Summary</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>According to our assessment, the customer’s solidity smart contract is well-secured. It appears that no critical issues were found during this audit, which indicates good security practices and a secure foundation for production.</Text>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Conclusion</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>The contracts are written systematically, and the team found no critical issues which indicates good security practices and a secure foundation for production. It is now safe to launch this smart contract into production.</Text>
          </div>
          <div style={textBox}>
            <Heading scale="xxl">X-Yield Smart Contract Audit</Heading>
            <a href="https://github.com/Saferico/xfuzion-Liquidity-Farms-Smart-Contract-Audit/blob/main/xfuzion%20Liquidity%20Farms%20Smart%20Contract%20Audit.pdf" target="_blank" rel="noopener noreferrer">
              Click here to read full PDF version of the Audit by saferico.com
            </a>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Executive Summary</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>According to our assessment, the customer`s solidity smart contract is Well-Secured.</Text>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Conclusion</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>The contracts are written systematically. Team found no critical issues. So, it is good to go for production.</Text>
          </div>
          <div style={textBox}>
            <Heading scale="xxl">Zap Smart Contract Audit</Heading>
            <a href="https://github.com/Saferico/xfuzion-Zap-Smart-Contract-Audit/blob/main/xfuzion%20Zap%20Smart%20Contract%20Audit.pdf" target="_blank" rel="noopener noreferrer">
              Click here to read full PDF version of the Audit by saferico.com
            </a>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Executive Summary</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>According to our assessment, the customer`s solidity smart contract is Well-Secured.</Text>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Conclusion</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>The contracts are written systematically. Team found no critical issues. So, it is good to go for production.</Text>
          </div>
          <div style={textBox}>
            <Heading scale="xxl">Xfortune Smart Contract Audit</Heading>
            <a href="https://github.com/Saferico/xfuzion-xfortune-Smart-Contract-Audit/blob/main/xfuzion%20xfortune%20Smart%20Contract%20Audit.pdf" target="_blank" rel="noopener noreferrer">
              Click here to read full PDF version of the Audit by saferico.com
            </a>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Executive Summary</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>According to our assessment, the customer`s solidity smart contract is Well-Secured.</Text>
            <Heading scale="md" as="h2" style={{ textAlign: 'center', marginTop: '1rem' }}>Conclusion</Heading>
            <Text as="p" style={{ textAlign: 'left', margin: '0.5rem 1rem' }}>The contracts are written systematically. Team found no critical issues. So, it is good to go for production.</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/" passHref>
              <Button as="a" scale="sm">
                {t('Back Home')}
              </Button>
            </Link>
          </div>
        </Page>
      </div>
    </div>
  )
}

export default auditsPage
