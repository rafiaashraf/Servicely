const config = require('./dbConfig'),
    sql = require('mssql');


// ------------------------LOGIN---------------------------------

const login = async (uname, pass, table) => {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query(`select * from ${table} where Username = '${uname}' AND Password='${pass}'`)
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const createCustomers = async (uname, password, firstname, lastname, dob, gender, phone, cnic, email, street, house, city) => {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query(`insert into Customer values ('${uname}','${firstname}','${lastname}','${dob}','${gender}','${phone}','${house}','${street}','${city}','${password}','${email}','${cnic}')`)
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const createWorkers = async (uname, password, firstname, lastname, dob, gender, phone, cnic, email, street, house, city, occup, exp, price, desc) => {
    try {
        let pool = await sql.connect(config);
        let workers = await pool.request().query(`insert into Worker values ('${uname}','${firstname}','${lastname}','${dob}','${gender}','${phone}','${house}','${street}','${city}',CAST(${exp} as INT),CAST(${price} as INT),'${desc}','${password}','${email}',CAST(${occup} AS INT),'${cnic}')`)
        return workers;
    }
    catch (error) {
        console.log(error);
    }
}

// ------------------------WORKER HOME---------------------------------

const updateBooking = async (bookid, status, user, condition) => {
    try {
        let pool = await sql.connect(config);
        let customers;
        customers = await pool.request().query(`update Booking set Status = '${status}' where BookId=CAST(${bookid} as INT)`)
        if (condition == 'All')
            customers = await getBooking(user);
        else
            customers = await getBookingCondition(user, condition);
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const getBooking = async (user) => {
    try {
        let pool = await sql.connect(config);
        let customers;

        customers = await pool.request().query(`select B.BookDate, B.BookTime, B.EndTime, B.Status, C.CustFirstName, C.CustCity, C.CustHNo, C.CustStreet, B.BookId from Booking B, Customer C where B.WUserName = '${user}' and C.UserName=B.CUserName`)
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const getBookingCondition = async (user, condition) => {
    try {
        let pool = await sql.connect(config);
        let customers;

        customers = await pool.request().query(`select B.BookDate, B.BookTime, B.EndTime, B.Status, C.CustFirstName, C.CustCity, C.CustHNo, C.CustStreet, B.BookId from Booking B, Customer C where B.WUserName = '${user}' and (B.Status = '${condition}' and C.UserName=B.CUserName)`)
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

// ------------------------WORKER HOME CHARTS---------------------------------

const getSummary= async (user) => {
    try {
        let pool = await sql.connect(config);
        let customers;

        customers = await pool.request().query(`select  (select avg(Rating) from Booking where WUserName='${user}') as Rating,
		(select count(*) from Booking where WUserName='${user}' and Status='Completed') as Completed,
		(select count(*) from Booking where WUserName='${user}' and Status='Pending') as Pending,
		(select count(*) from Booking where WUserName='${user}' and ( Status='Completed' or Status='Accepted') ) as Total,
		(select count(*) from Booking where (month(BookDate) = month(getdate()) and year(BookDate) = year(getdate())) 
				and WUserName = '${user}' and ( Status='Completed' or Status='Accepted')) as ThisMonth,
        (select WorkPrice from Worker where UserName = '${user}') as Price`)

        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const getOrderChartData = async (user, date) => {
    try {
        let pool = await sql.connect(config);
        let customers;

        customers = await pool.request().query(`select count(*) as orders,BookDate
        from Booking
        where WUserName='${user}' 
        group by BookDate
        order by BookDate ASC`)

        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

const getRatingChartData = async (user, date) => {
    try {
        let pool = await sql.connect(config);
        let customers;
        date--;
        customers = await pool.request().query(`WITH CTE AS (
            SELECT DATEADD(day, -${date}, GETDATE()) as day
            UNION ALL
            SELECT DATEADD(day, 1, day) 
            FROM CTE
            WHERE day < GETDATE()
            )
            SELECT
                COALESCE(AVG(CASE WHEN Booking.WUserName = '${user}' 
                AND CAST(Booking.BookDate AS DATE) < CTE.day 
                THEN Booking.Rating END), 0) AS Rating
            FROM CTE
            LEFT JOIN Booking
            ON Booking.WUserName = '${user}'
            GROUP BY CTE.day
            ORDER BY CTE.day ASC
    `)


        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

//----------------------------HOME PAGE---------------------------------------

//getting service table data
const getServices = async () => {
    try {
        let pool = await sql.connect(config);
        let services = pool.request().query("select * from Service")
        return services;
    }
    catch (error) {
        console.log(error);
    }
}

//getting total no of bookings(completed, in progress, pending) of the given customer
const getBookingCust = async (uname) => {
    try {
        let pool = await sql.connect(config);
        let totalbooking = pool.request().query(`select count(BookId) as count from Booking where CUserName = '${uname}' and Status != 'Rejected'`)
        return totalbooking;
    }
    catch (error) {
        console.log(error);
    }
}

//getting total no of In Progress booking(no yet completed), requested(not yet accepted by worker) of the customer
const getProgressBookingCust = async (uname) => {
    try {
        let pool = await sql.connect(config);
        let inprogress = pool.request().query(`select count(BookId) as count from Booking where CUserName = '${uname}' and Status = 'Accepted'`)
        return inprogress;
    }
    catch (error) {
        console.log(error);
    }
}

//getting details of the customer
const getCustomers = async (uname) => {
    try {
        let pool = await sql.connect(config);
        let customers = pool.request().query(`select SUBSTRING(CustFirstName, 1, 1) as FirstLetter, * from Customer where Username = '${uname}'`)
        return customers;
    }
    catch (error) {
        console.log(error);
    }
}

//getting info of unrated booking((completed) of that customer
const getPReviewBook = async (uname) => {
    try {
        let pool = await sql.connect(config);
        let pendingreview = pool.request().query(`select top 1 b.BookId, w.WorkFirstName, w.WorkLastName, convert(varchar,b.BookDate,106) as Date, convert(varchar, b.BookTime, 8) as StartTime, convert(varchar, b.EndTime, 8) as FinishTime from Booking as b Inner Join Worker as w On w.Username = b.WUserName where b.CUsername = '${uname}' and b.Status = 'Completed' and b.Rating IS NULL`)
        return pendingreview;
    }
    catch (error) {
        console.log(error);
    }
}

//update review, rating in the booking
const updateReview = async (bookid, review, rating) => {
    try {
        let pool = await sql.connect(config);
        let newreview = pool.request().query(`Update Booking set Review = '${review}', Rating = CAST(${rating} AS INT) where BookId = CAST(${bookid} AS INT)`)
        return newreview;
    }
    catch (error) {
        console.log(error);
    }
}



//------------------------------Customer Home-----------------------

const getWorkerBookings = async (id, date) => {
    try {
        let pool = await sql.connect(config);
        let date1 = formatDate(date);
        let worker = await pool.request().query(`select BookTime, EndTime, BookDate, BookId from Booking where WUserName='${id}' and (Status='Pending' or Status='Accepted') and BookDate='${date1}'`)
        return worker;
    }
    catch (error) {
        console.log(error);
    }
}

const getWorkerDetails = async (sid, type, user) => {
    try {
        let pool = await sql.connect(config);
        let worker1;
        if (type == 'oh')
            worker1 = pool.request().query(`execute get_Cards_Highest_Orders ${sid},'${user}'`)
        else if (type == 'ol')
            worker1 = pool.request().query(`execute get_Cards_Lowest_Orders ${sid},'${user}'`)
        else if (type == 'rh')
            worker1 = pool.request().query(`execute get_Cards_Highest_Rating ${sid},'${user}'`)
        else if (type == 'rl')
            worker1 = pool.request().query(`execute get_Cards_Lowest_Rating ${sid},'${user}'`)
        else if (type == 'ph')
            worker1 = pool.request().query(`execute get_Cards_Highest_Price ${sid},'${user}'`)
        else if (type == 'pl')
            worker1 = pool.request().query(`execute get_Cards_Lowest_Price ${sid},'${user}'`)
        else if (type == 'eh')
            worker1 = pool.request().query(`execute get_Cards_Highest_Expereince ${sid},'${user}'`)
        else if (type == 'el')
            worker1 = pool.request().query(`execute get_Cards_Lowest_Experience ${sid},'${user}'`)
        return worker1;
    }
    catch (error) {
        console.log(error);
    }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


const saveBooking = async (id, user, time, date, hrs) => {
    try {
        let pool = await sql.connect(config);
        let date1 = formatDate(date);
        let newreview = pool.request().query(`execute insertInBooking '${user}','${id}','${time}',${hrs},'${date1}'`)
        return newreview;
    }
    catch (error) {
        console.log(error);
    }
}




const getWorkerData = async (sid, user) => {
    try {
        let pool = await sql.connect(config);
        let worker = pool.request().query(`execute getCards ${sid},'${user}'`)
        return worker;
    }
    catch (error) {
        console.log(error);
    }
}




module.exports = {
    createWorkers,
    login,
    createCustomers,
    updateBooking,
    getBooking,
    getBookingCondition,
    getWorkerData,
    getWorkerDetails,
    getWorkerBookings,
    getOrderChartData,
    getRatingChartData,
    saveBooking,
    updateReview,
    getPReviewBook,
    getCustomers,
    getProgressBookingCust,
    getBookingCust,
    getServices,
    getSummary
}