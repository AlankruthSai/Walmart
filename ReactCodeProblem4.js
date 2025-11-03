/*

Issue 1:

The line setLoading(false); is executed immediately after the fetch call is initiated, 
because fetch returns a Promise that is resolved asynchronously. It's not waiting for the .then() 
or .catch() blocks to complete.

To Fix: put setLoading(false) in .finally() block so the loading state is turned off after the request 
is complete, even if it is succeeded or failed.

Issue 2: 

Error handling is not complete 

If the response is not OK (e.g., 401, 500), res.json() will still be called, but the error might be in data — it's not checked.
Network errors go to .catch, but HTTP error responses (like 400/500) do not trigger .catch — they go through .then with a failed res.ok.
→ Silent failures or wrong alerts can occur.

*/



//Code changes 




async function handleSubmit(e) {
  e.preventDefault();
  if (loading) return; // avoid double submit call

  setLoading(true);
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(data?.message || "Login failed"); // giving a fallback message
    }
    const data = await res.json();

    // Optionally reset error state here if using one
  } catch (err) {
    console.error(err);
    alert(err.message || 'Login failed'); // this should be a dialog box component instead of an alert
    // If using error state: setError(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
}