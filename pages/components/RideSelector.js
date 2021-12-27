import React, {useEffect, useState}from 'react';
import tw from 'tailwind-styled-components';
import { carList } from '../../public/data/carList';

const RideSelector = ({pickUpCoordinates,dropOffCoordinates}) => {


    const [rideDuration, setRideDuration] = useState(0);
    //get ride duration from MAPBOX API
    //1.pickupCoordinates
    //2.dropOffCoordinate
    useEffect(()=>{
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates[0]},${pickUpCoordinates[1]};${dropOffCoordinates[0]},${dropOffCoordinates[1]}?access_token=pk.eyJ1IjoiamltbXl2ZXJzb24xIiwiYSI6ImNrdmxvOXQ4djM2MDgydm55c2NrcXp0czYifQ.2TasEuflbgD2WszEUdOzxw`)
        .then((res) => res.json())
        .then((data)=> {
            //console.log(data);
            if(data.routes.length > 0){
                setRideDuration(data.routes[0].duration / 100)
            }else{
                setRideDuration(0)
            }
        }).catch(e=>{
            console.log(e);
        })
    }, [pickUpCoordinates,dropOffCoordinates])

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map((car, index)=>{
                    return(
                    <Car key={index}>
                    <CarImage src={car.imgUrl} />
                    <CarDetails>
                        <Service>{car.service}</Service>
                        <Time>5 min away</Time>
                    </CarDetails>
                    <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                </Car>
                )})}
            </CarList>
        </Wrapper>
    )
}

export default RideSelector;

const Wrapper = tw.div`
flex flex-1 flex-col overflow-y-scroll
`
const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b

`

const CarList = tw.div`
overflow-y-scroll
`

const Car = tw.div`
flex p-4 items-center
`
const CarImage = tw.img`
h-14 mr-4
`

const CarDetails = tw.div`
flex-1
`
const Service = tw.div`
font-medium
`
const Time = tw.div`
text-xs text-blue-500 font-medium
`
const Price = tw.div`
text-sm font-medium
`