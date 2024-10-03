

const Endpoints = {
    Account: {
        /** Returns the endpoint `/Account/UpdatePassword` using the method: PUT */
        UpdatePassword: { POST: `/Account/UpdatePassword` },
        /** Returns the endpoint `/Account/UpdateProfile` using the method: PUT */
        UpdateProfile: { POST: `/Account/UpdateProfile` },
        /** Returns the endpoint `/Account/ViewUserProfile` using the method: GET */
        ViewUserProfile: { GET: `/Account/ViewUserProfile` },
        ViewUserProfileWithSocial: { GET: `/Account/ViewUserProfileWithSocial` },
        /** Returns the endpoint `/Account/UpdateReferralCode` using the method: POST */
        UpdateReferralCode: { POST: `/Account/UpdateReferralCode` },
        /** Returns the endpoint `/Account/UpdatePremiere` using the method: POST */
        UpdatePremiere: { POST: `/Account/UpdatePremiere`},
        /** Returns the endpoint `/Account/GetAllUsers` using the method: GET */
        GetAllUsers: { GET: `/Account/GetAllUsersDistinct`},
    },
    AdminAccount: {
        /** Returns the endpoint `/AdminAccount/ViewProfileByEmail` using the method: GET */
        ViewProfileByEmail: { GET: `/AdminAccount/ViewProfileByEmail` },
    },
    Auth: {
        /** Returns the endpoint `/Auth/Login` using the method: POST */
        Login: { POST: `/Auth/Login` },
        /** Returns the endpoint `/Auth/Register` using the method: POST */
        Register: { POST: `/Auth/Register` },
        /** Returns the endpoint `/Auth/OneTimePasword` using the method: POST */
        OneTimePasword: { POST: `/Auth/OneTimePasword` },
        /** Returns the endpoint `/Auth/IsValidOtp` using the method: POST */
        IsValidOtp: { POST: `/Auth/IsValidOtp` },
        /** Returns the endpoint `/Auth/OneTimePassword` using the method: POST */
        OneTimePassword: { POST: `/Auth/OneTimePasword` },
        /** Returns the endpoint `/Auth/ChangePassword` using the method: POST */
        ChangePassword: { POST: `/Auth/ChangePassword` },
        /** Returns the endpoint `/Auth/ForgotPassword` using the method: POST */
        ForgotPassword: { POST: `/Auth/ForgotPassword` },
    },
    Bank: {
       CreateNoOtpBankAsync: { POST: `/Bank/CreateNoOtpBankAsync` },
        /** Returns the endpoint `/Bank/CreateBankAsync` using the method: POST */
        CreateBankAsync: { POST: `/Bank/CreateBankAsync` },
        /** Returns the endpoint `/Bank/UpdateBankAsync` using the method: PUT */
        UpdateBankAsync: { POST: `/Bank/UpdateBankAsync` },
        /** Returns the endpoint `/Bank/GetBankByUserId` using the method: GET */
        GetBankByUserId: { GET: `/Bank/GetBankByUserId` },
        /** Returns the endpoint `/Bank/GetDepositAccount` using the method: GET */
        GetDepositAccount: { GET: `/Bank/GetDepositAccount` },
        /** Returns the endpoint `/Bank/GetAllBank` using the method: GET */
        GetAllBank: { GET: `/Bank/GetAllBank` },
        /** Returns the endpoint `/Bank/GetAccountType` using the method: GET */
        GetAccountType: { GET: `/Bank/GetAccountType` },
        /** Returns the endpoint `/Bank/GenerateBankOtpAsync` using the method: GET */
        GenerateBankOtpAsync: { GET: `/Bank/GenerateBankOtpAsync` },
    },
    Contract: {
        /** Returns the endpoint `/Contract/GetPercentAccumulation` using the method: GET */
        GetPercentAccumulation: { GET: `/Contract/GetPercentAccumulation` },
        /** Returns the endpoint `/Contract/GetContractAmount` using the method: GET */
        GetContractAmount: { GET: `/Contract/GetContractAmount` },
        /** Returns the endpoint `/Contract/GetTotalAccumulatedReward` using the method: GET */
        GetTotalAccumulatedReward: { GET: `/Contract/GetTotalAccumulatedReward` },
        /** Returns the endpoint `/Contract/CreateContractAsync` using the method: POST */
        CreateContractAsync: { POST: `/Contract/CreateContractAsync` },
        /** Returns the endpoint `/Contract/UpgradeContractAsync` using the method: POST */
        UpgradeContractAsync: { POST: `/Contract/UpgradeContractAsync` },
        /** Returns the endpoint `/Contract/RenewContractAsync` using the method: POST */
        RenewContractAsync: { POST: `/Contract/RenewContractAsync` },
        /** Returns the endpoint `/Contract/GetContractByUserId` using the method: GET */
        GetContractByUserId: { GET: `/Contract/GetContractByUserId` },
        /** Returns the endpoint `/Contract/GetAllContract` using the method: GET */
        GetAllContract: { GET: `/Contract/GetAllContract` },
        /** Returns the endpoint `/Contract/GetAllExpiringContract` using the method: GET */
        GetAllExpiringContract: { GET: `/Contract/GetAllExpiringContract` },

    },
    Deposit: {
        /** Returns the endpoint `/Deposit/CreateDepositAsync` using the method: POST */
        CreateDepositAsync: { POST: `/Deposit/CreateDepositAsync` },
        /** Returns the endpoint `/Deposit/GetDepositByUserId` using the method: GET */
        GetDepositByUserId: { GET: `/Deposit/GetDepositByUserId` },
        /** Returns the endpoint `/Deposit/UpdateDepositAsync` using the method: POST */
        UpdateDepositAsync: { POST: `/Deposit/UpdateDepositAsync` },
        /** Returns the endpoint `/Deposit/GetAllDeposit` using the method: GET */
        GetAllDeposit: { GET: `/Deposit/GetAllDeposit` },
        /** Returns the endpoint `/Deposit/GetByIdAsync` using the method: GET */
        GetByIdAsync: { GET: `/Deposit/GetByIdAsync` },
    },
    DirectBonus: {
        /** Returns the endpoint `/DirectBonus/TransferToMainWallet` using the method: POST */
        TransferToMainWallet: { POST: `/DirectBonus/TransferToMainWallet` },
        /** Returns the endpoint `/DirectBonus/GetDirectBonusByUserId` using the method: GET */
        GetDirectBonusByUserId: { GET: `/DirectBonus/GetDirectBonusByUserId` },
        GetDirectReferalByUserId: { GET: `/DirectBonus/GetDirectReferalByUserId` },
        /** Returns the endpoint `/DirectBonus/GetTotalDirectBonusByDegreeAndUserId` using the method: GET */
        GetTotalDirectBonusByDegreeAndUserId: { GET: `/DirectBonus/GetTotalDirectBonusByDegreeAndUserId` },
        /** Returns the endpoint `/DirectBonus/GetAllDirectBonus` using the method: GET */
        GetAllDirectBonus: { GET: `/DirectBonus/GetAllDirectBonus` },
    },
    Export: {
        /** Returns the endpoint `/Export/ProcessMonthlyBonus` using the method: GET */
        ProcessMonthlyBonus: { GET: `/Export/ProcessMonthlyBonus` },
        /** Returns the endpoint `/Export/ExportAllContract` using the method: GET */
        ExportAllContract: { GET: `/Export/ExportAllContract` },
        /** Returns the endpoint `/Export/ExportAllContractHistory` using the method: GET */
        ExportAllContractHistory: { GET: `/Export/ExportAllContractHistory` },
        /** Returns the endpoint `/Export/ExportAllUsers` using the method: GET */
        ExportAllUsers: { GET: `/Export/ExportAllUsers` },
        /** Returns the endpoint `/Export/ExportAllDirectBonus` using the method: GET */
        ExportAllDirectBonus: { GET: `/Export/ExportAllDirectBonus` },
        /** Returns the endpoint `/Export/ExportAllMonthlyBonus` using the method: GET */
        ExportAllMonthlyBonus: { GET: `/Export/ExportAllMonthlyBonus` },
        /** Returns the endpoint `/Export/ExportAllGroupBonus` using the method: GET */
        ExportAllGroupBonus: { GET: `/Export/ExportAllGroupBonus` },
        /** Returns the endpoint `/Export/ExportAllDeposit` using the method: GET */
        ExportAllDeposit: { GET: `/Export/ExportAllDeposit` },
        /** Returns the endpoint `/Export/ExportAllWithdrawal` using the method: GET */
        ExportAllWithdrawal: { GET: `/Export/ExportAllWithdrawal` },
        /** Returns the endpoint `/Export/AutowithdrawMonthlyReward` using the method: GET */
        AutowithdrawMonthlyReward: { GET: `/Export/AutowithdrawMonthlyReward` },
    },
    Group: {
        /** Returns the endpoint `/Group/GetTotalGroupBonusByDegreeAndUserId` using the method: GET */
        GetTotalGroupBonusByDegreeAndUserId: { GET: `/Group/GetTotalGroupBonusByDegreeAndUserId` },
        /** Returns the endpoint `/Group/GetAccountGroupMatrix` using the method: GET */
        GetAccountGroupMatrix: { GET: `/Group/GetAccountGroupMatrix` },
        /** Returns the endpoint `/Group/GetGroupMatrix` using the method: GET */
        GetGroupMatrix: { GET: `/Group/GetGroupMatrix` },
        /** Returns the endpoint `/Group/GetUnPositionedUsers` using the method: GET */
        GetUnPositionedUsers: { GET: `/Group/GetUnPositionedUsers` },
        /** Returns the endpoint `/Group/AllocateMember` using the method: POST */
        AllocateMember: { POST: `/Group/AllocateMember` },
        /** Returns the endpoint `/Group/TransferToMainWallet` using the method: POST */
        TransferToMainWallet: { POST: `/Group/TransferToMainWallet` },
        /** Returns the endpoint `/Group/SearchMyNetwork` using the method: GET */
        SearchMyNetwork: { GET: `/Group/SearchMyNetwork` },
        /** Returns the endpoint `/Group/GetGroupBonusByUserId` using the method: GET */
        GetGroupBonusByUserId: { GET: `/Group/GetGroupBonusByUserId` },
        /** Returns the endpoint `/Group/GetMyNetworkVolume` using the method: GET */
        GetMyNetworkVolume: { GET: `/Group/GetMyNetworkVolume` },
        /** Returns the endpoint `/Group/GetGroupProcessedBonusByUserId` using the method: GET */
        GetGroupProcessedBonusByUserId: { GET: '/Group/GetGroupProcessedBonusByUserId' },
    },
    MainWallet: {
        /** Returns the endpoint `/MainWallet/GetDirectWalletAmount` using the method: GET */
        GetDirectWalletAmount: { GET: `/MainWallet/GetDirectWalletAmount` },
        /** Returns the endpoint `/MainWallet/GetGroupWalletAmount` using the method: GET */
        GetGroupWalletAmount: { GET: `/MainWallet/GetGroupWalletAmount` },

        GetConsolidatedWalletAmount: { GET: `/MainWallet/GetConsolidatedWalletAmount` },
        /** Returns the endpoint `/MainWallet/GetMonthlyWalletAmount` using the method: GET */
        GetMonthlyWalletAmount: { GET: `/MainWallet/GetMonthlyWalletAmount` },
        /** Returns the endpoint `/MainWallet/GetMainWalletByUserId` using the method: GET */
        GetMainWalletByUserId: { GET: `/MainWallet/GetMainWalletByUserId` },
        /** Returns the endpoint `/MainWallet/GetAllMainWallet` using the method: GET */
        GetAllMainWallet: { GET: `/MainWallet/GetAllMainWallet` },
    },
    Member: {
        /** Returns the endpoint `/Member/GetMemberByUserId` using the method: GET */
        GetMemberByUserId: { GET: `/Member/GetMemberByUserId` },
        /** Returns the endpoint `/Member/GetAllMember` using the method: GET */
        GetAllMember: { GET: `/Member/GetAllMember` },
    },
    MonthlyBonus: {
        /** Returns the endpoint `/MonthlyBonus/TransferToMainWallet` using the method: POST */
        TransferToMainWallet: { POST: `/MonthlyBonus/TransferToMainWallet` },
        /** Returns the endpoint `/MonthlyBonus/GetMonthlyRewardByUserId` using the method: GET */
        GetMonthlyRewardByUserId: { GET: `/MonthlyBonus/GetMonthlyRewardByUserId` },
        /** Returns the endpoint `/MonthlyBonus/GetTotalMonthlyBonusByDegreeAndUserId` using the method: GET */
        GetTotalMonthlyBonusByDegreeAndUserId: { GET: `/MonthlyBonus/GetTotalMonthlyBonusByDegreeAndUserId` },
        /** Returns the endpoint `/MonthlyBonus/GetAllMonthlyReward` using the method: GET */
        GetAllMonthlyReward: { GET: `/MonthlyBonus/GetAllMonthlyReward` },
    },
    KYC: {
        GetAllKYCStatus: { GET: `/KycStatus/GetAllKycStatus` },
    },
    PrimaryIdentification: {
        /** Returns the endpoint `/PrimaryIdentification/CreatePrimaryIdentification` using the method: POST */
        CreatePrimaryIdentification :{ POST: `/PrimaryIdentification/CreatePrimaryIdentification` },
        /** Returns the endpoint `/PrimaryIdentification/UpdatePrimaryIdentification` using the method: POST */
        UpdatePrimaryIdentification :{ POST: `/PrimaryIdentification/UpdatePrimaryIdentification` },
        /** Returns the endpoint `/PrimaryIdentification/GetPrimaryIdentificationByUserId` using the method: GET */
        GetPrimaryIdentificationByUserId :{ GET: `/PrimaryIdentification/GetPrimaryIdentificationByUserId` },
        /** Returns the endpoint GET: `/PrimaryIdentification/GetPrimaryIdentificationFrontByUserId` using the method: GET */
        GetPrimaryIdentificationFrontByUserId :{ GET: `/PrimaryIdentification/GetPrimaryIdentificationFrontByUserId` },
        /** Returns the endpoint GET: `/PrimaryIdentification/GetPrimaryIdentificationBackByUserId` using the method: GET */
        GetPrimaryIdentificationBackByUserId :{ GET: `/PrimaryIdentification/GetPrimaryIdentificationBackByUserId` },
        /** Returns the endpoint `/PrimaryIdentification/UpdatePrimaryIdentificationStatus` using the method: POST */
        UpdatePrimaryIdentificationStatus :{ POST: `/PrimaryIdentification/UpdatePrimaryIdentificationStatus` },
        /** Returns the endpoint `/PrimaryIdentification/GetIdentificationTypePrimary` using the method: GET */
        GetIdentificationTypePrimary :{ GET: `/PrimaryIdentification/GetIdentificationTypePrimary` },
    },
    SecondaryIdentification: {
        /** Returns the endpoint `/SecondaryIdentification/CreateSecondaryIdentification` using the method: POST */
        CreateSecondaryIdentification: { POST: `/SecondaryIdentification/CreateSecondaryIdentification` },
        /** Returns the endpoint `/SecondaryIdentification/UpdateSecondaryIdentification` using the method: POST */
        UpdateSecondaryIdentification: { POST: `/SecondaryIdentification/UpdateSecondaryIdentification` },
        /** Returns the endpoint `/SecondaryIdentification/GetSecondaryIdentificationByUserId` using the method: GET */
        GetSecondaryIdentificationByUserId: { GET: `/SecondaryIdentification/GetSecondaryIdentificationByUserId` },
        /** Returns the endpoint `/SecondaryIdentification/GetIdentificationTypeSecondary` using the method: GET */
        GetIdentificationTypeSecondary: { GET: `/SecondaryIdentification/GetIdentificationTypeSecondary` },
        /** Returns the endpoint `/SecondaryIdentification/UpdateSecondaryIdentificationStatus` using the method: POST */
        UpdateSecondaryIdentificationStatus: { POST: `/SecondaryIdentification/UpdateSecondaryIdentificationStatus` },
        /** Returns the endpoint `/SecondaryIdentification/GetSecondaryIdentificationFrontByUserId` using the method: GET */
        GetSecondaryIdentificationFrontByUserId: { GET: `/SecondaryIdentification/GetSecondaryIdentificationFrontByUserId` },
        /** Returns the endpoint `/SecondaryIdentification/GetSecondaryIdentificationBackByUserId` using the method: GET */
        GetSecondaryIdentificationBackByUserId: { GET: `/SecondaryIdentification/GetSecondaryIdentificationBackByUserId` },
    },
    SupportTicket: {
        /** Returns the endpoint `/SupportTicket/CreateTicketAsync` using the method: POST */
        CreateTicketAsync: { POST : `/SupportTicket/CreateTicketAsync` },
        /** Returns the endpoint `/SupportTicket/GetSupportTicketByUserId` using the method: GET */
        GetSupportTicketByUserId: { GET : `/SupportTicket/GetSupportTicketByUserId` },
        /** Returns the endpoint `/SupportTicket/UpdatTicketAsync` using the method: PUT */
        UpdatTicketAsync: { POST : `/SupportTicket/UpdatTicketAsync` },
        /** Returns the endpoint `/SupportTicket/GetAllSupportTicket` using the method: GET */
        GetAllSupportTicket: { GET : `/SupportTicket/GetAllSupportTicket` },
    },
    TransactionHistory: {
        /** Returns the endpoint `/TransactionHistory/GetTransactionHistoryByUserId` using the method: GET */
        GetTransactionHistoryByUserId: { GET : `/TransactionHistory/GetTransactionHistoryByUserId` },
        /** Returns the endpoint `/TransactionHistory/GetAllTransactionHistory` using the method: GET */
        GetAllTransactionHistory: { GET : `/TransactionHistory/GetAllTransactionHistory` },
    },
    UserSocialMedia: {
        GetSocialMediaByUserId: { GET : `/UserSocialMedia/GetSocialMediaByUserId` },

    },
    Withdrawal : {
        /** Returns the endpoint `/Withdrawal/CreateWithdrawalAsync` using the method: POST */
        CreateWithdrawalAsync : { POST : `/Withdrawal/CreateWithdrawalAsync` },
        /** Returns the endpoint `/Withdrawal/CreateWithdrawalAdministratorAsync` using the method: POST */
        CreateWithdrawalAdministratorAsync: { POST: `/Withdrawal/CreateWithdrawalAdministratorAsync` },
        /** Returns the endpoint `/Withdrawal/GetWithdrawalByUserId` using the method: GET */
        GetWithdrawalByUserId : { GET : `/Withdrawal/GetWithdrawalByUserId` },
        /** Returns the endpoint `/Withdrawal/GetAllWithdrawal` using the method: GET */
        GetAllWithdrawal : { GET : `/Withdrawal/GetAllWithdrawal` },
        /** Returns the endpoint `/Withdrawal/UpdateWithdrawalAsync` using the method: PUT */
        UpdateWithdrawalAsync : { PUT : `/Withdrawal/UpdateWithdrawalAsync` },
    }
}

export default Endpoints;
