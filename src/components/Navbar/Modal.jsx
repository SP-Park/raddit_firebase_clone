import React from 'react'
import Login from '../auth/Login'
import OAuth from '../auth/OAuth'
import Register from '../auth/Register'
import ResetPassword from '../auth/ResetPassword'

export default function Modal({ modalName, setModal, setShowModal }) {

  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-brand">
                    {modalName === 'login' && 'Log In'}
                    {modalName === 'signup' && 'Sign Up'}
                    {modalName === 'resetPassword' && 'Reset Password'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='flex flex-col items-center justify-center p-4'>
                 <img className='my-1' style={{ width: 30 }} alt='logo' src='logo_mini.png'/>
                  {modalName === 'login' || modalName === 'signup' ? <OAuth /> : null}
                  {modalName === 'login' || modalName === 'signup' ? <p className='py-2'>OR</p> : null}
                  {modalName === 'login' && <Login modalName={modalName} setModal={setModal} setShowModal={setShowModal} />}
                  {modalName === 'signup' && <Register modalName={modalName} setModal={setModal} setShowModal={setShowModal} />}
                  {modalName === 'resetPassword' && <ResetPassword modalName={modalName} setModal={setModal} setShowModal={setShowModal} />}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

