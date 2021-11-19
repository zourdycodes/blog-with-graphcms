import React, { useState, useEffect, ChangeEvent } from 'react';
import { submitComment } from '../../services/contentManagement';

interface Props {
  slug: string;
}

interface FormData {
  name: string;
  email: string;
  comment?: string;
  storeData: boolean | undefined;
}

export const CommentForm: React.FC<Props> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState<Storage | any>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<FormData | any>({
    name: '',
    email: '',
    comment: '',
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    /**
     * @description this object contains user data of previous comment that
     * being stored inside their localStorage broswer
     */
    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      // comment: '...',
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };
    // initialize the previous data for future comments
    setFormData(initialFormData);
  }, []);

  const controlledInput = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState: FormData) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState: FormData) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;

    // guard clause for assuring that there is no empty value of given variable
    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentStructure = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentStructure).then((result) => {
      if (result.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }

        formData.comment = '';
        setFormData((prevState: FormData) => ({
          ...prevState,
          ...formData,
        }));

        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        What's your thought?
      </h3>
      {/* COMPONENT FOR WRITING A COMMENT */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={(e) => controlledInput(e)}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      {/* EMAIL SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => controlledInput(e)}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => controlledInput(e)}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
            onChange={(e) => controlledInput(e)}
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {' '}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};
