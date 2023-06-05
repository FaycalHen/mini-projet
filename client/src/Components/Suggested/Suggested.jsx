import React from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card/Card';
import "./Suggested.scss"; 



const Suggested = ({sub,catId}) => {

    const {data,loading,error} = useFetch(
        `/Products?populate=*&[filters][categories][id]=${catId}
        &[filters][subcats][id]=${sub}`
        );

    return (
        <div className="prod">
        {loading
          ? "loading..."
          : data?.map((item) => <Card item={item} key={item.id} />)

            
        }
        
      </div>
  )
}

export default Suggested;