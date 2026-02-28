// Contact form functionality
function sendMail() {
    console.log("sendMail function called");
    
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        to_email: "jayamuruganv28@gmail.com",
        from_name: document.getElementById("name").value,
        reply_to: document.getElementById("email").value
    };

    console.log("Form data collected:", params);

    if (!params.name || !params.email || !params.subject || !params.message) {
        alert("Please fill all the fields");
        return false;
    }

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        alert("EmailJS is not loaded. Please refresh the page and try again.");
        return false;
    }
    
    // Ensure EmailJS is properly initialized with public key from config
    const publicKey = window.EmailConfig.publicKey;
    const serviceId = window.EmailConfig.serviceId;
    const templateId = window.EmailConfig.templateId;
    
    try {
        console.log("Initializing EmailJS with public key from config:", publicKey);
        emailjs.init(publicKey);
        console.log("EmailJS initialized successfully");
    } catch (initError) {
        console.error("Failed to initialize EmailJS:", initError);
        alert("Email service initialization failed. Please try again.");
        return false;
    }
    
    console.log("Using EmailJS Service ID:", serviceId);
    console.log("Using EmailJS Template ID:", templateId);
    
    // Show sending status
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
    }
    
    emailjs.send(serviceId, templateId, params)
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            
            if (typeof window.displayFormStatus === 'function') {
                window.displayFormStatus("Your message has been sent successfully!");
            } else {
                alert("Email Sent Successfully!");
            }
            
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message";
            }
        })
        .catch(function (error) {
            console.error("FAILED TO SEND EMAIL:", error);
            
            let errorMessage = "Failed to send email: ";
            if (error.text) {
                errorMessage += error.text;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += "Unknown error. Please try again.";
            }
            
            if (typeof window.displayFormStatus === 'function') {
                window.displayFormStatus(errorMessage, true);
            } else {
                alert(errorMessage);
            }
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message";
            }
        });

    console.log("Returning false to prevent form submission");
    return false;
}

window.sendMail = sendMail;
console.log("EmailJS contact script loaded successfully");
