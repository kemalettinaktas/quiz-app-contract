echo "Removing neardev directory"
echo ---------------------------------------------------------
rm -r ./neardev
echo ---------------------------------------------------------
echo "Re-Building the contract (please wait...)"
echo ---------------------------------------------------------
yarn build:release
echo ---------------------------------------------------------
echo "Deploying the contract"
echo ---------------------------------------------------------
echo
yarn deploy

exit 0