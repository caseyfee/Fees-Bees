import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const MedicalHistoryForm = () => {
  const [medicalHistoryText, setMedicalHistoryText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const formFields = [
    {key: "firstName", 
    label: "First Name"
  }, {
    key: "lastName", label: "Last Name"
  }, {
    key: "gender", label: "Gender"
  }, {
    key: "age", label: "Age"
  }, {
    key: "dob", label: "Date Of Birth"
  }]

  const [userHistory, setUserHistory] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    dob: ""
  })

  const [addMedicalHistory, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addMedicalHistory } }) {
      try {
        const { medicalHistorys } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { medicalHistorys: [addMedicalHistory, ...medicalHistorys] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMedicalHistory({
        variables: {
          medicalHistoryText,
          medicalHistoryAuthor: Auth.getProfile().data.patientname,
        },
      });

      setMedicalHistoryText('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'medicalHistoryText' && value.length <= 280) {
      setMedicalHistoryText(value);
      setCharacterCount(value.length);
    } else if (formFields.includes(name)) {

    }
  };



  return (
    <div>
      <h3>New Patient Medical History Form</h3>

      {Auth.loggedIn() ? (
        <>

            <form
            className="flex-col-1 align-center"
            onSubmit={handleFormSubmit}
          >
            <p>Patient Information</p>

            {formFields.map(({label, key}) => {
              return <div className="mb-6">
                <label for={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <input type="text" id={key} name={key} value={userHistory[key]} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            })}


            <p>Symptoms</p>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Abdominal pain</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Body Aches</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chest Pain</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cough</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Diarrhea</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Difficulty Breathing</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fatigue</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fever</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nasal Congestion</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nausea</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sore throat</label>
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vomiting</label>
            </div>

            <p>Other:</p>
            <div className="col-12 col-lg-9">
              <textarea
                name="medicalHistoryText"
                placeholder="Here's a new medicalHistory..."
                value={medicalHistoryText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add MedicalHistory
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your medicalHistorys. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MedicalHistoryForm;
