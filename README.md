### Usage
```bash
export JWT_KEY=<secret_key>
```
```javascript
const {permitRole, permitAction} = require('jwt-permit')
// JWT in headers : -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY291bnRJZCI6IjM1NTIwMGU...'
// Permit by Roles
app.post('/',
  permitRole('admin_location','viewer_location'),
  handler
)
// Permit by Actions
app.post('/',
  permitAction('read_location','update_location'),
  handler
)
```
