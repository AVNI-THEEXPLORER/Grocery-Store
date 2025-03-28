const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
  <!-- Header -->
  <div style="background: #4CAF50; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Grocery Store</h1>
  </div>
  
  <!-- Content -->
  <div style="padding: 25px; background: #f9f9f9;">
    <p style="font-size: 16px; color: #333;">Dear ${name},</p>
    <p style="font-size: 16px; color: #333;">You've requested a password reset. Please use the following OTP code:</p>
    
    <!-- OTP Box -->
    <div style="background: #ffffff; border: 2px dashed #4CAF50; border-radius: 6px; padding: 15px; text-align: center; margin: 25px 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #333;">
      ${otp}
    </div>
    
    <p style="font-size: 14px; color: #666; text-align: center;">
      <i class="fa fa-clock-o" aria-hidden="true"></i> This OTP is valid for 1 hour only
    </p>
    
    <!-- Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
        Reset Password
      </a>
    </div>
    
    <p style="font-size: 14px; color: #999; text-align: center;">
      If you didn't request this, please ignore this email or contact support.
    </p>
  </div>
  
  <!-- Footer -->
  <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
    <p style="margin: 0;">© ${new Date().getFullYear()} Grocery Store. All rights reserved.</p>
    <p style="margin: 5px 0 0 0;"> Rajasthan, India</p>
  </div>
</div>
    `
}

export default forgotPasswordTemplate