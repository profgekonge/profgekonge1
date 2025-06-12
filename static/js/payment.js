// PayStack Integration
const paymentManager = {
    PAYSTACK_KEY: 'pk_live_8a364e85699350340d7651891a6d8afe5f922957',

    validateEmail(email) {
        if (!email) {
            alert('Please enter your email address');
            return false;
        }
        return true;
    },

    getCoffeeType(amount) {
        const types = {
            '500': 'Regular',
            '1000': 'Double Shot',
            '1500': 'Premium Blend'
        };
        return types[amount] || 'Regular';
    },

    generateReference() {
        return 'coffee_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },    async processPayment() {
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        const spinner = document.getElementById('paymentSpinner');
        const payButton = document.getElementById('payButton');

        if (!this.validateEmail(email)) return;
        
        // Show loading state
        spinner.classList.remove('hidden');
        payButton.disabled = true;

        const handler = PaystackPop.setup({
            key: this.PAYSTACK_KEY,
            email: email,
            amount: parseInt(amount) * 100, // Convert to lowest currency unit
            currency: 'KES',
            ref: this.generateReference(),
            label: 'Buy Coffee for Prof. Gekonge',
            metadata: {
                custom_fields: [
                    {
                        display_name: "Coffee Type",
                        variable_name: "coffee_type",
                        value: this.getCoffeeType(amount)
                    }
                ]
            },            onClose: () => {
                document.getElementById('paymentForm').reset();
                document.getElementById('paymentSpinner').classList.add('hidden');
                document.getElementById('payButton').disabled = false;
            },
            callback: (response) => {
                if (response.status === 'success') {
                    alert('Thank you for your support! ☕');
                    document.getElementById('paymentForm').reset();
                    modalManager.closeBuyCoffeeModal();
                    this.handleSuccessfulPayment(response.reference);
                } else {
                    alert('Payment failed. Please try again.');
                }
            }
        });

        handler.openIframe();
    },

    handleSuccessfulPayment(reference) {
        // Store the transaction reference in localStorage
        localStorage.setItem('lastPaymentRef', reference);
        localStorage.setItem('lastPaymentDate', new Date().toISOString());
        
        // Redirect to success page
        window.location.href = "success-page.html?reference=" + reference;
    }
};

// Export for global use
window.payWithPaystack = () => paymentManager.processPayment();
