"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./Navbar.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        To Do List App
      </Link>
      <div className={styles["nav-links"]}>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <ThemeToggle />
      <div className={styles["login-logout"]}>
        {!user ? (
          <Link href="/api/auth/login">Login</Link>
        ) : (
          <a href="/api/auth/logout">Logout</a>
        )}
      </div>
    </nav>
  );
}
