import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFormData } from '../../slices/formSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Password must contain at least 1 uppercase letter and 1 lowercase letter'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const entries = Object.fromEntries(formData.entries());
    const values = {
      name: entries.name as string,
      age: parseInt(entries.age as string, 10), // Convert age to a number
      email: entries.email as string,
      password: entries.password as string,
      confirmPassword: entries.confirmPassword as string,
      gender: entries.gender as string,
      termsAccepted: entries.termsAccepted === 'on', // Convert the checkbox value to a boolean
    };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      dispatch(addFormData(values));
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.errors.join(', '));
      }
    }
  };

  return (
    <div>
      <h1 className="text font-bold">Uncontrolled Form</h1>
      {error && <p className="text-red">{error}</p>}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap">
        <label>
          Name: <input type="text" name="name" required />
        </label>
        <label>
          Age: <input type="number" name="age" required />
        </label>
        <label>
          Email: <input type="email" name="email" required />
        </label>
        <label>
          Password: <input type="password" name="password" required />
        </label>
        <label>
          Confirm Password:{' '}
          <input type="password" name="confirmPassword" required />
        </label>
        <label>
          Gender:
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          <input type="checkbox" name="termsAccepted" /> Accept Terms and
          Conditions
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
