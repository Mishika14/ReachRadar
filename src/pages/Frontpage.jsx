import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import Navbar from '../components/Navbar';

const Frontpage = () => {
    const navigate = useNavigate(); // Hook to trigger navigation

    const handleGetStartedClick = () => {
        navigate('/file-upload'); // Navigate to the file upload page
    };

    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <div className="h-full w-full bg-black flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">

                    {/* Left Section */}
                    <div className="h-auto lg:h-full w-full lg:w-1/2 flex flex-col justify-around  text-center lg:text-left mb-8 lg:mb-0">
                        <div>
                            <h1 className="text-white font-nunito font-bold text-4xl md:text-6xl leading-snug">
                                Analyze Your <span className="text-red-400">Social Media Content</span>
                            </h1>
                            <p className="text-gray-400 mt-4 text-lg md:text-xl">
                                Gain insights into tone, engagement, and reach to improve your social media impact.
                            </p>
                        </div >
                        <div >
                            {/* "Get Started" Button */}
                            <button
                                onClick={handleGetStartedClick} // On click, navigate to file upload page
                                className="mt-8 ml-4 px-56 py-4 bg-red-400 text-white text-xl font-semibold rounded-md shadow-lg hover:bg-red-500 transition duration-300"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="h-auto lg:h-full w-full lg:w-1/2 flex justify-center items-center">
                        <img
                            src="/images/Visual data-bro.png"
                            alt="Analyze Content"
                            className="w-full max-w-lg object-contain lg:max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Frontpage;
