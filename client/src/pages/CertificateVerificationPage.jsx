import React, { useState } from "react";
import Navbar from "../components/Navbar";

const CertificateVerificationPage = () => {
  const [certificateCode, setCertificateCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCertificateCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!certificateCode) {
      setError("Please enter a certificate code.");
      return;
    }

    try {
      const response = await fetch(`/api/users/verify/${certificateCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setVerificationResult(null);
      } else {
        setError("");
        // Check both workStatus and paymentStatus before setting status as Valid
        setVerificationResult({
          status: data.workStatus && data.paymentStatus ? "Valid" : "Not Verified",
          participant: data.fullName,
          treesPlanted: 15,
          date: new Date().toLocaleDateString(),
          email: data.email,
          collegeName: data.collegeName,
          startDate: new Date(data.startDate).toLocaleDateString(),
          endDate: new Date(data.endDate).toLocaleDateString(),
          paymentStatus: data.paymentStatus, // Added payment status field
        });
      }
    } catch (err) {
      console.error(err);
      setError("There was an issue with the server. Please try again.");
    }
  };

  return (
    <div className="bg-white py-10 px-5 md:px-20">
      <div className="container mx-auto">
        <header className="flex justify-between items-center">
          <div className="text-green-600 font-bold text-3xl">Grow With Us</div>
        </header>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-green-800">Certificate Verification</h1>
            <p className="text-lg text-gray-600">
              Verify the authenticity of certificates issued by Grow With Us
            </p>

            <div className="space-y-3">
              <h2 className="font-semibold text-lg">How to Verify Certificates</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Enter the Certificate Code found on your certificate</li>
                <li>Click "Verify Certificate" to check authenticity</li>
                <li>View the verification results with certificate details</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-semibold text-lg">About Our Certificates</h2>
              <p className="text-gray-600">
                All certificates issued by Grow With Us contain a unique Certificate Code that can be verified through this portal.
                This ensures the authenticity of participation in our tree plantation campaigns.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-green-800">Verify Certificate</h2>
            <div>
              <label htmlFor="certificateCode" className="block text-lg text-gray-700">
                Certificate Code
              </label>
              <input
                type="text"
                id="certificateCode"
                value={certificateCode}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter Certificate Code"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Verify Certificate
            </button>

            {/* Displaying Verification Result */}
            {verificationResult && (
              <div className="mt-6">
                {verificationResult.status === "Valid" ? (
                  <div className="text-green-600">
                    <h3 className="text-xl font-semibold">Certificate Verified!</h3>
                    <p className="mt-2">Participant: {verificationResult.participant}</p>
                    <p>College Name: {verificationResult.collegeName}</p>
                    <p>Trees Planted: {verificationResult.treesPlanted}</p>
                    <p>Date of Verification: {verificationResult.date}</p>
                    <p>Start Date: {verificationResult.startDate}</p>
                    <p>End Date: {verificationResult.endDate}</p>
                    <p>
                      <strong>Status:</strong> 
                      {verificationResult.paymentStatus ? "Payment Successful. Certificate Verified" : "Payment Pending"}
                    </p>
                  </div>
                ) : (
                  <div className="text-red-600">
                    <h3 className="text-xl font-semibold">Invalid Certificate Code</h3>
                    <p>Please check the certificate code and try again.</p>
                  </div>
                )}
              </div>
            )}

            {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
