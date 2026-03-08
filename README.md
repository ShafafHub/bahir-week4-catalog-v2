# Catalog API v2 (DB + Auth)

## startup

```powershell
npm install express sqlite3 jsonwebtoken

 // start server by :
 node index.js

 // for getting token
 $response = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method Post -Body (@{username="admin"; password="1234"} | ConvertTo-Json) -ContentType "application/json"
$token = $response.token
$token

 // for user looking
 Invoke-RestMethod -Uri http://localhost:3000/auth/me -Method Get -Headers @{Authorization=$token}

browser show all product :
Invoke-RestMethod -Uri http://localhost:3000/products -Method Get

post product :
Invoke-RestMethod -Uri http://localhost:3000/products -Method Post -Headers @{Authorization=$token} -Body (@{name="Smart Watch"; price=250; categoryId=1} | ConvertTo-Json) -ContentType "application/json"

put product by id :
Invoke-RestMethod -Uri http://localhost:3000/products/1 -Method Put -Headers @{Authorization=$token} -Body (@{name="Updated Laptop"; price=1500; categoryId=1} | ConvertTo-Json) -ContentType "application/json"

Delete product :
Invoke-RestMethod -Uri http://localhost:3000/products/1 -Method Delete -Headers @{Authorization=$token}

health check :
Invoke-RestMethod -Uri http://localhost:3000/health -Method Get
```
