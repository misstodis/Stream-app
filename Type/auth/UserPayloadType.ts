export type UserPayloadType = {
    data: {
        backup_code_enabled: boolean;
        banned: boolean;
        create_organization_enabled: boolean;
        created_at: number;
        delete_self_enabled: boolean;
        email_addresses: {
            email_address: string;
            id: string;
            linked_to: {
                id: string;
                type: string;
            }[];
            object: string;
            reserved: boolean;
            verification: {
                attempts: null;
                expire_at: null;
                status: string;
                strategy: string;
            };
        }[];
        external_accounts: {
            approved_scopes: string;
            email_address: string;
            family_name: string;
            given_name: string;
            google_id: string;
            id: string;
            label: null;
            object: string;
            picture: string;
            public_metadata: {};
            username: null;
            verification: {
                attempts: null;
                error: {
                    code: string;
                    long_message: string;
                    message: string;
                };
                expire_at: number;
                status: string;
                strategy: string;
            };
        }[];
        external_id: null;
        first_name: string;
        has_image: boolean;
        id: string;
        image_url: string;
        last_active_at: number;
        last_name: string;
        last_sign_in_at: null;
        locked: boolean;
        lockout_expires_in_seconds: null;
        object: string;
        password_enabled: boolean;
        phone_numbers: any[];
        primary_email_address_id: string;
        primary_phone_number_id: null;
        primary_web3_wallet_id: null;
        private_metadata: {};
        profile_image_url: string;
        public_metadata: {};
        saml_accounts: any[];
        totp_enabled: boolean;
        two_factor_enabled: boolean;
        unsafe_metadata: {};
        updated_at: number;
        username: string;
        verification_attempts_remaining: number;
        web3_wallets: any[];
    };
    object: string;
    type: string;
};