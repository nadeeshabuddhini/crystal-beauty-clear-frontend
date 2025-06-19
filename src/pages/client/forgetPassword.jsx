import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function sendEmail(){
        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/sendMail', { 
            email: email
        }).then((res) => {
            console.log("Email sent successfully", res.data);
            setEmailSent(true);
            toast.success("Email sent successfully! Please check your inbox.");
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to send email. Please try again.");
        })
    }

    function resetPassword(){
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/resetPassword', { 
            email: email, 
            otp: otp, 
            newPassword: password 
        }).then((res) => {
            console.log(res.data);
            toast.success("Password reset successfully! You can now log in with your new password.");
            window.location.href = '/login';
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to reset password. Please try again.");
            window.location.reload();
        })
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {emailSent ?
            <div className='w-full h-full flex items-center justify-center'>
                <div className='bg-white p-4 rounded shadow-md w-[400px]'>
                    <h1 className='text-2xl font-bold mb-4'>Reset Password</h1>
                    
                    <input
                        type="text"
                        placeholder="OTP"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <button
                        type="submit"
                        onClick={resetPassword}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
            :<div className="w-96 h-fit p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
                <p className="text-gray-600 mb-6">Enter your email to reset your password.</p>
                
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                        onClick={sendEmail}>
                        Send OTP
                    </button>
                
            </div>
  }
        </div>
    );
}