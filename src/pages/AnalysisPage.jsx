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
        <div className="h-auto bg-black">
            <h1 className="text-white font-nunito font-bold text-2xl md:text-4xl leading-snug text-center mb-5 pt-10">
                Social Media Post Analysis
            </h1>
            <div className="flex flex-col lg:flex-row h-auto w-full">

                {/* Left Section */}
                <div className="w-full lg:w-1/2 flex flex-col items-center gap-10 mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">

                    {/* Sentiment Box */}
                    <div className="w-full lg:w-5/6 h-auto lg:h-1/4 bg-red-400 shadow-xl rounded-lg flex flex-col items-center justify-center p-6 mb-10">
                        <h1 className="font-bold text-4xl text-orange-950">Sentiment</h1>
                        <h2 className="text-2xl text-white font-nunito text-center">{sentimentText}</h2>
                    </div>

                    {/* Suggested Hashtags */}
                    <div className="w-full lg:w-5/6 h-auto lg:h-1/2 shadow-xl rounded-lg flex flex-col items-center justify-evenly p-6">
                        <SuggestedHashtags keywords={keywords} />
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 h-auto bg-black p-6">
                    <SuggestedImprovements text={result} />
                </div>

            </div>
        </div>
    );
};

export default AnalysisPage;
