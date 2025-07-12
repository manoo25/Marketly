import { useEffect, useRef, useState } from "react";
import { supabase } from "../../Supabase/supabaseClient";
import "./ChatModal.css";

export default function ChatModal({
    receiver,           // { id, name, role }
    conversationId,     // uuid
    currentUserId,      // uuid
    onClose
}) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);
    const [showScrollHint, setShowScrollHint] = useState(false);
    const bodyRef = useRef(null);   
    useEffect(() => {
        const el = bodyRef.current;
        if (!el) return;

        // أظهر السهم لو في محتوى أعلى لا يراه المستخدم
        const updateHint = () => {
            setShowScrollHint(el.scrollTop < el.scrollHeight - el.clientHeight - 20);
        };

        updateHint();                // استدعاء أولي
        el.addEventListener("scroll", updateHint);
        return () => el.removeEventListener("scroll", updateHint);
    }, []);

    /* 🟡 جلب الرسائل القديمة */
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("UsersMessage")
                .select("*")
                .eq("conversation_id", conversationId)
                .order("created_at", { ascending: true });

            if (!error) setMessages(data);
            setLoading(false);
        };

        if (conversationId) fetchMessages();
    }, [conversationId]);

    /* 🟢 تحديث حي لحظي */
    useEffect(() => {
        const channel = supabase
            .channel("chat:" + conversationId)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "UsersMessage" },
                (payload) => {
                    if (payload.new.conversation_id === conversationId) {
                        setMessages((prev) => [...prev, payload.new]);
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [conversationId]);

    /* 🔽 Scroll لآخر رسالة */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* 💬 إرسال رسالة */
    const send = async () => {
        if (!text.trim()) return;
        setSending(true);

        /* إدراج Optimistic محلي */
        const tempId = Date.now(); // id مؤقت
        const optimisticMsg = {
            id: tempId,
            sender_id: currentUserId,
            receiver_id: receiver.id,
            content: text.trim(),
            created_at: new Date().toISOString(),
            sender_role: "admin",
            receiver_role: receiver.role,
            conversation_id: conversationId
        };
        setMessages((prev) => [...prev, optimisticMsg]);
        setText("");

        /* إدراج فعلي في Supabase */
        const { data, error } = await supabase.from("UsersMessage").insert({
            conversation_id: conversationId,
            sender_id: currentUserId,
            sender_role: "admin",
            receiver_id: receiver.id,
            receiver_role: receiver.role,
            actual_sender_id: currentUserId,
            content: optimisticMsg.content
        }).select().single();

        if (!error) {
            // استبدل الرسالة المؤقتة بالرسالة الحقيقية
            setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? data : m))
            );
        } else {
            console.error(error);
            // لو فشل، احذف الرسالة المؤقتة
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
        }

        setSending(false);
    };

    /* تنسيق التوقيت + التاريخ */
    const formatTime = (iso) => {
        const d = new Date(iso);
        const now = new Date();
        const sameDay = d.toDateString() === now.toDateString();
        return sameDay
            ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : d.toLocaleDateString([], { day: "numeric", month: "short" }) +
            " " +
            d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="chat-backdrop">
            <div className="chat-card">
                <header className="chat-header">
                    <span>💬 {receiver.name}</span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </header>

                <main ref={bodyRef} className="chat-body">
                    {showScrollHint && <div className="scroll-hint">↑</div>}

                    {loading ? (
                        <div className="chat-loading">
                            <div className="loader"></div>
                            <p>جاري تحميل الرسائل...</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`bubble ${m.sender_id === currentUserId ? "sent" : "received"}`}
                                >
                                    {m.content}
                                    <div className="ts">
                                        {formatTime(m.created_at)}{" "}
                                        {m.read_at && m.sender_id === currentUserId && "✅"}
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </>
                    )}
                </main>

                <footer className="chat-footer">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="اكتب رسالتك..."
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                    />
                    <button onClick={send} disabled={!text.trim() || sending}>
                        {sending ? <span className="mini-loader" /> : "↪︎"}
                    </button>
                </footer>
            </div>
        </div>
    );
}
