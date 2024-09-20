const token ="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"
const input = document.querySelector("#prompt-input")
const image = document.querySelector("#generated-image")
const generate = document.querySelector("#generate-btn")
const downloadButton = document.getElementById('download-btn');
// const previousButton = document.getElementById('previous-btn');

const loader = document.querySelector('#loader');
const placeholderImage = document.querySelector('#placeholder-image');

async function query() {

  loader.style.display = 'flex'; // Show loader
  image.style.display = 'none'; // Hide the image

  

    const response = await fetch(
    
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
       {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ "inputs": input.value }),
    }
    );
  
    if (!response.ok) {
      console.error("Error fetching the image");
      loader.style.display = 'none'
      return;
    }
  
    const result = await response.blob(); 
    image.src = URL.createObjectURL(result);
  
  



   // Convert the blob to a Base64 string and store it in localStorage
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64data = reader.result;
      localStorage.setItem('generatedImage', base64data);
      console.log("Image stored in localStorage");
    };
    reader.readAsDataURL(result);

    // Hide the loader and show the image once it's loaded
    reader.onload = function () {
      loader.style.display = 'none'; // Hide the loader
      image.style.display = 'block'; // Show the image
  };
  

    console.log(result);
  }
  
  // Save the image from localStorage
  downloadButton.addEventListener("click", () => {
    const storedImage = localStorage.getItem('generatedImage');
    if (storedImage) {
      const link = document.createElement('a');
      link.href = storedImage;
      link.download = 'generated-image.png';
      link.click();
      console.log("Image saved from localStorage");
    } else {
      console.log("No image to save");
    }
  });
  
  // Load the stored image on page load
  document.addEventListener('DOMContentLoaded', () => {
    const storedImage = localStorage.getItem('generatedImage');
    if (storedImage) {
      image.src = storedImage;
    }
  });


  
  
  generate.addEventListener("click", query);


  