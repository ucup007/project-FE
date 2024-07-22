import React from 'react';

function Profile() {
  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="profile-section">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <p className="text-gray-900 leading-tight">Muhammad Yusuf Haekal</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <p className="text-gray-900 leading-tight">yusufhaekal007@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
