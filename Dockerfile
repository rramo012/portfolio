FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY dist/personal-app .

