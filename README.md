# Friend Finder

Homework assignment. More readme goodness to come.


## API documentation:
* `/api/friends` (GET) - Returns the complete friend list as JSON:

   ```typescript
   {
       name: string, 
       photoUrl: string, 
       scores: number[10]
   } []
   ```
* `/api/friends` (POST) - Accepts user data information as JSON:
   ```typescript
   {
       name: string, 
       photoUrl: string, 
       scores: number[10]
   }
   ```

   Returns friend match data as JSON:
    ```typescript
   {
       result: string,
       error?: string,

       name?: string, 
       photoUrl?: string, 
       scores?: number[10]
   }
   ```

   The value of `result` will be one of the following:
    * "new friend" - A friend match has been found. All fields except `error` will be populated
    * "no friends" - There are no previous friends in the database to compare to so no match could be made. All other fields are empty.
    * "error" - An error occurred. The `error` field contains more detailed information. Other fields are empty.