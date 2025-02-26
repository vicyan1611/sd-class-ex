export const validationConfig = {
  email: {
    allowedDomains: ["@student.university.edu.vn"],
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  phone: {
    VN: /^(\+84|0)[1-9][0-9]{8}$/,
    US: /^(\+1)?[2-9][0-9]{9}$/,
  },
};
