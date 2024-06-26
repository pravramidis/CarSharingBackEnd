CREATE TABLE BOOKING_TYPE ( 
	Type	VARCHAR(10)	NOT NULL,
PRIMARY KEY (Type) );

CREATE TABLE City ( 
	Y_Coordinates_Bottom_Right	DECIMAL(8,6),
	X_Coordinates_Bottom_Right	DECIMAL(8,6),
	City_Name	VARCHAR(30)	NOT NULL,
	Penalty	DOUBLE PRECISION,
	X_Coordinates_Top_Left	DECIMAL(8,6),
	Y_Coordinates_Top_Left	DECIMAL(8,6),
PRIMARY KEY (City_Name) );

CREATE TABLE VEHICLE ( 
	Available	BOOLEAN,
	X_Coordinates	DECIMAL(8,6),
	Y_Coordinates	DECIMAL(8,6),
	Passenger_capacity	INTEGER,
	Gearbox	BOOLEAN,
	Brand	VARCHAR(20),
	Color	VARCHAR(15),
	Model	VARCHAR(20),
	Type	VARCHAR(15),
	Fuel_Type VARCHAR(30),
	Plate_number	VARCHAR(10)	NOT NULL,
	FK1_City_Name	VARCHAR(30),
PRIMARY KEY (Plate_number) );

CREATE TABLE USER ( 
	Date_of_birth	DATE,
	Phone_number	VARCHAR(30),
	Username	VARCHAR(30)	NOT NULL,
	Password	VARCHAR(30),
	Full_Name	VARCHAR(30),
	License_id	VARCHAR(30),
	Email 		VARCHAR(30),
PRIMARY KEY (Username) );

CREATE TABLE BOOKS ( 
	Price	DOUBLE PRECISION,
	Payment_date	VARCHAR(30)	NOT NULL,
	Trip_duration	VARCHAR(10),
	FK1_Username	VARCHAR(30)	NOT NULL,
	FK2_Plate_number	VARCHAR(10)	NOT NULL,
	FK3_Type	VARCHAR(10)	NOT NULL,
PRIMARY KEY (Payment_date, FK1_Username, FK2_Plate_number, FK3_Type) );

CREATE TABLE COSTS ( 
	Price	DOUBLE PRECISION,
	FK1_Plate_number	VARCHAR(10)	NOT NULL,
	FK2_Type	VARCHAR(10)	NOT NULL,
PRIMARY KEY (FK1_Plate_number, FK2_Type));

ALTER TABLE VEHICLE ADD FOREIGN KEY (FK1_City_Name) REFERENCES City (City_Name) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE BOOKS ADD FOREIGN KEY (FK1_Username) REFERENCES USER (Username) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE BOOKS ADD FOREIGN KEY (FK2_Plate_number) REFERENCES VEHICLE (Plate_number) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE BOOKS ADD FOREIGN KEY (FK3_Type) REFERENCES BOOKING_TYPE (Type) ON DELETE CASCADE ON UPDATE CASCADE;

