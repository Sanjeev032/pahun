import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Expected to be an App Password
    },
});

/**
 * Send an email with HTML layout
 */
const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: `"Pahun Boutique" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

/**
 * Generic HTML wrapper for professional styling
 */
const baseHtmlLayout = (content) => `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafafa; border: 1px solid #eeeeee;">
        <div style="background-color: #000000; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; font-weight: 300; letter-spacing: 4px; uppercase; margin: 0;">PAHUNN</h1>
        </div>
        <div style="padding: 40px; background-color: #ffffff;">
            ${content}
        </div>
        <div style="background-color: #1a1a1a; padding: 20px; text-align: center; color: #888888; font-size: 12px; letter-spacing: 1px; uppercase;">
            <p>© ${new Date().getFullYear()} Pahunn. All rights reserved.</p>
        </div>
    </div>
`;

/**
 * 1. Welcome Email (Account Registration)
 */
export const sendWelcomeEmail = async (email, name) => {
    const html = baseHtmlLayout(`
        <h2 style="color: #333333; font-weight: 300;">Welcome to Pahunn, ${name}.</h2>
        <p style="color: #555555; line-height: 1.6;">We are delighted to have you join our exclusive community. Explore our curated collections of luxury craftsmanship designed to elevate your living spaces.</p>
        <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shop" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Explore Collection</a>
        </div>
    `);
    
    return sendEmail({ to: email, subject: 'Welcome to Pahunn', html });
};

/**
 * 2. Order Confirmation
 */
export const sendOrderConfirmationEmail = async (email, orderDetails) => {
    const itemsHtml = orderDetails.orderItems.map(item => `
        <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; color: #333333;">${item.name}</td>
            <td style="padding: 10px 0; color: #555555; text-align: center;">x${item.qty}</td>
            <td style="padding: 10px 0; color: #333333; text-align: right;">₹${item.price.toLocaleString()}</td>
        </tr>
    `).join('');

    const html = baseHtmlLayout(`
        <h2 style="color: #333333; font-weight: 300;">Order Confirmed</h2>
        <p style="color: #555555; line-height: 1.6;">Thank you for your purchase. We have received your order <strong>#${orderDetails._id}</strong> and are preparing it for processing.</p>
        
        <table style="width: 100%; margin-top: 30px; border-collapse: collapse;">
            <thead>
                <tr style="border-bottom: 2px solid #000000;">
                    <th style="padding: 10px 0; text-align: left; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Item</th>
                    <th style="padding: 10px 0; text-align: center; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Qty</th>
                    <th style="padding: 10px 0; text-align: right; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #000000; text-align: right;">
            <p style="margin: 5px 0; color: #555; font-size: 14px;">Subtotal: ₹${orderDetails.itemsPrice.toLocaleString()}</p>
            <p style="margin: 5px 0; color: #555; font-size: 14px;">Shipping: ₹${orderDetails.shippingPrice.toLocaleString()}</p>
            <p style="margin: 5px 0; color: #555; font-size: 14px;">Tax: ₹${orderDetails.taxPrice.toLocaleString()}</p>
            <p style="margin: 10px 0 0 0; color: #000; font-size: 18px; font-weight: bold;">Total: ₹${orderDetails.totalPrice.toLocaleString()}</p>
        </div>

        <p style="color: #555555; line-height: 1.6; margin-top: 30px;">Payment Method: <strong>${orderDetails.paymentMethod}</strong>.</p>
        <p style="color: #555555; line-height: 1.6;">Estimated Delivery: 3-5 Business Days.</p>
    `);
    
    return sendEmail({ to: email, subject: 'Your Pahunn Order Confirmation', html });
};

/**
 * 3. Payment Success
 */
export const sendPaymentSuccessEmail = async (email, orderDetails) => {
    const html = baseHtmlLayout(`
        <h2 style="color: #333333; font-weight: 300;">Payment Successful</h2>
        <p style="color: #555555; line-height: 1.6;">We have successfully received payment for your order <strong>#${orderDetails._id}</strong>.</p>
        <p style="color: #555555; line-height: 1.6;">Amount Paid: <strong>₹${orderDetails.totalPrice.toLocaleString()}</strong></p>
        <p style="color: #555555; line-height: 1.6;">Transaction ID: <strong>${orderDetails.paymentResult?.id || 'N/A'}</strong></p>
        <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">View Order Status</a>
        </div>
    `);
    
    return sendEmail({ to: email, subject: 'Payment Received - Pahunn', html });
};

/**
 * 4. Shipping Update
 */
export const sendShippingUpdateEmail = async (email, orderDetails) => {
    const html = baseHtmlLayout(`
        <h2 style="color: #333333; font-weight: 300;">Your Order is on the way!</h2>
        <p style="color: #555555; line-height: 1.6;">Good news! Your order <strong>#${orderDetails._id}</strong> has been shipped and is en route to your delivery address.</p>
        <p style="color: #555555; line-height: 1.6;">It should arrive within 1-3 business days.</p>
    `);
    
    return sendEmail({ to: email, subject: 'Order Shipped - Pahunn', html });
};

/**
 * 5. Password Reset Email
 */
export const sendPasswordResetEmail = async (email, resetUrl) => {
    const html = baseHtmlLayout(`
        <h2 style="color: #333333; font-weight: 300;">Reset Your Password</h2>
        <p style="color: #555555; line-height: 1.6;">You are receiving this email because you (or someone else) have requested the reset of a password for your account.</p>
        <p style="color: #555555; line-height: 1.6;">Please click on the button below to secure a new password. If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
            <a href="${resetUrl}" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Reset Password</a>
        </div>
        <p style="color: #888888; font-size: 11px; line-height: 1.6;">Or copy and paste this link into your browser:<br/> <a href="${resetUrl}" style="color: #555;">${resetUrl}</a></p>
    `);
    
    return sendEmail({ to: email, subject: 'Password Reset Request - Pahunn', html });
};
