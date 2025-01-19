import { MdOutlineContentCopy, MdCheckCircle } from 'react-icons/md'; // Import the clipboard and check circle icons
import { useState } from 'react';
import React from 'react';
function SuggestedHashtags({ keywords }) {
  const [copied, setCopied] = useState(false); // State to track if the text is copied

  const handleCopy = () => {
    navigator.clipboard.writeText(keywords).then(() => {
      setCopied(true); // Set copied to true when the text is successfully copied
      setTimeout(() => {
        setCopied(false); // Reset the icon back after 2 seconds
      }, 2000);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  };

  return (
    <div className="w-full h-full p-4 bg-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Suggested Hashtags</h1>
        <div className="flex items-center">
          {copied ? (
            <MdCheckCircle className="ml-2 text-green-500 cursor-pointer" /> // Show check icon when copied
          ) : (
            <MdOutlineContentCopy
              className="ml-2 cursor-pointer text-gray-500"
              onClick={handleCopy} // When clicked, it copies text
            />
          )}
        </div>
      </div>
      <div className="mt-5 text-blue-500">{keywords}</div>
    </div>
  );
}

export default SuggestedHashtags;
