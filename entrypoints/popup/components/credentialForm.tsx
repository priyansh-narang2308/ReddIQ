import { Save } from "lucide-react";
import React from "react";

const CredentialForm = () => {
  return (
    <div className="dark w-150">
      <div className="min-h-screen bg-gray-900 flex items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              API Configuration
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter your API Credentials
            </p>
          </div>{" "}
          <div className="bg-gray-800 shadow-md rounded-lg pt-5">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="endpoint"
                    className="block text-sm font-medium text-white"
                  >
                    Endpoint
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      id="endpoint"
                      name="endpoint"
                      required
                      placeholder="https://api.example.com/v1"
                      className="appearance-none block w-full pt-5 "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-white"
                  >
                    API Key
                  </label>
                  <div className="mt-1 relative rounded-md shadow-lg">
                    <input
                      id="apiKey"
                      name="apiKey"
                      placeholder="Enter your API Key"
                      className="appearance-none block w-full pt-5 "
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4"
                >
                  <Save className="mr-2 h-5 w-5" aria-hidden="true" />
                  Save{" "}
                </button>
              </div>
            </form>
          </div>
          <p className="mt-4 text-center text-sm text-gray-400">
            Your API Credentials are securely processed on browser
          </p>
          <p className="">
            ReddIQ &copy;2025.{" "}
            {new Date().getFullYear() > 2025
              ? `- ${new Date().getFullYear()}`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CredentialForm;
