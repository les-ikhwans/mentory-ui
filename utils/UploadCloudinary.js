
const cloud_name = 'loubnacloudy';

const upload_preset = 'mentory-project';

const uploadImageToCloudinary = async (file) => {
//   console.log('VITE_CLOUD_NAME:', process.env.VITE_CLOUD_NAME);
// console.log('VITE_UPLOAD_PRESET:', process.env.VITE_UPLOAD_PRESET);
// console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
// console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);
  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', upload_preset);
  uploadData.append('cloud_name', cloud_name);
  try {
    console.log('thecloudname is:',cloud_name );
    console.log('the upload_parset is  is:',upload_preset );
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export default uploadImageToCloudinary;
