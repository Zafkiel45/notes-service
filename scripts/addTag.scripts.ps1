# Test the endpoint /notes/addTags to the method POST

$headers = @{ "Content-Type" = "application/json" }

$body = @{
    noteName = "Test"
    tags  = @("news", "documentation", "testing") 
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/notes/addTags" -Method Post -Headers $headers -Body $body
