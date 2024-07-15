import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface ReviewProps {
    mentorId: string;
  }
  interface Client {
    userId: string;
  }
  interface Review {
    _id: string;
    reviewText: string;
    rating: number;
    client: {
      username: string;
      photo: string;
    };}
const reviews = ({ mentorId }: ReviewProps) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [client, setClient] = useState<Client | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const router = useRouter();
//get the current user id 
interface DecodedToken extends JwtPayload {
    userId: string; 
  
    // Add other properties from the decoded token if needed
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      // router.push('/login'); // Redirect to login page if no token is found
      return;
    }
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
      console.log('le decodedToken est:',decodedToken )
      const userId = decodedToken.userId;
      console.log('le userId IN decodedToken est:',userId )
      setClient((prevData) => ({ ...prevData, userId }));
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [router]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getAllReviews/${mentorId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError('Error fetching reviews');
      }
    };

    fetchReviews();
  }, [mentorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
        console.log('Submitting review with data:', {
            mentorId,
            clientId: client?.userId,
            reviewText,
            rating: Number(rating),
        });

        const response = await axios.post('http://localhost:5000/api/AddReview', {
            mentorId,
            clientId: client?.userId,
            reviewText,
            rating: Number(rating),
        });

        console.log('Response from server:', response.data);

        if (response.data.success) {
            setSuccessMessage('Review created successfully');
        } else {
            setError('Failed to create review');
        }
    } catch (err) {
        console.error('Error creating review:', err);
        setError('Error creating review');
    }
};


  return (

   <>
         <div className="lg:p-10 p-6 font-[sans-serif] text-[#333] bg-gray-100">
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-extrabold">What our happy clients say</h2>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
        {reviews.map((review) => (
          <div key={review._id} className="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
            <img src={review.client.photo} className="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" alt={review.client.username} />
            <div className="flex space-x-1 mt-4">
              {[...Array(review.rating)].map((_, index) => (
                <svg key={index} className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm leading-relaxed">{review.reviewText}</p>
              <h4 className="text-base whitespace-nowrap font-extrabold mt-4">{review.client.username}</h4>
              <p className="mt-1 text-xs text-gray-400">Client</p>
            </div>
          </div>
        ))}
      </div>
    </div>





        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reviewText" className="block mb-2 text-sm font-medium text-gray-900">
              Your message
            </label>
            <textarea
              id="reviewText"
              rows={4} // Set rows to a number
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rate from 0 to 5"
              min="0"
              max="5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>



              </>                              

  )
}

export default reviews
