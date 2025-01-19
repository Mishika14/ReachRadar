import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import Navbar from '../components/Navbar';

const Frontpage = () => {
    const navigate = useNavigate(); // Hook to trigger navigation

    const handleGetStartedClick = () => {
        navigate('/file-upload'); // Navigate to the file upload page
    };

    return (
        <div className="h-screen w-screen bg-black m-0 p-0 box-border overflow-hidden">
            <Navbar />
            <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">

                {/* Left Section */}
                <div className="h-auto lg:h-full w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
                    <div>
                        <h1 className="text-white font-nunito font-bold text-3xl sm:text-4xl md:text-5xl leading-snug">
                            Analyze Your <span className="text-red-400">Social Media Content</span>
                        </h1>
                        <p className="text-gray-400 mt-4 text-base sm:text-lg md:text-xl">
                            Gain insights into tone, engagement, and reach to improve your social media impact.
                        </p>
                    </div>
                    <div className="mt-8">
                        {/* "Get Started" Button */}
                        <button
                            onClick={handleGetStartedClick} // On click, navigate to file upload page
                            className="px-12 py-4 bg-red-400 text-lg font-semibold rounded-md shadow-lg hover:bg-red-500 transition duration-300 w-full sm:w-auto"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="h-auto lg:h-full w-full lg:w-1/2 flex justify-center items-center lg:mt-[-5rem]">
                    <img
                        src="/images/Visual data-bro.png"
                        alt="Analyze Content"
                        className="w-full max-w-lg object-contain lg:max-w-xl h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Frontpage;
