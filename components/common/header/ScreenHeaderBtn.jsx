import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity,Image } from 'react-native'
import styles from './screenheader.style'



const ScreenHeaderBtn = ({iconsUrl,dimension,handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconsUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}

      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn