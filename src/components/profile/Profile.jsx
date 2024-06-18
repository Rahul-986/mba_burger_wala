import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../../redux/actions/user";
import Loader from "../layout/Loader";

const Profile = () => {
  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser()); // Dispatch action to load user data
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch action to logout
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <section className="profile">
        <main>
          <h2>User not found</h2>
          <Link to="/">Go to Home</Link>
        </main>
      </section>
    );
  }

  return (
    <section className="profile">
      <main>
        <motion.img
          src={user.photo || 'default-photo.jpg'} // Ensure fallback value
          alt="User"
          {...options}
        />
        <motion.h5 {...options} transition={{ delay: 0.3 }}>
          {user.name || 'Anonymous'}
        </motion.h5>

        {user.role === "admin" && (
          <motion.div {...options} transition={{ delay: 0.5 }}>
            <Link
              to="/admin/dashboard"
              style={{
                borderRadius: 0,
                backgroundColor: "rgb(40,40,40)",
              }}
            >
              <MdDashboard /> Dashboard
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <Link to="/myorders">Orders</Link>
        </motion.div>

        <motion.button
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          onClick={logoutHandler}
        >
          Logout
        </motion.button>
      </main>
    </section>
  );
};

export default Profile;
