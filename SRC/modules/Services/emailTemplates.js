export const verificationEmailTemplate=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f7;
            color: #51545e;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: white;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            line-height: 1.6;
        }
        .email-body h2 {
            color: #333333;
        }
        .email-footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
            background-color: #f4f4f7;
        }
        .verification-link {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            font-size: 16px;
            border-radius: 4px;
        }
        .verification-link:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Verification</h1>
        </div>
        <div class="email-body">
            <h2>Hello,</h2>
            <p>Thank you for signing up! Please confirm your email address to activate your account.</p>
            <p>Click the button below to verify your email:</p>
            <a href="{{verification_link}}" class="verification-link">Verify Email</a>
            <p>If you didn’t request this email, you can safely ignore it.</p>
            <p>Thank you,<br>The [Your Company Name] Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`