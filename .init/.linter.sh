#!/bin/bash
cd /home/kavia/workspace/code-generation/real-time-chat-platform-14438-14448/chat_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

