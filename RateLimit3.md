Questions 

1. What constitutes a "failed attempt"?

2. Should successful logins reset the counter immediately?
    Yes (as per the question), or only after the 15-minute window?

3. How do we identify the client?
    ip+username?
    req.ip? 
    X-Forwarded-For? 
    what about the proxies/load balancers?

4. Assumption the limit per IP not  per username+IP?
     Brute-forcing a single account from one IP vs. many IPs targeting one account.
     
    This is a valid case

5. What’s the expected traffic scale?
    To decide In-memory or distributed database to store (Redis cluster, etc.)?

6. Should we log or alert on repeated 429s?
    we should crete a alarm for monitoring brute-force attac k.


Design :
Create a unique Key -> Store this unique key -> Find a way to count the attempts -> check the limit and decide to proceed or not -> Reset the keys


Create Store for  IP:
    counter for failed login attempts.[count]
    timestamp for the start of the current window (15 minutes).[WindowStart]

Use  store like Redis, for rate limiting across multiple servers (stateless service), with automatic key expiry. (retention period can be set by us by maintaing something basic like a properties file) 

On each POST /api/login, increment the counter if the login fails; if the first failure, set the window start timestamp.

If 15 minutes have passed since the window started, the reddis keys will expire then we create new key to reset the counter and timestamp for the IP.

If the failed attempt counter for an IP reaches 5 within the 15-minute window, block further attempts with a HTTP 429 response.

Successful logins should reset the failed count for that IP immediately, 

