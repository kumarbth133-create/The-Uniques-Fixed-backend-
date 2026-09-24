import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setHasDragged(true)}
      onDragEnd={() => {
        // Small delay to prevent click event right after drag ends
        setTimeout(() => setHasDragged(false), 50);
      }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        // Improve dragging on mobile
        touchAction: "none",
        pointerEvents: "none",
      }}
    >
      {/* Top Toggle / Close Button (Cross symbol on top when open) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: isOpen ? 10 : 0,
          pointerEvents: "auto",
        }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                padding: "8px 14px",
                background: "#ffffff",
                color: "#111827",
                borderRadius: 20,
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
              onClick={() => setIsOpen(true)}
            >
              I'm here to help
            </motion.div>
          )}
        </AnimatePresence>

        <div
          role="button"
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
          onClick={(e) => {
            if (!hasDragged) {
              setIsOpen(!isOpen);
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: isOpen ? 48 : 60,
            height: isOpen ? 48 : 60,
            borderRadius: "50%",
            backgroundColor: "#dc143c",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
            transition: "all 0.2s ease",
            transform: isHovered && !hasDragged ? "scale(1.06)" : "scale(1)",
            padding: isOpen ? 0 : 6,
            userSelect: "none",
          }}
        >
          {!isOpen ? (
            <img
              src="https://www.jalaitech.com/floating/Aibot.png"
              alt="Chatbot"
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
                pointerEvents: "none",
              }}
            />
          ) : (
            <span style={{ fontSize: 24, fontWeight: 700, pointerEvents: "none", lineHeight: 1 }}>✕</span>
          )}
        </div>
      </div>

      {/* Chatbot Window (Shifted to bottom) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "min(400px, calc(100vw - 40px))",
              height: "min(580px, calc(100vh - 120px))",
              borderRadius: 14,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              backgroundColor: "white",
              position: "relative",
              pointerEvents: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                background: "linear-gradient(90deg, #ca0019, #e63946)",
                color: "#ffffff",
                borderRadius: "14px 14px 0 0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                cursor: "grab",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>The Uniques</div>
                  <div style={{ fontSize: 11, opacity: 0.9 }}>Chat Support</div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                title="Close chat"
                aria-label="Close chat"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  cursor: "pointer",
                  color: "#ffffff",
                  fontWeight: "bold",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
              >
                ✕
              </button>
            </div>

            {/* Iframe */}
            <iframe
              src="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/11/13/20260511131329-JHRNIFEP.json"
              title="The Uniques Community Chatbot"
              style={{
                width: "100%",
                flex: 1,
                border: "none",
                borderRadius: "0 0 14px 14px",
                pointerEvents: "auto",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatBot;
