# next-auth-prisma-blog

## A blog site with authentication

**Run local dev environment:**

```
npm run dev
```

**Run Docker**

```
docker-compose up
```

**Or**

```
docker-compose up --build --force-recreate
```

## Database

**Re-establish the link between schema.prisma and .env file**

```
npx prisma generate
```

### Migrate Prisma

```
npx prisma migrate dev --name my-named-migration
```

**Push Prisma**

```
npx prisma db push
```

### Seed database

```
npx prisma db seed
```

scp /Users/don/dev/next-auth-prisma-blog/.env.development.local don@dallas.westland.net:/srv/apps/next-auth-prisma-blog/

## Nginx Server Blocks:

### Certbot block:

```ini
# Redirect from http to https
server {
  listen  80;
  listen [::]:80;
  access_log off;
  error_log off;

  server_name qrcodesr.us www.qrcodesr.us;
  return 301 https://www.qrcodesr.us$request_uri;
}

# Redirect from non-www to www
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  root /srv/www/www.qrcodesr.us;
  index index.html;

  ssl_certificate /etc/letsencrypt/live/www.qrcodesr.us/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/www.qrcodesr.us/privkey.pem;

  access_log  /var/log/nginx/www.qrcodes.us_access.log;
  error_log  /var/log/nginx/www.qrcodes.us_error.log;
}
```
