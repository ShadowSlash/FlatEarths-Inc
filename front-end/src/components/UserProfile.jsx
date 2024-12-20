import { Avatar, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, setUser } = useUser(); // Assuming you have a method to set the user context after updating
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // Handle form submission to upload avatar
  const handleAvatarUpload = async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      try {
        const response = await axios.post("http://localhost:8000/api/upload-avatar/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}` 
          }
        });

        if (response.data.status) {
          // Update user context with new avatar URL
          setUser(prevState => ({ ...prevState, avatar: response.data.avatar }));
        } else {
          alert("Avatar upload failed");
        }
      } catch (error) {
        console.error("Error uploading avatar", error);
        alert("An error occurred while uploading your avatar");
      }
    }
  };

  return (
    <section className="container mx-auto px-8 py-10">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar 
                src={user.avatar || `https://i.pravatar.cc/50?u=${user.username}`} 
                alt="avatar" 
                variant="rounded" 
              />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {user.username}
                </Typography>
                <Typography variant="small" className="font-normal text-gray-600">
                  {user.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
                onClick={() => document.getElementById('avatarInput').click()} // Open file input when button clicked
              >
                Change Avatar
              </Button>
              <input 
                type="file" 
                id="avatarInput" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
              <Button
                variant="gradient"
                size="sm"
                onClick={handleAvatarUpload} // Trigger avatar upload
              >
                Upload Avatar
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default UserProfile;
