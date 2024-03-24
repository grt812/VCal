import React from 'react';

export default function LoginPage() {
    // Function to handle Google login button click
    const handleGoogleLogin = () => {
    };

export default function loginPage() {
    return(
        <div class="login-container">
            <h2>Login</h2>
            <form action="your_login_handler.php" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <button type="submit">Login</button>
            </form>
        </div>
    );
}