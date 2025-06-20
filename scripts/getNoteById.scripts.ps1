$response = Invoke-RestMethod -Uri "http://localhost:3001/api/notes/2" -Method Get

# Access the actual array of notes inside the 'content' property
$notes = $response.content

# Now format it
$notes | Format-Table -AutoSize