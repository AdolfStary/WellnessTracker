# DOCSTRING
Author: Adolf Stary

Title:

Purpose: This project was created as a capstone project for my Full Stack Developer course at University of Alberta. It involves the full scope of full stack development using C# MVC back end, React/JavaScript front end and MariaDB. This app was designed for personal use, to track health and wellness related events throughout the day with ease and assist with summaries and overviews of the data.

Last Modified: Nov 12, 2020

# Testing instructions
1. Set your own database details in EntryContext.cs, run dotnet ef database update

# Resources
https://www.w3schools.com/bootstrap/bootstrap_alerts.asp
https://www.c-sharpcorner.com/article/hashing-passwords-in-net-core-with-tips/
https://stackoverflow.com/questions/60197270/jsonexception-a-possible-object-cycle-was-detected-which-is-not-supported-this
https://stackoverflow.com/questions/6193574/save-javascript-objects-in-sessionstorage
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time


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