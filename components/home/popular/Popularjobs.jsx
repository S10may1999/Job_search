import React from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { useState } from 'react'
import styles from './popularjobs.style'
import {COLORS,SIZES} from '../../../constants'
import PopularJobCards from '../../common/cards/popular/PopularJobCard'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router=useRouter();
  const {data,isLoading,error} =useFetch(
    'search',{
      query:'React Developer',
      num_pages:1
    });

  const [selectedJob,setSelectedJob]=useState()

  const handleCardPress =(item)=>{
    router.push(`/job-details/${item.job_id}`);
    selectedJob(item.job_id)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text  style={styles.headerTitle}>Popular jobs</Text>
          <TouchableOpacity>
              <Text style={styles.headerBtn}>Show all</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
            <ActivityIndicator size={'large'} color={COLORS.primary}/>
        ):error ?(
          <Text> Something went Wrong </Text>
        ):
        (
    
      <FlatList
          data={[1,2,3,4,5,6,7,8]}
          renderItem={(item)=>(
              <PopularJobCards item={item}/>
          )}
          keyExtractor={item=>item?.job_id}
          contentContainerStyle={{columnGap:SIZES.medium}}
          horizontal
      />
    )
      
      }

      </View>
    </View>
  )
  
    }

export default Popularjobs