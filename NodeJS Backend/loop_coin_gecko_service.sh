#!/bin/zsh
# mkdir /export/reports
# chmod 777 /export/reports
# mount -F tmpfs -o size=50m swap /export/reports
# mount -v

echo "Hello launching coin_gecko service."
echo "If it crashes going to attemp to restart it."
#dd if=/dev/zero of=./200mb.img bs=1024 count=200000 # create new empty 200MB file
#mkfs.ext2 200mb.img # or ext3, or whatever fits your needs
#mkdir logs
#sudo mount -t ext2 -o loop 200mb.img logs # only root can do '-o loop' by default
#run_program >>logs/myprogram.log
touch ./log.txt
KEEP_GOING=true
while [ "KEEP_GOING" != "true" ]
do  sudo node "/Users/daylannance/Documents/DEV/DDF/NodeJS Backend/compiled/PriceData/CoinGecko/coin-gecko-service.js"
  echo "💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥"
  echo "Must have been some kind of error, relaunching."
done