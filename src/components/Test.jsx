import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { AuthContext } from "../provider/AuthProvider";
const Test = () => {
  const { user, logOut } = useContext(AuthContext);
  const [emails, setEmails] = useState(user.email);
  const [users, setUsers] = useState('');

  useEffect(() => {
      // Fetch product data from the Express API
      const fetchUsers = async () => {
          try {
              const response = await fetch(`https://product-buy-sell-shop-server.onrender.com/user/role/${emails}`);
              const data = await response.json();
              setUsers(data.userType);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchUsers();
  }, []);
  
console.log(user.email);

  return (
    <div>



    </div>
  )
};

export default Test;
