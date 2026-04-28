// Comprehensive list of supported currencies with symbols and names
const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India' },
    { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union' },
    { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'UAE' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong' }
];

// Get currency by code
function getCurrency(code) {
    return currencies.find(c => c.code === code.toUpperCase());
}

// Get all currencies sorted by code
function getAllCurrencies() {
    return currencies.sort((a, b) => a.code.localeCompare(b.code));
}

// Get currency display name (Code - Name)
function getCurrencyDisplay(code) {
    const curr = getCurrency(code);
    return curr ? `${curr.code} – ${curr.name}` : code;
}

// Validate if currency code is supported
function isValidCurrency(code) {
    return !!getCurrency(code);
}

module.exports = {
    currencies,
    getCurrency,
    getAllCurrencies,
    getCurrencyDisplay,
    isValidCurrency
};
