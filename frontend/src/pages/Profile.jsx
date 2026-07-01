import React from 'react'
import toast from 'react-hot-toast';

function Profile() {
  const { isUpdatingProfile,updateProfile,authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!selectedImage) return toast.error("Please select an image to upload");

    await updateProfile({profilePic:selectedImage});
  }
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-white shadow-lg p-8 rounded-xl w-[400px]">
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Profile
