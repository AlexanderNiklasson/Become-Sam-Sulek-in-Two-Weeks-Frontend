export const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  return token !== null;
};

// Function to log the user out
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("role");
  localStorage.removeItem("profilePicture");
  localStorage.removeItem("isAuthenticated");
};
