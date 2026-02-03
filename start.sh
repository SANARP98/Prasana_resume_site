#!/bin/sh
# Start Fastify analytics backend in background
cd /backend && node dist/server.js &

# Start nginx in foreground
nginx -g 'daemon off;'
