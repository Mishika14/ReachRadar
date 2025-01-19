import React, { useEffect, useState } from 'react';
import { analyzeSentiment } from '../helperfunctions/AnalyseStatement';
import { generateHashtags } from '../helperfunctions/KeywordExtractor';
import SuggestedImprovements from '../components/SuggestedImprovements';
import SuggestedHashtags from '../components/SuggestedHashtags';
import { toast } from 'react-toastify'; // Importing toast from react-toastify

const AnalysisPage = ({ result }) => {
    const [sentimentText, setSentimentText] = useState(''); // Sentiment result (POSITIVE, NEGATIVE, or NEUTRAL)
    const [keywords, setKeywords] = useState(''); // Keywords/hashtags
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Helper function to show success toast
    const showSuccessToast = (message) => {
        toast.success(message, { position: "top-right", autoClose: 3000 });
    };

    // Helper function to show error toast
    const showErrorToast = (message) => {
        toast.error(message, { position: "top-right", autoClose: 3000 });
    };

    // Function to analyze sentiment
    const handleAnalyzeSentiment = async (text) => {
        setLoading(true); // Show loading spinner during analysis
        try {
            const sentimentResults = await analyzeSentiment(text);
    
            if (!sentimentResults) {
                throw new Error('No sentiment result received.');
            }
    
            setSentimentText(sentimentResults); // Set the sentiment result (POSITIVE, NEGATIVE, or NEUTRAL)
            showSuccessToast('Sentiment analysis completed successfully!');
        } catch (err) {
            setError('Error analyzing sentiment.');
            showErrorToast('Error analyzing sentiment.');
            console.error('Error analyzing sentiment:', err);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // Function to generate hashtags
    const handleGenerateHashtags = async (text) => {
        setLoading(true); // Show loading spinner during generation
        try {
            const response = await generateHashtags(text);
            setKeywords(response); // Set generated hashtags
            showSuccessToast('Hashtags generated successfully!');
        } catch (err) {
            setError('Error generating hashtags.');
            showErrorToast('Error generating hashtags.');
            console.error('Error generating hashtags:', err);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // React to changes in the `result` prop
    useEffect(() => {
        if (result) {
            setError(null); // Reset error on new input
            handleAnalyzeSentiment(result);
            handleGenerateHashtags(result);
        }
    }, [result]); // Dependency array ensures this runs only when `result` changes

    return (

        <div className='h-2screen w-screen bg-black'>
         <h1 className="text-white font-nunito font-bold text-4xl md:text-6xl leading-snug text-center mb-5 pt-4">
            Social Media Post Analysis
        </h1>
        <div className='flex h-5/6 w-full   '>
        <div className='w-1/2 flex flex-col  items-center gap-10 mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black '>
        <div className='w-5/6 h-1/4 bg-red-400 shadow-xl rounded-lg flex  flex-col items-center justify-evenly m-10 '>
           <h1 className='font font-bold text-4xl  text-orange-950'>Sentiment</h1>
           <h2 className='text-2xl text-white font-nunito'>{sentimentText}</h2>
          

        </div>
        <div className='w-5/6 h-1/2  shadow-xl rounded-lg flex  flex-col 5 items-center  '>
        
           <SuggestedHashtags keywords={keywords} />
          
          
          

        </div>

        </div>

        {/* Suggestion Let side */}
             <div className='w-1/2 h-auto bg-black'>
             <SuggestedImprovements text={result} />
                  
             </div>
        </div>

    </div>
 
    
    );
};

export default AnalysisPage;
