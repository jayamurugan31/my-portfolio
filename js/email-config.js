/**
 * EmailJS Configuration
 * This file manages EmailJS settings and loads from environment variables
 */

// Function to load environment variables from .env file
async function loadEnvironmentConfig() {
    try {
        const response = await fetch('.env');
        const envText = await response.text();
        const envVars = {};
        
        envText.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envVars[key.trim()] = value.trim();
            }
        });
        
        return envVars;
    } catch (error) {
        console.warn('Could not load .env file, using fallback values:', error);
        return {};
    }
}

// EmailJS Configuration object (declare once globally)
window.EmailConfig = {
    // Fallback values if .env file cannot be loaded
    publicKey: "uMeI1Zm32tX8SM2l5",
    serviceId: "service_jl6rfwn",
    templateId: "template_e4ygfmr"
};

// Initialize configuration from environment
async function initializeConfig() {
    try {
        console.log('Loading configuration from .env file...');
        const envVars = await loadEnvironmentConfig();
        
        // Update EmailConfig with values from .env file
        if (envVars.EMAILJS_PUBLIC_KEY) {
            window.EmailConfig.publicKey = envVars.EMAILJS_PUBLIC_KEY;
        }
        if (envVars.EMAILJS_SERVICE_ID) {
            window.EmailConfig.serviceId = envVars.EMAILJS_SERVICE_ID;
        }
        if (envVars.EMAILJS_TEMPLATE_ID) {
            window.EmailConfig.templateId = envVars.EMAILJS_TEMPLATE_ID;
        }
        
        console.log('EmailJS Config loaded from environment:', {
            publicKey: window.EmailConfig.publicKey,
            serviceId: window.EmailConfig.serviceId,
            templateId: window.EmailConfig.templateId
        });
        
        // Initialize EmailJS after config is loaded
        initializeEmailJS();
    } catch (error) {
        console.error('Error loading environment config:', error);
        // Fallback to hardcoded values and initialize
        initializeEmailJS();
    }
}

// Initialize EmailJS with the public key
function initializeEmailJS() {
    console.log("Attempting to initialize EmailJS...");
    if (typeof emailjs !== 'undefined') {
        try {
            // Simple initialization method
            emailjs.init(window.EmailConfig.publicKey);
            console.log("EmailJS initialized successfully with public key:", window.EmailConfig.publicKey);
            return true;
        } catch (error) {
            console.error("EmailJS initialization error:", error);
            return false;
        }
    } else {
        console.error("EmailJS library not loaded");
        return false;
    }
}

// Make functions available globally
window.initializeEmailJS = initializeEmailJS;
window.initializeConfig = initializeConfig;

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, loading configuration from .env...");
    initializeConfig();
});
