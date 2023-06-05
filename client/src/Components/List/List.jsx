import React from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card/Card';
import "./List.scss"; 



const List = ({sub,catId,sort,maxPrice}) => {

    const {data,loading,error} = useFetch(
        `/Products?populate=*&[filters][categories][id]=${catId}
        ${sub.map(item=>`&[filters][subcats][id][$eq]=${item}`)}
        &[filters][price][$lte]=${maxPrice}
        &sort=price:${sort}`
        );

    return (
        <div className="list">
        {loading
          ? "loading..."
          : data?.map((item) => <Card item={item} key={item.id} />)

            
        }
        
      </div>
  )
}

export default List;