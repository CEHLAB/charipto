const main = async () => {
  // Obtenez le contrat factory
  const Transactions = await hre.ethers.getContractFactory("Transactions");

  // Déployez le contrat
  const transactions = await Transactions.deploy();

  // Attendez que le contrat soit déployé (pas besoin de .deployed() dans Ethers.js v6)
  await transactions.waitForDeployment();

  // Récupérez l'adresse du contrat déployé
  const address = await transactions.getAddress();
  console.log("Transactions deployed to:", address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // Quitter avec succès
  } catch (error) {
    console.error(error);
    process.exit(1); // Quitter avec une erreur
  }
};

runMain();