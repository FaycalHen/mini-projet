import {React, useEffect, useState} from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';


const Rate = ({id , cliID}) => {
    const [rating, setRating] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [eachRates, setEachRates] = useState([]);
    const [rate, setRate] = useState([]);
    const [err, setError] = useState(null);

    console.log("rate:", rate);
    console.log("eachrate:", eachRates);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(newRating);
    };

    const submitRating = () => {
        // Check if the cliID exists in eachRates
        const existingRating = eachRates.find((rate) => rate.cli_ID === cliID);

        if (existingRating) {
        // Check if the cliID already rated the product with the given id
        const alreadyRated = eachRates.find(
            (rate) => rate.cli_ID === cliID && rate.prod_ID === id
        );

        if (alreadyRated) {
            // Update existing rating
            const updatedEachRates = eachRates.map((rate) => {
            if (rate.cli_ID === cliID && rate.prod_ID === id) {
                return { ...rate, rating: rating };
            }
            return rate;
            });

            setEachRates(updatedEachRates);
        } else {
            // Add new rating for the product
            const newRate = {
            cli_ID: cliID,
            prod_ID: id,
            rating: rating,
            };

            setEachRates([...eachRates, newRate]);
        }
        } else {
        // Add new rating for the product and update totalVotes
        const newRate = {
            cli_ID: cliID,
            prod_ID: id,
            rating: rating,
        };

        setEachRates([...eachRates, newRate]);
        setTotalVotes(totalVotes + 1);
        }
    };

    useEffect(() => {
        axios
        .get("http://localhost:1337/api/eachrates")
        .then(({ data }) => {
            setEachRates(data.data);
            console.log(data.data);
        })
        .catch((error) => setError(error));
    }, []);

    useEffect(() => {
        axios
        .get("http://localhost:1337/api/ratings")
        .then(({ data }) => {
            setRate(data.data);
            console.log(data.data);
        })
        .catch((error) => setError(error));
    }, []);

    useEffect(() => {
        // Calculate total rating and total votes
        const ratingsForProduct = eachRates.filter((rate) => rate.prod_ID === id);
        const totalRatingForProduct = ratingsForProduct.reduce(
        (sum, rate) => sum + rate.rating,
        0
        );

        setTotalRating(totalRatingForProduct);
        setTotalVotes(ratingsForProduct.length);
    }, [eachRates, id]);

    return (
        <div>
            <Rating
                    initialRating={totalVotes > 0 ? totalRating / totalVotes : 0}
                    emptySymbol={<FontAwesomeIcon icon={regularStar} />}
                    fullSymbol={<FontAwesomeIcon icon={solidStar} />}
                    readonly
            />
            <span>{`(${totalVotes})`}</span>
            
            <Rating
                    initialRating={userRating}
                    emptySymbol={<FontAwesomeIcon icon={regularStar} />}
                    fullSymbol={<FontAwesomeIcon icon={solidStar} />}
                    onChange={handleRatingChange}
            />
            {
            cliID === null
            ?<button>Rate</button>
            :<button onClick={submitRating}>Rate</button>
            }
        </div>
  );
};

export default Rate