class Customer {
    constructor(CustId, FirstName, LastName, Age, Gender, Phone, CNIC, Email, Password) {
        this.CustId = CustId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Age = Age;
        this.Gender = Gender;
        this.Phone = Phone;
        this.CNIC = CNIC;
        this.Email = Email;
        this.Password = Password;
    }
}

class Worker {
    constructor(WorkId, FirstName, LastName, Age, Gender, Phone, CNIC, Email, Occupation, Password) {
        this.WorkId = WorkId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Age = Age;
        this.Gender = Gender;
        this.Phone = Phone;
        this.CNIC = CNIC;
        this.Email = Email;
        this.Password = Password;
        this.Occupation = Occupation;
    }
}

module.exports = { Customer, Worker };