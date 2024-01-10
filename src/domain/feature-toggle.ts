export interface FeatureToggle{
    displayName?: string;
    technicalName: string;
    expiresOn?: Date;
    description?: string;
    inverted: boolean;
    active?:boolean;
    customerIds: string[];
}

export interface FeatureResponse{
    features:FeatureToggle[]
}

export interface FeatureRequest{
    customerId:string;
    features:FeatureToggle[]
}