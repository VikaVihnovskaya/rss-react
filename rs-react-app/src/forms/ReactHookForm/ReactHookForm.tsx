import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addFormData, FormData } from '../../slices/formSlice';
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
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Terms acceptance is required'),
});

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(addFormData(data));
    navigate('/');
  };

  return (
    <div>
      <h1 className="text font-bold">Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap">
        <label>
          Name: <input type="text" {...register('name')} />
        </label>
        {errors.name && <p className="text-red">{errors.name.message}</p>}

        <label>
          Age: <input type="number" {...register('age')} />
        </label>
        {errors.age && <p className="text-red">{errors.age.message}</p>}

        <label>
          Email: <input type="email" {...register('email')} />
        </label>
        {errors.email && <p className="text-red">{errors.email.message}</p>}

        <label>
          Password: <input type="password" {...register('password')} />
        </label>
        {errors.password && (
          <p className="text-red">{errors.password.message}</p>
        )}

        <label>
          Confirm Password:{' '}
          <input type="password" {...register('confirmPassword')} />
        </label>
        {errors.confirmPassword && (
          <p className="text-red">{errors.confirmPassword.message}</p>
        )}

        <label>
          Gender:
          <select {...register('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {errors.gender && <p className="text-red">{errors.gender.message}</p>}

        <label>
          <input type="checkbox" {...register('termsAccepted')} /> Accept Terms
          and Conditions
        </label>
        {errors.termsAccepted && (
          <p className="text-red">{errors.termsAccepted.message}</p>
        )}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
