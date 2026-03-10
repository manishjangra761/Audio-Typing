import React from "react";
import { useUser } from "../context/UserContext";

const RoleBased = ({ roles, children, fallback = null }) => {
  const { user } = useUser();

  if (!user || !roles.includes(user.role)) {
    return fallback;
  }

  return children;
};

export default RoleBased;