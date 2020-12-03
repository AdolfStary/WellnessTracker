# DOCSTRING
Author: Adolf Stary

Title:

Purpose: This project was created as a capstone project for my Full Stack Developer course at University of Alberta. It involves the full scope of full stack development using C# MVC back end, React/JavaScript front end and MariaDB. This app was designed for personal use, to track health and wellness related events throughout the day with ease and assist with summaries and overviews of the data.

Last Modified: Nov 12, 2020

# Testing instructions
- Set your own database details in EntryContext.cs, run dotnet ef database update
- There are two default profiles for testing:
        - Username: Adolf
        - Password: AdaAya
        - User is diabetic, has access to diabetic options

        - Username: Ummer
        - Password: aaa
        - User is not a diabetic, doesn't have diabetic options showing.
- There are few default entries of different types for each user allowing you to access and filter them in 'My Notebook' section and to view 'Summary'.
- To test "Observations" in "Summary", you need to make at least a couple "Meal" entries and specify allergens consumed. Then you need to create a negative status / feeling entry dated within 3 hours after the Meal entries.
        For example:
                - Create a meal at 9 AM today, where you "consumed" milk as allergen.
                - Create a meal at 9:15 AM today, where you "consumed" milk and gluten as allergen.
                - Create a meal at 9:20 AM today, where you "consumed" milk and egg as allergen.
                - Create an event at 10:00 AM today, where your status is any of the negative options, for example "Tired".
                - Visit "Summary" page to view Observation section for results;
- To test 'Today' you may need to 'Make Entry' the today to see the functionality of the section.
- Feel free to experiment, or even create your own account.

# Resources
https://www.w3schools.com/bootstrap/bootstrap_alerts.asp
https://www.c-sharpcorner.com/article/hashing-passwords-in-net-core-with-tips/
https://stackoverflow.com/questions/60197270/jsonexception-a-possible-object-cycle-was-detected-which-is-not-supported-this
https://stackoverflow.com/questions/6193574/save-javascript-objects-in-sessionstorage
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time
https://stackoverflow.com/questions/1139181/a-method-to-count-occurrences-in-a-list
https://www.bing.com/search?q=associative+list+c%23&cvid=525d892b5d0e477ba5d7d9e1f692757c&pglt=43&FORM=ANNTA1&PC=LCTS
https://docs.microsoft.com/en-us/aspnet/web-api/overview/error-handling/web-api-global-error-handling
https://attacomsian.com/blog/javascript-iterate-objects
https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
https://hosting.review/tutorial/javascript-remove-element-from-array/


# Trello
https://trello.com/b/vb7IkaVh


# Citations
- SHA256 hashing - EntryController.cs
        // Borrowed code from: https://www.c-sharpcorner.com/article/hashing-passwords-in-net-core-with-tips/
        // I used this code block as it would be hard to rewrite it on my own and make it any more different.
        // Method makes SHA256 class, using standard UTF8 encoding it breaks down the given string into bytes and hashes them, then it replaces "-" with empty space
        // Which returns SHA256 hash

- Default DateTime-Local - MakeEntry.js
        // Got heavily inspired at : https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time
        // Had to modify to make it work for my own use. 
        //I got heavily inspired as I didn't know how to more simplify the code to achieve same result.
        // Method suggests creating new date, setting time straight according to timezone and then assigning as value to
        // Datetime-local input by converting it to ISOString.