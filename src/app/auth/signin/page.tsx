import SignInForm from '@/components/SignInForm';
import Link from 'next/link';
import { BsGraphUpArrow } from 'react-icons/bs';

export default function SignIn() {
  return (
    <div className='flex w-full flex-col px-6 py-12'>
      <div className='mx-auto w-full max-w-sm display flex flex-col justify-center items-center	'>
      <BsGraphUpArrow className="w-8 h-8 mt-10"/>

        <h2 className='mt-4  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mx-auto mt-10 w-full max-w-sm'>
        <SignInForm />

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?{' '}
          <Link
            href='/auth/signup'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Register now!
          </Link>
        </p>
      </div>
    </div>
  );
}