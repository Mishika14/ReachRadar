# Reach Radar – Social Media Content Analyzer

**Reach Radar** is a web-based tool designed to analyze social media content (posts), evaluate its tone and sentiments, and provide actionable suggestions to improve engagement and reach.

## Tech Stack

- **Vite**: For creating the web application
- **React**: For building the user interface
- **HTML**: For structuring the web pages
- **Tailwind CSS**: For styling the application
- **JavaScript**: For adding interactivity and functionality

## Features

### 1. **Drag and Drop Functionality**
   In addition to allowing file selection through a button, the site provides a drag-and-drop feature where users can drop files into a designated area. This is implemented by making the div area selectable and handling file drop events.

### 2. **Handling Types of Files**
   The site only allows files in PDF or image formats (such as JPG or PNG). This is achieved through file validation during file handling.

### 3. **Extracted Text**
   The extracted text from both PDF and image files is displayed in an extracted text box. The following approaches are used for extraction:

   - **Extracting from PDFs**: The library `react-pdf-to-text` is used for extracting text from PDFs.  
   - **Extracting from Images**: The library `tesseract.js` is used for extracting text from images.  
   Other alternatives for text extraction:  
   - PDFs: `pdf-lib`, `pdf.js`, `pdf-parse`
   - Images: `ocrad.js`, `Google Vision API`, `AWS Textract`

### 4. **Analysis Page**
   The extracted text is analyzed and the following insights are presented:

   #### A) **Sentiment Analysis**
   The extracted text is sent to an API model (Hugging Face) to analyze its sentiment as **POSITIVE**, **NEGATIVE**, or **NEUTRAL**.  
   Other alternative APIs:  
   - IBM Watson, NLP Cloud, Meaning Cloud

   #### B) **Hashtag Suggestion**
   The extracted text is passed through a Hugging Face text-generation model to extract relevant hashtags for the content to improve its visibility on social media.  
   The model uses the following prompt:  
   _"Extract relevant hashtags from the following text to maximize social media engagement. Return only hashtags, separated by spaces. Here is the input text: `${text}`"_  
   Suggested hashtags are displayed in the output section.  
   Other alternative APIs:  
   - OpenAI, Google Gemma API, IBM Watson

   #### C) **Hashtag Copy**
   A **Copy** button allows users to easily copy the generated hashtags and paste them directly into their posts.

   #### D) **Suggestions**
   The extracted text is analyzed by a Hugging Face text-generation model to provide actionable suggestions for improving the post’s tone, formatting, and engagement level.  
   The model uses the following prompt:  
   _"Analyze the following social media content and suggest specific improvements to maximize user engagement, reach, and impact. Focus on aspects such as tone, formatting, and content relevance. Exclude any suggestions related to hashtags."_  
   The output is further processed to enhance clarity and presentation before being displayed in the Suggestions Section.  
   Other alternative APIs:  
   - OpenAI, Google Gemma API, IBM Watson

## Best Practices

1. **Using Toast for Notifications**: Notifications are displayed using a toast library (e.g., `react-toastify`) to provide a non-intrusive and visually appealing user experience.
2. **Storing API Keys Securely**: API keys are stored in a `.env` file to enhance security and prevent unauthorized access.

## Challenges

1. **Creating a Responsive UI/UX**: Designing a UI that adapts seamlessly to different screen sizes while maintaining a visually appealing and user-friendly experience.
2. **Finding APIs with High Free Limits**: Identifying APIs that offer a high number of free requests per day while meeting the project’s requirements for functionality and reliability.
3. **Seamless API Integration**: Integrating APIs into the project without disrupting the existing structure, ensuring modularity and maintaining clean, efficient code.
4. **Pre-processing Text for Desired Format**: Refining and structuring the raw output from text-generation APIs to present the extracted data in a clean, structured, and user-friendly format.

## Conclusion

Reach Radar is designed to help social media users optimize their posts, enhance engagement, and improve overall reach through AI-driven insights. By leveraging various text extraction and sentiment analysis technologies, it provides valuable suggestions and actionable improvements to enhance social media content performance.
