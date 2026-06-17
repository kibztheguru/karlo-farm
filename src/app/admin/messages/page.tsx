"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 CHECK AUTH
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/admin/login");
      }
    };

    checkUser();
  }, [router]);

  // 📩 FETCH MESSAGES
  const fetchMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error("Supabase error:", error);
  } else {
    setMessages(data || []);
  }

  setLoading(false);
};
useEffect(() => {
  fetchMessages();
}, []);

  // 🗑 DELETE MESSAGE
  const deleteMessage = async (id: string) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    await supabase.from("messages").delete().eq("id", id);

    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="grid gap-4">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <p className="font-bold">{msg.name}</p>
              <p className="text-gray-600">{msg.email}</p>
              <p className="mt-2">{msg.message}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400">
               {msg.created_at ? new Date(msg.created_at).toLocaleString() : "No date"}
                </span>

                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}