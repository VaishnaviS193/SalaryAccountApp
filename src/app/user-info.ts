export interface UserInfo {
    id?: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    password: string;
    addressType: string;
    line1: string;
    line2: string;
    line3?: string;
    country: string;
    state: string;
    city: string;
    phone: string;
    pincode: string;
    phoneNumber: string;
    documentType: string;
    documentNumber: string;
    aadharNumber: string;
    panNumber: string;
}