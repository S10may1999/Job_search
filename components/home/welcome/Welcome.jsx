import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'

import { useState } from 'react'

import {useRouter} from 'expo-router'
 
import { icons, SIZES } from '../../../constants'


import styles from './welcome.style'

const jobTypes=["Full","Part-Time","Contractor"]



const Welcome = (searchTerm,setSearchTerm,handleClick) => {
  const router =useRouter();
  const [activeJobType,setactiveJobType]=useState('full-time')
  return (

   
    <View>

      {/* this is name header in the welcome section  */}


    <View style={styles.container}>
      <Text style={styles.userName}>Hello Adrian </Text>
      <Text style={styles.welcomeMessage}>Find your perfect job</Text>
    </View>

    {/* this is the searchbar creation  */}


    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(text)=> setSearchTerm(text)}
          placeholder='what are you looking for ?'
        />
      </View>

      {/* Adding search button to search bar */}

      <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          
          <Image source={icons.search}
          resizeMode='contain'
          style={styles.searchBtnImage}
          />
      </TouchableOpacity>
    </View>
        <View style={styles.tabsContainer}>
            <FlatList 
              data={jobTypes}
              renderItem={(item)=>(

                <TouchableOpacity
                  style={styles.tab(activeJobType,item)}
                  onPress={()=>{
                    setactiveJobType(item);
                    router.push(`/search/${item}`)
                  }}
                >

                  <Text  style={styles.tabText(activeJobType,item)}>{item}</Text>
                </TouchableOpacity>

              )}
              keyExtractor={item=>item}
              contentContainerStyle={{columnGap:SIZES.small}}
              horizontal
            />
        </View>   
    </View>
  )
}

export default Welcome