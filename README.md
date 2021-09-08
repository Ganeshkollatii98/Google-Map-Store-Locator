# Google-Map-Store-Locator
 Google Maps Store Locator Software Requirements

Goals
1.	Build google map store locater to allow users to find stores
User Stories
1	 As a user , I want to see a list of stores are available so I can see where all stores are located
2.	As a user , I want to enter zipcode on search so I can see stores to me
3.	As a user , I want to see the list of stores around my zipcode so that i can find stores closest to me 
4.	As a user , I want to be able  to  see the all the locations of store on the map so that I can know where they are located
5.	As a user , I want to be click on a store have location show up on the map with more store information so that I can know more about individual store
6.	As a user , I want to be click on directions so that I can see the directions to the store
7.	As a user , I want to be able to click on phone number so that  I can reach out the stores
Flow Diagram ( SwimLane )
    
Business Requirements
1.	Allow user to find the stores near to me
2.	Show the user list of stores 2 miles with in the zipcode
3.	Allow the user to view more info of the store
4.	Allow user to make directions from their location
5.	Allow user to call directly to the store
6.	Show the following information on the store
o	Address
1.	Phone Number
2.	Open status
3.	Store name
Technical Requirements
1.	Use google maps javascript  API
2.	Use NodeJs  for API
3.	User MongoDB Atlas for database
4.	User google maps geocoder user to geocode zipcode
5.	API Endpoints
       GET ‘stores’
                                                Return list of store 
                            GET  ‘stores?zip=<>’
                                               Return a list of stores based on zipcode
                            POST ‘stores’
                                                 Save list of stores to the database 
                                                 
 #Project Images
 
  ![image](https://user-images.githubusercontent.com/52064346/132562557-98969225-5a76-43f1-b370-5fe7295f8ed7.png)
  ![image](https://user-images.githubusercontent.com/52064346/132562588-d45e9b51-6009-4ee4-8086-ecb7a7454264.png)
  ![image](https://user-images.githubusercontent.com/52064346/132562629-028595cc-6557-4da0-a852-19d108621ec3.png)
  
 #Wire Frame
  
  ![Google Map WireFrame](https://user-images.githubusercontent.com/52064346/132562769-443fd4f4-7cdb-4bc0-ac0c-be33f58d1b9e.png)

   
 
 

 
 


