import React, { useRef } from 'react';

interface EditMarkerModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  editButtonClick: () => void;
    inputTitleMarker: React.RefObject<HTMLInputElement>;
    inputDescriptionMarker: React.RefObject<HTMLTextAreaElement>;
}

const EditMarkerModal: React.FC<EditMarkerModalProps> = ({ isVisible, toggleModal, editButtonClick, inputTitleMarker, inputDescriptionMarker }) => {
  

  return (
    <div
      id='crud-modal'
      aria-hidden='true'
      className={`fixed inset-0 z-20 filter  ${isVisible ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <div className=' max-h-full w-max p-4'>
        <div className=' rounded-lg bg-white shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Edit the marker
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
                  //value={inputTitleMarker.current?.value}
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
                  //value={inputDescriptionMarker.current?.value}
                ></textarea>
              </div>
            </div>
            <button
              type='submit'
              className='inline-flex items-center space-x-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={editButtonClick}
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
             <p>Edit marker</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMarkerModal;
