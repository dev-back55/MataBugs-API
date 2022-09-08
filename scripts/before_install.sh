#!/bin/bash

#download node and npm
#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
#. ~/.nvm/nvm.sh
#nvm install node

#create our working directory if it doesnt exist
#DIR="/home/ec2-user/app"
#if [ -d "$DIR" ]; then
#  echo "${DIR} exists"
#else
#  echo "Creating ${DIR} directory"
#  mkdir ${DIR}
#fi

echo 'run after_install.sh: ' >> /home/ec2-user/app/MataBugs-API/deploy.log

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/app >> /home/ec2-user/app/MataBugs-API/deploy.log
sudo chmod -R 777 /home/ec2-user/app/MataBugs-API

echo 'cd /home/ec2-user/app/MataBugs-API' >> /home/ec2-user/app/MataBugs-API/deploy.log
cd /home/ec2-user/app/MataBugs-API >> /home/ec2-user/app/MataBugs-API/deploy.log

echo 'npm install' >> /home/ec2-user/app/MataBugs-API/deploy.log 
npm install >> /home/ec2-user/app/MataBugs-API/deploy.log
echo 'copy example to env' >> /home/ec2-user/app/MataBugs-API/deploy.log
sudo rm .env >> /home/ec2-user/app/MataBugs-API/deploy.log
sudo cp /home/ec2-user/tools/.env /home/ec2-user/app/MataBugs-API >> /home/ec2-user/app/MataBugs-API/deploy.log
