export enum Gender {
    Male = 1,
    Female
}

export class Admin {
    FirstName: string;
    LastName: string;
    Password: string;
    Gender: Gender;
    DateOfBirth: Date;
    Role: number;
    PhoneNumber: string;
    LinkedInProfile: string;
    Status: boolean = true;
}