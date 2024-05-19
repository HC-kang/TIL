FROM nginx:1.25

# Copy configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert /etc/nginx/cert

CMD ["nginx", "-g", "daemon off;"]