SERVER='dppl2'
FOLDER='/www/mining/server'

echo "BUILD"
npm run build

tar czf src.tar.gz .env dist package.json node_modules ecosystem.config.js  tsconfig.build.json tsconfig.json

echo "UPLOAD..."
scp -r src.tar.gz root@$SERVER:$FOLDER

echo "EXTRACT..."
ssh -tt root@$SERVER << EOF
su root;
 cd $FOLDER;
 rm -rf node_modules;
 tar -zxvf src.tar.gz >/dev/null;
 pm2 stop  ecosystem.config.js;
 pm2 start ecosystem.config.js;
 pm2 logs mining;
EOF

echo "generate SDK"
npm run generateSDK

echo "CLEAR..."
rm src.tar.gz
