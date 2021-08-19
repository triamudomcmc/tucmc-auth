# TUCMC Auth API

Easily secure your website with authentication system.

## API Setup Guide using npm

#### _app.js or _app.tsx

```javascript
import {AuthProvider} from "tucmc-auth"

function MyApp({Component, pageProps}) {

  return (
    <div>
      <AuthProvider TOKEN="-----TOKEN-----">
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )

}

export default MyApp
```

#### pages/index.js or pages/index.tsx

```javascript
import {useAuth} from 'tucmc-auth'

function Index() {

  const {userData, SignInWithTUCMC, signOut} = useAuth()

  return (
    <div>
      {userData && <h1>Hi, {userData.firstname}</h1>}
      <SigninWithTUCMC/>
    </div>
  )
}

export default Index
```

## Setup Guide using javascript CDN
### Library Resources CDN
```
CSS: https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-style.css
Script: https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-lib.min.js
```

### 1. Include all required libraries

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-style.css"/>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/tucmc-auth@latest/dist/script/auth-lib.min.js"></script>
<script async src="//cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js" onload="init()"></script>
```

### 2. Setup a script

```html
<script>
    const auth = new TUCMCAuth("-----TOKEN-----")

    window.onload = function () {
        const sessionData = auth.user()
        
        // If session is valid, update an element with userdata.
        if (sessionData) {
            document.getElementById("email").innerText = sessionData.email
        }
    }
</script>
```

### 3. Add sign-in button
```html
<!---Button id must be `login_with_TUCMC`--->
<button id="login_with_TUCMC" class="login_with_TUCMC">
    Login with TUCMC
</button>

<!---Logout button--->
<button onclick="auth.signout()">logout</button>

<!---Display data here--->
<p id="email"></p>
```

made with ♥ by Triam Udom Clubs Management Committee
