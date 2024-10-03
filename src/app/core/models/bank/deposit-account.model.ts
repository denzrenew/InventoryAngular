
export default interface DepositAccountModel {
    crypto: CryptoBankModel;
    bank: BankModel;
}

interface CryptoBankModel {
    network: string;
    cryptoAddress: string | null;
}

interface BankModel {
    bankName: string;
    accountName: string;
    bsb: string;
    accountNo: string;
    swiftCode : string;
    country: string;
}
