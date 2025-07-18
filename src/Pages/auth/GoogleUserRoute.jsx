import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../Supabase/SupabaseClient";
import GoogleUserSetup from "./GoogleUserSetup";


const GoogleUserRoute = () => {
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(null);

  useEffect(() => {
    const checkUserInDB = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setShouldRedirect(false); // مش مسجل دخول أصلاً
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id);

      if (error) {
        console.error("Database error:", error.message);
        setShouldRedirect(false);
      } else {
        setShouldRedirect(data.length > 0); // لو موجود في جدول users
      }

      setLoading(false);
    };

    checkUserInDB();
  }, []);

  if (loading) return <div>جار التحميل...</div>;
localStorage.removeItem('sb-auxwhdusfpgyzbwgjize-auth-token');
  return shouldRedirect ? <Navigate to="/dashboard" /> : <GoogleUserSetup />;
};

export default GoogleUserRoute;
