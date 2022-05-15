
echo ---------------------------------------------------------
echo "Building the contract (please wait...)"
echo ---------------------------------------------------------
yarn build:release
echo ---------------------------------------------------------
echo "Deploying the contract"
echo ---------------------------------------------------------
echo
near dev-deploy ./build/release/quiz-app-contract.wasm

exit 0