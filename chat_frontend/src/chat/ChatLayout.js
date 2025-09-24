import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useAuth } from "../auth/AuthContext";
import { api, endpoints } from "../services/api";
import { createSocket } from "../services/socket";

export default function ChatLayout() {
  const { user, token, logout } = useAuth();
  const [channels, setChannels] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial channels
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await api.get(endpoints.channels, token);
        if (!mounted) return;
        setChannels(list || []);
        if ((list || []).length > 0) {
          setCurrentChannelId(list[0].id || list[0]._id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  // Load messages when channel changes
  useEffect(() => {
    if (!currentChannelId) {
      setMessages([]);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const list = await api.get(endpoints.channelMessages(currentChannelId), token);
        if (mounted) setMessages(list || []);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, [currentChannelId, token]);

  // Socket connection
  useEffect(() => {
    const s = createSocket(token);
    setSocket(s);
    s.on("connect", () => {
      // join initial room if any
      if (currentChannelId) s.emit("join", { channelId: currentChannelId });
    });
    s.on("message:new", (payload) => {
      // expected payload: { channelId, message }
      if (payload?.channelId === currentChannelId) {
        setMessages((prev) => [...prev, payload.message]);
      }
    });
    return () => {
      s.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Re-join new channel room on change
  useEffect(() => {
    if (!socket) return;
    socket.emit("join", { channelId: currentChannelId });
    // Optionally leave previous room could be handled by server
  }, [socket, currentChannelId]);

  const currentChannel = useMemo(
    () => channels.find(c => (c.id || c._id) === currentChannelId),
    [channels, currentChannelId]
  );

  const onSend = async (text) => {
    if (!currentChannelId) return;
    try {
      const msg = await api.post(endpoints.sendMessage(currentChannelId), { content: text }, token);
      // optimistic update (socket handler will also add it, but in case backend doesn't echo to sender)
      setMessages((prev) => [...prev, msg]);
    } catch (e) {
      console.error(e);
    }
  };

  const onSelectChannel = (id) => setCurrentChannelId(id);

  if (loading) {
    return <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
      <div className="card" style={{ padding: 16 }}>Loading...</div>
    </div>;
  }

  return (
    <div className="app-shell">
      <ChatHeader channel={currentChannel} onLogout={logout} />
      <Sidebar
        user={user}
        channels={channels}
        currentChannelId={currentChannelId}
        onSelectChannel={onSelectChannel}
      />
      <main className="content">
        <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%", gap: 12 }}>
          <MessageList messages={messages} currentUserId={user?.id || user?._id} />
          <MessageInput onSend={onSend} disabled={!currentChannelId} />
        </div>
      </main>
    </div>
  );
}
