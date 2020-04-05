set -e

green="\e[32m"
reset="\033[m"

printf "$green"
echo "******** Running ES Lint ********"
printf "$reset"

yarn lint;

printf "$green"
echo "******** Running Tests ********"
printf "$reset"

yarn test;

printf "$green"
echo "******** Bundle TypeScript files to JavaScript ********"
printf "$reset"

yarn build;
