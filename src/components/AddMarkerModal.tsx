import React, { useRef } from 'react';

interface CrudModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  onAddMarkerClick: () => void;
    inputTitleMarker: React.MutableRefObject<HTMLInputElement>;
    inputDescriptionMarker: React.MutableRefObject<HTMLTextAreaElement>;
}

const CrudModal: React.FC<CrudModalProps> = ({ isVisible, toggleModal, onAddMarkerClick, inputTitleMarker, inputDescriptionMarker }) => {
  

  return (
    <div
      id='crud-modal'
      aria-hidden='true'
      className={`absolute bottom-full right-0 z-40 mb-2 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}
    >
      <div className='relative max-h-full w-max p-4'>
        <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Create New Marker
            </h3>
            <button
              type='button'
              onClick={toggleModal}
              className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <svg
                className='h-3 w-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-4 md:p-5'>
            <div className='mb-4 grid grid-cols-2 gap-4 '>
              <div className='col-span-2'>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  ref={inputTitleMarker}
                  maxLength={15}
                  className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                  placeholder='Type marker name'
                  required
                />
              </div>
              <div className='col-span-2'>
                <label
                  htmlFor='description'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Marker Description
                </label>
                <textarea
                  id='description'
                  rows={4}
                  ref={inputDescriptionMarker}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Write marker description here'
                ></textarea>
              </div>
            </div>
            <button
              type='submit'
              className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={onAddMarkerClick}
            >
              <svg
                className='-ms-1 me-1 h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              Add new marker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudModal;
