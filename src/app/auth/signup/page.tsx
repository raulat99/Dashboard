import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';
import { BsGraphUpArrow } from 'react-icons/bs';

export default function SignUp() {
  return (
    <div className='flex w-full flex-col px-6 py-12'>
      <div className='mx-auto w-full max-w-sm display flex flex-col justify-center items-center	'>
          <BsGraphUpArrow className="w-8 h-8 mt-10"/>
        <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Register now!
        </h2>
      </div>

      <div className='mx-auto mt-10 w-full max-w-sm'>
        <SignUpForm />

        <p className='mt-10 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            href='/auth/signin'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Sign in!
          </Link>
        </p>
      </div>
    </div>
  );
}