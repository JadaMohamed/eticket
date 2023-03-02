import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = ({isList, height, width}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    
  >
    <Path d="m1 1 3 3.5L7 1" stroke={isList ? "none" : "gray" } />
  </Svg>
)

export default SvgComponent
