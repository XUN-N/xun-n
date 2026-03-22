---
layout: post
title: "🤖 AI Chatbot Demo - Try It Now!"
date: 2026-03-08 15:45:00 +0800
categories: [AI, Demo, HuggingFace]
tags: [chatbot, ai, gradio, huggingface, demo]
author: XUN
show_author: true
show_date: true
show_tags: true
excerpt: "Try our AI-powered chatbot directly in your browser! Built with Gradio and deployed on Hugging Face Spaces."
---

## 🎉 Live AI Chatbot

Experience our AI chatbot powered by GPT-20B model! Try it right here, right now.

---

## 💬 Chat Interface

<!-- 
  ╔════════════════════════════════════════════════════════════════╗
  ║  Gradio Chatbot Embed - Official Integration                   ║
  ║  Gradio Chatbot 嵌入 - 官方集成                                 ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  Technology: Gradio Web Components (Shadow DOM)                ║
  ║  Version: 6.5.1                                                ║
  ║  Source: https://cenxun-chatbox.hf.space                       ║
  ║  CDN: https://gradio.s3-us-west-2.amazonaws.com/6.5.1/         ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  Features:                                                     ║
  ║  ✅ Automatic responsive design                                ║
  ║  ✅ Shadow DOM isolation (style encapsulation)                 ║
  ║  ✅ WebSocket real-time communication                          ║
  ║  ✅ Lazy loading optimization                                    ║
  ║  ✅ Cross-origin resource sharing (CORS)                       ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  Usage: Just include the script and <gradio-app> tag           ║
  ║  使用：只需引入脚本和<gradio-app>标签                           ║
  ╚════════════════════════════════════════════════════════════════╝
-->

<!-- Load Gradio Web Components (加载 Gradio Web 组件) -->


<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/6.5.1/gradio.js"
></script>

<gradio-app src="https://cenxun-chatbox2.hf.space"></gradio-app>


---

## 🚀 How to Use

### 1. Login (Required)

Click the **"Login"** button in the sidebar to authenticate with your Hugging Face account.

**Don't have an account?** 
- Visit: [https://huggingface.co/join](https://huggingface.co/join)
- It's free and takes only 2 minutes!

### 2. Start Chatting

Once logged in, you can:
- 💬 Type your message in the chat box
- ⚙️ Customize chatbot behavior:
  - **System message**: Define the chatbot's personality
  - **Max tokens**: Control response length (1-2048)
  - **Temperature**: Adjust creativity (0.1-4.0)
  - **Top-p**: Control sampling diversity (0.1-1.0)

### 3. Enjoy the Conversation

The chatbot uses **GPT-20B** model via Hugging Face Inference API for high-quality responses!

---

## ⚙️ Configuration Options

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| **System Message** | "You are a friendly Chatbot." | Any text | Defines chatbot personality |
| **Max Tokens** | 512 | 1-2048 | Maximum response length |
| **Temperature** | 0.7 | 0.1-4.0 | Creativity level (higher = more creative) |
| **Top-p** | 0.95 | 0.1-1.0 | Sampling diversity |

---

## 💡 Tips for Best Experience

1. **Be Specific**: Clear questions get better answers
2. **Adjust Temperature**: 
   - Lower (0.1-0.5): More focused, factual responses
   - Higher (0.7-1.0): More creative, diverse responses
3. **Set System Message**: Customize the chatbot for your needs
4. **Use Login**: Required for API access

---

## 🔧 Technical Details

### Model Information

- **Model**: `openai/gpt-oss-20b`
- **Platform**: Hugging Face Inference API
- **SDK**: Gradio ChatInterface
- **Deployment**: Hugging Face Spaces (CPU Free)

### Code Structure

```python
import gradio as gr
from huggingface_hub import InferenceClient

client = InferenceClient(
    token=hf_token.token, 
    model="openai/gpt-oss-20b"
)

# Chat completion with streaming
for message in client.chat_completion(
    messages,
    max_tokens=max_tokens,
    stream=True,
    temperature=temperature,
    top_p=top_p,
):
    yield response
```

### Features

- ✅ **Streaming Responses**: Real-time token generation
- ✅ **Customizable Parameters**: Temperature, Top-p, Max tokens
- ✅ **System Message**: Define chatbot personality
- ✅ **Hugging Face Login**: Secure authentication
- ✅ **Responsive Design**: Works on desktop and mobile

---

## 🌐 Access Options

### Option 1: Embedded (This Page)

Use the chatbot directly embedded above!

### Option 2: Direct Link

Visit the Space directly: 
[https://huggingface.co/spaces/cenxun/chatbox](https://huggingface.co/spaces/cenxun/chatbox)

### Option 3: Full Screen

For the best experience, open in a new tab:
- Click the link above
- Or right-click the iframe → "Open in new tab"

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| **Model Size** | 20B parameters |
| **Response Time** | ~2-5 seconds |
| **Context Window** | Up to 2048 tokens |
| **Cost** | Free (Hugging Face Free Tier) |

**Note**: First response after idle period may take 30-60 seconds (Space wake-up time).

---

## 🆘 Troubleshooting

### Issue: "Login Required"

**Solution**: Click the Login button in the sidebar and authenticate.

### Issue: Slow Response

**Possible Causes**:
1. Space is waking up from idle (wait 30-60 seconds)
2. High server load
3. Long response length

**Solutions**:
- Reduce Max Tokens
- Lower Temperature
- Try again in a few minutes

### Issue: Error Messages

**Common Errors**:
- **API Error**: Check Hugging Face token validity
- **Model Error**: Model may be temporarily unavailable
- **Rate Limit**: Too many requests, wait a moment

---

## 🔗 Related Resources

- [Hugging Face Spaces](https://huggingface.co/spaces)
- [Gradio Documentation](https://gradio.app/docs/)
- [Inference API Guide](https://huggingface.co/docs/huggingface_hub/inference)
- [GPT-20B Model](https://huggingface.co/openai/gpt-oss-20b)

---

## 📝 Related Posts

- [CDT501 Lecture 8: AI-Assisted Learning]({{ '/blog/2026/03/08/cdt501-lecture8-ai-learning.html' | relative_url }})
- [Building This Blog: CDT501 Project]({{ '/blog/2026/03/08/building-cdt501-blog.html' | relative_url }})

---

*Last updated: March 8, 2026*  
*Powered by Hugging Face Spaces & Gradio*
