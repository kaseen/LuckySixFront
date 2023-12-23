export const Contracts = (networkId) => {

    const Contracts = {
        // Undefined:
        0: {
            address: '',
            curreny: ''
        },
        // Localhost
        1337: {
            address: '0x8ce361602B935680E8DeC218b820ff5056BeB7af',
            currency: 'LOCAL'
        },
        // Mumbai
        80001: {
            address: '0x86E074017b01541fcb8CB548Cbd61d9fF9D23a9a',
            currency: 'MATIC'
        },
        // Sepolia
        11155111: {
            address: '0x4153a9Ea482a8cCb1737662FF840def7E087A6c8',
            currency: 'ETH'
        }
    }

    return Contracts[networkId];
}