# Test the endpoint /notes to the method POST

$headers = @{ "Content-Type" = "application/json" }

$body = @{
    title = "Test"
    body  = "testing this"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/notes" -Method Post -Headers $headers -Body $body
