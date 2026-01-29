"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, cubicBezier } from "framer-motion";
import Spinner from "../ui/Spinner";

const riseUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      {/* Heading */}
      <motion.h2
        className="inter-semibold text-2xl mb-8 text-gray-900"
        variants={riseUp}
        initial="hidden"
        animate="visible"
      >
        Welcome back
      </motion.h2>

      {/* Email */}
      <motion.div
        className="mb-5"
        variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <label className="inter-medium text-sm text-gray-700 mb-1 block">
          Email
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-11 px-4 border text-gray-600 border-gray-300 rounded-md text-sm inter-regular focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      {/* Password */}
      <motion.div
        className="mb-4"
        variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.18 }}
      >
        <label className="inter-medium text-sm text-gray-700 mb-1 block">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-11 px-4 border text-gray-600 border-gray-300 rounded-md text-sm inter-regular focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      {/* Remember Me (no animation – optional UX choice) */}
      <motion.div
      variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.18 }}
      className="flex items-center mb-4">
        <input
        
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <span className="ml-2 inter-regular text-sm text-gray-600">
          Remember me
        </span>
      </motion.div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mb-4 inter-regular">{error}</p>
      )}

      {/* Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md inter-medium text-sm disabled:opacity-60 flex items-center justify-center"
        variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.26 }}
      >
        {loading ? <Spinner /> : "Sign in"}
      </motion.button>
    </form>
  );
}
