# UT-MAZE

## First of all:
install node packages separately in both client and server folders. ```'npm install'```

## To Test:
start server and client separately.```'npm start'```

## Development:
1. Chrome dev-tool for Redux is enabled. (client/src/Store.js)
2. The default adress for client requests is http://localhost:7000/ which is changable from "proxy" in client/package.json.
  the default port for back-end is localhost:7000.
3. MongoDB confing: server/config/keys.js

## To Deploy:
1. run ```'npm run build'``` in the client folder to create the buld folder.
2. move the contents to maze/server/www
3. then you can put the server folder on VPS

*install mongoDB on vps, add database and database user and match them with server/config/keys.js
<a href="https://www.digitalocean.com/community/tutorials/how-to-integrate-mongodb-with-your-node-application">article</a>

## How to deploy a mern app on VPS?
<a href="https://github.com/tabvn/nodejs-reactjs-chatapp/blob/master/deployment-to-digitalocean-hosting.md">article</a>
