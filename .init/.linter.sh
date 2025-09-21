#!/bin/bash
cd /home/kavia/workspace/code-generation/react-html-interface-demo-89051-89060/main_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

