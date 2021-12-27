import React, {useEffect, useState} from 'react'
import tw from 'tailwind-styled-components';
import Map from './components/Map';
import {useRouter} from 'next/router';
import RideSelector from './components/RideSelector'

const Confirm = () => {

    const router = useRouter();
    const{pickup, dropOff} = router.query;//this also take time to process

    //console.log('pickup', pickup);
    //console.log('dropOff', dropOff);

    const [pickUpCoordinates, setPickerCoordinates] = useState([0,0]);
    const [dropOffCoordinates, setDropOffCoordinates] = useState([0,0]);

    const getPickerCoordinates = (pickup) =>{

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiamltbXl2ZXJzb24xIiwiYSI6ImNrdmxvOXQ4djM2MDgydm55c2NrcXp0czYifQ.2TasEuflbgD2WszEUdOzxw',
                limit:1
            })
        )
        .then(response=> response.json())
        .then(data=>{
            setPickerCoordinates(data.features[0].center)
            //console.log(data.features[0].center);;
        })
    }

    const getDropOffCoordinates = (dropOff)=>{

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json?` +
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiamltbXl2ZXJzb24xIiwiYSI6ImNrdmxvOXQ4djM2MDgydm55c2NrcXp0czYifQ.2TasEuflbgD2WszEUdOzxw',
                limit:1
            })
        )
        .then(response=> response.json())
        .then(data=>{
            //console.log('dropOff')
           // console.log(data.features[0].center);;
           setDropOffCoordinates(data.features[0].center)
        })

    }


    useEffect(()=>{
        getPickerCoordinates(pickup);
        getDropOffCoordinates(dropOff);
    }, [pickup, dropOff])

    return (
        <Wrapper>
            <Map
                pickUpCoordinates={pickUpCoordinates}
                dropOffCoordinates={dropOffCoordinates}
            />
            <BackButtonImage src='https://img.icons8.com/ios-filled/50/000000/left.png' onClick={()=> router.back()}/>
            <RideContainer>
                <RideSelector
                    pickUpCoordinates={pickUpCoordinates}
                    dropOffCoordinates={dropOffCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
} 

export default Confirm;

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`

const Wrapper = tw.div`
flex h-screen flex-col relative
`

const ConfirmButtonContainer = tw.div`
border-t-2
`
const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-2xl
`

const BackButtonImage = tw.img`
h-10 w-10 rounded-full shadow-xl absolute top-2 left-2 bg-white bg-opacity-60 cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out
`