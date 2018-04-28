### Usage
```bash
export JWT_KEY=<secret_key>
```
```javascript
const permit = require('jwt-permit')
// JWT in headers : -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY291bnRJZCI6IjM1NTIwMGU...'
app.post('/',
  permit(<role_1>, <role_2>),
  handler
)
```
