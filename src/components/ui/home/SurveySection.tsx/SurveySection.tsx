import React from "react";

const SurveySection = () => {
  return (
    <div>
      <h3 className="text-gray-800 text-center my-5 text-3xl font-semibold sm:text-4xl">
        Survey Form
      </h3>
      {/* <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              What is your favorite Service?
            </label>
            <div className="flex flex-wrap -mx-2">
              <div className="px-2 w-1/3">
                <label
                  htmlFor="color-red"
                  className="block text-gray-700 font-medium mb-2"
                >
                  <input
                    type="radio"
                    id="color-red"
                    name="color"
                    value="red"
                    className="mr-2"
                  />
                  Red
                </label>
              </div>
              <div className="px-2 w-1/3">
                <label
                  htmlFor="color-blue"
                  className="block text-gray-700 font-medium mb-2"
                >
                  <input
                    type="radio"
                    id="color-blue"
                    name="color"
                    value="blue"
                    className="mr-2"
                  />
                  Blue
                </label>
              </div>
              <div className="px-2 w-1/3">
                <label
                  htmlFor="color-green"
                  className="block text-gray-700 font-medium mb-2"
                >
                  <input
                    type="radio"
                    id="color-green"
                    name="color"
                    value="green"
                    className="mr-2"
                  />
                  Green
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default SurveySection;
