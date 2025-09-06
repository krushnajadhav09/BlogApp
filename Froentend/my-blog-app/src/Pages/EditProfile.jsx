import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditProfile() {
  const accessToken = localStorage.getItem("access_token");

  const [profile_picture, setProfilePicture] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [birth_date, setBirthDate] = useState("");

  // ✅ Fetch current profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = res.data;
        setLocation(data.location || "");
        setBio(data.bio || "");
        setBirthDate(data.birth_date || "");
        // Profile picture is a file object — leave it null unless you're allowing preview or change
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, [accessToken]);

  // ✅ Handle edit/save
  const HandleEdit = async () => {
    const formData = new FormData();
    if (profile_picture) {
      formData.append("profile_picture", profile_picture);
    }
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("birth_date", birth_date);

    try {
      const res = await axios.patch("http://127.0.0.1:8000/api/profile/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Profile updated:", res.data);
      // Optional: navigate back to Profile page here
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className='EditProfile_mainConatainer'>
      <div>
        <h1 className='p-5'>This is Profile Edit Page</h1>

        <input
          type='file'
          name='image'
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <hr />

        <input
          type='text'
          placeholder='Location'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <hr />

        <input
          type='text'
          value={bio}
          name='bio'
          placeholder='Bio'
          onChange={(e) => setBio(e.target.value)}
        />
        <hr />

        <label style={{ marginRight: "20px" }}>Birthdate </label>
        <input
          type='date'
          value={birth_date}
          name='birth_date'
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <hr />

        <button className='btn btn-primary' onClick={HandleEdit}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
