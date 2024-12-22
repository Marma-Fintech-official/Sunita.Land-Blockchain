import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SunitaLand } from '../wrappers/SunitaLand';
import '@ton/test-utils';

describe('SunitaLand', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sunitaLand: SandboxContract<SunitaLand>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sunitaLand = blockchain.openContract(await SunitaLand.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sunitaLand.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sunitaLand.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sunitaLand are ready to use
    });
});
