import React from "react";
import {Text,View,SafeAreaView,ScrollView,Activityindicator,Refreshcontrol } from 'react-native';
import { Stack,useRouter,useGlobalSearchParams } from "expo-router";
import { useCallback,useState } from "react";

import {Company, JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics } from '../../components';

import {COLORS, icons,SIZES} from '../../constants';

import  useFetch from '../../hook/useFetch';
import { disableExpoCliLogging } from "expo/build/logs/Logs";


const tabs =["About","Qualifications","Responsibilities"];

const JobDetails= () =>{
    const params =useGlobalSearchParams();

    const router=useRouter();

    const {data,isLoading,error,refetch} =useFetch('job-details',{
        job_id:params.id
    })

    const [refreshing,setRefreshing] = useState(false);
    const [activeTab,setActiveTab] =useState(tabs[0]);

    const onRefresh=useCallback(()=>{
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    },[])

    const displayTabContent=()=>{
        switch (activeTab){

            case "Qualification":
                return <Specifics
                    title="Qulifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout 
                    info={data[0].job_description ?? "No data provided"}                
                />
            case "Responsibilities":
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilites ?? ['N/A']}
                />
            default:
                break;
        }
    }

    return(

        <SafeAreaView style={{fles:1,backgroundColor:COLORS.lightWhite}} >
            
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite},
                    headerShadowVisible:false,
                    headerBackVisible:false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn
                            iconsUrl={icons.left}
                            dimension="60%"
                            handlePress={()=>router.back()}
                        
                        />

                    ),
                    headerRight:()=>(
                        <ScreenHeaderBtn
                            iconsUrl={icons.share}
                            dimension="60%"
                        
                        />

                    ),
                    headerTitle:''

                }}
            >

            </Stack.Screen>

            <>
                <ScrollView  showsVerticalScrollIndicator={false}  refreshControl={<Refreshcontrol refreshing={refreshing} onRefresh={onRefresh}/>}>

                    {isLoading?(
                        <Activityindicator size="large" color={COLORS.primary}/>

                    ):error?(
                        <Text> Something went wrong</Text>

                    ):data.length===0 ?(

                        <Text>No Data</Text>
                    ):(

                        <View style={{padding:SIZES.medium,paddingBottom:100}}>

                            <Company

                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                Location={data[0].job_country}
                            />

                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}  
                            />

                            {displayTabContent()}

                        </View>
                    )
                    
                    
                    }

                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
            
            </>
        
        </SafeAreaView>

    )

}

export default JobDetails;