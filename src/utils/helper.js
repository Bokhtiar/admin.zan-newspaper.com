import { Toastify } from "../components/toastify";


export const getToken = () => {
    return localStorage.getItem("newspaper-token");
}

/* set token */
export const setToken = (token) => {
    return localStorage.setItem("newspaper-token", token);
}

/* remove token */
export const removeToken = () => {
    return localStorage.removeItem("newspaper-token");
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {

    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        error.response.data.errors.map((item) => {
            return Toastify.Error(item);
        });
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};

export const toBengaliNumbers = (number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number
      .split('')
      .map((digit) => bengaliDigits[parseInt(digit)])
      .join('');
  };
  
  // Function to convert the date to Bengali format
export const formatDateInBengali = (dateString) => {
    const months = [
      "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
  
    const date = new Date(dateString);
  
    const day = toBengaliNumbers(date.getDate().toString());
    const month = months[date.getMonth()];
    const year = toBengaliNumbers(date.getFullYear().toString());
    const hours = toBengaliNumbers(date.getHours().toString());
    const minutes = toBengaliNumbers(date.getMinutes().toString().padStart(2, '0'));
  
    // Format the date to dd MMMM yyyy | HH:mm
    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  };