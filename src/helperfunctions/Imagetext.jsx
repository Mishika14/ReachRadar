import Tesseract from "tesseract.js";

const processImage = async (image) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      Tesseract.recognize(reader.result, "eng", {
        logger: (info) => console.log(info), // Logs progress
      })
        .then(({ data: { text } }) => resolve(text))
        .catch((err) => reject(err));
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(image);
  });
};

export default processImage;
