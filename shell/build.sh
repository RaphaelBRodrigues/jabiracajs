#/bin/bash
cp -r ./src/assets ./lib/
sed -i '1s/^/#!\/usr\/bin\/env node\n/' ./lib/index.js