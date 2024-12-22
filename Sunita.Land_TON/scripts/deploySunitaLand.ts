import { Address, toNano } from '@ton/core';
import { SunitaLand } from '../wrappers/SunitaLand';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "Sunita Williams",
        description: "SUWI is a Ton-based meme coin celebrating the incredible achievements of Sunita Williams",
        symbol: "SUWI",
        image: "https://rose-payable-halibut-243.mypinata.cloud/ipfs/QmQZxGbmX5jv3D7RMua55AeSu8ubj7m9yPwQFsYKCXWSwB",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    const suwi = provider.open(await SunitaLand.fromInit(provider.sender().address as Address, content, 1000000000000000000n));
    
    await suwi.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 1000000000000000000n,
            receiver: provider.sender().address as Address
        }
    );
    await provider.waitForDeploy(suwi.address);
}
