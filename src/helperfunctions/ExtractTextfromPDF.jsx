import pdfToText from "react-pdftotext";

const extractText = async (file) => {
  try {
    const text = await pdfToText(file); // Extract text from the PDF
    return text; // Resolve the extracted text
  } catch (error) {
    console.error("Failed to extract text from PDF:", error);
    throw new Error("Error extracting text from PDF."); // Reject with a meaningful error message
  }
};

export default extractText;
