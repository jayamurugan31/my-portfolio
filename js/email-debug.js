/**
 * EmailJS Debugging Helper
 * This script helps debug EmailJS integration issues
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('EmailJS Debug Helper loaded');
    
    // Check if EmailJS is properly loaded
    if (typeof emailjs !== 'undefined') {
        console.log('EmailJS is loaded correctly');
        
        try {
            // Check EmailJS version
            console.log('EmailJS Version:', emailjs.SDK_VERSION || 'Unknown');
            
            // Add event listeners to the form for better debugging
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submit-btn');
            const statusDiv = document.getElementById('contact-form-status');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    console.log('Form submission intercepted by debug helper');
                    // Status updates will be handled by the main sendMail function
                });
            }
            
            // Add global error handler for EmailJS
            window.displayFormStatus = function(message, isError = false) {
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.className = isError ? 'alert alert-danger' : 'alert alert-success';
                    statusDiv.textContent = message;
                    
                    // Auto-hide the status message after 5 seconds
                    setTimeout(function() {
                        statusDiv.style.display = 'none';
                    }, 5000);
                }
            };
            
            // Override sendMail to add more diagnostics
            const originalSendMail = window.sendMail;
            window.sendMail = function() {
                console.log('Enhanced sendMail called');
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'Sending...';
                }
                
                try {
                    // Call the original function but add our enhancements
                    const result = originalSendMail();
                    
                    return result;
                } catch (err) {
                    console.error('Error in sendMail function:', err);
                    displayFormStatus('An error occurred while sending your message. Please try again.', true);
                    
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Send Message';
                    }
                    
                    return false;
                }
            };
        } catch (err) {
            console.error('Error setting up EmailJS debugging:', err);
        }
    } else {
        console.error('EmailJS is not loaded properly. Check your script includes and initialization.');
    }
});