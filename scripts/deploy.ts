import {ethers,run,network} from "hardhat";

async function main() {
    const Contract = await ethers.getContractFactory("SimpleStorage");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    const address=await contract.getAddress();

    if(network.config.chainId==11155111){
        console.log("waitting for verification...");
        await contract.deploymentTransaction()?.wait(6); 
        await verify(address,[]);
    }
    console.log("Contract deployed to:", address);

    const curVal=await contract.retrieve();
    console.log("cur val: ",curVal);
    await contract.store(33);
    const updatedVal=await contract.retrieve();
    console.log("updated val: ",updatedVal);

}


const verify=async(contractAddress:string,args:any[])=>{
    console.log("Verifying contract");
    try{
        await run("verify:verify",{
            address:contractAddress,
            constructorArguments:args
        })
    }catch(e:any){
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
})