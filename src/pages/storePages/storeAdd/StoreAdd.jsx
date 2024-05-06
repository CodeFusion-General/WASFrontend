// eslint-disable-next-line no-unused-vars
import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid/index.js";

import { useState } from "react";
import { addStore } from "../../../api/store/StoreApi.jsx";

function StoreAdd() {
  const [store, setStore] = useState({
    name: "",
    address: "",
    description: "",
    storePhoneNo: "",
  });
  const [photo, setPhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("photoInput").click();
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", store.name);
    formData.append("address", store.address);
    formData.append("description", store.description);
    formData.append("storePhoneNo", store.storePhoneNo);
    formData.append("userIds", 1);

    const fileInput = document.getElementById("photoInput");
    if (fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);
    }

    try {
      const result = await addStore(formData);
      console.log(result);
      alert("Store successfully added!");
    } catch (error) {
      console.error("Error while adding the store:", error);
      alert("Failed to register store. Please try again later.");
    }
  };
  return (
    <>
      <form className="mx-auto max-w-screen-md mt-10" onSubmit={handleAdd}>
        <div className="space-y-12">
          <div className="pb-0">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              Add Store
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="store-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Store name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="store-name"
                    id="store-name"
                    onChange={(e) =>
                      setStore((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="storePhoneNo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Store PhoneNo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="storePhoneNo"
                    id="storePhoneNo"
                    onChange={(e) =>
                      setStore((prevState) => ({
                        ...prevState,
                        storePhoneNo: e.target.value,
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    name="address"
                    id="address"
                    rows="3"
                    onChange={(e) =>
                      setStore((prevState) => ({
                        ...prevState,
                        address: e.target.value,
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    id="description"
                    rows="3"
                    onChange={(e) =>
                      setStore((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <PlusCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={triggerFileInput}
                  >
                    Change
                  </button>
                  <input
                    type="file"
                    id="photoInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default StoreAdd;
