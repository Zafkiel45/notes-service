# Test the endpoint /notes/:id to the method DELETE
Invoke-RestMethod -Uri "http://localhost:3001/notes/1" -Method Delete
