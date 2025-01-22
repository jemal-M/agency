"use client"
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Please enter your email address.')
      return
    }

    // Add your password reset logic here (e.g., API call)
    console.log('Password reset request for:', email)
    setSuccess(true)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
      {success ? (
        <p className="text-green-600">A password reset link has been sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword
