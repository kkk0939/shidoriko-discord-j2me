const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;

// Xử lý API thông thường
app.use('/api', createProxyMiddleware({
    target: 'https://discord.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' }
}));

// Xử lý Gateway (Cổng Socket để hiển thị danh sách, tag tên, tin nhắn thời gian thực)
app.use('/gateway', createProxyMiddleware({
    target: 'wss://gateway.discord.gg',
    changeOrigin: true,
    ws: true, // Bật hỗ trợ WebSocket cho kết nối cổng
    pathRewrite: { '^/gateway': '' }
}));

// Xử lý CDN (Tải hình ảnh, ảnh đại diện)
app.use('/cdn', createProxyMiddleware({
    target: 'https://discordapp.com',
    changeOrigin: true,
    pathRewrite: { '^/cdn': '' }
}));

app.listen(PORT, () => {
    console.log(`Proxy đang chạy tại cổng ${PORT}`);
});
