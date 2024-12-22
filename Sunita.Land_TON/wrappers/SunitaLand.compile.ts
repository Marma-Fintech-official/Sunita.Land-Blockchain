import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/sunita_land.tact',
    options: {
        debug: true,
    },
};
