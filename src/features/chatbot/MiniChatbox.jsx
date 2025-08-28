import React, { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    IconButton,
    Typography,
    Collapse,
    Box,
    Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore, ChatBubbleOutline } from "@mui/icons-material";
import axios from "axios";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import useChat from "./useChat";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
export default function MiniChatbox() {
    const { authenticated } = useAuth()
    const [messages, setMessages] = useState([

    ]);
    const [input, setInput] = useState("");
    const { isPending, createChat } = useChat()
    const [expanded, setExpanded] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) {
            toast.error("Vui lòng nhập nội dung")
            return;
        };
        createChat({ input, messages }, {
            onSuccess: (data) => {
                const { answer } = data;
                const updated = [...messages, { human: input, ai: answer }];
                setMessages(updated);
                setInput("")
            }
        })
    };
    if (!authenticated) return null;

    return (
        <Box sx={{
            position: "fixed", bottom: 16, right: expanded ? 16 : -200, zIndex: 1000
        }}>
            <Button

                startIcon={<ChatBubbleOutline />}
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? "Đóng chat" : "Tư vấn từ chatbot"}
            </Button>

            <Collapse in={expanded}>
                <Card sx={{ width: 450, mt: 2, maxHeight: "100vh", overflow: "hidden" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box
                            sx={{
                                overflowY: "auto",
                                height: 500,
                                p: 1,
                            }}
                        >
                            {messages.map((msg, idx) => (
                                <Box key={idx} mb={2}>
                                    {/* User message */}
                                    <Box display="flex" justifyContent="flex-end" mb={0.5}>
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                bgcolor: "#E0E0E0",
                                                p: 1,
                                                borderRadius: "8px",
                                                maxWidth: "70%",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            Bạn: {msg.human}
                                        </Typography>
                                    </Box>

                                    {/* AI message */}
                                    <Box display="flex" justifyContent="flex-start" mb={0.5}>
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                bgcolor: "#E0E0E0",

                                                p: 1,
                                                borderRadius: "8px",
                                                maxWidth: "70%",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            Trợ lý ảo: {msg.ai.split("\n").map((item, index) => item.trim() !== "" && <>
                                                <br />  <span key={index}>{item}</span>
                                            </>)}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            ))}
                            {isPending && <>
                                <Box display="flex" justifyContent="flex-end" mb={0.5}>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            bgcolor: "#E0E0E0",
                                            p: 1,
                                            borderRadius: "8px",
                                            maxWidth: "70%",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        Bạn: {input}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="flex-start" mb={0.5}>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            bgcolor: "#E0E0E0",
                                            display: "flex",
                                            p: 1,
                                            borderRadius: "8px",
                                            maxWidth: "70%",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        Trợ lý ảo: <SyncLoader size={8} />
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />
                            </>}

                        </Box>

                        <Box display="flex" gap={1}>
                            <TextField
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: "16px",
                                    },
                                }}
                                fullWidth
                                size="lg"
                                variant="outlined"
                                placeholder="Type your question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                disabled={isPending}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isPending}
                            >
                                Gửi
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Collapse>
        </Box >
    );
}
