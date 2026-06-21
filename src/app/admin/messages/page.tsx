"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH MESSAGES
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setMessages(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // DELETE MESSAGE
  const deleteMessage = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // MARK AS READ
  const markAsRead = async (id: string) => {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id);

    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, read: true } : m
      )
    );
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-green-700">
        Messages Inbox
      </h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="grid gap-4">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl shadow bg-white border-l-4 ${
                msg.read ? "border-green-500" : "border-red-500"
              }`}
            >

              {/* HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="font-bold text-lg">
                    {msg.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {msg.email}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(msg.created_at).toLocaleString()}
                </span>

              </div>

              {/* MESSAGE */}
              <p className="mt-3 text-gray-700">
                {msg.message}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">

                {!msg.read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
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