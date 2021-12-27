import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import mapboxgl from '!mapbox-gl'; //mapbox

mapboxgl.accessToken = 
'pk.eyJ1IjoiamltbXl2ZXJzb24xIiwiYSI6ImNrdmxvOXQ4djM2MDgydm55c2NrcXp0czYifQ.2TasEuflbgD2WszEUdOzxw';


const Map = (props) => {

    //console.log(props)
    

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph', // different styled map
            center: [-99.29011, 39.39172],
            zoom: 3
        })

        if(props.pickUpCoordinates){
            addToMap(map, props.pickUpCoordinates);
        }

        if(props.dropOffCoordinates){
            addToMap(map, props.dropOffCoordinates)
        }
        
        if(props.pickUpCoordinates && props.dropOffCoordinates){
            map.fitBounds([
                props.dropOffCoordinates,
                props.pickUpCoordinates
            ], {
                padding:60
            })
        }
        
    }, [props.pickUpCoordinates,props.dropOffCoordinates]);

    const addToMap = (map, coordinates) =>{
        const marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

    }
    
    return <Wrapper id='map'></Wrapper>
}


export default Map;

const Wrapper = tw.div`
flex-1 h-1/2 relative
`
