import XAmplify  from '../views/XAmplify'


const xamplifyPage = () => {
  return <XAmplify />
}

// SwapPage.chains = CHAIN_IDS


// const xamplifyPage = () => {
//   const { t } = useTranslation()
//   const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '1100px' }

//   return (
  //     <Page>
  //       <div style={{ textAlign: 'center' }}>
  //         <Heading scale="xxl">Coming Soon!</Heading>
  //         <Text mb="16px">{t('This page is under development')}</Text>
  //       </div>
  //       <PageSection
  //         innerProps={{ style: HomeSectionContainerStyles }}
  //         containerProps={{
    //           id: 'home-4',
    //         }}
    //         index={2}
    //         hasCurvedDivider={false}
    //       >
    //         <HeroGain />
    //       </PageSection>
    //       <div style={{ textAlign: 'center' }}>
    //         <Link href="/" passHref>
    //           <Button as="a" scale="sm">
    //             {t('Back Home')}
    //           </Button>
    //         </Link>
//       </div>
//     </Page>
//   )
// }

export default xamplifyPage
