import styled from 'styled-components'
import { Svg, SvgProps, Text, Flex } from '@pancakeswap/uikit'

export const PinkBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_pink.png" alt="" width="128px" height="128px"/>
  )
}

export const LilacBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_lilac.png" alt="" width="128px" height="128px"/>
  )
}

export const TealBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_teal.png" alt="" width="128px" height="128px"/>
  )
}

export const AquaBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_aqua.png" alt="" width="128px" height="128px"/>
  )
}

export const GreenBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_green.png" alt="" width="128px" height="128px"/>
  )
}

export const YellowBall: React.FC<SvgProps> = (props) => {
  return (
    <img src="/images/lottery/ball_yellow.png" alt="" width="128px" height="128px"/>
  )
}

export const BallTextWrapper = styled.div`
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

export const BallText = styled(Text)<{ rotationTransform?: number }>`
  color: rgba(255, 255, 255, 0.8);
  transform: rotate(${({ rotationTransform }) => rotationTransform || 0}deg);
`

export type BallColor = 'pink' | 'lilac' | 'teal' | 'aqua' | 'green' | 'yellow'

interface BallWithNumberProps {
  color: BallColor
  number: string
  size?: string
  fontSize?: string
  rotationTransform?: number
}

const ballsMap = {
  pink: PinkBall,
  lilac: LilacBall,
  teal: TealBall,
  aqua: AquaBall,
  green: GreenBall,
  yellow: YellowBall,
}

export const BallWithNumber: React.FC<BallWithNumberProps> = ({ color, number, size, fontSize, rotationTransform }) => {
  const BallComponent = ballsMap[color]
  return (
    <Flex alignItems="center" justifyContent="center" position="relative" mx="2px">
      <BallComponent width={size ?? '32px'} height={size ?? '32px'} />
      <BallTextWrapper>
        <BallText rotationTransform={rotationTransform} bold fontSize={fontSize ?? '16px'}>
          {number}
        </BallText>
      </BallTextWrapper>
    </Flex>
  )
}
