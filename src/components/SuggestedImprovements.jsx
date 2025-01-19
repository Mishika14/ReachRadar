import React, { useEffect, useState } from "react";
import { suggestPostImprovements } from "../helperfunctions/SuggestImprovements";
import { FaCircleDot } from "react-icons/fa6";

const SuggestedImprovements = ({ text }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch suggestions
  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const result = await suggestPostImprovements(text);

      // Ensure result is an array before setting state
      if (Array.isArray(result)) {
        setSuggestions(result);
      } else {
        setSuggestions(["Failed to generate suggestions. Please try again."]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions(["Failed to generate suggestions. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchSuggestions whenever `text` changes
  useEffect(() => {
    if (text) {
      fetchSuggestions();
    }
  }, [text]);

  // Function to format suggestions (if necessary)
  const formatSuggestions = (suggestions) => {
    return suggestions.map((suggestion, index) => {
      return (
        <div key={index} className="mb-5">
          {index === 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{suggestion}</h3>
            </div>
          ) : (
            <div className="flex gap-5 items-start">
              <div>
                <FaCircleDot className="h-6 w-6 text-red-400 mt-1" />
              </div>
              <p className="text-gray-800 text-base leading-relaxed text-justify tracking-tighter whitespace-normal">
                {suggestion}
              </p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl mt-10 sm:max-w-3xl sm:p-4 md:max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 sm:text-2xl">
        Suggested Improvements for Your Post
      </h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
        {loading ? (
          <p className="text-center text-red-400 font-semibold">
            Fetching Suggestions...
          </p>
        ) : (
          <>
            {suggestions.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Suggestions:
                </h3>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  {formatSuggestions(suggestions)}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No suggestions available yet. Please upload text for analysis.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestedImprovements;
