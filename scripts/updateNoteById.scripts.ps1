# Test the endpoint /notes/:id to the method PATCH

$headers = @{ "Content-Type" = "application/json" }

$body = @{
    title = ""
    body  = "I AM A LITTE BIT BETTER THAN 1 SECOND AGO"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/notes/2" -Method Patch -Headers $headers -Body $body
