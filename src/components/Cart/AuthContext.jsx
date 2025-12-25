import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";

const API_BASE_URL = "https://mythica-jewels-backend.onrender.com/api";
const RECAPTCHA_SITE_KEY = "6LfEdzUsAAAAADYLbog-_DVd_Clpu7mj3Lldy9oq";

/* ---------------------- API HELPER ---------------------- */
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

/* ------------------ reCAPTCHA HELPER ------------------ */
const generateRecaptchaToken = async (action = "submit") => {
  return new Promise((resolve) => {
    if (!window.grecaptcha || !window.grecaptcha.ready) {
      console.warn("reCAPTCHA not loaded, proceeding without it");
      resolve(null);
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch((err) => {
          console.warn("reCAPTCHA error:", err);
          resolve(null);
        });
    });
  });
};

/* ---------------------- CONTEXT ---------------------- */
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

/* -------------------- PROVIDER -------------------- */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------- Restore auth safely on load -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (err) {
        console.error("Corrupted auth data, clearing storage", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  /* -------------------- SIGNUP -------------------- */
  const signup = async (name, email, password) => {
    try {
      const recaptchaToken = await generateRecaptchaToken("signup");

      const data = await apiCall("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          ...(recaptchaToken && { recaptchaToken }), 
        }),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        } else if (data.userId) {
          const newUser = { _id: data.userId, name, email, role: 'user' };
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
        } else {
          throw new Error("Invalid response from server");
        }

        window.dispatchEvent(new Event('userLoggedIn'));
      } else {
        throw new Error("Invalid response from server");
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  /* -------------------- SIGNIN -------------------- */
  const signin = async (email, password) => {
    try {
      const recaptchaToken = await generateRecaptchaToken("signin");

      const data = await apiCall("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          ...(recaptchaToken && { recaptchaToken }),
        }),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        } else {
       
          try {
            const userData = await apiCall("/auth/profile", {
              headers: { Authorization: `Bearer ${data.token}` }
            });
            localStorage.setItem("user", JSON.stringify(userData.user || userData));
            setUser(userData.user || userData);
          } catch (profileError) {
            const minimalUser = { email, name: email.split('@')[0] };
            localStorage.setItem("user", JSON.stringify(minimalUser));
            setUser(minimalUser);
          }
        }

        window.dispatchEvent(new Event('userLoggedIn'));
      } else {
        throw new Error("Invalid response from server");
      }

      return data;
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  };

  /* -------------------- LOGOUT -------------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event('userLoggedOut'));
  };

  /* -------------------- PROVIDER -------------------- */
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { apiCall, generateRecaptchaToken, RECAPTCHA_SITE_KEY };