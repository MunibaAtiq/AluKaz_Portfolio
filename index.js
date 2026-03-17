/**
 * Import function triggers from their respective submodules
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure email transporter (Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "munibaatiqaptech@gmail.com", // Aapka Gmail
        pass: "egiw joqe oymq bwiu", // Gmail App Password
    },
});

// Cloud Function trigger on new contact
exports.sendContactEmail = functions.database
    .ref("/contacts/{pushId}")
    .onCreate(async (snapshot, context) => {
        const contactData = snapshot.val();
        const pushId = context.params.pushId;

        console.log("New contact received:", contactData);

        // Email to admin (aapko)
        const adminMailOptions = {
            from: "Alukaz Website <munibaatiqaptech@gmail.com>",
            to: "munibaatiqaptech@gmail.com, syedfahadalikazmi@alukaz.com.pk, info@alukaz.com.pk",
            subject: `New Contact Form: ${contactData.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="background: linear-gradient(135deg, #d8492a, #f97316); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">New Contact Form Submission</h2>
                    </div>
                    
                    <div style="padding: 20px;">
                        <table style="width:100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold; width: 30%;">Name:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">${contactData.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Email:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Phone:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;"><a href="tel:${contactData.phone}">${contactData.phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Service:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">${contactData.service}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Subject:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">${contactData.subject}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Message:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">${contactData.message}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Time:</td>
                                <td style="padding: 12px; border: 1px solid #ddd;">${new Date(contactData.timestamp).toLocaleString()}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
                            <p style="margin: 0;"><strong>IP Address:</strong> ${contactData.ipAddress || "Not available"}</p>
                            <p style="margin: 10px 0 0;"><strong>User Agent:</strong> ${contactData.userAgent || "Not available"}</p>
                        </div>
                    </div>
                    
                    <div style="background: #f0f0f0; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
                        <p style="margin: 0; color: #666; font-size: 12px;">
                            This email was sent from Alukaz Contact Form | 
                            <a href="https://console.firebase.google.com/project/alukaz-contact/database/alukaz-contact/data/contacts/${pushId}" style="color: #d8492a;">View in Firebase</a>
                        </p>
                    </div>
                </div>
            `,
        };

        // Auto-reply to user
        const userMailOptions = {
            from: "Alukaz <munibaatiqaptech@gmail.com>",
            to: contactData.email,
            subject: "Thank you for contacting Alukaz",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="background: linear-gradient(135deg, #d8492a, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px;">
                        <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
                    </div>
                    
                    <div style="padding: 30px;">
                        <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${contactData.name}</strong>,</p>
                        
                        <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to Alukaz. We have received your inquiry and our team will get back to you within 24 hours.</p>
                        
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #d8492a; margin-top: 0;">Your Message Details:</h3>
                            <p><strong>Service:</strong> ${contactData.service}</p>
                            <p><strong>Subject:</strong> ${contactData.subject}</p>
                            <p><strong>Message:</strong> ${contactData.message}</p>
                        </div>
                        
                        <div style="background: #d8492a; color: white; padding: 20px; border-radius: 8px;">
                            <h3 style="margin-top: 0;">For Urgent Inquiries:</h3>
                            <p style="margin: 5px 0;">📞 Phone: 021-35120339</p>
                            <p style="margin: 5px 0;">📱 WhatsApp: +92 331 3175114</p>
                            <p style="margin: 5px 0;">✉️ Email: info@alukaz.com.pk</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 2px solid #ddd; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                        <p style="margin: 0;">© 2024 Alukaz Fabrication House. All rights reserved.</p>
                        <p style="margin: 5px 0;">Plot-No.AS-24, ST-3, Korangi Industrial Area, Karachi</p>
                    </div>
                </div>
            `,
        };

        try {
            // Send email to admin
            await transporter.sendMail(adminMailOptions);
            console.log("Admin email sent successfully");

            // Send auto-reply to user
            await transporter.sendMail(userMailOptions);
            console.log("User auto-reply sent successfully");

            // Update status in database
            await snapshot.ref.update({
                emailSent: true,
                emailSentAt: admin.database.ServerValue.TIMESTAMP,
            });

            return null;
        } catch (error) {
            console.error("Error sending email:", error);

            // Log error in database
            await snapshot.ref.update({
                emailSent: false,
                emailError: error.message,
            });

            return null;
        }
    });


     // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });

        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('#mainNav').addClass('scrolled');
            } else {
                $('#mainNav').removeClass('scrolled');
            }
            
            // Back to top button
            if ($(this).scrollTop() > 300) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        });

        $('#back-to-top').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });