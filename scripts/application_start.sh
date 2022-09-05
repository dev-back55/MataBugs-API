#!/bin/bash

#add npm and node to path
#export NVM_DIR="$HOME/.nvm"	
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
#npm install

#start our node app in the background
#node app.js > app.out.log 2> app.err.log < /dev/null & 
pm2 restart server >> /home/ec2-user/app/MataBugs-API/deploy.log