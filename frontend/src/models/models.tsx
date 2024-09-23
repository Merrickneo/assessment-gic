export interface Employee {
    id: string
    name: string;
    email_address: string;
    phone_number: string;
    cafe_id: string;
    cafe: string;
    days_worked: number;
    gender: string;
    start_date: Date;
}

export interface Cafe {
    _id: string;
    id: string;
    name: string;
    description: string;
    location: string;
    logo: string;
    employeeCount: number;
}

export interface UpdateEmployee {
    id: string;
    name: string;
    email_address: string;
    phone_number: string;
    cafe_id: string;
}