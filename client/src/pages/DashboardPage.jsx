import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [workImages, setWorkImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const uniqueId = localStorage.getItem('uniqueId');

  useEffect(() => {
    fetch(`http://localhost:10000/api/users/dashboard/${uniqueId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkImages(data.workImages);
      })
      .catch(() => setError('Unable to fetch user data'));
  }, [uniqueId]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('workImages', files[i]);
    }

    setError('');
    setSuccess('');
    setLoadingImages(true);

    fetch(`http://localhost:10000/api/users/upload-work-images/${uniqueId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess('Work images uploaded for review.');
        setWorkImages(data.user.workImages);
      })
      .catch(() => setError('Error uploading images'))
      .finally(() => setLoadingImages(false));
  };

  const handlePaymentScreenshotUpload = (e) => {
    const file = e.target.files[0];
    setPaymentScreenshot(file);
  };

  const submitPaymentScreenshot = () => {
    if (!paymentScreenshot) {
      setError('Please select a payment screenshot.');
      return;
    }

    const formData = new FormData();
    formData.append('paymentScreenshot', paymentScreenshot);

    setError('');
    setSuccess('');
    setLoadingPayment(true);

    fetch(`http://localhost:10000/api/users/upload-payment-screenshot/${uniqueId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => setSuccess('Payment screenshot uploaded for review.'))
      .catch(() => setError('Error uploading payment screenshot'))
      .finally(() => setLoadingPayment(false));
  };

  return (
    <div className="bg-gray-50 p-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          User Dashboard
        </h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        {/* Display Uploaded Images */}
        <div className="mb-8">
          <h3 className="text-xl text-green-600 mb-3">Your Work Images</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workImages.map((image, i) => (
              <li key={i} className="border rounded shadow overflow-hidden">
                <img
                  src={image}
                  alt={`Work ${i + 1}`}
                  className="w-full h-40 object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Work Images Upload */}
        <div className="mb-8">
          <h3 className="text-xl text-green-600 mb-3">Upload 15-Day Work Images</h3>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            disabled={loadingImages}
            className="border p-2 rounded w-full mb-2"
          />
          {loadingImages && <p className="text-blue-600">Uploading images...</p>}
          <p className="text-gray-600 text-sm">
            Upload images of the trees you've planted each day (15 images total)
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-8 bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Payment Details</h3>
          <p className="text-lg mb-2">Please pay ₹10 to receive your official certificate.</p>
          <p className="text-sm">Account Number: 1234567890</p>
          <p className="text-sm">IFSC Code: ABCD0123456</p>
        </div>

        {/* Payment Screenshot Upload */}
        <div className="mb-8">
          <h3 className="text-xl text-green-600 mb-3">Upload Payment Screenshot</h3>
          <input
            type="file"
            onChange={handlePaymentScreenshotUpload}
            disabled={loadingPayment}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={submitPaymentScreenshot}
            disabled={loadingPayment}
            className="bg-green-600 text-white p-3 rounded w-full hover:bg-green-700 transition"
          >
            {loadingPayment ? 'Uploading...' : 'Send Payment Screenshot for Review'}
          </button>
          {loadingPayment && <p className="text-blue-600 mt-2">Uploading screenshot...</p>}
        </div>

        {/* Logout */}
        <div className="text-center">
          <button
            className="bg-gray-600 text-white p-3 rounded w-full hover:bg-gray-700 transition"
            onClick={() => (window.location.href = '/login')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
